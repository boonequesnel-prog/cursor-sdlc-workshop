import { useState } from 'react'

export default function InputForm({ onGenerate }) {
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('')
  const [injuryHistory, setInjuryHistory] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!age || !goal.trim()) return
    onGenerate({ age: Number(age), goal: goal.trim(), injuryHistory: injuryHistory.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <h2>Your Profile</h2>

      <label>
        Age
        <input
          type="number"
          min="10"
          max="100"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="e.g. 30"
          required
        />
      </label>

      <label>
        Fitness Goal
        <input
          type="text"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder="e.g. lose weight, run a 5K, build upper body strength"
          required
        />
      </label>

      <label>
        Injury History
        <textarea
          value={injuryHistory}
          onChange={e => setInjuryHistory(e.target.value)}
          placeholder="e.g. torn ACL in 2019, chronic lower back pain, sprained ankle last year"
          rows={3}
        />
        <span className="hint">Include past and current injuries so we can plan around them.</span>
      </label>

      <button type="submit">Generate Schedule</button>
    </form>
  )
}
