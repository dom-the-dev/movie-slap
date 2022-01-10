import React, {useState, useEffect} from 'react';
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";
import {supabase} from "../lib/initSupabase";
import {useRouter, withRouter} from "next/router";
import Message from "../components/Message"

const ResetPassword = ({router}) => {
    const accessToken = router.query.accessToken
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    async function updatePassword(e) {
        e.preventDefault()

        const {error, data} = await supabase.auth.api
            .updateUser(accessToken, {password: newPassword})
        if (error) {
            console.error(error)
            setError(true)
        }

        if (data) {
            setSuccess(true)
        }
    }

    return (
        <Layout title={"Reset Password"}>
            {success && <Message message={"New password set!"} type={"success"}/>}
            {error && <Message message={"Something went wrong"} type={"error"}/>}
            <SimpleHeader text={"Reset your password"}/>
            {!success &&
                <form onSubmit={updatePassword}>
                    <input type="password" placeholder={"New password"} onChange={e => setNewPassword(e.target.value)}/>
                    <button type={"submit"}>Reset</button>
                </form>
            }
        </Layout>
    );
};

export default withRouter(ResetPassword);
