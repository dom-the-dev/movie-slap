import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={`bg-dark p-10 text-white absolute left-0 right-0 z-10 pb-20`}>
            <div className={`container`}>
                <div className={`grid gap-10 md:grid-cols-3`}>
                    <div>
                        Legal:
                        <ul>
                            <li>
                                <Link href="/privacy-policy">
                                    <a>Privacy Policy</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service">
                                    <a>Terms of Service</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookie-policy">
                                    <a>Cookie Policy</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/use-policy">
                                    <a>Acceptable Use Policy</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={`flex-col`}>
                        <p>

                            This product uses the TMDB API but is not endorsed or certified by TMDB.
                        </p>
                            <a href="https://www.themoviedb.org/" target={"_blank"} rel={"noreferrer noopener"}>
                                <Image
                                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                                alt="Vercel Logo" width={110} height={50} title={"The Movie Database"}/>
                            </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
