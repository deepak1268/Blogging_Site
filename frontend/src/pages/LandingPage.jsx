import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"

export const LandingPage = () => {
    return (
        <div>
            <Header></Header>

            <div className="bg-[#4A4E69] bg-cover bg-no-repeat bg-center h-220 flex flex-col justify-center items-center" style={{backgroundImage: `url(https://imgs.search.brave.com/NpYc85ISgRmkeEzJjdtyqHNyyjQNwwGOiAOlAaNUxGk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibG9nZ2luZy1j/b25jZXB0LXdlYi1i/bG9nLXNvY2lhbC1t/ZWRpYS1pbmZvcm1h/dGlvbi1uZXR3b3Jr/LXNudWdseV8zMTk2/NS00OTc4ODAuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw)`}}>
                <div className="absolute inset-0 bg-black opacity-50 h-240"></div>
                <div className="relative text-white text-8xl font-semibold mt-18">
                    <div className="text-yellow-500">
                        Create a blog
                    </div>
                    <div>
                        worth sharing
                    </div>
                </div>
                
                <div className="relative text-[#f5ebe0] font-semibold mt-8 text-xl">
                    Share your thoughts, ideas, and stories with the world 
                </div>
                <br />
                <div className="relative text-[#d5bdaf] text-xl font-medium italic">
                    YOUR VOICE MATTERS!
                </div>
                <div className="relative mt-8 bg-white text-[#13315C] text-xl w-40 h-14 flex justify-center items-center rounded-4xl font-medium hover:bg-gray-300">
                    <Link to='/signup'>
                        Start Blogging
                    </Link>  
                </div>
            </div>

            <div className="bg-[#F2E9E4] h-198 flex justify-between items-center"> 
                <div className="flex flex-col ml-30">
                    <div className="text-5xl font-semibold mb-4">
                        How to
                    </div>
                    <div className="text-5xl font-semibold mb-4">
                        create a blog
                    </div>
                    <div className="text-5xl font-semibold mb-4">
                        for free
                    </div>
                    <div className="mt-15 text-lg font-medium">
                        Follow these 4 steps to start
                        <br />
                        building your blog today.
                    </div>
                    <div className="bg-black text-white mt-10 rounded-4xl h-14 w-38 flex justify-center items-center hover:bg-gray-800">
                        <Link to='/signup'>
                            Start Blogging
                        </Link>
                    </div>
                </div>
                <div className="mr-30">
                    <ol className="list-decimal pl-6">
                        <li>
                            <span className="font-semibold text-lg">
                                Sign up for a free blog maker like The Daily Blog.
                            </span>
                            <span className="text-lg">
                                Choose what kind of block you want to create.
                            </span>
                        </li>
                        <br />
                        <li>
                            <span className="font-semibold text-lg">
                                Pick a blog name.
                            </span>
                            <span className="text-lg">
                                Let people know what your blog is all about.
                            </span>
                        </li>
                        <br />
                        <li>
                            <span className="font-semibold text-lg">
                                Write and publish your first post.
                            </span>
                            <span className="text-lg">
                                Launch with posts you're passionate about.
                            </span>
                        </li>
                        <br />
                        <li>
                            <span className="font-semibold text-lg">
                                Share your blog.
                            </span>
                            <span className="text-lg">
                                Gain new readers and promote your blog on social media.
                            </span>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="bg-[#C9ADA7] h-198 flex flex-col justify-center items-center">
                <div className="text-8xl text-[#014151]">
                    Blog anytime, anywhere
                    <br />
                    your words, your way.
                </div>
                <div className="text-2xl text-white bg-[#014151] mt-16 w-50 h-18 flex justify-center items-center rounded-4xl hover:opacity-75">
                    <Link>
                        Start Blogging 
                    </Link>
                </div>
            </div>

            <Footer></Footer>

        </div>
    )
}