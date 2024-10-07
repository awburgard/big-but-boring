import supabase from '../supabase'

const completeProgram = async (programId: string) => {
  const { error } = await supabase
    .from('programs')
    .update({ status: 'completed', end_date: new Date().toISOString() })
    .eq('id', programId)

  if (error) {
    console.error('Error completing the program:', error)
  }
}

export default completeProgram
