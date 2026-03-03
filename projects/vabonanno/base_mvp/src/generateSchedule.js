const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const WORKOUTS = {
  'Light Cardio':         ['20 min brisk walk', '15 min cycling', '20 min elliptical'],
  'Full Body Strength':   ['3x10 squats', '3x10 push-ups', '3x10 dumbbell rows', '3x15 lunges'],
  'Rest & Stretch':       ['10 min foam rolling', 'Hip flexor stretch 2x30s', 'Hamstring stretch 2x30s'],
  'Interval Cardio':      ['30s sprint / 60s walk x8', '20 min HIIT circuit', 'Jump rope intervals 15 min'],
  'Long Walk / Jog':      ['30-45 min jog at easy pace', '45 min brisk walk', '30 min trail hike'],
  'Rest Day':             ['Full rest — hydrate well', 'Light walk if desired', 'Gentle stretching 10 min'],
  'Upper Body':           ['3x10 bench press', '3x10 overhead press', '3x12 bicep curls', '3x12 tricep dips'],
  'Lower Body':           ['3x10 squats', '3x10 Romanian deadlifts', '3x12 leg press', '3x15 calf raises'],
  'Push Day':             ['3x10 bench press', '3x10 shoulder press', '3x12 tricep pushdowns'],
  'Pull Day':             ['3x10 pull-ups or lat pulldown', '3x10 barbell rows', '3x12 face pulls'],
  'Legs & Core':          ['3x10 front squats', '3x15 walking lunges', '3x20 bicycle crunches', 'Plank 3x45s'],
  'Steady-State Run':     ['30-40 min at conversational pace', 'Keep heart rate zone 2'],
  'Cross-Training':       ['30 min cycling', '20 min rowing', '3x10 bodyweight squats'],
  'Tempo Run':            ['10 min warm-up jog', '20 min at threshold pace', '10 min cool-down'],
  'Interval Sprints':     ['6x400m at 5K pace', '90s recovery between reps', '10 min warm-up/cool-down'],
  'Long Run':             ['45-60 min easy pace', 'Focus on steady breathing', 'Hydrate every 20 min'],
  'Yoga / Mobility':      ['30 min yoga flow', 'Sun salutations x5', 'Pigeon pose 2 min each side'],
  'Active Recovery':      ['20 min easy walk', '15 min gentle swimming', 'Foam roll full body'],
  'Upper Body & Core':    ['3x10 seated press', '3x12 lat pulldown', '3x20 crunches', 'Plank 3x45s'],
  'Lower Body & Core':    ['3x10 squats', '3x12 lunges', '3x20 bicycle crunches', 'Plank 3x45s'],
  'Light Arms & Mobility': ['3x12 bicep curls', '3x12 lateral raises', '10 min mobility drills'],
  'Swimming / Cycling':   ['30 min swimming laps', '30-40 min stationary bike', '20 min water jogging'],
}

const PLANS = {
  weight: [
    { type: 'cardio', label: 'Light Cardio' },
    { type: 'strength', label: 'Full Body Strength' },
    { type: 'rest', label: 'Rest & Stretch' },
    { type: 'cardio', label: 'Interval Cardio' },
    { type: 'strength', label: 'Full Body Strength' },
    { type: 'cardio', label: 'Long Walk / Jog' },
    { type: 'rest', label: 'Rest Day' },
  ],
  muscle: [
    { type: 'strength', label: 'Upper Body' },
    { type: 'strength', label: 'Lower Body' },
    { type: 'rest', label: 'Rest & Stretch' },
    { type: 'strength', label: 'Push Day' },
    { type: 'strength', label: 'Pull Day' },
    { type: 'strength', label: 'Legs & Core' },
    { type: 'rest', label: 'Rest Day' },
  ],
  endurance: [
    { type: 'cardio', label: 'Steady-State Run' },
    { type: 'strength', label: 'Cross-Training' },
    { type: 'cardio', label: 'Tempo Run' },
    { type: 'rest', label: 'Rest & Stretch' },
    { type: 'cardio', label: 'Interval Sprints' },
    { type: 'cardio', label: 'Long Run' },
    { type: 'rest', label: 'Rest Day' },
  ],
  wellness: [
    { type: 'cardio', label: 'Light Cardio' },
    { type: 'strength', label: 'Upper Body' },
    { type: 'rest', label: 'Rest & Stretch' },
    { type: 'cardio', label: 'Yoga / Mobility' },
    { type: 'strength', label: 'Lower Body' },
    { type: 'recovery', label: 'Active Recovery' },
    { type: 'rest', label: 'Rest Day' },
  ],
}

const GOAL_KEYWORDS = [
  { keys: ['lose', 'weight', 'fat', 'slim', 'lean', 'cut', 'tone'], plan: 'weight' },
  { keys: ['muscle', 'bulk', 'strength', 'strong', 'lift', 'gain', 'build'], plan: 'muscle' },
  { keys: ['endurance', 'run', '5k', '10k', 'marathon', 'cardio', 'stamina'], plan: 'endurance' },
]

function matchGoalToPlan(goalText) {
  const lower = goalText.toLowerCase()
  for (const { keys, plan } of GOAL_KEYWORDS) {
    if (keys.some(k => lower.includes(k))) return plan
  }
  return 'wellness'
}

const INJURY_KEYWORDS = [
  { keys: ['knee', 'acl', 'mcl', 'meniscus', 'patella'], area: 'knee' },
  { keys: ['back', 'spine', 'lumbar', 'disc', 'herniat'], area: 'back' },
  { keys: ['shoulder', 'rotator', 'cuff', 'deltoid'], area: 'shoulder' },
  { keys: ['ankle', 'achilles', 'foot', 'plantar'], area: 'ankle' },
]

function detectInjuries(historyText) {
  if (!historyText) return []
  const lower = historyText.toLowerCase()
  return INJURY_KEYWORDS
    .filter(({ keys }) => keys.some(k => lower.includes(k)))
    .map(({ area }) => area)
}

const INJURY_SWAPS = {
  knee:     { avoid: ['Lower Body', 'Legs & Core'], replacement: 'Upper Body & Core' },
  back:     { avoid: ['Pull Day'], replacement: 'Light Arms & Mobility' },
  shoulder: { avoid: ['Upper Body', 'Push Day'], replacement: 'Lower Body & Core' },
  ankle:    { avoid: ['Long Run', 'Steady-State Run', 'Interval Sprints'], replacement: 'Swimming / Cycling' },
}

const TOTAL_DAYS = 30

export default function generateSchedule({ age, goal, injuryHistory }) {
  const planKey = matchGoalToPlan(goal)
  const weekPlan = PLANS[planKey]

  const today = new Date()
  let schedule = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dayOfWeek = DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]
    const template = weekPlan[i % 7]
    return { ...template, day: dayOfWeek, dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
  })

  const detectedInjuries = detectInjuries(injuryHistory)

  for (const area of detectedInjuries) {
    const swap = INJURY_SWAPS[area]
    if (!swap) continue
    schedule = schedule.map(d =>
      swap.avoid.includes(d.label) ? { ...d, label: swap.replacement } : d
    )
  }

  if (age >= 50) {
    schedule = schedule.map(d =>
      d.type === 'cardio' ? { ...d, label: d.label + ' (low impact)' } : d
    )
  }

  schedule = schedule.map(d => ({
    ...d,
    workouts: WORKOUTS[d.label] || WORKOUTS[d.label.replace(' (low impact)', '')] || [],
  }))

  return schedule
}
