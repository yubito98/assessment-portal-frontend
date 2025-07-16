import "./Login.scss"


function Login() {
  return (
    <div className="login">
      <div className="column">
        <form>
            <h3>Login</h3>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <p>Don't have an account? Sign up <a href="/signup"><strong>here</strong></a></p>
            <button type="submit" className="secondary-button">Login</button>
        </form>
      </div>
      <div className="column rigth">
        <h1>Assessment Portal</h1>
      </div>
    </div>
  );
}

export default Login;
