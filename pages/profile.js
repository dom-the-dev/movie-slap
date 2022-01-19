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
            console.error(error)
        }

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
                console.error(error)
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
            console.error(error)
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

            <div className={`md:w-1/2 mx-auto`}>
                <form onSubmit={handleSubmit} className={`mb-10`}>

                    <div className={`text-center`}>

                    {avatarUrl ?
                        <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}${avatarUrl}`}
                               alt="Avatar"
                               width={150}
                               height={150}
                               className={`rounded-3xl`}
                        />
                        :
                        "No Avatar"
                    }
                    </div>

                    <div className={"mb-2"}>
                        <label
                            className={"font-bold text-xs ml-5 text-brand"}
                            htmlFor="avatar">
                            Upload image
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            id="avatar"
                            name="avatar"
                            className={"block border-none"}
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </div>

                    <div className={"mb-2 relative"}>
                        <label
                            className={"font-bold text-xs ml-5 text-brand"}
                            htmlFor="username">
                            Username
                        </label>
                        <input type="text"
                               value={username}
                               className={`block w-full`}
                               placeholder={"Username"}
                               onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={"mb-2 relative"}>
                        <label
                            className={"font-bold text-xs ml-5 text-brand"}
                            htmlFor="username"
                        >
                            Website
                        </label>
                        <input type="text"
                               value={website}
                               placeholder={"Website"}
                               className={`block w-full`}
                               onChange={e => setWebsite(e.target.value)}
                        />
                    </div>

                    <button className={"primary w-full"} type={"submit"}>Save Profile</button>
                </form>

                <div className={`mt-4 mb-6`}>
                    <input
                        id="pass"
                        name="pass"
                        type="checkbox"
                        className={`ml-2 mr-5 scale-150  cursor-pointer`}
                        value={!changePassword ? "checked" : ""}
                        onChange={() => setChangePassowrd(!changePassword)}
                    />
                    <label htmlFor="pass" className={`cursor-pointer`}>Do you want so change your password?</label>
                </div>

                {changePassword &&
                    <>
                        <h4
                            className={"font-bold text-xs ml-5 text-brand"}>Set new password</h4>
                        <form onSubmit={updatePassword} className={`flex flex-col`}>
                            <input className={`mb-2`}
                                   type="password"
                                   placeholder={"New Password"}
                                   onChange={e => setNewpassword(e.target.value)}
                            />
                            <input className={`mb-2`}
                                   type="password"
                                   placeholder={"Confirm Password"}
                                   onChange={e => setConfirmNewPassword(e.target.value)}
                            />
                            <button type={"submit"} className={`primary mt-0`}>Change Password</button>
                        </form>
                    </>
                }
            </div>
        </Layout>
    );
};

export default Profile;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        await supabase.auth.signOut()
        return {
            props: {}, redirect: {destination: '/login'}
        }
    }

    return {
        props: {
            user
        }
    }
}
