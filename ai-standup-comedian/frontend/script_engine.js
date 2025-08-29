// Tiny local joke/script generator (no API keys).
// Replace with a backend LLM call in production.

function generateSet({ topic, style = 'friendly', length = 'short' }) {
  const sentencesPerLength = { short: 5, medium: 9, long: 13 };
  const lines = sentencesPerLength[length] || 5;
  const cleanTopic = (topic || 'life').trim();

  // Banks & templates
  const openers = {
    friendly: [
      `So I’ve been thinking about ${cleanTopic}… and honestly, it’s not what my parents promised.`,
      `Anyone here into ${cleanTopic}? Yeah, me neither till yesterday.`,
      `${capitalize(cleanTopic)} is like free Wi‑Fi: available everywhere but never good where you need it.`
    ],
    observational: [
      `Observation: ${capitalize(cleanTopic)} has rules nobody agreed to, yet we all follow.`,
      `Is it just me, or does ${cleanTopic} behave differently when adults are watching?`,
      `${capitalize(cleanTopic)} is a social experiment and we’re the unpaid interns.`
    ],
    sarcastic: [
      `${capitalize(cleanTopic)}? Oh great, my favorite topic after taxes and small talk.`,
      `I love ${cleanTopic}. Said nobody, ever. Except that one guy on LinkedIn.`,
      `Let’s discuss ${cleanTopic}, because my therapist said “be honest” and I took it personally.`
    ],
    edgy: [
      `${capitalize(cleanTopic)} is the reason group chats are on mute.`,
      `When ${cleanTopic} happens, my brain just updates its privacy policy.`,
      `${capitalize(cleanTopic)} taught me two things: patience and search history management.`
    ]
  };

  const transitions = [
    `Anyway, moving on—`,
    `Here’s the weird part—`,
    `But wait, it gets better—`,
    `Now picture this—`,
    `Long story short—`
  ];

  const punchPatterns = [
    t => `I tried to master ${t}. Turns out the trick is… lower your standards. Boom. Success.`,
    t => `People say “just be yourself” with ${t}. Bold of them to assume that’s legal.`,
    t => `The secret to ${t} is confidence. And when that fails, Wi‑Fi and a pretend smile.`,
    t => `I Googled “${t} hacks” and the first tip was: have rich parents.`,
    t => `I asked a friend about ${t}. They replied with a PDF. It was just a mirror.`
  ];

  const closers = [
    `You’ve been awesome. If ${cleanTopic} calls, tell it I’m on a break.`,
    `That’s my time! Remember—${cleanTopic} is temporary, screenshots are forever.`,
    `Thanks folks! Be kind, hydrate, and avoid group projects about ${cleanTopic}.`
  ];

  const styleKey = (style === 'edgy') ? 'edgy' : style;
  const opener = pick(openers[styleKey] || openers.friendly);
  const linesOut = [ opener ];

  for (let i = 0; i < lines - 2; i++) {
    const seg = `${pick(transitions)} ${pick(punchPatterns)(cleanTopic)}
`;
    linesOut.push(seg);
  }
  linesOut.push(pick(closers));

  return linesOut.join('\n');
}

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// Export
window.ScriptEngine = { generateSet };
