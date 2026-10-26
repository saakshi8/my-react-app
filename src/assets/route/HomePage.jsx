import { useState } from 'react';
import CardList from '../CardList';

function HomePage() {
    const [search, setSearch] = useState("");

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search staff..."
                value={search}
                onChange={handleSearch}
            />

            <CardList search={search} />
        </div>
    );
}

export default HomePage;