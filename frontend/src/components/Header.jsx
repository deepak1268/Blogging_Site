import { Link } from "react-router-dom";

export const Header = () => {
    

    return (
        <header className="h-18 sticky z-50 top-0 shadow bg-white">
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <div className="text-3xl pt-3 pl-4 font-semibold">
                        <Link to='/'>
                            The Daily Blog
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center mr-5 mt-3">
                    <div className="mr-3 hover:text-blue-300 hover:underline">
                        <Link to="/login">Log In</Link>
                    </div>
                    <div className="bg-blue-600 rounded-3xl text-[#d1e1fb] p-2 w-35 text-center hover:bg-blue-500">
                        <Link to="/signup">Get Started</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
