type LogoutPresentationProps = {
  onLogout: () => void
}

const LogoutPresentation = ({ onLogout }: LogoutPresentationProps) => (
  <button onClick={onLogout}>Logout</button>
)

export default LogoutPresentation
