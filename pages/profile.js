import {useEffect, useState} from "react";
import {supabase} from "../lib/initSupabase";
import Image from "next/image";
import SimpleHeader from "../components/SimpleHeader";
import Layout from "../components/Layout";
import Message from "../components/Message";


const Profile = ({user}) => {
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [message, setMessage] = useState({});
    const [image, setImage] = useState("");
    const [changePassword, setChangePassowrd] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [newPassword, setNewpassword] = useState("")

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        const {data, error} = await supabase
            .from('profiles')
            .select()
            .match({id: user.id})

        if (error) {
            console.log(error)
        }

        console.log(data)

        if (data && data.length) {
            setWebsite(data[0].website)
            setUsername(data[0].username)
            setAvatarUrl(data[0].avatar_url)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()
        let avatar_url = ""

        // upload image
        if (image) {
            const {data, error} = await supabase.storage
                .from('avatars')
                .upload(
                    `${Date.now()}_${image.name}`, image)

            if (error) {
                console.log(error)
            }

            if (data) {
                avatar_url = data.Key
                setAvatarUrl(data.Key)
            }
        }

        const {data, error} = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                username,
                avatar_url: avatar_url ? avatar_url : avatarUrl,
                website
            })


        if (error) {
            console.log(error)
        }

        if (data) {
            setMessage({message: "Profile has been updated!", type: "success"})
        }

    }

    async function updatePassword(e) {
        e.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setMessage({message: "Passwords do not match", type: "warning"})
            return
        }

        const {user, error} = await supabase.auth.update({password: newPassword})

        if (error) {
            console.error(error)
            setMessage({message: "Something went wrong", type: "error"})
        }

        if (user) {
            setMessage({message: "Password has been updated", type: "success"})
            setNewpassword("")
            setConfirmNewPassword("")
        }

    }

    return (
        <Layout title={"Profile"}>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Profile"}/>

            <form onSubmit={handleSubmit} className={"form-wrapper"}>
                <h2>User Data</h2>

                {avatarUrl ?
                    <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}${avatarUrl}`} alt="Avatar" width={150}
                           height={150}/>
                    :
                    "No Avatar"
                }

                <div className={"form-group"}>
                    <label
                        className={"label"}
                        htmlFor="avatar">
                        Upload image
                    </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="avatar"
                        name="avatar"
                        className={""}
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>

                <div className={"form-group"}>
                    <label
                        className={"label"}
                        htmlFor="username">
                        Username
                    </label>
                    <input type="text"
                           value={username}
                           className="input input--fluid"
                           placeholder={"Username"}
                           onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className={"form-group"}>
                    <label className={"label"} htmlFor="username">
                        Website
                    </label>
                    <input type="text"
                           value={website}
                           placeholder={"Website"}
                           className="input input--fluid"
                           onChange={e => setWebsite(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <button className={"primary button button--fluid"} type={"submit"}>Save Profile</button>
                </div>
            </form>

            <button className={`secondary`} onClick={() => setChangePassowrd(!changePassword)}>{changePassword ? "Don't change " : "Change "} Password</button>

            {changePassword &&
                <form onSubmit={updatePassword}>
                    <h2>Set new password</h2>
                    <input type="password" onChange={e => setNewpassword(e.target.value)}/>
                    <input type="password" onChange={e => setConfirmNewPassword(e.target.value)}/>
                    <button type={"submit"} className={`primary`}>Change Password</button>
                </form>
            }
        </Layout>
    );
};

export default Profile;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return {
            props: {expired: true}, redirect: {destination: '/sign-up'}
        }
    }

    return {
        props: {
            user
        }
    }
}
