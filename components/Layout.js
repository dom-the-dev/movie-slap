import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children, title}) => {
    return (
        <div>
            <Head>
                <title>{title} | Movie Slap</title>
                <meta name="description" content="Movie Application, to create and share your watchlist"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            <main className={`pl-60 pr-8 mt-7 min-h-screen pb-20`}>
                <div className={`container`}>
                    {children}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;
