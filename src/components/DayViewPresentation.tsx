import React from 'react'

interface DayViewPresentationProps {
  dayData: any | null
  loading: boolean
  error: string | null
}

const DayViewPresentation: React.FC<DayViewPresentationProps> = ({
  dayData,
  loading,
  error,
}) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Day {dayData.day_number}</h1>
      {dayData.current_day_lifts.map((lift: any) => (
        <p key={lift.id}>
          {lift.lift_name}: {lift.set_reps} ({lift.percentage}%)
        </p>
      ))}
    </div>
  )
}

export default DayViewPresentation
