import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Hero / Home section with CTA buttons
export default function Home() {
  const stats = [
    { label: 'Technologies', value: '10+' },
    { label: 'Projects', value: '4+' },
    { label: 'Experience', value: '3+ Months' }
  ]

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-400 font-semibold mb-4 text-lg"
            >
              👋 Hello, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Prathmesh
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              I'm a <span className="text-blue-400 font-semibold">Full Stack Engineer</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg mb-8 max-w-xl"
            >
              Specialized in building scalable, secure web applications using the MERN stack.
              Passionate about creating innovative solutions and delivering exceptional user experiences.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <a
                href="/cv.pdf"
                download
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
              >
                Download CV
              </a>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-blue-600 text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
              >
                View Projects
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl absolute inset-0"></div>
            <div className="relative w-80 h-80 mx-auto bg-gray-800 rounded-2xl border-4 border-blue-500 overflow-hidden shadow-2xl shadow-blue-500/50">
              <img 
                src="/image.png" 
                alt="Prathmesh" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-8xl absolute inset-0" style={{ display: 'none' }}>
                👨‍💻
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
