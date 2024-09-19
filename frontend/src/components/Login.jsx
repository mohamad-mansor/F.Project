import "../components/login-email.css";

function loginEmail() {
  return (
    <div>
      {/* <header>
        <nav>
          <ul>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Stories</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Search</a></li>
          </ul>
          
        </nav>
      </header> */}

      <main>
        <div className="login-container">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <div className="options">
            <label>
            <input type="checkbox" name="remember" />Remember me
            </label>
            <a href="#">Forgot Password?</a>
            </div>


            <button type="submit">Login</button>
          </form>

          <p>Or <a href="#">create an account</a></p>
        </div>
      </main>
    </div>
  );
}

function handleSubmit(e) {
  e.preventDefault();
  alert("Login functionality will be added soon.");
}

export default loginEmail;
