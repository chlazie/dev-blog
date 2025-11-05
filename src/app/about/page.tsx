"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        {/* Hero Header - Inspired by the image */}
        <header className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            {/* Main Heading with Gradient */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                  Grow
                </span>
              </h1>
              <div className="text-2xl md:text-4xl font-bold mb-6">
                <span className="text-white">We've got you</span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent"> covered</span>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join the largest community-driven platform where developers 
              <span className="text-orange-400 font-semibold"> learn</span>, 
              <span className="text-purple-400 font-semibold"> share</span>, and 
              <span className="text-orange-400 font-semibold"> grow</span> together
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/join"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Growing Today
              </Link>
              <Link
                href="/contribute"
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition font-semibold text-lg"
              >
                Share Your Knowledge
              </Link>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
          {/* Our Story Section */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                  DevHood was born from a simple observation: while there are countless 
                  programming resources online, few platforms truly foster genuine community 
                  and collaborative learning.
                </p>
                <p>
                  We noticed developers often struggle in isolation—facing the same challenges, 
                  solving similar problems, but rarely connecting to share their insights.
                </p>
                <p>
                  That's why we built DevHood: a space where developers at all levels can 
                  contribute, learn from each other, and build meaningful connections that 
                  accelerate their growth.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg">
                    To create the most supportive and collaborative environment where 
                    every developer feels empowered to share their knowledge and 
                    accelerate their career growth through community.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">What Makes Us Different</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Unlike traditional blogs or learning platforms, DevHood is built around 
              core principles that put community first.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Community-Driven</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Every article, tutorial, and resource is created by developers 
                  for developers. No corporate content, just real experiences.
                </p>
              </div>

              <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Practical Focus</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We prioritize actionable content that solves real problems 
                  developers face in their daily work and projects.
                </p>
              </div>

              <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Inclusive Growth</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  From beginners to senior engineers, everyone has valuable 
                  insights to share and something new to learn.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">How DevHood Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Join Community</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Create your free account and introduce yourself to the community
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Share Knowledge</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Write articles, create tutorials, or share your project experiences
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Collaborate</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Get feedback, join discussions, and help other developers
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">4</div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Grow Together</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Build your reputation, learn new skills, and advance your career
                </p>
              </div>
            </div>
          </section>

          {/* Community Values */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Our Community Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-semibold mb-2 dark:text-white">Collaboration</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">We grow faster when we work together</p>
              </div>
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-semibold mb-2 dark:text-white">Knowledge Sharing</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Your experience can help others overcome challenges</p>
              </div>
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">🙌</div>
                <h3 className="font-semibold mb-2 dark:text-white">Support</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Everyone deserves help when they're stuck</p>
              </div>
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2 dark:text-white">Growth</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Continuous learning and improvement is our goal</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Thousands of developers are already sharing knowledge, collaborating on projects, 
              and accelerating their careers together. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition font-semibold"
              >
                Join DevHood Today
              </Link>
              <Link
                href="/contribute"
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition font-semibold"
              >
                Start Writing
              </Link>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}