
import { createContext, useState, useEffect } from "react";
import { fetchstaffdata } from "../../firebase";

export const StaffContext = createContext({ staff: [] });

export function StaffProvider({ children }) {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        async function loadStaff() {
            try {
                const savedStaff = await fetchstaffdata();
                setStaff(savedStaff);
                console.log("Staff loaded from Firebase:", savedStaff);
            } catch (error) {
                console.error("Unable to fetch staff:", error);
            }
        }

        loadStaff();
    }, []);

    return (
        <StaffContext.Provider value={{ staff }}>
            {children}
        </StaffContext.Provider>
    );
}
