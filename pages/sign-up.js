import React, {useState} from 'react';
import {supabase} from "../supabase";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    async function signIn() {
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

    if (submitted) {
        return (
            <div>
                <h1>Please check your email to sign in</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <input
                type="text"
                onChange={e => setEmail(e.target.value)}
            />

            <button onClick={signIn}>Sign In</button>
        </div>
    );
};

export default SignUp;
