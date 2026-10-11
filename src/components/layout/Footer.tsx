import { motion, useInView } from 'framer-motion'
import { ArrowRight, Code2, Globe2, Heart, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Weather Maps', to: '/maps' },
  { label: 'Disaster Alerts', to: '/alerts' },
  { label: 'EcoReels', to: '/eco-reels' },
  { label: 'Climate Analytics', to: '/analytics' },
  { label: 'About & Tech', to: '/about' },
]

const resources = ['Documentation', 'Prototype', 'API Status', 'Privacy', 'Terms']

export function Footer() {
  const endingRef = useRef<HTMLElement>(null)
  const endingVisible = useInView(endingRef, { once: true, amount: 0.45 })

  return (
    <footer className="premium-footer">
      <section
        className={`footer-closing${endingVisible ? ' ending-active' : ''}`}
        ref={endingRef}
      >
        <div className="footer-stars">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="footer-cloud footer-cloud-left" />
        <div className="footer-cloud footer-cloud-right" />
        <motion.div
          className="footer-earth"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={
            endingVisible
              ? { opacity: 1, scale: 1, rotate: 360 }
              : { opacity: 0.5, scale: 0.82 }
          }
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            rotate: { duration: 36, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Globe2 size={37} />
        </motion.div>
        <motion.div
          className="footer-closing-content"
          initial={{ opacity: 0, y: 20 }}
          animate={endingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <span className="kicker">WeatherLY</span>
          <h2>
            From Weather Awareness<br />
            <strong>to Climate Action.</strong>
          </h2>
          <p>
            Empowering citizens, farmers, researchers, and governments with AI-driven weather intelligence for a safer, smarter and more sustainable India.
          </p>
          <div className="footer-closing-actions">
            <Link to="/dashboard">
              <Button>
                Start WeatherLY <ArrowRight size={16} />
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="ghost">
                <Code2 size={15} /> View Source Code
              </Button>
            </a>
          </div>
        </motion.div>
        <motion.div
          className="secret-ending"
          initial={{ opacity: 0, y: 16 }}
          animate={endingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <span className="sunrise-glow" />
          <span className="rainbow" />
          <strong>
            One Platform.<br />
            One Conversation.<br />
            One Safer Tomorrow.
          </strong>
          <small>
            WeatherLY<br />
            <b>AI for Every Citizen.</b>
          </small>
        </motion.div>
      </section>

      <section className="footer-main">
        <div className="footer-brand-column">
          <Link className="footer-brand" to="/">
            <span><Sparkles size={17} /></span>WeatherLY
          </Link>
          <p>AI Powered Weather Intelligence Platform</p>
          <small>
            Built for<br />
            <strong>Smart India Hackathon 2026</strong>
          </small>
        </div>
        <div className="footer-link-column">
          <h3>Sections & Pages</h3>
          {quickLinks.map(({ label, to }) => (
            <Link to={to} key={label}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-link-column">
          <h3>Resources</h3>
          {resources.map((resource) => (
            <a
              href={resource === 'GitHub' ? 'https://github.com' : '#'}
              key={resource}
            >
              {resource}
            </a>
          ))}
        </div>
        <div className="footer-contact-column">
          <h3>Connect</h3>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Code2 size={15} /> GitHub
          </a>
          <a href="#">
            <Globe2 size={15} /> LinkedIn
          </a>
          <a href="mailto:hello@weatherly.ai">
            <Mail size={15} /> Email us
          </a>
          <span>
            <ShieldCheck size={15} /> Built with care
          </span>
        </div>
      </section>
      <div className="footer-bottom">
        <span>© 2026 WeatherLY</span>
        <span>Designed & Developed for Smart India Hackathon 2026</span>
        <span>Made with <Heart size={12} /> for Climate Resilience</span>
      </div>
    </footer>
  )
}
