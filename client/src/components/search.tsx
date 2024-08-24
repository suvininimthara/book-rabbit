
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap'; // Importing Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');// Search term entered by user

    const handleSearch = (e: React.FormEvent<FormControl>) =>{
        setSearchTerm((e.target as HTMLInputElement).value); // Access to the value
    }
    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search for books" // Place holder text
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
        </InputGroup>
    )
}

export default Search;
