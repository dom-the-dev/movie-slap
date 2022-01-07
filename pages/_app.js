import '../styles/globals.scss'
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
