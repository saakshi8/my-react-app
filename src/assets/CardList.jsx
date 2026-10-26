import { useContext } from "react";
import { StaffContext } from "./context/StaffContext";
import Card from "./Card";
import "./Card.css";

function CardList() {
    const { staff } = useContext(StaffContext);

    return (
        <div className="card-list">
            {staff.map((person) => (
                <Card
                    key={person.key}
                    name={person.name}
                    jobTitle={person.job}
                    image={person.image}
                />
            ))}
        </div>
    );
}

export default CardList;