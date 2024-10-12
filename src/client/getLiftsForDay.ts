import supabase from './supabase' // Adjust the import based on your setup

interface GetLiftsForDayProps {
  programId: string
  weekNumber: number
  dayNumber: number
}

// Function to fetch lifts for a specific program, week, and day
export const getLiftsForDay = async ({
  programId,
  weekNumber,
  dayNumber,
}: GetLiftsForDayProps) => {
  const { data, error } = await supabase
    .from('current_day_lifts') // Query the view
    .select('*') // Select all relevant columns
    .eq('program_id', programId) // Filter by program ID
    .eq('week_number', weekNumber) // Filter by week number
    .eq('day_number', dayNumber) // Filter by day number

  if (error) {
    console.error('Error fetching lifts:', error.message)
    throw error
  }

  return data
}
