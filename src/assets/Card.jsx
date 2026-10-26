function Card({ image, name, jobTitle }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{jobTitle}</p>
        </div>
    );
}

export default Card;