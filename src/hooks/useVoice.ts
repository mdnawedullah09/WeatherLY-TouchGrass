import { useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function useVoice() {
  const [listening, setListening] = useState(false);

  const startListening = (onResult: (text: string) => void, lang: string = "hi-IN") => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };

    recognition.start();
  };

  const speak = (text: string, lang: string = "hi-IN") => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const targetLang = lang.split('-')[0].toLowerCase();
        
        let selectedVoice = voices.find((v) => {
          const vName = v.name.toLowerCase();
          if (targetLang === 'hi') return vName.includes('hindi') || vName.includes('हिन्दी');
          if (targetLang === 'te') return vName.includes('telugu');
          if (targetLang === 'ta') return vName.includes('tamil');
          if (targetLang === 'mr') return vName.includes('marathi');
          if (targetLang === 'bn') return vName.includes('bengali') || vName.includes('bangla');
          return false;
        });
        
        if (!selectedVoice) {
          selectedVoice = voices.find((v) => v.lang === lang || v.lang.replace('_', '-') === lang);
        }
        
        if (!selectedVoice) {
          selectedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLang));
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true });
      setTimeout(() => {
        if (!window.speechSynthesis.speaking) doSpeak();
      }, 500);
    } else {
      doSpeak();
    }
  };

  return {
    listening,
    startListening,
    speak,
  };
}