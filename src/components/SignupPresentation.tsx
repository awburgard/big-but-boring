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
    <h2>Sign Up</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <input
      type='email'
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      placeholder='Email'
      required
    />
    <input
      type='password'
      value={password}
      onChange={(e) => onPasswordChange(e.target.value)}
      placeholder='Password'
      required
    />
    <button type='submit'>Sign Up</button>
  </form>
)

export default SignupPresentation
