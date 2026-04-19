import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

/* Roles to cycle through */
const ROLES = ['Full Stack Engineer', 'MERN Stack Developer', 'React Specialist', 'Problem Solver']

/* Ripple helper */
function useRipple() {
  const [ripples, setRipples] = useState([])
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - rect.left
    const y = (e.clientY ?? e.touches?.[0]?.clientY ?? 0) - rect.top
    const id = Date.now()
    setRipples(r => [...r, { x, y, id }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900)
  }
  return { ripples, addRipple }
}

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.6 + i * 0.15, duration: 0.6, ease: [0.23,1,0.32,1] }
  })
}

export default function Home() {
  /* ── parallax on pointer ── */
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX  = useSpring(useTransform(pointerY, [-0.5,0.5], [10,-10]), { stiffness:100, damping:20 })
  const rotateY  = useSpring(useTransform(pointerX, [-0.5,0.5], [-12,12]), { stiffness:100, damping:20 })
  const shiftX   = useSpring(useTransform(pointerX, [-0.5,0.5], [-20,20]), { stiffness:70, damping:22 })
  const shiftY   = useSpring(useTransform(pointerY, [-0.5,0.5], [-18,18]), { stiffness:70, damping:22 })
  const glowX    = useSpring(useTransform(pointerX, [-0.5,0.5], [-30,30]), { stiffness:50, damping:25 })
  const glowY    = useSpring(useTransform(pointerY, [-0.5,0.5], [-30,30]), { stiffness:50, damping:25 })

  /* ── role cycling ── */
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3200)
    return () => clearInterval(t)
  }, [])

  /* ── typewriter state ── */
  const [typed, setTyped] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const target = ROLES[roleIdx]
    if (!deleting) {
      if (charIdx < target.length) {
        const t = setTimeout(() => { setTyped(target.slice(0,charIdx+1)); setCharIdx(c=>c+1) }, 60)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setTyped(target.slice(0,charIdx-1)); setCharIdx(c=>c-1) }, 35)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i+1) % ROLES.length)
      }
    }
  }, [charIdx, deleting, roleIdx])
  useEffect(() => {
    const t = setTimeout(() => setDeleting(true), 2600)
    return () => clearTimeout(t)
  }, [roleIdx])

  const { ripples, addRipple } = useRipple()

  const handleParallax = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const resetParallax = () => { pointerX.set(0); pointerY.set(0) }

  /* ── touch parallax ── */
  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const t = e.touches[0]
    pointerX.set((t.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((t.clientY - rect.top)  / rect.height - 0.5)
  }

  const stats = [
    { label: 'Technologies', value: '15+',  icon: '⚡' },
    { label: 'Projects',     value: '7+',   icon: '🚀' },
    { label: 'Internships',  value: '3',    icon: '💼' }
  ]

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #030712 0%, #0a0f1e 40%, #0d0820 100%)' }}
      onMouseMove={handleParallax}
      onMouseLeave={resetParallax}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetParallax}
    >
      {/* Animated background rings */}
      {[300,220,140].map((s,i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-blue-500/10 pointer-events-none"
          style={{ width:s, height:s, marginLeft:-s/2, marginTop:-s/2 }}
          animate={{ rotate: i%2===0 ? 360 : -360, scale:[1,1.04,1] }}
          transition={{ rotate:{ duration:20+i*8, repeat:Infinity, ease:'linear' }, scale:{ duration:5+i*2, repeat:Infinity, ease:'easeInOut' } }}
        />
      ))}

      {/* Hero grid accent lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_,i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full"
            style={{ top: `${15 + i * 15}%` }}
            animate={{ opacity:[0.3,0.7,0.3], x:['-5%','5%','-5%'] }}
            transition={{ duration: 6+i*1.5, repeat:Infinity, delay:i*0.4, ease:'easeInOut' }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            <motion.div
              initial={{ opacity:0, x:-60 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:0.8, ease:[0.23,1,0.32,1] }}
            >
              {/* Greeting badge */}
              <motion.div
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.2, duration:0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass border border-blue-500/30"
              >
                <motion.span
                  animate={{ scale:[1,1.3,1] }}
                  transition={{ duration:1.2, repeat:Infinity }}
                  className="text-lg"
                >👋</motion.span>
                <span className="text-blue-300 font-medium text-sm tracking-wider">Hello, I'm</span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity:[1,0,1] }}
                  transition={{ duration:1.5, repeat:Infinity }}
                />
              </motion.div>

              {/* Name with glitch */}
              <motion.h1
                className="text-6xl md:text-8xl font-black mb-4 leading-none"
                initial={{ opacity:0, y:30 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.35, duration:0.7, ease:[0.23,1,0.32,1] }}
              >
                <span
                  className="glitch-text gradient-text-animated"
                  data-text="Prathmesh"
                >
                  Prathmesh
                </span>
              </motion.h1>

              {/* Typewriter role */}
              <motion.div
                className="text-2xl md:text-3xl text-gray-300 mb-6 font-light h-10 flex items-center gap-2"
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:0.5 }}
              >
                <span className="text-gray-500">I'm a </span>
                <span className="text-blue-400 font-semibold font-mono">
                  {typed}
                  <motion.span
                    animate={{ opacity:[1,0] }}
                    transition={{ duration:0.5, repeat:Infinity }}
                    className="inline-block w-0.5 h-6 bg-blue-400 ml-0.5 align-middle"
                  />
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.6, duration:0.6 }}
                className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed"
              >
                Motivated software developer with a strong foundation in{' '}
                <span className="text-blue-400 font-medium">React</span>,{' '}
                <span className="text-purple-400 font-medium">JavaScript</span>, and{' '}
                <span className="text-cyan-400 font-medium">scalable full-stack systems</span>.
                I build practical, user-focused products that drive digital transformation.
              </motion.p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={statVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y:-6, scale:1.08 }}
                    className="relative glass rounded-2xl p-4 text-center border border-blue-500/20 hover:border-blue-500/60 transition-all overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-black text-blue-400">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.9 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="/cf4a8ebb-caaf-486d-bd6a-3126eea69990.pdf"
                  download="Prathmesh_CV.pdf"
                  whileHover={{ scale:1.05 }}
                  whileTap={{ scale:0.96 }}
                  onClick={addRipple}
                  onTouchStart={addRipple}
                  className="btn-neon relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white
                    bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/30
                    flex items-center justify-center gap-2 tracking-wide"
                  style={{ fontSize:'0.95rem' }}
                >
                  {ripples.map(r => (
                    <span
                      key={r.id}
                      className="absolute rounded-full bg-white/25 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ left:r.x, top:r.y, animation:'ripple 0.8s ease-out forwards' }}
                    />
                  ))}
                  <span>⬇</span>
                  Download CV
                </motion.a>

                <motion.button
                  whileHover={{ scale:1.05 }}
                  whileTap={{ scale:0.96 }}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}
                  className="btn-neon px-8 py-4 rounded-xl font-bold tracking-wide
                    border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10
                    flex items-center justify-center gap-2 transition-all"
                  style={{ fontSize:'0.95rem' }}
                >
                  <span>🎯</span>
                  View Projects
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Avatar ── */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ rotateX, rotateY, transformStyle:'preserve-3d' }}
            initial={{ opacity:0, scale:0.7 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, delay:0.3, ease:[0.23,1,0.32,1] }}
          >
            {/* Morphing blob glow behind */}
            <motion.div
              className="absolute w-80 h-80 morph-blob pointer-events-none"
              style={{
                background:'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.25))',
                filter:'blur(40px)',
                x: glowX, y: glowY
              }}
            />

            {/* Orbit ring 1 */}
            <motion.div
              className="absolute w-96 h-96 rounded-full border border-blue-500/20 pointer-events-none"
              animate={{ rotate:360 }}
              transition={{ duration:18, repeat:Infinity, ease:'linear' }}
            >
              <div className="absolute -top-2 left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/80" />
            </motion.div>

            {/* Orbit ring 2 */}
            <motion.div
              className="absolute w-72 h-72 rounded-full border border-purple-500/20 pointer-events-none"
              animate={{ rotate:-360 }}
              transition={{ duration:12, repeat:Infinity, ease:'linear' }}
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/80" />
            </motion.div>

            {/* Orbit ring 3 – dots */}
            <motion.div
              className="absolute w-56 h-56 rounded-full border border-cyan-500/15 pointer-events-none"
              animate={{ rotate:360 }}
              transition={{ duration:8, repeat:Infinity, ease:'linear' }}
            >
              {[0,60,120,180,240,300].map(deg => (
                <div
                  key={deg}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                  style={{
                    top:'50%', left:'50%',
                    transform:`rotate(${deg}deg) translateX(27px) translateY(-50%)`
                  }}
                />
              ))}
            </motion.div>

            {/* Avatar card */}
            <motion.div
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden
                border-2 border-blue-500/60 shadow-2xl shadow-blue-500/40 float-y"
              style={{ x:shiftX, y:shiftY }}
              whileHover={{ scale:1.04 }}
            >
              {/* Holographic scanline overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(59,130,246,0.04) 3px,rgba(59,130,246,0.04) 4px)',
                  mixBlendMode:'overlay'
                }}
              />
              <img
                src="/image.png"
                alt="Prathmesh"
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex' }}
              />
              <div
                className="w-full h-full bg-gradient-to-br from-gray-800 to-blue-900/50 items-center justify-center text-8xl absolute inset-0"
                style={{ display:'none' }}
              >
                👨‍💻
              </div>

              {/* Corner accents */}
              {['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
                  <div className={`absolute ${i<2?'top-0':'bottom-0'} ${i%2===0?'left-0':'right-0'} w-5 h-px bg-blue-400`} />
                  <div className={`absolute ${i<2?'top-0':'bottom-0'} ${i%2===0?'left-0':'right-0'} h-5 w-px bg-blue-400`} />
                </div>
              ))}
            </motion.div>

            {/* Floating tech badges */}
            {[
              { label:'React', x:-80, y:-60, color:'#61dafb', delay:0 },
              { label:'Node',  x:90,  y:-40, color:'#6da55f', delay:0.3 },
              { label:'MERN',  x:-70, y:80,  color:'#a855f7', delay:0.6 },
              { label:'AI',    x:85,  y:70,  color:'#f472b6', delay:0.9 },
            ].map(b => (
              <motion.div
                key={b.label}
                className="absolute glass rounded-full px-3 py-1.5 text-xs font-bold border pointer-events-none"
                style={{ border:`1px solid ${b.color}40`, color:b.color, boxShadow:`0 0 12px ${b.color}30` }}
                initial={{ x:b.x, y:b.y, opacity:0, scale:0.5 }}
                animate={{ x:b.x, y:b.y, opacity:1, scale:1 }}
                transition={{ delay:0.8+b.delay, duration:0.6 }}
                whileHover={{ scale:1.15 }}
              >
                <motion.span
                  animate={{ y:[0,-4,0] }}
                  transition={{ duration:2+b.delay, repeat:Infinity, ease:'easeInOut' }}
                  style={{ display:'block' }}
                >
                  {b.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.5 }}
      >
        <span className="text-gray-500 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"
          animate={{ scaleY:[0,1,0], opacity:[0,1,0] }}
          transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}
