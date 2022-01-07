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

            <main className={`pl-60 mt-7 min-h-screen`}>
                {children}
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;
