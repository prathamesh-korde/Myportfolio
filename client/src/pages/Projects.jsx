import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

// Projects page fetches from backend API
export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    axios
      .get(`${API_URL}/api/projects`)
      .then((res) => {
        setProjects(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-blue-400 text-xl">Loading projects...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-red-400">Error: {error}</div>
    </div>
  )

  return (
    <div className="min-h-screen py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            A showcase of my recent work and technical achievements across different domains
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                {proj.imageUrl ? (
                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    💻
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-gray-900/80 px-3 py-1 rounded-full text-sm text-blue-400 font-semibold">
                  #{String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{proj.description}</p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack?.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-700 text-blue-400 text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack?.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-all font-medium"
                    >
                      View Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
