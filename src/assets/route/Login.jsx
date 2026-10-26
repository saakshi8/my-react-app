import { Link, useNavigate } from "react-router-dom";
import {
    signInWithgoogle,
    creatinguserdocFromAuth,
    loginWithEmail
} from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await loginWithEmail(email, password);
            const { user } = response;

            setCurrentUser(user);
            navigate("/profile");

        } catch (error) {
            console.log("Login error:", error.message);
            alert(error.message);
        }
    }

    async function handleuser() {
        try {
            const response = await signInWithgoogle();
            const { user } = response;

            await creatinguserdocFromAuth(user);

            setCurrentUser(user);
            navigate("/profile");

        } catch (error) {
            console.log("Login error:", error.message);
            alert(error.message);
        }
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <label>Enter Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                />

                <br /><br />

                <label>Enter Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>
            </form>

            <br />

            <button onClick={handleuser}>
                Continue with Google
            </button>

            <br /><br />

            <Link to="/signup">
                Instead sign up
            </Link>
        </>
    );
}

export default Login;