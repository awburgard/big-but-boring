import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProgramDetailPresentation from '../components/ProgramDetailPresentation'
import { fetchProgramMaxes } from '../modules/programService'

interface Maxes {
  lift_name: string
  training_max: number
}

const ProgramDetailContainer: React.FC = () => {
  const { programId } = useParams<{ programId: string }>()
  const navigate = useNavigate() // Use navigate instead of useHistory in React Router v6
  const [maxes, setMaxes] = useState<Maxes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!programId) {
      // Handle case when programId is undefined
      setError('Program ID is missing.')
      navigate('/programs') // Redirect to the programs list, or any other page
      return
    }

    const loadProgramMaxes = async () => {
      try {
        const maxesData = await fetchProgramMaxes(programId)
        setMaxes(maxesData ?? [])
      } catch (err) {
        setError('Failed to fetch program maxes.')
      } finally {
        setLoading(false)
      }
    }

    loadProgramMaxes()
  }, [programId, navigate])

  return (
    <ProgramDetailPresentation
      programId={programId ?? 'Unknown'}
      maxes={maxes}
      loading={loading}
      error={error}
    />
  )
}

export default ProgramDetailContainer
