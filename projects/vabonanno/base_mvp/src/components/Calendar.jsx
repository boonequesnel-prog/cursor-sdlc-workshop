const TYPE_EMOJI = {
  strength: '\u{1F4AA}',
  cardio: '\u{1F3C3}',
  rest: '\u{1F6CC}',
  recovery: '\u{1F9D8}',
}

export default function Calendar({ schedule }) {
  return (
    <div className="calendar">
      <h2>{'\u{1F4C5}'} Your 30-Day Plan</h2>
      <div className="legend">
        <span className="legend-item strength">{'\u{1F4AA}'} Strength</span>
        <span className="legend-item cardio">{'\u{1F3C3}'} Cardio</span>
        <span className="legend-item rest">{'\u{1F6CC}'} Rest</span>
        <span className="legend-item recovery">{'\u{1F9D8}'} Recovery</span>
      </div>
      <div className="month-grid">
        {schedule.map((day, i) => (
          <div key={i} className={`day-card ${day.type}`}>
            <div className="day-date">{day.dateLabel}</div>
            <div className="day-name">{day.day}</div>
            <div className="day-emoji">{TYPE_EMOJI[day.type] || '\u{2B50}'}</div>
            <div className="day-label">{day.label}</div>
            {day.workouts.length > 0 && (
              <ul className="day-workouts">
                {day.workouts.map((w, j) => (
                  <li key={j}>{w}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
