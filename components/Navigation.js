import {useState} from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import {useRouter} from "next/router";
import {supabase} from "../supabase";

const Navigation = ({authenticatedState}) => {
    const router = useRouter()
    const [showNav, setShowNav] = useState(false)

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/sign-up')
    }

    return (
        <nav className={`py-2 tracking-wider md:font-bold flex`}>
            <button className={`primary md:hidden`}
                    onClick={() => setShowNav(!showNav)}>
                {showNav ? "Close" : "Menu"}
            </button>
            <ul className={`items-center text-white ${showNav ? "fixed right-0 top-10 bottom-0 bg-dark z-10 pt-5" : "hidden"} md:pt-0 md:static md:flex`}>
                <li className={`mb-2 md:mb-0`}>
                    <Link href="/">
                        <a className={`p-2 hover:text-brand`}>
                            Home
                        </a>
                    </Link>
                </li>
                <li className={`mb-2 md:mb-0`}>
                    <Link href="/feedback">
                        <a className={`p-2 hover:text-brand`}>
                            Feedback
                        </a>
                    </Link>
                </li>

                {!authenticatedState ?
                    <li className={`mb-2 md:mb-0`}>
                        <Link href="/sign-up">
                            <a className={`p-2 hover:text-brand`}>
                                Sign Up
                            </a>
                        </Link>
                    </li>
                    :
                    <>
                        <li className={`mb-2 md:mb-0`}>
                            <Link href="/movie-slap">
                                <a className={`p-2 hover:text-brand`}>
                                    Slap
                                </a>
                            </Link>
                        </li>
                        <li className={`mb-2 md:mb-0 group relative md:pr-0 cursor-pointer`}>
                            <span className={`hidden md:block p-2`}>Account</span>
                            <ul className={"md:hidden md:group-hover:block md:absolute top-5 bg-dark rounded md:p-2"}>
                                <li className={`mb-2 md:mb-0`}>
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
    );
};

Navigation.propTypes = {};

export default Navigation;
