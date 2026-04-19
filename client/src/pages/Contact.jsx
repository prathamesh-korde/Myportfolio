import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const fadeUp   = { hidden:{opacity:0,y:40}, visible:{ opacity:1,y:0, transition:{ duration:0.7 } } }
const slideL   = { hidden:{opacity:0,x:-60}, visible:{ opacity:1,x:0, transition:{ duration:0.7,ease:[0.23,1,0.32,1] } } }
const slideR   = { hidden:{opacity:0,x:60},  visible:{ opacity:1,x:0, transition:{ duration:0.7,ease:[0.23,1,0.32,1] } } }

/* Animated input */
function AnimInput({ label, id, type='text', name, value, onChange, required, placeholder, as='input', rows }) {
  const [focused, setFocused] = useState(false)
  const Tag = as
  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="block mb-2 text-sm font-semibold transition-colors"
        animate={{ color: focused ? '#60a5fa' : '#9ca3af' }}
      >
        {label}
      </motion.label>
      <div className="relative">
        <Tag
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-gray-900/80 border rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all resize-none font-medium text-sm"
          style={{
            borderColor: focused ? 'rgba(96,165,250,0.6)' : 'rgba(75,85,99,0.5)',
            boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.1)' : 'none'
          }}
        />
        {/* Focus line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
          style={{ background:'linear-gradient(90deg,#3b82f6,#a855f7)' }}
          animate={{ width: focused ? '100%' : '0%' }}
          transition={{ duration:0.35 }}
        />
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm]       = useState({ name:'', email:'', message:'' })
  const [status, setStatus]   = useState(null)
  const [msg, setMsg]         = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null); setLoading(true)
    try {
      await emailjs.send(
        'service_jtpu1ad', 'template_9vl6mmb',
        { from_name:form.name, from_email:form.email, message:form.message, to_email:'kordeprathamesh01@gmail.com' },
        'IcL6_PR3PplHT5C2g'
      )
      setStatus('success')
      setMsg('🚀 Message sent! I will get back to you within 24 hours.')
      setForm({ name:'', email:'', message:'' })
    } catch {
      setStatus('error')
      setMsg('❌ Failed to send. Please try again or email me directly.')
    } finally { setLoading(false) }
  }

  const contactCards = [
    { icon:'📧', label:'Email',    value:'kordeprathamesh01@gmail.com',  link:'mailto:kordeprathamesh01@gmail.com', color:'#3b82f6' },
    { icon:'📞', label:'Phone',    value:'+91 9284797286',                link:'tel:+919284797286',                  color:'#a855f7' },
    { icon:'📍', label:'Location', value:'Nagpur, Maharashtra',           link:'https://maps.google.com/?q=Nagpur',  color:'#06b6d4' },
    { icon:'💼', label:'LinkedIn', value:'Connect with me',               link:'https://linkedin.com/in/prathameshkorde', color:'#f472b6' }
  ]

  return (
    <div className="min-h-screen py-20" style={{ background:'linear-gradient(180deg,#050b1a 0%,#030712 100%)' }}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-pink-500/30 mb-6"
            whileHover={{ scale:1.05 }}
          >
            <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity }}>💬</motion.span>
            <span className="text-pink-300 text-sm font-medium tracking-wider">LET'S TALK</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-animated">Get In Touch</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Ready to collaborate? Let's bring your ideas to life.
          </p>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            initial={{ width:0 }} whileInView={{ width:'100px' }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:0.3 }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* ── LEFT: Info ── */}
          <motion.div
            variants={slideL} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}
            className="space-y-6"
          >
            {/* Availability card */}
            <motion.div
              whileHover={{ y:-4, boxShadow:'0 20px 60px rgba(59,130,246,0.2)' }}
              className="glass rounded-2xl p-7 border border-blue-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl" />

              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ boxShadow:['0 0 0 0 rgba(74,222,128,0.4)','0 0 0 10px rgba(74,222,128,0)'] }}
                  transition={{ duration:1.5, repeat:Infinity }}
                />
                <h3 className="text-xl font-bold text-white">Currently Available</h3>
              </div>
              <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                I'm open to new opportunities and exciting projects. Whether you need a full-stack developer,
                technical consultant, or someone to bring your ideas to life — let's connect!
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Full-time','Part-time','Contract','Freelance'].map((type,i) => (
                  <motion.span
                    key={type}
                    whileHover={{ scale:1.07, y:-2 }}
                    className="px-3 py-1.5 glass rounded-full text-xs font-semibold text-blue-300 border border-blue-500/30"
                    initial={{ opacity:0, scale:0.7 }}
                    whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.1+i*0.08 }}
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
              {[
                { icon:'⚡', text:'Quick Response – Usually within 24 hours', color:'#4ade80' },
                { icon:'🌍', text:'Remote Ready – Work with global teams',     color:'#60a5fa' }
              ].map((item,i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-400"
                  initial={{ opacity:0, x:-20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.3+i*0.1 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact info grid */}
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((card, idx) => (
                <motion.a
                  key={idx}
                  href={card.link}
                  target="_blank" rel="noreferrer"
                  initial={{ opacity:0, y:30, scale:0.9 }}
                  whileInView={{ opacity:1, y:0, scale:1 }}
                  viewport={{ once:true }} transition={{ delay:0.1+idx*0.1 }}
                  whileHover={{ y:-6, boxShadow:`0 20px 45px ${card.color}25`, borderColor:`${card.color}50` }}
                  whileTap={{ scale:0.97 }}
                  className="glass rounded-2xl p-5 border border-gray-700/60 group transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity"
                    style={{ background:`radial-gradient(circle at 30% 30%,${card.color},transparent)` }}
                  />
                  <motion.div
                    className="text-3xl mb-3"
                    animate={{ y:[0,-3,0] }}
                    transition={{ duration:2+idx*0.4, repeat:Infinity }}
                  >{card.icon}</motion.div>
                  <div className="text-xs text-gray-500 mb-1 font-mono">{card.label}</div>
                  <div className="text-white text-xs font-medium group-hover:text-blue-300 transition-colors break-all leading-tight" style={{ color:card.color }}>
                    {card.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            variants={slideR} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}
          >
            <motion.div
              whileHover={{ y:-2 }}
              className="glass rounded-2xl p-8 border border-gray-700/60 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span>✉️</span> Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimInput
                  label="Your Name" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  required placeholder="John Doe"
                />
                <AnimInput
                  label="Your Email" id="email" type="email" name="email"
                  value={form.email} onChange={handleChange}
                  required placeholder="john@example.com"
                />
                <AnimInput
                  label="Your Message" id="message" name="message"
                  value={form.message} onChange={handleChange}
                  required placeholder="Tell me about your project..." as="textarea" rows={6}
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={ !loading ? { scale:1.03, boxShadow:'0 0 30px rgba(59,130,246,0.4)' } : {} }
                  whileTap={ !loading ? { scale:0.97 } : {} }
                  className="w-full py-4 rounded-xl font-bold text-white relative overflow-hidden btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background:'linear-gradient(135deg,#3b82f6,#7c3aed)' }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate:360 }}
                        transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🚀</span> Send Message
                    </span>
                  )}
                </motion.button>
              </form>

              {/* Status message */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    key="status"
                    initial={{ opacity:0, y:20, scale:0.9 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, scale:0.9 }}
                    transition={{ type:'spring', stiffness:200, damping:20 }}
                    className={`mt-5 p-4 rounded-xl text-sm font-medium ${
                      status==='success'
                        ? 'bg-green-500/15 border border-green-500/40 text-green-300'
                        : 'bg-red-500/15 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {msg}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
