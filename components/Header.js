import React from 'react';
import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => (
    <header className={`fixed top-0 bottom-0 w-52 border-r-2`}>
            <div className={`text-brand pl-5 pt-7 tracking-wider text-xl`}>
                <Link href="/">
                    <a className={`hover:text-dark hover:no-underline uppercase`}>Movie Slap</a>
                </Link>
                <span className={`text-xs text-mid font-light`}>{" "}beta</span>
            </div>

            <Navigation/>
    </header>
);

export default Header;
