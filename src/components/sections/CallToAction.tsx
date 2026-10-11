import { motion } from 'framer-motion'
import { ArrowRight, Globe2, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'

export function CallToAction() {
  return (
    <section className="content-section final-cta-section" id="cta">
      <div className="cta-cloud cta-cloud-one" />
      <div className="cta-cloud cta-cloud-two" />
      <div className="cta-orbit"><Globe2 size={34} /></div>
      <motion.div
        className="final-cta-content"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="kicker">The next forecast starts here</span>
        <h2>
          Ready to experience<br />
          <strong>the future of weather intelligence?</strong>
        </h2>
        <p>One clear interface for every sky, signal, and decision ahead.</p>
        <div className="cta-actions">
          <Link to="/dashboard">
            <Button>
              Start WeatherLY <ArrowRight size={17} />
            </Button>
          </Link>
          <Link to="/maps">
            <Button variant="ghost">
              <Play size={15} /> Explore Maps
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
