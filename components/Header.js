import React from 'react';
import Link from "next/link";
import {supabase} from "../supabase";
import {useRouter} from "next/router";

const Header = ({authenticatedState}) => {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/sign-up')
    }

    return (
        <header className={`bg-dark`}>
            <div className={`container flex justify-between items-center mx-auto`}>

                <div className={`text-brand rounded p-2 tracking-wider font-bold hover:text-white`}>
                    <Link href="/">
                        <a>Movie Slap</a>
                    </Link>
                    <span className={`text-white font-light`}>{" "}beta</span>
                </div>

                <nav className={`py-2 tracking-wider font-bold`}>
                    <ul className={`flex items-center text-white`}>
                        <li>
                            <Link href="/">
                                <a className={`p-2 hover:text-brand`}>
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/feedback">
                                <a className={`p-2 hover:text-brand`}>
                                    Feedback
                                </a>
                            </Link>
                        </li>

                        {!authenticatedState ?
                            <li>
                                <Link href="/sign-up">
                                    <a className={`p-2 hover:text-brand`}>
                                        Sign Up
                                    </a>
                                </Link>
                            </li>
                            :
                            <>
                                <li>
                                    <Link href="/movie-slap">
                                        <a className={`p-2 hover:text-brand`}>
                                            Slap
                                        </a>
                                    </Link>
                                </li>
                                <li className={`group relative pr-0 cursor-pointer`}>
                                    Account
                                    <ul className={"hidden group-hover:block absolute top-5 bg-dark rounded p-2"}>
                                        <li>
                                            <Link href="/profile">
                                                <a className={`p-2 hover:text-brand`}>
                                                    Profile
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/watchlist">
                                                <a className={`p-2 hover:text-brand`}>
                                                    Watchlist
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button className={`ml-2`} onClick={signOut}>Sign out</button>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
