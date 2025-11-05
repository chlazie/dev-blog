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
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 relative pt-20 pb-40 lg:py-24">
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

          {/* Curved Divider - Adjusted positioning */}
          <div className="absolute -bottom-10 left-0 right-0 h-24 overflow-hidden z-0">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-slate-50"
              ></path>
            </svg>
          </div>
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
        <section className="text-center bg-linear-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
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
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
                DevHood
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                A thriving community where modern developers share knowledge,
                collaborate on projects, and grow together in their coding
                journey.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001 12.017 0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-orange-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/articles"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    All Articles
                  </a>
                </li>
                <li>
                  <a
                    href="/contribute"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Write for Us
                  </a>
                </li>
                <li>
                  <a
                    href="/communities"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Communities
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    About DevHood
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">
                Categories
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/category/react"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    React & Next.js
                  </a>
                </li>
                <li>
                  <a
                    href="/category/javascript"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    JavaScript
                  </a>
                </li>
                <li>
                  <a
                    href="/category/css"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    CSS & Styling
                  </a>
                </li>
                <li>
                  <a
                    href="/category/career"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Career Growth
                  </a>
                </li>
                <li>
                  <a
                    href="/category/tutorials"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/help"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/code-of-conduct"
                    className="text-slate-300 hover:text-orange-500 transition"
                  >
                    Code of Conduct
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-slate-700 pt-8 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
                <p className="text-slate-300">
                  Get the latest articles and community news delivered to your
                  inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-64"
                />
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} DevHood Community. All rights
              reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/sitemap"
                className="text-slate-400 hover:text-orange-500 transition"
              >
                Sitemap
              </a>
              <a
                href="/credits"
                className="text-slate-400 hover:text-orange-500 transition"
              >
                Credits
              </a>
              <a
                href="/status"
                className="text-slate-400 hover:text-orange-500 transition"
              >
                Status
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
