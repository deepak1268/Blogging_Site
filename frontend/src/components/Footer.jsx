import { Link } from "react-router-dom";
import { LinkedIn, Twitter, Github, Copyright } from "./Icons";

export const Footer = () => {
    return (
        <footer className="h-18 bg-[#000000] flex justify-between items-center pl-4 pr-10 ">
            <div className="flex gap-4 text-white">
                <a href="https://www.linkedin.com/in/deepak-aggarwal-a6622a31a/" target="_blank" className="hover:opacity-75 p-2 rounded-4xl">
                    <LinkedIn />
                </a>
                <a href="https://github.com/deepak1268" target="_blank" className="hover:opacity-75 p-2 rounded-4xl">
                    <Github />
                </a>
                <a href="https://x.com/deepakagg2006" target="_blank" className="hover:opacity-75 p-2 rounded-4xl">
                    <Twitter />
                </a>
            </div>
            <div className="flex gap-2 text-white">
                <Copyright />
                <p>2025 Chai & Chatter. All rights reserved</p>
            </div>
        </footer>
    );
};
