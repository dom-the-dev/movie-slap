import React, {useState} from 'react';
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";
import {supabase} from "../lib/initSupabase";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)

    const [forgotEmail, setForgotEmail] = useState("")

    async function signIn(e) {
        e.preventDefault()
        setIsSubmitting(true)
        if (!email) return

        const {error, data} = await supabase.auth.signIn({
            email,
            password
        })

        if (error) {
            console.log({error})
        } else {
            router.push('/profile')
        }
    }

    async function requestRest(e) {
        e.preventDefault()

        const {data, error} = supabase.auth.api.resetPasswordForEmail(forgotEmail)

        if (error) {
            console.error(error)
        }
        console.log(data)
    }

    return (
        <Layout title={"Login"}>
            <SimpleHeader text={"Login"}/>
            <div className={`md:w-1/2 mx-auto flex flex-col`}>
                {forgotPassword ?
                    <form onSubmit={requestRest} className={`flex flex-col`}>
                        <input type="email" placeholder={"Email"} onChange={(e) => setForgotEmail(e.target.value)}/>
                        <button className={`primary mt-1`} type={"submit"}>Reset Password</button>
                    </form>
                    :
                    <form onSubmit={signIn} className={`flex flex-col`}>
                        <input
                            className={`border-2 my-1`}
                            type="text"
                            required
                            placeholder={"Email"}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className={`border-2 my-1`}
                            required
                            type="password"
                            placeholder={"Password"}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className={`primary mt-1`} type={"submit"}>Send</button>
                    </form>
                }
                <button className={`secondary mt-10`} onClick={() => setForgotPassword(!forgotPassword)}>
                    {!forgotPassword ? "Forgot Password?" : "Back to login"}
                </button>
            </div>
        </Layout>
    );
};

export default Login;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (user) return {props: {}, redirect: {destination: '/profile'}}

    return {
        props: {
            logout: true
        }
    }
}