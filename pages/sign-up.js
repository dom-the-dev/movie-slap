import React, {useState, useEffect} from 'react';
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import Message from "../components/Message";
import SimpleHeader from "../components/SimpleHeader";

const SignUp = ({logout}) => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if(logout) {
            signOut()
        }
    }, [])

    async function signOut() {
        await supabase.auth.signOut()
    }

    async function signIn(e) {
        e.preventDefault()
        if (!email) return

        const {error, data} = await supabase.auth.signIn({
            email
        })

        if (error) {
            console.log({error})
        } else {
            setSubmitted(true)
        }
    }

    return (
        <Layout title={"Sign Up"}>
            {submitted && <Message message={"Please check your email to sign in"} type={"success"}/>}

            <SimpleHeader text={"Sign Up"}/>

            {!isSubmitting &&
                <form onSubmit={signIn} className={`flex flex-col`}>
                    <input
                        className={`border-2`}
                        type="text"
                        placeholder={"Email"}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button className={`primary`} type={"submit"}>Send</button>
                </form>
            }
        </Layout>
    );
};

export default SignUp;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (user) return {props: {}, redirect: {destination: '/profile'}}

    return {
        props: {
            logout: true
        }
    }
}

