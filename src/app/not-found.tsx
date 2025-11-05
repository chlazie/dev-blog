'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from './components/Header'

export default function NotFound() {
  return (
    <div>
      <Header/>
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4 text-slate-900 dark:text-slate-50">
      {/* Big 404 number */}
      <motion.h1
        className="text-[10rem] font-extrabold mb-4 text-indigo-600 dark:text-indigo-400"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Page not found
      </motion.h2>

      <motion.p
        className="text-center text-slate-600 dark:text-slate-400 mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        The page you are looking for doesn’t exist or has been moved. Try heading back home.
      </motion.p>

      {/* Illustration */}
      <motion.div
        className="mb-8 w-full max-w-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Image
          src="/404-illustration.png" // put a nice 404 illustration in public folder
          alt="Lost in space illustration"
          width={100}
          height={100}
          className="mx-auto scale-3d"
        />
      </motion.div>

      {/* Back Home Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
    </div>
  )
}
