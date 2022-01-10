import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";
import {supabase} from "../lib/initSupabase";
import {useRouter} from "next/router";
import Message from "../components/Message";
import Link from "next/link";

const Login = ({logout}) => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [forgotPassword, setForgotPassword] = useState(false)
    const [magicLink, setMagicLink] = useState(false)
    const [magicEmail, setMagicEmail] = useState("")
    const [message, setMessage] = useState({})
    const [forgotEmail, setForgotEmail] = useState("")

    useEffect(() => {
        if (logout) {
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
            email,
            password
        })

        if (error) {
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        }

        if (data) {
            setTimeout(() => {
                router.push('/profile')
            }, 500)
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
            setMessage({message: "Login link has been sent", type: "success"})
            setMagicEmail("")
            setMagicLink(false)
        }
    }

    async function requestReset(e) {
        e.preventDefault()

        const {data, error} = await supabase.auth.api.resetPasswordForEmail(forgotEmail)

        if (error) {
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        }

        if (data) {
            setMessage({message: "Password reconvery link has been sent.", type: "success"})
        }
    }

    return (
        <Layout title={"Login"}>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={forgotPassword ? "Reset password" : "Login"}/>
            <div className={`md:w-1/2 mx-auto flex flex-col`}>

                {!forgotPassword &&
                    <div className={`mb-10`}>
                        <p>Did you signed up with magic link? Login with your email again. You can set a new password in
                            your profile.</p>
                        <div className={"my-2"}>
                            <input className={`ml-2 mr-5 scale-150  cursor-pointer`} type="checkbox" id="checkbox"
                                   onChange={() => setMagicLink(!magicLink)}/>
                            <label htmlFor="checkbox" className={`cursor-pointer`}>Login with magic link?</label>
                        </div>
                    </div>
                }

                {magicLink && !forgotPassword &&
                    <div>
                        <form className={`flex flex-col`}>
                            <input className={`my-1`} type="email" onChange={e => setMagicEmail(e.target.value)}
                                   placeholder={"Email"}/>
                            <button className={`primary mt-2`} onClick={loginWithMagicLink}>Send Magic Link</button>
                        </form>
                    </div>
                }


                {forgotPassword ?
                    <form onSubmit={requestReset} className={`flex flex-col`}>
                        <input type="email" placeholder={"Email"} onChange={(e) => setForgotEmail(e.target.value)}/>
                        <button className={`primary mt-2`} type={"submit"}>Reset Password</button>
                    </form>
                    :
                    !magicLink &&
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
                <p className={`text-center cursor-pointer hover:underline text-brand secondary mt-10`}
                   onClick={() => setForgotPassword(!forgotPassword)}>
                    {!forgotPassword ? "Forgot Password?" : "Back to login"}
                </p>
            </div>

            <div className={`text-center my-5`}>
                Don&apos;t have an account? <Link href={"/sign-up"}><a>Create Account</a></Link>
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