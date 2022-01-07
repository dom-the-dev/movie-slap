import {useState} from 'react';
import {useUser} from "../lib/UserContext";
import NavItem from "./NavItem";

const Navigation = () => {
    const {user} = useUser()
    const [showNav, setShowNav] = useState(false)

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
                    href={"/search"}
                    title={"Search"}
                />
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
                        <NavItem
                            href={"/profile"}
                            title={"Profile"}
                        />
                        <NavItem
                            href={"/sign-out"}
                            title={"Logout"}
                        />
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
