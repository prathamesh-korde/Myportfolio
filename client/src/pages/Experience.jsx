import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* Animated vertical progress line in the timeline */
function TimelineProgress({ count }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 40%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-700/60 ml-3" />
      <motion.div
        className="absolute left-0 top-0 w-0.5 ml-3 origin-top"
        style={{
          height: '100%',
          scaleY,
          background: 'linear-gradient(180deg,#3b82f6,#a855f7,#f472b6)'
        }}
      />
    </div>
  )
}

const expColors = ['#3b82f6', '#a855f7', '#06b6d4']
const eduColors = ['#f472b6', '#fbbf24', '#4ade80']

const slideLeft  = { hidden:{opacity:0,x:-60}, visible:(i)=>({ opacity:1,x:0, transition:{delay:i*0.15,duration:0.7,ease:[0.23,1,0.32,1]} }) }
const slideRight = { hidden:{opacity:0,x:60},  visible:(i)=>({ opacity:1,x:0, transition:{delay:i*0.12,duration:0.7,ease:[0.23,1,0.32,1]} }) }
const fadeUp     = { hidden:{opacity:0,y:40},  visible:{ opacity:1,y:0, transition:{duration:0.7} } }

export default function Experience() {
  const [activeExp, setActiveExp] = useState(null)

  const experiences = [
    {
      year:    'Dec 2025 – Jun 2026',
      title:   'Software Engineer Intern',
      company: 'Netfotech Solutions',
      type:    'Internship',
      icon:    '🏢',
      achievements: [
        'Built a deployment-ready full-stack web application with responsive and dynamic UI in a collaborative team setup',
        'Worked across React, JavaScript, Node.js, Express, Tailwind CSS, and system design workflows',
        'Used Figma, Postman, and Vercel deployment to accelerate delivery and improve development quality'
      ]
    },
    {
      year:    'Oct 2024 – Jan 2025',
      title:   'Full-Stack Development Intern',
      company: 'YHills Edutech Pvt. Ltd.',
      type:    'Internship',
      icon:    '📚',
      achievements: [
        'Collaborated in the design and development of responsive web applications using the MERN stack',
        'Worked with MongoDB and MySQL to perform CRUD operations, design efficient schemas, and optimize database performance',
        'Participated in Agile processes, including daily scrums, code reviews, and GitHub-based version control'
      ]
    },
    {
      year:    'Dec 2023 – Jan 2024',
      title:   'Python Development Intern',
      company: 'Codemate IT Services',
      type:    'Internship',
      icon:    '🐍',
      achievements: [
        'Hands-on experience in real-world Python development',
        'Collaborated with senior developers to debug and enhance existing systems, ensuring clean, maintainable code'
      ]
    }
  ]

  const education = [
    { year:'2022 – 2026', title:'B.Tech Information Technology', institution:'G.H Raisoni College of Engineering, Nagpur', grade:'CGPA: 8.84', icon:'🎓' },
    { year:'2022',        title:'Higher Secondary (XII)',         institution:'Jawahar Navodaya Vidyalaya, Akola',             grade:'CBSE | 79%',      icon:'📗' },
    { year:'2020',        title:'Secondary (X)',                  institution:'Jawahar Navodaya Vidyalaya, Akola',             grade:'CBSE | 77.6%',    icon:'📘' }
  ]

  return (
    <div className="min-h-screen py-20" style={{ background:'linear-gradient(180deg,#030712 0%,#060d20 100%)' }}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-cyan-500/30 mb-6"
            whileHover={{ scale:1.05 }}
          >
            <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:1.5, repeat:Infinity }}>💼</motion.span>
            <span className="text-cyan-300 text-sm font-medium tracking-wider">MY PATH</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-animated">Experience & Education</span>
          </h2>
          <p className="text-gray-400 text-lg">My professional journey and educational background</p>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
            initial={{ width:0 }} whileInView={{ width:'100px' }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
          />
        </motion.div>

        {/* ── Professional Experience ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            <h3 className="text-2xl font-black text-blue-400 whitespace-nowrap">⚡ Professional Experience</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once:true, amount:0.2 }}
              >
                <motion.div
                  onClick={() => setActiveExp(activeExp === idx ? null : idx)}
                  whileHover={{ x:4, boxShadow:`0 0 40px ${expColors[idx]}20` }}
                  whileTap={{ scale:0.99 }}
                  className="glass rounded-2xl border border-gray-700/60 overflow-hidden cursor-pointer group transition-all"
                  style={{ '--exp-color': expColors[idx] }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background:expColors[idx] }} />

                  <div className="p-6 pl-7">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background:`${expColors[idx]}20`, border:`1px solid ${expColors[idx]}40` }}
                          whileHover={{ scale:1.1, rotate:5 }}
                          animate={{ y:[0,-3,0] }}
                          transition={{ duration:3, delay:idx*0.5, repeat:Infinity }}
                        >
                          {exp.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {exp.title}
                          </h4>
                          <div className="font-semibold mb-1" style={{ color:expColors[idx] }}>{exp.company}</div>
                          <div className="text-gray-500 text-sm font-mono">{exp.year} • {exp.type}</div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: activeExp===idx ? 180 : 0 }}
                        transition={{ duration:0.3 }}
                        className="text-gray-400 self-start md:self-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Achievements - expandable */}
                    <motion.div
                      initial={false}
                      animate={{ height: activeExp===idx ? 'auto' : 0, opacity: activeExp===idx ? 1 : 0 }}
                      transition={{ duration:0.4, ease:[0.23,1,0.32,1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-5 border-t border-gray-700/60">
                        <div className="text-xs text-gray-500 mb-3 font-mono tracking-wider">KEY ACHIEVEMENTS</div>
                        <ul className="space-y-3">
                          {exp.achievements.map((ach, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity:0, x:-20 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay: i*0.1 }}
                              className="flex items-start gap-3 text-gray-300 text-sm"
                            >
                              <motion.span
                                className="mt-1 text-sm flex-shrink-0"
                                style={{ color:expColors[idx] }}
                                animate={{ x:[0,3,0] }}
                                transition={{ duration:1.5, repeat:Infinity, delay:i*0.3 }}
                              >▶</motion.span>
                              <span className="leading-relaxed">{ach}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Education ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            <h3 className="text-2xl font-black text-purple-400 whitespace-nowrap">🎓 Education</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
          </div>

          <div className="relative pl-12">
            {/* Animated timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700/50 rounded-full" />
            <motion.div
              className="absolute left-4 top-0 w-0.5 rounded-full origin-top"
              style={{ background:'linear-gradient(180deg,#a855f7,#3b82f6,#4ade80)' }}
              initial={{ height:0 }}
              whileInView={{ height:'100%' }}
              viewport={{ once:true }}
              transition={{ duration:1.5, ease:[0.23,1,0.32,1] }}
            />

            <div className="space-y-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={slideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once:true, amount:0.2 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-12 top-6 w-6 h-6 rounded-full border-4 border-gray-950 timeline-dot flex items-center justify-center"
                    style={{ background:eduColors[idx] }}
                    initial={{ scale:0 }}
                    whileInView={{ scale:1 }}
                    viewport={{ once:true }}
                    transition={{ delay:idx*0.2 + 0.5, type:'spring', stiffness:200 }}
                  />

                  <motion.div
                    whileHover={{ x:6, boxShadow:`0 0 30px ${eduColors[idx]}20` }}
                    className="glass rounded-2xl p-6 border border-gray-700/60 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background:`${eduColors[idx]}20`, border:`1px solid ${eduColors[idx]}40` }}
                        animate={{ rotateY:[0,10,-10,0] }}
                        transition={{ duration:4, delay:idx*0.5, repeat:Infinity }}
                      >
                        {edu.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-mono text-sm mb-1" style={{ color:eduColors[idx] }}>{edu.year}</div>
                        <h4 className="text-lg font-bold text-white mb-1">{edu.title}</h4>
                        <div className="text-gray-400 text-sm mb-2">{edu.institution}</div>
                        <motion.div
                          className="inline-block px-3 py-1 rounded-full text-sm font-bold"
                          style={{ background:`${eduColors[idx]}20`, color:eduColors[idx], border:`1px solid ${eduColors[idx]}40` }}
                          whileHover={{ scale:1.05 }}
                        >
                          {edu.grade}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
