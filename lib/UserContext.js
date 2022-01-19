import React, {useEffect, useState, createContext, useContext} from "react";
import {useRouter} from "next/router";

const UserContext = createContext({user: null, session: null});

export const UserContextProvider = (props) => {
    const router = useRouter()
    const {supabaseClient} = props;
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabaseClient.auth.session();

        setSession(session);
        setUser(session?.user ?? null);

        if(session) setCookie(session, "SIGNED_IN")

        const {data: authListener} = supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                if (event === "PASSWORD_RECOVERY") {
                    const accessToken = window.location.hash
                        .substring(1)
                        .split("&")
                        .find(key => key.startsWith("access_token"))
                        .split("=")[1]

                    router.push({
                        pathname: "/reset-password",
                        query: {accessToken}
                    });
                }

                if (event === "USER_UPDATED") {
                    setTimeout(() => router.push("/login"), 1000);
                }

                await setCookie(session, event)
            }
        );

        return () => {
            authListener.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        session,
        user,
    };
    return <UserContext.Provider value={value} {...props} />;
};

function setCookie(session, event) {
    fetch("/api/auth", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        credentials: "same-origin",
        body: JSON.stringify({event: event, session: session}),
    }).then((res) => res.json());
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserContextProvider.`);
    }
    return context;
};