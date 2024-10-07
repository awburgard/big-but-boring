import supabase from '../supabase'

const endProgram = async (programId: string) => {
  const { error } = await supabase
    .from('programs')
    .update({ status: 'ended', end_date: new Date().toISOString() })
    .eq('id', programId)

  if (error) {
    console.error('Error ending the program:', error)
  }
}

export default endProgram
