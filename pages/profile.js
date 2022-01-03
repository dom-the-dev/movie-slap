import {useEffect, useState} from "react";
import {supabase} from "../supabase";
import {useRouter} from "next/router";


const Profile = () => {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        const profileData = await supabase.auth.user()
        if (!profileData) {
            router.push('/sign-up')
        } else {
            setProfile(profileData)
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/sign-up')
    }

    if (!profile) return null

    return (
        <div>
            {profile.id}
            {profile.email}
            <button onClick={signOut}>Sign out</button>
        </div>
    );
};

export default Profile;
