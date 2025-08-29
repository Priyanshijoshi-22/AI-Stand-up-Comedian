// Joke/Script Generator
// Topic-specific for known topics, generic for unknown topics

function generateSet({ topic, style = 'friendly', length = 'short' }) {
  const sentencesPerLength = { short: 5, medium: 9, long: 13 };
  const maxLines = sentencesPerLength[length] || 5;
  const cleanTopic = (topic || 'life').trim().toLowerCase();

  // Grammar helper
  function topicForm(t) {
    if (t.endsWith("s")) return { subject: t, verb: "are", pronoun: "they" };
    return { subject: t, verb: "is", pronoun: "it" };
  }

  const { subject, verb, pronoun } = topicForm(cleanTopic);

  // Openers by style
  const openers = {
    friendly: [
      `So I’ve been thinking about ${subject}… and honestly, ${verb} nothing like I expected.`,
      `Anyone here into ${subject}? Yeah? Thought so.`,
      `${capitalize(subject)} ${verb} like free Wi-Fi: everyone talks about it, but ${pronoun} never works when you need it.`
    ],
    observational: [
      `Observation: ${capitalize(subject)} has rules nobody agreed to, but somehow we all follow.`,
      `Is it just me, or ${verb} ${subject} different when adults are watching?`,
      `${capitalize(subject)} ${verb} basically a social experiment and we’re the unpaid interns.`
    ],
    sarcastic: [
      `${capitalize(subject)}? Oh great, my favorite topic—right after taxes and small talk.`,
      `I love ${subject}. Said nobody, ever.`,
      `Let’s discuss ${subject}, because my therapist said “be honest”… and I took it personally.`
    ],
    edgy: [
      `${capitalize(subject)} ${verb} the reason group chats are on mute.`,
      `When ${subject} happens, my brain just updates its privacy policy.`,
      `${capitalize(subject)} taught me two things: patience and regret.`
    ]
  };

  // Transitions
  const transitions = [
    `Anyway, moving on—`,
    `Here’s the weird part—`,
    `But wait, it gets better—`,
    `Now picture this—`,
    `Long story short—`
  ];

  // Topic-specific jokes
  const topicSpecific = {
    ai: [
      t => `AI ${verb} like a toddler with a smartphone: curious, chaotic, and slightly terrifying.`,
      t => `Everyone talks about AI, but ${pronoun} mostly just steals my sleep and my snacks.`,
      t => `I asked AI for advice… now I need therapy.`
    ],
    brother: [
      t => `Having a ${t} is like sharing Netflix with someone who only watches the worst shows.`,
      t => `A ${t} will eat your food, roast you daily, and still borrow money with confidence.`,
      t => `The best part about having a ${t}? Nothing. The worst part? Everything else.`
    ],
    sister: [
      t => `A ${t} is basically a built-in bully with parental approval.`,
      t => `Living with a ${t} is like being in a reality show you never signed up for.`,
      t => `You don’t need horror movies if you have a ${t} borrowing your clothes.`
    ],
    phone: [
      t => `My ${t} battery goes from 100% to therapy session in 5 minutes.`,
      t => `The ${t} ${verb} smart, but somehow I’m still the dumb one scrolling till 3am.`,
      t => `My ${t} is like my love life—always on silent mode.`
    ],
    animals: [
      t => `${capitalize(t)} are great… until you realize they own YOU.`,
      t => `Owning ${t} is just paying rent for someone smaller but louder.`,
      t => `${capitalize(t)} are like toddlers, except cuter and with more fur.`
    ],
    study: [
      t => `They said ${t} would open doors. Yeah, to the fridge.`,
      t => `I Googled “${t} hacks”… first tip was: have rich parents.`,
      t => `The hardest part of ${t} is pretending you’re actually doing it.`
    ],
    college: [
      t => `${capitalize(t)} ${verb} just debt with Wi-Fi.`,
      t => `In ${t}, sleep becomes optional. Bad decisions don’t.`,
      t => `The best thing about ${t}? Graduation.`
    ],
    books: [
      t => `Reading ${t} is amazing… until Netflix drops a new season.`,
      t => `They say don’t judge a book by its cover. Cool, then why do covers exist?`,
      t => `${capitalize(t)} are proof we like stories… just less than TikTok.`,
      t => `Let’s be honest, ${t} ${verb} mostly just a reason to procrastinate.`
    ]
  };

  // Generic punchlines for unknown topics
  const genericPunchlines = [
    t => `${capitalize(t)} ${verb} like Wi-Fi: great when it works, mostly just disconnects at the worst time.`,
    t => `Every time I deal with ${t}, I question my life choices.`,
    t => `${capitalize(t)} was supposed to make me smarter… instead, ${pronoun} just made my snacks disappear.`,
    t => `I spent so much time on ${t}, even my phone told me to take a break.`,
    t => `They say ${t} makes you stronger. Cool—because now I have strength *and* trauma.`,
    t => `I thought I finally understood ${t}… turns out, that was just the introduction page.`,
    t => `Anyone here actually into ${t}? Yeah? Blink twice if you need help.`
  ];

  // Closers
  const closers = [
    `That’s my time! Remember—${subject} ${verb} temporary, but screenshots are forever.`,
    `You’ve been awesome! If ${subject} calls, tell ${pronoun} I’m busy.`,
    `Thanks folks! Stay hydrated, be kind, and avoid group projects about ${subject}.`
  ];

  // Start building script
  const styleKey = openers[style] ? style : 'friendly';
  const opener = pick(openers[styleKey]);
  const linesOut = [opener];

  // Choose pool: topic-specific or generic
  const pool = topicSpecific[cleanTopic] || genericPunchlines;

  // Track used jokes to avoid repeats
  const usedIndices = new Set();
  const numLines = Math.min(maxLines - 2, pool.length); // allow fewer lines if pool is small

  for (let i = 0; i < numLines; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * pool.length);
    } while (usedIndices.has(index) && usedIndices.size < pool.length);
    usedIndices.add(index);

    linesOut.push(`${pick(transitions)} ${pool[index](cleanTopic)}`);
  }

  // Add a closer
  linesOut.push(pick(closers));

  return linesOut.join('\n');
}

// Helpers
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Export
window.ScriptEngine = { generateSet };
