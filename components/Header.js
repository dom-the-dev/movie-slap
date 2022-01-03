import React from 'react';
import Link from "next/link";

const Header = ({authenticatedState}) => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>

                    {!authenticatedState ?
                        <li>
                            <Link href="/sign-up">
                                <a>Sign Up</a>
                            </Link>
                        </li>
                        :
                        <>
                            <li>
                                <Link href="/profile">
                                    <a>Profile</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/watchlist">
                                    <a>Watchlist</a>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;