import {useEffect} from "react";
import '../styles/globals.scss'
import "../components/movieCard.css"
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import {supabase} from "../lib/initSupabase";
import {UserContextProvider} from "../lib/UserContext";
import * as gtag from "../lib/gtag"
import {useRouter} from "next/router";
import Script from "next/script";

function MyApp({Component, pageProps}) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events]);

    return (
        <UserContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </UserContextProvider>
    )
}

export default MyApp
