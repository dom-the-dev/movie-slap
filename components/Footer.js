import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={`bg-dark p-10 text-white absolute left-0 right-0 z-10 pb-20`}>
            <div className={`container mx-auto flex justify-between items-center`}>
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

                <div className={`flex justify-between items-center`}>
                    Movie data powered by <a href="https://www.themoviedb.org/"><Image
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                    alt="Vercel Logo" width={72} height={16} title={"The Movie Database"}/>
                </a>
                </div>
            </div>
            <div className={`bg-white absolute left-0 right-0 bottom-0 text-center text-dark p-3 text-sm h-10`}>
                Handcrafted by <a
                href="https://domthedev.com"
                target="_blank"
                rel="noopener noreferrer"
                className={"text-brand"}
            >
                Dom the dev
            </a>
            </div>
        </footer>
    );
};

export default Footer;
