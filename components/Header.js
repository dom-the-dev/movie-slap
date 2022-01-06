import React from 'react';
import Link from "next/link";
import {supabase} from "../supabase";
import {useRouter} from "next/router";
import Navigation from "./Navigation";

const Header = ({authenticatedState}) => {

    return (
        <header className={`bg-dark`}>
            <div className={`container flex justify-between items-center mx-auto px-2`}>

                <div className={`text-brand rounded p-2 tracking-wider font-bold hover:text-white`}>
                    <Link href="/">
                        <a>Movie Slap</a>
                    </Link>
                    <span className={`text-white font-light`}>{" "}beta</span>
                </div>

                <Navigation authenticatedState={authenticatedState}/>
            </div>
        </header>
    );
};

export default Header;
