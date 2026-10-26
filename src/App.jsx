
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./assets/context/UserContext";

import Header from "./assets/Header";
import Navbar from "./assets/route/Navbar";
import HomePage from "./assets/route/HomePage";
import AboutPage from "./assets/route/AboutPage";
import ContactPage from "./assets/route/ContactPage";
import ConnectPage from "./assets/route/ConnectPage";
import Login from "./assets/route/Login";
import Signup from "./assets/route/Signup";
import Profile from "./assets/route/Profile";
import { StaffProvider } from "./assets/context/StaffContext";

function App() {
    return (

        <UserProvider>
            <StaffProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Navbar />}>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Header />
                                    <HomePage />
                                </>
                            }
                        />

                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/connect" element={<ConnectPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
              </StaffProvider>
        </UserProvider>
       
    );
}
export default App;