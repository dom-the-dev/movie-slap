import React from 'react';
import Link from "next/link";

const Header = ({authenticatedState}) => {
    return (
        <header className={`bg-dark`}>
            <div className={`container flex justify-between items-center mx-auto`}>
                <div className={`text-brand rounded p-2 tracking-wider font-bold hover:text-white`}>
                    <Link href="/">
                        <a>Movie Slap</a>
                    </Link>
                </div>
                <nav className={`py-2 tracking-wider font-bold`}>
                    <ul className={`flex text-white`}>
                        <li>
                            <Link href="/">
                                <a>
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/feedback">
                                <a>
                                    Feedback
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/styleguide">
                                <a>
                                    Styleguide
                                </a>
                            </Link>
                        </li>

                        {!authenticatedState ?
                            <li>
                                <Link href="/sign-up">
                                    <a>
                                        Sign Up
                                    </a>
                                </Link>
                            </li>
                            :
                            <>
                                <li>
                                    <Link href="/movie-slap">
                                        <a>
                                            Slap
                                        </a>
                                    </Link>
                                </li>
                                <li className={`group relative pr-0`}>
                                    Account
                                    <ul className={"hidden group-hover:block absolute bg-mid rounded"}>
                                        <li>
                                            <Link href="/profile">
                                                <a>
                                                    Profile
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/watchlist">
                                                <a>
                                                    Watchlist
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
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
