import React, {useState, useEffect} from 'react';
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import Message from "../components/Message";
import SimpleHeader from "../components/SimpleHeader";
import Link from "next/link";
import {AiFillGoogleCircle} from "react-icons/ai";

const SignUp = ({logout}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState({})

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
        if (!password) return

        const {error, data} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        } else {
            setMessage({message: "Confirmation link has beent sent", type: "success"})
            setEmail("")
            setPassword("")
        }
    }


    async function signInWithGoogle(e) {
        e.preventDefault()
        const {user, session, error} = await supabase.auth.signIn({
            provider: 'google',
        })

        if (error) {
            console.error(error)
            setMessage({message: error.message ? error.message : "Something went wrong", type: "error"})
        }

        if (user) {
            setTimeout(() => {
                router.push('/profile')
            }, 500)
        }
    }


    return (
        <Layout title={"Sign Up"}>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Sign Up"}/>

            {message.type === "success" ? null :
                <form onSubmit={signIn} className={`flex flex-col md:w-1/2 mx-auto`}>
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

                    <label htmlFor="terms">I accept the <Link href="/terms-of-service"><a>terms of
                        service</a></Link> and the <Link href={"/privacy-policy"}><a>privacy policy</a></Link></label>
                    <input type="checkbox" id="terms" name={"terms"} required/>

                    <button className={`primary mt-1`} type={"submit"}>Send</button>
                </form>
            }

            <form className={`flex flex-col md:w-1/2 mx-auto`}>
                <button className={`secondary mt-2 flex justify-center items-center`} onClick={signInWithGoogle}>
                    <span className={`mr-3 text-2xl`}><AiFillGoogleCircle/></span> Sign up with Google
                </button>
            </form>

            <div className={`text-center my-5`}>
                Do you have an account? <Link href={"/login"}><a>Login</a></Link>
            </div>
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

