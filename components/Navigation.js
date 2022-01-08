import {useState} from 'react';
import {useUser} from "../lib/UserContext";
import NavItem from "./NavItem";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { FaRegHandRock } from "react-icons/fa";
import { BsEyeglasses, BsPlusCircle } from "react-icons/bs";
import { CgProfile, CgLogOut, CgLogIn } from "react-icons/cg";
import {RiFeedbackLine} from "react-icons/ri";

const Navigation = () => {
    const {user} = useUser()

    return (
        <nav className={`px-5`}>
            <div className={"mb-2 mt-7 text-xs"}>
                <span>Menu</span>
            </div>
            <ul>
                <NavItem
                    href={"/search"}
                    title={"Search"}
                    icon={<AiOutlineSearch/>}
                />
                <NavItem
                    href={"/"}
                    title={"Home"}
                    icon={<AiOutlineHome/>}
                />

                {user ?
                    <>
                        <NavItem
                            href={"/movie-slap"}
                            title={"Slap"}
                            icon={<FaRegHandRock/>}
                        />
                        <NavItem
                            href={"/watchlist"}
                            title={"Watchlist"}
                            icon={<BsEyeglasses/>}
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
                            icon={<CgLogIn/>}
                        />
                        <NavItem
                            href={"/sign-up"}
                            title={"Sign Up"}
                            icon={<BsPlusCircle/>}
                        />
                    </>

                    :
                    <>
                        <NavItem
                            href={"/profile"}
                            title={"Profile"}
                            icon={<CgProfile/>}
                        />
                        <NavItem
                            href={"/sign-out"}
                            title={"Logout"}
                            icon={<CgLogOut/>}
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
                    icon={<RiFeedbackLine/>}
                />
            </ul>
        </nav>
    );
};

Navigation.propTypes = {};

export default Navigation;
