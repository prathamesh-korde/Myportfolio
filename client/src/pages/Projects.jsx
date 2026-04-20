import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import axios from 'axios'

/* Magnetic tilt for project cards */
function MagneticCard({ children, className }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5,0.5],[10,-10]), { stiffness:200,damping:25 })
  const ry = useSpring(useTransform(mx, [-0.5,0.5],[-10,10]), { stiffness:200,damping:25 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX-r.left)/r.width-0.5)
    my.set((e.clientY-r.top)/r.height-0.5)
  }
  const onTouch = (e) => {
    const r = ref.current.getBoundingClientRect()
    const t = e.touches[0]
    mx.set((t.clientX-r.left)/r.width-0.5)
    my.set((t.clientY-r.top)/r.height-0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onTouch}
      onTouchEnd={onLeave}
      style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d' }}
      whileHover={{ scale:1.02 }}
      transition={{ type:'spring', stiffness:200, damping:25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const featuredProjects = [
  {
    _id: 'nxtstay-project',
    title: 'NxtStay - Smart Hotel Listing Platform',
    description: 'Developed a full-stack hotel listing platform featuring CRUD operations, search, filtering, ratings, and JWT-based authentication with role-based access. Developed RESTful APIs for user actions and media, integrating Cloudinary for image uploads and Mapbox for location-based search.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Mapbox'],
    githubUrl: 'https://github.com/prathamesh-korde/NxtStay2',
    liveUrl: 'https://nxt-stay2-git-main-kordeprathamesh01-gmailcoms-projects.vercel.app/Listings',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    status: 'Live',
    color: '#ef4444'
  },
  {
    _id: 'janmat-project',
    title: 'JanMat - Civic Engagement Platform',
    description: 'Built a geolocation-based civic platform for real-time issue reporting, connecting citizens with government authorities. Implemented session-based authentication and role-based authorization to ensure controlled access. Key features include issue reporting with geolocation tracking, news updates, a chatbot, and real-time polls.',
    techStack: ['JavaScript', 'React', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/prathamesh-korde/JanMat.git',
    liveUrl: 'https://janmat.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1541872526-24ebf513d2f2?auto=format&fit=crop&w=1200&q=80',
    status: 'Live',
    color: '#eab308'
  },
  {
    _id: 'cain-project',
    title: 'CAIN (Cricket AI Network)',
    description: 'CAIN is a pioneering Multi-Agent AI ecosystem that transforms cricket analytics into a proactive digital coaching staff. It uses specialized autonomous agents for injury prevention, tactical simulations, and scouting while maintaining a phased human-in-the-loop adoption model.',
    techStack: ['Multi-Agent AI', 'Analytics', 'Simulation', 'Scouting', 'Decision Intelligence'],
    githubUrl: '',
    liveUrl: 'https://cain-ns.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=1200&q=80',
    status: 'Live',
    color: '#3b82f6',
    authReference: [
      'kamlesh11@gmail.com / password (digital)',
      'ravi11@gmail.com / password (master)',
      'simon11@gmail.com / password (ThridUm)',
      'dilip11@gmail.com / password (globalScout)',
      'gg123@gmail.com / password (headCoach)'
    ]
  },
  {
    _id: 'recruiter-ai-project',
    title: 'Recruiter AI',
    description: 'AI-driven lifecycle automation platform that streamlines hiring from JD generation to AI-proctored interviews. Uses real-time analytics and TensorFlow-powered screening to reduce hiring time and bias across SuperAdmin, recruiter, and candidate portals.',
    techStack: ['React', 'Node.js', 'Express', 'TensorFlow', 'Real-Time Analytics'],
    githubUrl: '',
    liveUrl: 'https://recruterai.netfotech.in/',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    status: 'Live',
    color: '#06b6d4'
  },
  {
    _id: 'gpc-project',
    title: 'Get Per Click (GPC)',
    description: 'A hyper-local click-to-earn ad engagement and loyalty platform that rewards users for interacting with geo-targeted ads. Redeemable points work as digital currency at partner merchants and for BBPS utility bill payments.',
    techStack: ['AdTech', 'Loyalty Platform', 'Geo-Targeting', 'BBPS Integration'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    status: 'Ongoing',
    color: '#f472b6',
    privateRepoNote: 'Private repository'
  },
  {
    _id: 'hrms-project',
    title: 'HRMS Platform',
    description: 'A centralized HRMS platform for automating employee records, attendance, payroll, and leave management with role-based workflows for onboarding, performance tracking, and approvals, plus analytics dashboards for workforce planning.',
    techStack: ['React', 'Node.js', 'Workflow Automation', 'Role-Based Access', 'Dashboards'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    status: 'Ongoing',
    color: '#a855f7',
    privateRepoNote: 'Private repository'
  },
  {
    _id: 'ei-project',
    title: 'Engineering India',
    description: 'A comprehensive web platform developed for Engineering India CDP.',
    techStack: ['React', 'Web Development'],
    githubUrl: 'https://github.com/prathamesh-korde/website-ei-cdp.git',
    liveUrl: 'https://github.com/prathamesh-korde/website-ei-cdp',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    status: 'Live',
    color: '#f97316'
  },
  {
    _id: 'amazon-clone-project',
    title: 'Amazon Clone',
    description: 'A robust e-commerce platform clone modeling core Amazon functionalities including product browsing, cart management, and user authentication.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/prathamesh-korde/AmazonClone.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=80',
    status: 'Completed',
    color: '#f59e0b'
  },
  {
    _id: 'gamebox-project',
    title: 'Game Box',
    description: 'A collection of interactive web-based mini-games featuring classics like Tic-Tac-Toe and Rock-Paper-Scissors, plus a fully functional arithmetic calculator.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/prathamesh-korde/Game.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    status: 'Completed',
    color: '#22c55e'
  }
]

const cardVariants = {
  hidden:   { opacity:0, y:60, scale:0.92 },
  visible:  (i) => ({
    opacity:1, y:0, scale:1,
    transition:{ delay: i*0.12, duration:0.7, ease:[0.23,1,0.32,1] }
  })
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)

  React.useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    axios.get(`${API}/api/projects`)
      .then(res => { setProjects([...(res.data||[]), ...featuredProjects]); setLoading(false) })
      .catch(() => { setProjects(featuredProjects); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-blue-500/30"
          animate={{ rotate:360, scale:[1,1.2,1] }}
          transition={{ duration:2, repeat:Infinity, ease:'linear' }}
        />
        <motion.div
          className="absolute inset-0 m-2 rounded-full border-2 border-t-blue-500 border-transparent"
          animate={{ rotate:-360 }}
          transition={{ duration:1.2, repeat:Infinity, ease:'linear' }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-blue-400 text-xs font-mono"
          animate={{ opacity:[0.5,1,0.5] }}
          transition={{ duration:1.5, repeat:Infinity }}
        >
          LOADING
        </motion.div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-20" style={{ background:'linear-gradient(180deg,#050b1a 0%,#030712 50%,#050b1a 100%)' }}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-blue-500/30 mb-6"
            whileHover={{ scale:1.05 }}
          >
            <motion.span animate={{ rotate:360 }} transition={{ duration:4, repeat:Infinity, ease:'linear' }}>⚙️</motion.span>
            <span className="text-blue-300 text-sm font-medium tracking-wider">WHAT I'VE BUILT</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-animated">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">A showcase of my recent work and technical achievements</p>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width:0 }} whileInView={{ width:'100px' }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
          />
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((proj, idx) => (
            <MagneticCard key={proj._id} className="h-full">
              <motion.div
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once:true, amount:0.1 }}
                className="relative h-full glass rounded-2xl border border-gray-700/60 overflow-hidden group"
                style={{ '--proj-color': proj.color || '#3b82f6' }}
              >
                {/* Top color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-10"
                  style={{ background:`linear-gradient(90deg,${proj.color||'#3b82f6'},${proj.color||'#3b82f6'}50,transparent)` }}
                />

                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-all duration-500 pointer-events-none"
                  style={{ background:`radial-gradient(ellipse at 50% 0%,${proj.color||'#3b82f6'},transparent 60%)` }}
                />

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {proj.imageUrl ? (
                    <motion.img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      style={{ transformOrigin:'center' }}
                      whileHover={{ scale:1.08 }}
                      transition={{ duration:0.5 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-7xl">💻</div>
                  )}
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <motion.div
                    className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-mono font-bold z-10"
                    style={{ color:proj.color||'#3b82f6', borderColor:`${proj.color||'#3b82f6'}40`, borderWidth:1 }}
                    animate={{ y:[0,-2,0] }}
                    transition={{ duration:2, repeat:Infinity, delay:idx*0.3 }}
                  >
                    #{String(idx+1).padStart(2,'0')}
                  </motion.div>

                  {/* Status */}
                  {proj.status && (
                    <div className="absolute top-3 right-3 z-10">
                      <motion.span
                        className="px-3 py-1 rounded-full text-xs font-semibold glass"
                        style={{
                          color:proj.status==='Live'?'#4ade80':'#fbbf24',
                          borderColor:proj.status==='Live'?'#4ade8040':'#fbbf2440',
                          borderWidth:1
                        }}
                        animate={ proj.status==='Live'? { boxShadow:['0 0 5px #4ade8030','0 0 15px #4ade8060','0 0 5px #4ade8030'] } : {} }
                        transition={{ duration:2, repeat:Infinity }}
                      >
                        {proj.status==='Live'?'● ':'◌ '}{proj.status}
                      </motion.span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{proj.description}</p>

                  {proj.privateRepoNote && (
                    <span className="inline-block mb-3 px-2 py-0.5 bg-gray-700/80 text-gray-400 text-xs rounded border border-gray-600">
                      {proj.privateRepoNote}
                    </span>
                  )}

                  {/* Tech stack */}
                  <div className="mb-4">
                    <div className="text-[10px] text-gray-500 mb-2 font-mono tracking-wider">TECH STACK</div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack?.slice(0,5).map((tech,ti) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale:1.08, y:-2 }}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background:`${proj.color||'#3b82f6'}15`,
                            color:proj.color||'#3b82f6',
                            border:`1px solid ${proj.color||'#3b82f6'}30`
                          }}
                        >{tech}</motion.span>
                      ))}
                      {proj.techStack?.length > 5 && (
                        <span className="px-2.5 py-0.5 bg-gray-700 text-gray-400 text-xs rounded-full">+{proj.techStack.length-5}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    {proj.githubUrl && (
                      <motion.a
                        href={proj.githubUrl}
                        target="_blank" rel="noreferrer"
                        whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold glass border border-gray-600 text-gray-300 hover:border-blue-500/50 hover:text-blue-300 transition-all"
                      >
                        {'</>'}  Code
                      </motion.a>
                    )}
                    {proj.liveUrl && (
                      <motion.a
                        href={proj.liveUrl}
                        target="_blank" rel="noreferrer"
                        whileHover={{ scale:1.05, boxShadow:`0 8px 25px ${proj.color||'#3b82f6'}40` }}
                        whileTap={{ scale:0.95 }}
                        className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all relative overflow-hidden btn-neon"
                        style={{ background:`linear-gradient(135deg,${proj.color||'#3b82f6'},${proj.color||'#3b82f6'}80)` }}
                      >
                        🔗 Live Demo
                      </motion.a>
                    )}
                  </div>

                  {/* Auth Reference Dropdown */}
                  {proj.authReference?.length ? (
                    <div className="mt-4 relative group/auth">
                      <motion.div
                        whileHover={{ borderColor:`${proj.color||'#fbbf24'}60` }}
                        className="cursor-pointer glass border border-gray-700 rounded-xl p-3 flex justify-between items-center transition-colors"
                      >
                        <div className="text-xs text-yellow-300 font-semibold flex items-center gap-2">
                          <span>🔑</span> Auth Bypass Reference
                        </div>
                        <svg className="w-4 h-4 text-yellow-300 transition-transform duration-300 group-hover/auth:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                      <div className="absolute left-0 bottom-full mb-2 w-full glass border border-gray-700 rounded-xl p-3
                        opacity-0 invisible group-hover/auth:opacity-100 group-hover/auth:visible
                        transition-all duration-300 z-30 shadow-2xl max-h-48 overflow-y-auto">
                        <ul className="space-y-1.5">
                          {proj.authReference.map(entry => (
                            <li key={entry} className="text-xs text-gray-300 font-mono break-words py-1 px-2 rounded bg-gray-800/60 hover:bg-gray-700/80 transition-colors">
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </div>
  )
}
