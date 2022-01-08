import React from 'react';
import Link from "next/link";
import Navigation from "./Navigation";

const Header = ({show}) => (
    <header className={`fixed top-0 bottom-0 w-52 md:left-0 bg-white z-10 ${show ? "left-0" : "-left-52"}`}>
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
