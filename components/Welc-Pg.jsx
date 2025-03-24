export default function WelcomePg({ onSignup, onLogin }) {
    return (
      <div className='landing-page'>
        <h1>Welcome to PopX</h1>
        <p>Welcome Back Please Login. New User? Please Create Account to use PopX</p>
        <button onClick={onSignup}>Create Account</button>
        <button onClick={onLogin}>Already Registered? Login</button>
      </div>
    );
  }
  