import React, { useEffect, useState } from 'react'
import ProgramsPresentation from '../components/ProgramsPresentation'
import { cancelProgram, fetchPrograms } from '../modules/programService'
import { Outlet, useNavigate } from 'react-router-dom'

const ProgramsContainer: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate() // Initialize the useNavigate hook

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const programsData = await fetchPrograms()
        setPrograms(programsData ?? []) // Fallback to empty array if programsData is null
      } catch (err) {
        setError('Failed to fetch programs.')
      } finally {
        setLoading(false)
      }
    }

    loadPrograms()
  }, [])

  // Function to handle navigation to the detailed view
  const handleViewProgram = (programId: string) => {
    navigate(`/programs/${programId}`)
  }

  return (
    <>
      <ProgramsPresentation
        programs={programs}
        loading={loading}
        error={error}
        onEndProgram={cancelProgram}
        onViewProgram={handleViewProgram} // Pass navigation function to the presentation
      />
      <Outlet />
    </>
  )
}

export default ProgramsContainer
