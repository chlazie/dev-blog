"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 h-screen relative">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold mb-4">
              Join the Developer Community
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Share your knowledge, learn from peers, and grow together in the
              DevHood community. Write articles, join discussions, and help
              fellow developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition font-semibold text-center"
              >
                Join DevHood Today
              </Link>
              <Link
                href="/contribute"
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl hover:bg-orange-50 transition font-semibold text-center"
              >
                Contribute Articles
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center relative">
            {/* Desktop screenshot */}
            <Image
              src="/image.png"
              alt="App Screenshot"
              width={500}
              height={350}
              className="rounded-2xl shadow-xl"
            />
            {/* Mobile screenshot */}
            <Image
              src="/appview.jpeg"
              alt="App Mobile Screenshot"
              width={200}
              height={400}
              className="absolute bottom-0 right-0 -translate-x-12 rounded-2xl shadow-lg"
            />
          </div>

          {/* Curved Divider */}
          <div className="absolute -bottom-32 left-0 right-0 h-32 overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-slate-100"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-slate-100"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-slate-50"
              ></path>
            </svg>
          </div>
        </section>

        {/* The rest of your sections will now flow smoothly after the curve */}
        {/* Email Subscription Section */}
        <section className="bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 rounded-3xl p-12 text-center relative overflow-hidden mt-32">
          {/* ... your email section content ... */}
        </section>

        {/* Email Subscription Section */}
        <section className="bg-linear-to-br from-slate-800 via-blue-900/20 to-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl"></div>

          {/* Content container with relative positioning */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Stay in the Loop
            </h2>
            <p className="text-slate-700 mb-8 max-w-2xl mx-auto font-medium">
              Get the latest developer articles, community updates, and coding
              resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-white/50 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/90 transition-all placeholder-slate-500"
              />
              <button className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-4 font-medium">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Join DevHood?</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            We're building more than just a blog - we're creating a space where
            developers can truly collaborate and grow together.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Share Your Knowledge
              </h3>
              <p className="text-slate-500">
                Write articles, share tutorials, and help other developers learn
                from your experience.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <p className="text-slate-500">
                Connect with developers worldwide, get feedback on your code,
                and collaborate on projects.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
              <p className="text-slate-500">
                Get help with coding challenges, career advice, and stay updated
                with modern technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Thousands of developers are already sharing knowledge and helping
            each other grow. Don't miss out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition font-semibold"
            >
              Join DevHood Today - It's Free
            </Link>
            <Link
              href="/contribute"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition font-semibold"
            >
              Start Writing Articles
            </Link>
          </div>
        </section>

        {/* Optional: Featured Posts / Blog Feed */}
        {/* You can reuse your BlogFeed component here */}
        {/* <BlogFeed /> */}
      </main>
    </div>
  );
}
