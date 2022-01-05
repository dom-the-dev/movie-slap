import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children, authenticatedState}) => {
    return (
        <div>
            <Head>
                <title>Movie Slap (beta)</title>
                <meta name="description" content="Movie Application, to create and share your watchlist"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header authenticatedState={authenticatedState}/>

            <main className={`mx-auto container min-h-screen`}>
                {children}
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;
