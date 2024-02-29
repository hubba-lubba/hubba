// import '../styles//ForgotPasswordForm.scss';

export default function ForgotPasswordForm() {
    return (
        <div className="forgotpassword-container">
            <form action="">
                <h1>Forgot Password</h1>
                Email Address:
                <div>
                    <input className="input-box" type="text" required></input>
                </div>
                <button className="sendcode-button" type="submit">
                    Send Code
                </button>
            </form>
        </div>
    );
}
