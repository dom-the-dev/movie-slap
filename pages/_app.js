import '../styles/globals.scss'
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import {supabase} from "../lib/initSupabase";
import {UserContextProvider} from "../lib/UserContext";

function MyApp({Component, pageProps}) {
    return (
        <UserContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </UserContextProvider>
    )
}

export default MyApp
