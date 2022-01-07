import {useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {supabase} from "../lib/initSupabase";
import {useUser} from "../lib/UserContext";
import NavItem from "./NavItem";

const Navigation = () => {
    const {user} = useUser()
    const router = useRouter()
    const [showNav, setShowNav] = useState(false)

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <nav className={`px-5`}>
            <button className={`primary md:hidden`}
                    onClick={() => setShowNav(!showNav)}>
                {showNav ? "Close" : "Menu"}
            </button>
            <div className={"mb-2 mt-7 text-xs"}>
                <span>Menu</span>
            </div>
            <ul>
                <NavItem
                    href={"/"}
                    title={"Home"}
                />

                {user ?
                    <>
                        <NavItem
                            href={"/movie-slap"}
                            title={"Slap"}
                        />
                        <NavItem
                            href={"/watchlist"}
                            title={"Watchlist"}
                        />
                    </>
                    : null}

                <div className={"mb-2 mt-10 text-xs"}>
                    <span>Account</span>
                </div>
                {!user ?
                    <>
                        <NavItem
                            href={"/login"}
                            title={"Login"}
                        />
                        <NavItem
                            href={"/sign-up"}
                            title={"Sign Up"}
                        />
                    </>

                    :
                    <>
                        <li>
                            <ul>
                                <NavItem
                                    href={"/profile"}
                                    title={"Profile"}
                                />
                                <li>
                                    <button className={`text-mid text-sm hover:text-brand border-none outline-none p-0 m-0`} onClick={signOut}>Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </>
                }
            </ul>

            <div className={"mb-2 mt-10 text-xs text-mi"}>
                <span>Service</span>
            </div>
            <ul>
                <NavItem
                    href={"/feedback"}
                    title={"Feedback"}
                />
            </ul>
        </nav>
    );
};

Navigation.propTypes = {};

export default Navigation;
