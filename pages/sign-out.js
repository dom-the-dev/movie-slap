import React from 'react';
import SimpleHeader from "../components/SimpleHeader";
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import {useRouter} from "next/router";

const SignOut = () => {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <Layout title={"Sign Out"}>
            <SimpleHeader text={"Logout"}/>
            <div className={`text-center`}>
                <p>Are you sure you want to log out?</p>
                <button className={`primary`} onClick={signOut}>Logout</button>
            </div>
        </Layout>
    );
};

export default SignOut;
