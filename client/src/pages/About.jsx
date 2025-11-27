import React from 'react'
import { motion } from 'framer-motion'

// About page with skills organized in categories
export default function About() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'RESTful APIs', icon: '🔗' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      title: 'Tools & Methodology',
      skills: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Agile/Scrum', icon: '📋' },
        { name: 'Hoppscotch', icon: '🚀' },
        { name: 'Vercel', icon: '▲' }
      ]
    },
    {
      title: 'Core Concepts',
      skills: [
        { name: 'OOP', icon: '📦' },
        { name: 'DSA', icon: '⚡' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'DBMS', icon: '🗄️' }
      ]
    }
  ]

  const quickFacts = [
    { icon: '📍', label: 'Location', value: 'Nagpur, Maharashtra' },
    { icon: '💼', label: 'Focus', value: 'Full Stack Development' },
    { icon: '📧', label: 'Email', value: 'kordeprathamesh01@gmail.com' },
    { icon: '🎓', label: 'Education', value: 'B.Tech IT | CGPA: 8.68' }
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
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about creating innovative solutions and delivering exceptional user experiences through modern technology
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 sticky top-24">
              {/* Profile Picture */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-xl shadow-blue-500/50">
                <img 
                  src="/image.png" 
                  alt="Prathmesh Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient with emoji if image not found
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-7xl" style={{ display: 'none' }}>
                  👨‍💻
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-6">Quick Facts</h3>
              <div className="space-y-4">
                {quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl">{fact.icon}</span>
                    <div>
                      <div className="text-gray-400 text-sm">{fact.label}</div>
                      <div className="text-white font-medium">{fact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* About Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a Full Stack Engineer with expertise in the MERN stack, specializing in building scalable, 
                secure web applications. With over a year of professional experience, I've successfully delivered 
                high-performance applications with complete lifecycle management.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                My journey in software development has led me to work with cutting-edge technologies including 
                React.js, Node.js, MongoDB, and cloud platforms. I'm passionate about creating solutions that 
                not only meet technical requirements but also provide exceptional user experiences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and mentoring fellow developers. I believe in continuous learning and staying updated with the 
                latest industry trends.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '4+', label: 'Projects Completed' },
                { value: '3+', label: 'Months Experience' },
                { value: '8.68', label: 'CGPA' },
                { value: 'MERN', label: 'Stack Expertise' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-blue-500 transition-colors"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h3>
            <p className="text-gray-400">
              Crafting digital experiences with cutting-edge technologies and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20"
              >
                <h4 className="text-xl font-bold mb-6 text-center text-blue-400">{category.title}</h4>
                <div className="grid grid-cols-3 gap-4">
                  {category.skills.map(skill => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="flex flex-col items-center justify-center p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all cursor-pointer group"
                      title={skill.name}
                    >
                      {skill.icon.startsWith('http') ? (
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-10 h-10 mb-2 filter group-hover:brightness-110 transition-all"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div 
                        className="text-3xl mb-2" 
                        style={{ display: skill.icon.startsWith('http') ? 'none' : 'block' }}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
                  {category.skills.length} Technologies
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
