import { AnimatePresence, motion } from 'framer-motion'
import { Bookmark, Check, ChevronLeft, CloudRain, Droplets, ExternalLink, Map, MessageCircle, Mic, Navigation, Send, Share2, ShieldAlert, Volume2, Wind } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

const suggestions = ['Will it rain tomorrow?', 'Should I carry an umbrella?', 'Is it safe to travel?', 'Best time for farming?']

export function ChatScreen() {
  const [input, setInput] = useState('')
  const [question, setQuestion] = useState('Will it rain tomorrow?')
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [saved, setSaved] = useState(false)

  const askQuestion = (event?: FormEvent) => {
    event?.preventDefault()
    const nextQuestion = input.trim() || question
    setQuestion(nextQuestion)
    setInput('')
    setIsThinking(true)
    window.setTimeout(() => setIsThinking(false), 900)
  }

  return <div className="weather-chat-screen"><div className="chat-header"><button aria-label="Go back"><ChevronLeft size={17} /></button><span><span className="chat-ai-avatar"><MessageCircle size={13} /></span><strong>WeatherLY AI</strong><small>Patna · Online</small></span><button className={isListening ? 'listening' : ''} aria-label="Voice mode" onClick={() => setIsListening((value) => !value)}><Mic size={16} /></button></div><div className="chat-suggestions"><small>Try asking</small><div>{suggestions.map((suggestion) => <button onClick={() => { setInput(suggestion); setQuestion(suggestion) }} key={suggestion}>{suggestion}</button>)}</div></div><div className="chat-thread"><motion.div className="chat-user-message" key={question} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}><span className="chat-user-avatar">S</span><p>{question}</p></motion.div><AnimatePresence mode="wait">{isThinking ? <motion.div className="chat-thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className="chat-ai-avatar"><MessageCircle size={13} /></span><i /><i /><i /><small>WeatherLY is thinking</small></motion.div> : <motion.div className="chat-answer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span className="chat-ai-avatar"><MessageCircle size={13} /></span><div><p>Yes. Heavy rainfall is expected after <strong>3 PM</strong> in Patna. Plan outdoor travel before then.</p><div className="weather-response-card"><div className="response-stat"><CloudRain size={14} /><span>Rain probability<strong>87%</strong></span></div><div className="response-stat"><Navigation size={14} /><span>Temperature<strong>29°C</strong></span></div><div className="response-stat"><Wind size={14} /><span>Wind<strong>18 km/h</strong></span></div><div className="response-stat"><Droplets size={14} /><span>Humidity<strong>81%</strong></span></div><div className="response-alert"><ShieldAlert size={14} /><span>Flood risk <strong>Moderate</strong></span></div></div><div className="chat-quick-actions"><button><Map size={12} /> Radar</button><button><ExternalLink size={12} /> Map</button><button><Volume2 size={12} /> Listen</button><button onClick={() => setSaved((value) => !value)}>{saved ? <Check size={12} /> : <Bookmark size={12} />} {saved ? 'Saved' : 'Save'}</button><button><Share2 size={12} /> Share</button></div></div></motion.div>}</AnimatePresence></div><div className="chat-safety"><ShieldAlert size={13} /><span>Safety tip: Avoid low-lying roads after 3 PM.</span></div>{isListening && <div className="chat-voice-bar"><div className="chat-voice-wave"><i /><i /><i /><i /><i /><i /></div><span>Listening to you...</span></div>}<form className="chat-input" onSubmit={askQuestion}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask WeatherLY anything..." aria-label="Message WeatherLY" /><button type="button" aria-label="Voice input" onClick={() => setIsListening((value) => !value)}><Mic size={15} /></button><button type="submit" aria-label="Send message"><Send size={15} /></button></form></div>
}
