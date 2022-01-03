import React from 'react';
import {supabase} from "../supabase";

const Watchlist = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Your watchlist</h1>
        </div>
    );
};

export default Watchlist;

export async function getServerSideProps({req}) {
    const {user}  = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return {props: {}, redirect: {destination: '/sign-up'}}
    }

    return {
        props: {
            user
        }
    }
}
