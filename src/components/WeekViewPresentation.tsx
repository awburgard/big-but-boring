type WeekViewPresentationProps = {
  weekData: any[]
  onDayClick: (dayId: string) => void
}

const WeekViewPresentation = ({
  weekData,
  onDayClick,
}: WeekViewPresentationProps) => (
  <div>
    <h2>Program Week</h2>
    <div>
      {weekData.map((day) => (
        <div key={day.id} onClick={() => onDayClick(day.id)}>
          <h3>{day.name}</h3>
          <p>Status: {day.status}</p>
        </div>
      ))}
    </div>
  </div>
)

export default WeekViewPresentation
