import React from 'react';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={`bg-dark p-10 text-white`}>
            <div className={`container mx-auto flex justify-between items-center`}>
                <div>
                    Handcrafted by <a
                        href="https://domthedev.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"text-brand"}
                    >
                        Dom the dev
                    </a>
                </div>

                <div className={`flex justify-between items-center`}>
                    Movie data powered by <Image
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                        alt="Vercel Logo" width={72} height={16}/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
