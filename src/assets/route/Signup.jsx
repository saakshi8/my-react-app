import { Link } from "react-router-dom";
import {
    signupWithEmail,
    creatinguserdocFromAuth
} from "../../firebase";

async function handleSignup(event) {
    event.preventDefault();
    console.log("HANDLE SIGNUP CALLED");
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        console.log("Trying to create account...");

        const response = await signupWithEmail(
            email,
            password
        );

        console.log("Firebase response:", response);

        const { user } = response;

        console.log("User created:", user);

        await creatinguserdocFromAuth(user, name);

        alert("Signup is successful");

    } catch (error) {
        console.log("Signup error:", error);
        alert("Signup error: " + error.message);
    }
}

function Signup() {
    return (
        <>
            <h1>Sign Up</h1>

            <form onSubmit={handleSignup}>

                <label>Name</label>
                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    required
                />

                <br /><br />

                <label>Email</label>
                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                />

                <br /><br />

                <label>Password</label>
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                />

                <br /><br />

                <label>Confirm Password</label>
                <br />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                />

                <br /><br />

                <button type="submit">
                    Sign Up
                </button>

            </form>

            <br />

            <Link to="/login">
                Already have an account? Login
            </Link>
        </>
    );
}

export default Signup;