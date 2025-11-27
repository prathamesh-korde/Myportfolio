import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

// Contact form submits to backend API
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const res = await axios.post(`${API_URL}/api/contact`, form)
      setStatus('success')
      setMsg(res.data.message || 'Message sent!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setMsg(err.response?.data?.error || 'Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: '📧', label: 'Email Me', value: 'kordeprathamesh01@gmail.com', link: 'mailto:kordeprathamesh01@gmail.com' },
    { icon: '📞', label: 'Call Me', value: '+91 9284797286', link: 'tel:+919284797286' },
    { icon: '📍', label: 'Location', value: 'Nagpur, Maharashtra', link: 'https://maps.google.com/?q=Nagpur,Maharashtra' },
    { icon: '💼', label: 'LinkedIn', value: 'Connect with me', link: 'https://linkedin.com/in/prathameshkorde' }
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Ready to collaborate? Let's discuss your next project and bring your ideas to life.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Currently Available</h3>
              <p className="text-gray-300 mb-6">
                I'm open to new opportunities and exciting projects. Whether you need a full-stack developer, 
                technical consultant, or someone to bring your ideas to life, let's connect!
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-gray-700 text-blue-400 rounded-full text-sm font-medium">Full-time</span>
                <span className="px-4 py-2 bg-gray-700 text-blue-400 rounded-full text-sm font-medium">Part-time</span>
                <span className="px-4 py-2 bg-gray-700 text-blue-400 rounded-full text-sm font-medium">Contract</span>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">●</span>
                  <span>Quick Response - Usually within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">●</span>
                  <span>Remote Ready - Work with global teams</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20 group"
                >
                  <div className="text-4xl mb-3">{info.icon}</div>
                  <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                  <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    {info.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message 🚀'}
              </button>
            </form>

            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-lg ${
                  status === 'success'
                    ? 'bg-green-500/20 border border-green-500 text-green-400'
                    : 'bg-red-500/20 border border-red-500 text-red-400'
                }`}
              >
                {msg}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
