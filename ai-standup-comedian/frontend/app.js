// Orchestrates UI, local generation, TTS, and avatar animation.

const els = {
  topic: document.getElementById('topic'),
  style: document.getElementById('style'),
  length: document.getElementById('length'),
  script: document.getElementById('script'),
  generateBtn: document.getElementById('generateBtn'),
  performBtn: document.getElementById('performBtn'),
  stopBtn: document.getElementById('stopBtn'),
  mouth: document.getElementById('mouth')
};

let speaking = false;
let mouthTimer = null;

els.generateBtn.addEventListener('click', () => {
  const topic = els.topic.value || 'life';
  const style = els.style.value;
  const length = els.length.value;
  const out = window.ScriptEngine.generateSet({ topic, style, length });
  els.script.value = out;
  els.performBtn.disabled = !out.trim();
});

els.performBtn.addEventListener('click', () => {
  const text = els.script.value.trim();
  if (!text) return;
  ttsSpeak(text);
});

els.stopBtn.addEventListener('click', stopSpeech);

// Basic TTS via Web Speech Synthesis
function ttsSpeak(text){
  if (!('speechSynthesis' in window)) {
    alert('SpeechSynthesis not supported in this browser.');
    return;
  }

  stopSpeech();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1.02;
  utter.pitch = 1.0;
  utter.onstart = () => {
    speaking = true;
    els.stopBtn.disabled = false;
    els.performBtn.disabled = true;
    startMouth();
  };
  utter.onend = () => {
    speaking = false;
    els.stopBtn.disabled = true;
    els.performBtn.disabled = false;
    stopMouth();
  };
  utter.onerror = () => {
    speaking = false;
    els.stopBtn.disabled = true;
    els.performBtn.disabled = false;
    stopMouth();
  };

  // Try to pick a non-default voice if available
  const voices = speechSynthesis.getVoices();
  if (voices && voices.length) {
    // naive pick: first English voice
    const v = voices.find(v => /en/i.test(v.lang)) || voices[0];
    if (v) utter.voice = v;
  } else {
    // Some browsers load voices asynchronously
    speechSynthesis.onvoiceschanged = () => {
      const vs = speechSynthesis.getVoices();
      const v = vs.find(v => /en/i.test(v.lang)) || vs[0];
      if (v) utter.voice = v;
      speechSynthesis.speak(utter);
    };
  }

  speechSynthesis.speak(utter);
}

function stopSpeech(){
  if ('speechSynthesis' in window && speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
}

// Fake lip-sync: open/close mouth on a rhythmic timer while speaking
function startMouth(){
  const mouth = els.mouth;
  let open = false;
  stopMouth();
  mouthTimer = setInterval(() => {
    open = !open;
    if (open) {
      mouth.setAttribute('y', '76');
      mouth.setAttribute('height', '10');
      mouth.setAttribute('rx', '4');
    } else {
      mouth.setAttribute('y', '78');
      mouth.setAttribute('height', '4');
      mouth.setAttribute('rx', '2');
    }
  }, 120);
}

function stopMouth(){
  if (mouthTimer) clearInterval(mouthTimer);
  mouthTimer = null;
  const mouth = els.mouth;
  mouth.setAttribute('y', '78');
  mouth.setAttribute('height', '4');
  mouth.setAttribute('rx', '2');
}


// cd D:\ai-standup-comedian-python-backend\ai-standup-comedian\backend
// venv\Scripts\activate
// python server_flask.py

// cd D:\ai-standup-comedian-python-backend\ai-standup-comedian\frontend
// python -m http.server 5500

// http://127.0.0.1:5500