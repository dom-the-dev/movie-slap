import React, {useState} from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {GiHamburgerMenu} from "react-icons/gi";
import {GoX} from "react-icons/go";

const Layout = ({children, title}) => {
    const [showNav, setShowNav] = useState(false)

    return (
        <div>
            <Head>
                <title>{title} | Movie Slap</title>
                <meta name="description" content="Movie Application, to create and share your watchlist"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div>
                <Header setShow={setShowNav} show={showNav}/>
                <button className={`primary md:hidden fixed z-20 bottom-7 left-5`}
                        onClick={() => setShowNav(!showNav)}>
                    {showNav ?
                        <>
                            <GoX/>
                            <div className="sr-only">Close</div>
                        </>
                        :
                        <>
                            <GiHamburgerMenu/>
                            <div className="sr-only">Menu</div>
                        </>
                    }
                </button>
            </div>

            <main className={`px-8 md:pl-60 mt-7 min-h-screen pb-20`}>
                <div className={`container`}>
                    {children}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;
