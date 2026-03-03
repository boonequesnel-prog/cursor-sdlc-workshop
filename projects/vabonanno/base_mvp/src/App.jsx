import { useState } from 'react'
import InputForm from './components/InputForm'
import Calendar from './components/Calendar'
import generateSchedule from './generateSchedule'
import './App.css'

export default function App() {
  const [schedule, setSchedule] = useState(null)

  function handleGenerate(profile) {
    setSchedule(generateSchedule(profile))
  }

  return (
    <div className="app">
      <h1>Fitness & Recovery Calendar</h1>
      <InputForm onGenerate={handleGenerate} />
      {schedule && (
        <>
          <button className="reset-btn" onClick={() => setSchedule(null)}>Reset</button>
          <Calendar schedule={schedule} />
        </>
      )}
    </div>
  )
}
