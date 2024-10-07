import React from 'react'
import ProgramsPresentation from '../components/ProgramsPresentation'
import usePrograms from '../hooks/usePrograms'

const ProgramsContainer: React.FC = () => {
  const { programs, estimatedMaxes, error, loading, markProgramAsCompleted } =
    usePrograms()

  const handleEndProgram = async (programId: string) => {
    const success = await markProgramAsCompleted(programId)
    if (!success) {
      // Handle any additional failure cases if necessary
    }
  }

  return (
    <ProgramsPresentation
      programs={programs}
      estimatedMaxes={estimatedMaxes}
      loading={loading}
      error={error}
      onEndProgram={handleEndProgram}
    />
  )
}

export default ProgramsContainer
