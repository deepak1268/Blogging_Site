import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 min-h-screen"
          style={{
            backgroundImage: `url(https://imgs.search.brave.com/NpYc85ISgRmkeEzJjdtyqHNyyjQNwwGOiAOlAaNUxGk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibG9nZ2luZy1j/b25jZXB0LXdlYi1i/bG9nLXNvY2lhbC1t/ZWRpYS1pbmZvcm1h/dGlvbi1uZXR3b3Jr/LXNudWdseV8zMTk2/NS00OTc4ODAuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw)`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 text-white max-w-3xl container mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-yellow-500">Create a blog</span>
              <br />
              worth sharing
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#f5ebe0]">
              Share your thoughts, ideas, and stories with the world
            </p>

            <p className="mt-2 italic text-lg sm:text-xl font-semibold text-[#f5ebe0]">
              YOUR VOICE MATTERS!
            </p>

            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-block bg-white text-[#13315C] px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition"
              >
                Unleash Your Words
              </Link>
            </div>
          </div>
        </section>

        {/* How To Section */}
        <section className="bg-[#F2E9E4] py-20 min-h-screen flex justify-center items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            {/* Left Side */}
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug">
                How to create a blog
                <br />
                for free
              </h2>

              <p className="mt-6 text-base sm:text-lg md:text-xl font-medium">
                Follow these 4 steps to start building your blog today.
              </p>

              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
                >
                  Start Blogging
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="max-w-xl">
              <ol className="list-decimal pl-6 space-y-6 text-left">
                <li>
                  <span className="block font-semibold text-lg sm:text-xl">
                    Sign up for a free blog maker like Chai & Chatter.
                  </span>
                  <span className="block text-lg sm:text-xl">
                    Choose what kind of blog you want to create.
                  </span>
                </li>

                <li>
                  <span className="block font-semibold text-lg sm:text-xl">
                    Pick a blog name.
                  </span>
                  <span className="block text-lg sm:text-xl">
                    Let people know what your blog is all about.
                  </span>
                </li>

                <li>
                  <span className="block font-semibold text-lg sm:text-xl">
                    Write and publish your first post.
                  </span>
                  <span className="block text-lg sm:text-xl">
                    Launch with posts you're passionate about.
                  </span>
                </li>

                <li>
                  <span className="block font-semibold text-lg sm:text-xl">
                    Share your blog.
                  </span>
                  <span className="block text-lg sm:text-xl">
                    Gain new readers and promote your blog on social media.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#284b63] py-20 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#d9d9d9] font-semibold leading-tight max-w-4xl">
              Blog anytime, anywhere
              <br />
              your words, your way.
            </h2>

            <div className="mt-10">
              <Link
                to="/signup"
                className="inline-block bg-[#d9d9d9] text-[#13315C] text-lg px-6 py-3 rounded-full hover:opacity-75 transition font-medium"
              >
                Join the Conversation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
