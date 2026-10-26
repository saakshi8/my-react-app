
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <h1>My Profile</h1>
            <p>Email: {currentUser ? currentUser.email : "No user logged in"}</p>
        </>
    );
}

export default Profile;
