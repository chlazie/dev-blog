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
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 h-screen">
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
        </section>

        {/* Email Subscription Section */}
        <section className="bg-linear-to-br from-blue-50 via-orange-50 to-purple-50 rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl"></div>

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
