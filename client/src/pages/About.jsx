import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* Tilt-on-hover for skill cards */
function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    x.set(cx); y.set(cy)
  }
  const onTouch = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const t = e.touches[0]
    x.set((t.clientX - rect.left) / rect.width - 0.5)
    y.set((t.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onTouch}
      onTouchEnd={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}
const itemVariants = {
  hidden:   { opacity: 0, scale: 0.6, y: 20 },
  visible:  { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
}
const slideLeft  = { hidden: { opacity:0,x:-70 }, visible: { opacity:1, x:0, transition:{ duration:0.7, ease:[0.23,1,0.32,1] } } }
const slideRight = { hidden: { opacity:0,x:70 },  visible: { opacity:1, x:0, transition:{ duration:0.7, ease:[0.23,1,0.32,1] } } }
const fadeUp     = { hidden: { opacity:0,y:40 },  visible: { opacity:1, y:0, transition:{ duration:0.7 } } }

export default function About() {
  const skillCategories = [
    {
      title: 'Frontend', color: '#3b82f6', icon: '🎨',
      skills: [
        { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Bootstrap',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
      ]
    },
    {
      title: 'Backend & DB', color: '#a855f7', icon: '⚙️',
      skills: [
        { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'RESTful',    icon: '🔗' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      title: 'Tools', color: '#06b6d4', icon: '🛠️',
      skills: [
        { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'GitLab',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
        { name: 'Postman',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'Agile',      icon: '📋' },
        { name: 'Hoppscotch', icon: '🚀' },
        { name: 'Vercel',     icon: '▲' }
      ]
    },
    {
      title: 'Core Concepts', color: '#f472b6', icon: '🧠',
      skills: [
        { name: 'OOP',  icon: '📦' },
        { name: 'DSA',  icon: '⚡' },
        { name: 'AWS',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'DBMS', icon: '🗄️' }
      ]
    }
  ]

  const stats = [
    { value: '7+',  label: 'Projects',    icon: '🚀', color: '#3b82f6' },
    { value: '3',   label: 'Internships', icon: '💼', color: '#a855f7' },
    { value: '8.84',label: 'CGPA',        icon: '🎓', color: '#06b6d4' },
    { value: 'MERN',label: 'Stack',       icon: '⚡', color: '#f472b6' }
  ]

  const quickFacts = [
    { icon: '📍', label: 'Location',  value: 'Nagpur, Maharashtra' },
    { icon: '💼', label: 'Focus',     value: 'Full Stack Development' },
    { icon: '📧', label: 'Email',     value: 'kordeprathamesh01@gmail.com' },
    { icon: '🎓', label: 'Education', value: 'B.Tech IT | CGPA: 8.84' }
  ]

  return (
    <div className="min-h-screen py-20" style={{ background:'linear-gradient(180deg,#030712 0%,#050b1a 50%,#030712 100%)' }}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-purple-500/30 mb-6"
            whileHover={{ scale:1.05 }}
          >
            <motion.span animate={{ rotate:[0,10,-10,0] }} transition={{ duration:2, repeat:Infinity }}>🧑‍💻</motion.span>
            <span className="text-purple-300 text-sm font-medium tracking-wider">WHO I AM</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-animated">About Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about creating innovative solutions and delivering exceptional user experiences through modern technology
          </p>
          {/* Underline accent */}
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width:0 }} whileInView={{ width:'120px' }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
          />
        </motion.div>

        {/* ── Profile + Journey ── */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {/* Profile card */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}
            className="md:col-span-1"
          >
            <TiltCard className="glass rounded-2xl p-6 border border-gray-700/60 hover:border-blue-500/40 transition-colors sticky top-24">
              <div className="relative w-44 h-44 mx-auto mb-6">
                {/* Morphing blob around photo */}
                <div
                  className="absolute inset-0 -m-3 morph-blob opacity-60"
                  style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.4),rgba(168,85,247,0.3))', filter:'blur(12px)' }}
                />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/30">
                  <img
                    src="/image.png"
                    alt="Prathmesh Profile"
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex' }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 items-center justify-center text-6xl absolute inset-0" style={{ display:'none' }}>
                    👨‍💻
                  </div>
                </div>
                {/* Status badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 glass px-3 py-1 rounded-full text-xs text-green-400 border border-green-500/40 flex items-center gap-1.5"
                  animate={{ y:[0,-2,0] }} transition={{ duration:2, repeat:Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation:'pulse 1.5s infinite' }} />
                  Available
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-6 text-white">Quick Facts</h3>
              <div className="space-y-4">
                {quickFacts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors group"
                    initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay: 0.1 + idx * 0.1 }}
                    whileHover={{ x:4 }}
                  >
                    <motion.span className="text-2xl" animate={{ rotate:[0,8,-8,0] }} transition={{ duration:2, delay:idx*0.3, repeat:Infinity }}>
                      {fact.icon}
                    </motion.span>
                    <div>
                      <div className="text-gray-500 text-xs">{fact.label}</div>
                      <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{fact.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Journey + stats */}
          <motion.div
            variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <TiltCard className="glass rounded-2xl p-8 border border-gray-700/60 hover:border-purple-500/40 transition-colors">
              <h3 className="text-2xl font-bold mb-5 text-purple-400 reveal-line pb-2">My Journey</h3>
              {[
                'I am Prathamesh Sudhakar Korde, a motivated software developer with a strong foundation in full-stack development, databases, and server fundamentals. I enjoy turning ideas into reliable and scalable products.',
                'Through internships at Netfotech Solutions, YHills Edutech, and Codemate IT Services, I have worked in collaborative Agile teams and built deployment-ready applications using React, Node.js, Express, and modern tooling.',
                'I believe in continuous learning, clear communication, and practical engineering choices that improve both user experience and team productivity.'
              ].map((para, i) => (
                <motion.p
                  key={i}
                  className="text-gray-300 leading-relaxed mb-4 last:mb-0"
                  initial={{ opacity:0, x:30 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: 0.1 + i * 0.15 }}
                >
                  {para}
                </motion.p>
              ))}
            </TiltCard>

            <motion.div
              variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y:-8, scale:1.06, boxShadow:`0 20px 50px ${stat.color}30` }}
                  className="glass rounded-2xl p-5 border border-gray-700/60 text-center group cursor-pointer relative overflow-hidden"
                  style={{ '--hover-color': stat.color }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background:`radial-gradient(circle at 50% 50%, ${stat.color}, transparent)` }}
                  />
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black mb-1" style={{ color:stat.color }}>{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 skill-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Skills Section ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }}
          variants={fadeUp}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-3">
              <span className="gradient-text-animated">Skills & Technologies</span>
            </h3>
            <p className="text-gray-400">Crafting digital experiences with cutting-edge technologies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <TiltCard key={cat.title}>
                <motion.div
                  initial={{ opacity:0, y:50, scale:0.9 }}
                  whileInView={{ opacity:1, y:0, scale:1 }}
                  viewport={{ once:true, amount:0.2 }}
                  transition={{ delay: idx * 0.12, duration:0.6, ease:[0.23,1,0.32,1] }}
                  className="glass rounded-2xl p-5 border border-gray-700/60 hover:border-opacity-80 transition-all h-full relative overflow-hidden group"
                  style={{ '--cat-color': cat.color }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,${cat.color},transparent)` }} />
                  {/* Background glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ background:`radial-gradient(circle at 50% 0%,${cat.color},transparent)` }}
                  />

                  <div className="flex items-center gap-2 mb-5">
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate:[0,10,-10,0] }}
                      transition={{ duration:3, delay:idx*0.5, repeat:Infinity }}
                    >{cat.icon}</motion.span>
                    <h4 className="text-lg font-bold" style={{ color:cat.color }}>{cat.title}</h4>
                  </div>

                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    variants={containerVariants} initial="hidden" whileInView="visible"
                    viewport={{ once:true }}
                  >
                    {cat.skills.map(skill => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale:1.18, y:-6, rotateY:10 }}
                        whileTap={{ scale:0.92 }}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-800/60 hover:bg-gray-700/80 transition-all cursor-pointer group/skill relative overflow-hidden"
                        title={skill.name}
                      >
                        {/* Skill shimmer */}
                        <div className="absolute inset-0 skill-glow opacity-0 group-hover/skill:opacity-100" />
                        {skill.icon.startsWith('http') ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 mb-1.5 drop-shadow-lg group-hover/skill:brightness-125 transition-all"
                            onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block' }}
                          />
                        ) : null}
                        <div
                          className="text-2xl mb-1.5"
                          style={{ display: skill.icon.startsWith('http') ? 'none' : 'block' }}
                        >{skill.icon}</div>
                        <span className="text-[10px] text-gray-400 group-hover/skill:text-white transition-colors text-center leading-tight font-medium">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="mt-4 pt-3 border-t border-gray-700/50 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{cat.skills.length} technologies</span>
                    <motion.div
                      className="h-1 rounded-full flex-1 ml-3 overflow-hidden bg-gray-700/60"
                    >
                      <motion.div
                        className="h-full rounded-full skill-glow"
                        style={{ background:`linear-gradient(90deg,${cat.color},${cat.color}80)` }}
                        initial={{ width:0 }}
                        whileInView={{ width:'100%' }}
                        viewport={{ once:true }}
                        transition={{ duration:1, delay:0.3+idx*0.1, ease:[0.23,1,0.32,1] }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
