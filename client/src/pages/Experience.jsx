import React from 'react'
import { motion } from 'framer-motion'

// Experience & Education page with timeline
export default function Experience() {
  const experiences = [
    {
      year: 'Oct 2024 – Jan 2025',
      title: 'Full-Stack Development Intern',
      company: 'YHills Edutech Pvt. Ltd.',
      type: 'Internship',
      achievements: [
        'Collaborated in the design and development of responsive web applications using the MERN stack',
        'Worked with MongoDB and MySQL to perform CRUD operations, design efficient schemas, and optimize database performance',
        'Participated in Agile processes, including daily scrums, code reviews, and GitHub-based version control'
      ]
    },
    {
      year: 'Dec 2023 – Jan 2024',
      title: 'Python Development Intern',
      company: 'Codemate IT Services',
      type: 'Internship',
      achievements: [
        'Hands-on experience in real-world Python development',
        'Collaborated with senior developers to debug and enhance existing systems, ensuring clean, maintainable code'
      ]
    }
  ]

  const education = [
    {
      year: '2022 – 2026',
      title: 'B.Tech in Information Technology',
      company: 'G.H Raisoni College of Engineering and Management, Nagpur',
      grade: 'CGPA: 8.68'
    },
    {
      year: '2022',
      title: 'Higher Secondary (XII)',
      company: 'Jawahar Navodaya Vidyalaya, Akola',
      grade: 'CBSE Board | 79%'
    },
    {
      year: '2020',
      title: 'Secondary (X)',
      company: 'Jawahar Navodaya Vidyalaya, Akola',
      grade: 'CBSE Board | 77.6%'
    }
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
              Experience & Education
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            My professional journey and educational background that shaped my expertise
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-blue-400 mb-8">Professional Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{exp.title}</h4>
                      <div className="text-blue-400 font-medium mb-1">{exp.company}</div>
                      <div className="text-gray-500 text-sm">{exp.year} • {exp.type}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-3 font-semibold">Key Achievements</div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-blue-400 mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Educational Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-blue-400 mb-8">Educational Background</h3>
            <div className="relative border-l-2 border-blue-600 pl-8 space-y-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all"
                >
                  <div className="absolute -left-[42px] w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-900" />
                  <div className="text-blue-400 font-semibold mb-2">{edu.year}</div>
                  <h4 className="text-xl font-bold text-white mb-1">{edu.title}</h4>
                  <div className="text-gray-400 mb-2">{edu.company}</div>
                  <div className="text-gray-300 font-medium">{edu.grade}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
