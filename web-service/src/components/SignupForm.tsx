import '../styles/SignupForm.scss';

export default function SignupForm() {
    return (
        <div className="signup-container">
            <form action="">
                <h1>Sign Up</h1>
                Email Address:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                Username:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                Password:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                Confirm Password:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                <button className="signup-button" type="submit">
                    Sign up
                </button>
                <button className="login-button">
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
}
