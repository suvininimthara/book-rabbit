
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search for books"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
        </InputGroup>
    )
}

export default Search;
