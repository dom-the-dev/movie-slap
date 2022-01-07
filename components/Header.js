import React from 'react';
import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => (
    <header className={`bg-dark`}>
        <div className={`container flex justify-between items-center mx-auto px-2`}>

            <div className={`text-brand rounded p-2 tracking-wider font-bold`}>
                <Link href="/">
                    <a className={`hover:text-white`}>Movie Slap</a>
                </Link>
                <span className={`text-white font-light`}>{" "}beta</span>
            </div>

            <Navigation/>
        </div>
    </header>
);

export default Header;
