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
            {/*Start cookieyes banner */}
            <Script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/e599800c05df36d09128c5c3/script.js"/>

            {/*Google AdSense*/}
            <Script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2509351820718317"
                    crossOrigin="anonymous"
            />
            {/*Google Analytics*/}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <Component {...pageProps} />
        </UserContextProvider>
    )
}

export default MyApp
