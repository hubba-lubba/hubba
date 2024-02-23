import React from 'react';
import '../styles/LoginForm.scss';

export default function LoginForm() {
    return (
        <div className="login-container">
            <form action="">
                <h1>Login</h1>
                Username:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                Password:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                <button className="login-button" type="submit">
                    Login
                </button>
                <button className="forgot-button">Forgot password?</button>
                <button className="signup-button">
                    Dont have an account? Sign up
                </button>
            </form>
        </div>
    );
}
