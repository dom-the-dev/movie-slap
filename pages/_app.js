import '../styles/globals.scss'
import {useState, useEffect} from "react";
import {supabase} from "../supabase";
import {useRouter} from "next/router";
import Layout from "../components/Layout";

function MyApp({Component, pageProps}) {
    const [authenticatedState, setAuthenticatedState] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            handleAuthChange(event, session)
            if (event === 'SIGNED_IN') {
                setAuthenticatedState(true)
                router.push("/profile")
            }
            if (event === 'SIGNED_OUT') {
                setAuthenticatedState(false)
            }
        })
        checkUser()
        return () => {
            authListener.unsubscribe
        }
    }, [])

    async function checkUser() {
        const user = await supabase.auth.user()
        if (user) {
            setAuthenticatedState(true)
        }
    }

    async function handleAuthChange(event, session) {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            body: JSON.stringify({event, session})
        })
    }

    return (
        <Layout authenticatedState={authenticatedState}>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
