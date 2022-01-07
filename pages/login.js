import React, {useState} from 'react';
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";
import {supabase} from "../lib/initSupabase";
import {useRouter} from "next/router";
import Message from "../components/Message";

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [magicLink, setMagicLink] = useState(false)
    const [magicEmail, setMagicEmail] = useState("")
    const [message, setMessage] = useState({})

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
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        } else {
            setTimeout(() => {
                router.push('/profile')
            }, 1000)
        }
    }

    async function loginWithMagicLink(e) {
        e.preventDefault()

        if (!magicEmail) return

        const {error, data} = await supabase.auth.signIn({email: magicEmail})

        if (error) {
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        } else {
            console.log('data', data)
            setMessage({message: "Login link has been sent", type: "success"})
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
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Login"}/>
            <div className={`md:w-1/2 mx-auto flex flex-col`}>

                {!forgotPassword &&
                    <div>
                        <p>Did you signed up with magic link? Login with your email again. You can set a new password in your profile.</p>
                        <div className={"my-2"}>
                            <input className={`w-10 scale-150`} type="checkbox" id="checkbox"
                                   onChange={() => setMagicLink(!magicLink)}/>
                            <label htmlFor="checkbox">Login with magic link ?</label>
                        </div>
                    </div>
                }

                {magicLink ?
                    <div>
                        <form className={`flex flex-col`}>
                            <input className={`my-1`} type="email" onChange={e => setMagicEmail(e.target.value)}
                                   placeholder={"Email"}/>
                            <button className={`primary mt-1`} onClick={loginWithMagicLink}>Login with email</button>
                        </form>
                    </div>
                    : forgotPassword ?

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
                            <button className={`primary mt-1`} type={"submit"}>Login</button>
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