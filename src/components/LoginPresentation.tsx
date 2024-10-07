import { Button, Grid2, TextField, Typography } from '@mui/material'

type LoginPresentationProps = {
  email: string
  password: string
  error: string | null
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const LoginPresentation = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginPresentationProps) => (
  <form onSubmit={onSubmit}>
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography variant='h6'>Login</Typography>
      </Grid2>
      {error && (
        <Grid2 size={12}>
          <Typography color='error'>{error}</Typography>{' '}
        </Grid2>
      )}
      <Grid2 container size={12}>
        <Grid2 size={12}>
          <TextField
            type='email'
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder='Email'
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            type='password'
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder='Password'
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <Button type='submit' variant='contained'>
            Login
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  </form>
)

export default LoginPresentation
