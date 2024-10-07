import { Button, TextField, Typography } from '@mui/material'

type SignupPresentationProps = {
  email: string
  password: string
  error: string | null
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const SignupPresentation = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignupPresentationProps) => (
  <form onSubmit={onSubmit}>
    <Typography variant='h6'>Sign Up</Typography>
    {error && <Typography color='error'>{error}</Typography>}
    <TextField
      type='email'
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      placeholder='Email'
      required
    />
    <TextField
      type='password'
      value={password}
      onChange={(e) => onPasswordChange(e.target.value)}
      placeholder='Password'
      required
    />
    <Button type='submit'>Sign Up</Button>
  </form>
)

export default SignupPresentation
