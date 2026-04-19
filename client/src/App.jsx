import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'

/* Floating particle data */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 5 + Math.random() * 8,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#a855f7' : '#06b6d4'
}))

const sectionVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
  }
}

export default function App() {
  const [spotlight, setSpotlight] = useState({ x: -500, y: -500 })
  const [cursorDot, setCursorDot]   = useState({ x: -100, y: -100 })
  const [cursorRing, setCursorRing] = useState({ x: -100, y: -100 })
  const [isLoaded, setIsLoaded]     = useState(false)
  const dotRef  = useRef({ x: -100, y: -100 })
  const ringRef = useRef({ x: -100, y: -100 })
  const rafRef  = useRef(null)

  /* Smooth cursor loop */
  const animateCursor = useCallback(() => {
    const dx = dotRef.current.x - ringRef.current.x
    const dy = dotRef.current.y - ringRef.current.y
    ringRef.current.x += dx * 0.12
    ringRef.current.y += dy * 0.12
    setCursorRing({ x: ringRef.current.x, y: ringRef.current.y })
    rafRef.current = requestAnimationFrame(animateCursor)
  }, [])

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX
      const y = e.clientY ?? e.touches?.[0]?.clientY
      if (x == null) return
      dotRef.current = { x, y }
      setCursorDot({ x, y })
      setSpotlight({ x, y })
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('touchmove', move, { passive: true })
    rafRef.current = requestAnimationFrame(animateCursor)
    setTimeout(() => setIsLoaded(true), 200)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('touchmove', move)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animateCursor])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gray-950 relative overflow-x-hidden scanlines"
        >
          {/* ── Background layers ── */}
          <div className="futuristic-grid" aria-hidden="true" />
          <div className="futuristic-orb orb-blue"   aria-hidden="true" />
          <div className="futuristic-orb orb-purple"  aria-hidden="true" />
          <div className="futuristic-orb orb-cyan"    aria-hidden="true" />

          {/* Spotlight */}
          <motion.div
            aria-hidden="true"
            className="futuristic-spotlight"
            animate={{ x: spotlight.x - 250, y: spotlight.y - 250 }}
            transition={{ type: 'spring', stiffness: 60, damping: 16, mass: 0.3 }}
          />

          {/* Custom Cursor */}
          <div
            className="cursor-dot"
            style={{ left: cursorDot.x, top: cursorDot.y }}
            aria-hidden="true"
          />
          <div
            className="cursor-ring"
            style={{ left: cursorRing.x, top: cursorRing.y }}
            aria-hidden="true"
          />

          {/* Floating Particles */}
          <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            {PARTICLES.map(p => (
              <motion.div
                key={p.id}
                className="particle"
                style={{
                  left:     `${p.x}%`,
                  top:      `${p.y}%`,
                  width:    p.size,
                  height:   p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  '--dur':   `${p.dur}s`,
                  '--delay': `${p.delay}s`,
                }}
                animate={{
                  y:    [0, -40, 20, 0],
                  x:    [0, 15, -10, 0],
                  opacity: [0.4, 1, 0.6, 0.4],
                  scale:   [1, 1.4, 0.8, 1]
                }}
                transition={{
                  duration: p.dur,
                  delay:    p.delay,
                  repeat:   Infinity,
                  ease:     'easeInOut'
                }}
              />
            ))}
          </div>

          <ScrollProgress />
          <Navbar />

          <main className="relative z-10">
            {[
              { id: 'home',       Component: Home },
              { id: 'about',      Component: About },
              { id: 'projects',   Component: Projects },
              { id: 'experience', Component: Experience },
              { id: 'contact',    Component: Contact }
            ].map(({ id, Component }, i) => (
              <motion.section
                key={id}
                id={id}
                className="scroll-section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08, margin: '-60px' }}
                transition={{ delay: 0 }}
              >
                <Component />
              </motion.section>
            ))}
          </main>

          <Footer />
          <ScrollToTop />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
