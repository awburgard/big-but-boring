type DayViewPresentationProps = {
  dayData: any
  notes: string
  status: 'completed' | 'incomplete'
  onNotesChange: (newNotes: string) => void
  onStatusToggle: () => void
}

const DayViewPresentation = ({
  dayData,
  notes,
  status,
  onNotesChange,
  onStatusToggle,
}: DayViewPresentationProps) => (
  <div>
    <h2>{dayData?.name}</h2>
    <div>
      {dayData?.lifts?.map((lift: any, index: number) => (
        <div key={index}>
          <h3>{lift.name}</h3>
          <p>
            Sets: {lift.sets}, Reps: {lift.reps}, Percentage: {lift.percentage}
          </p>
        </div>
      ))}
    </div>
    <textarea
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      placeholder='Add notes for this day'
    />
    <button onClick={onStatusToggle}>
      Mark as {status === 'completed' ? 'Incomplete' : 'Completed'}
    </button>
  </div>
)

export default DayViewPresentation
