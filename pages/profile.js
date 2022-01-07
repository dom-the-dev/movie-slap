import {useEffect, useState} from "react";
import {supabase} from "../lib/initSupabase";
import Image from "next/image";
import SimpleHeader from "../components/SimpleHeader";
import Layout from "../components/Layout";


const Profile = ({user}) => {
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

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

        if (data) {
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
            setMessage("Profile has been updated!")
        }

    }

    async function removeCookie() {
        await fetch("/api/remove", {
            method: "GET",
            credentials: "same-origin"
        })
    }

    return (
        <Layout title={"Profile"}>
            <SimpleHeader text={"Profile"}/>

            <button className="primary" onClick={removeCookie}>Clear cookie</button>

            <form onSubmit={handleSubmit} className={"form-wrapper"}>

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
