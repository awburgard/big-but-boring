import React from 'react'

interface ProgramsPresentationProps {
  programs: any[]
  estimatedMaxes: any | null
  loading: boolean
  error: string | null
  onEndProgram: (programId: string) => void
}

const ProgramsPresentation: React.FC<ProgramsPresentationProps> = ({
  programs,
  estimatedMaxes,
  loading,
  error,
  onEndProgram,
}) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Your Programs</h1>
      {estimatedMaxes && (
        <div>
          <h2>Your Estimated One Rep Maxes</h2>
          <p>Squat: {estimatedMaxes.squat}</p>
          <p>Bench Press: {estimatedMaxes.bench_press}</p>
          <p>Deadlift: {estimatedMaxes.deadlift}</p>
          <p>Shoulder Press: {estimatedMaxes.shoulder_press}</p>
        </div>
      )}
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <div>
              <p>
                Start Date: {new Date(program.start_date).toLocaleDateString()}
              </p>
              <p>Status: {program.completed ? 'Completed' : 'Active'}</p>
              <button onClick={() => onEndProgram(program.id)}>
                End Program
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProgramsPresentation
