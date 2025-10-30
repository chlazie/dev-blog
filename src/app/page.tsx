'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-32">
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold mb-4">Write Your Own Posts</h1>
          <p className="text-lg text-slate-600 mb-6">Discover Fascinating Blogs in the DevHood community.</p>
          <Link
            href="/create"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Free Launch
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center relative">
          {/* Desktop screenshot */}
          <Image
            src="/path-to-desktop-mockup.png"
            alt="App Screenshot"
            width={500}
            height={350}
            className="rounded-2xl shadow-xl"
          />
          {/* Mobile screenshot */}
          <Image
            src="/path-to-mobile-mockup.png"
            alt="App Mobile Screenshot"
            width={200}
            height={400}
            className="absolute bottom-0 right-0 -translate-x-12 rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid sm:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Explore Blogs</h3>
          <p className="text-slate-500">Discover blogs from developers all over the world.</p>
        </div>
        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Easy to Edit</h3>
          <p className="text-slate-500">Create and edit posts with a simple and intuitive editor.</p>
        </div>
        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Create Collections</h3>
          <p className="text-slate-500">Organize posts into collections and share with the community.</p>
        </div>
      </section>

      {/* Optional: Featured Posts / Blog Feed */}
      {/* You can reuse your BlogFeed component here */}
      {/* <BlogFeed /> */}

    </main>
  )
}
