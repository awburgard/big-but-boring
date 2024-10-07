import supabase from '../supabase'

const startNewProgram = async (userId: string) => {
  const { error } = await supabase.from('programs').insert({
    user_id: userId,
    start_date: new Date().toISOString(),
    status: 'active',
  })

  if (error) {
    console.error('Error starting a new program:', error)
  }
}

export default startNewProgram
