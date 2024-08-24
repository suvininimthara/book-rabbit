
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap'; // Importing Bootstrap components


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');// Search term entered by user

    const handleSearch = (e: React.FormEvent<FormControl>) =>{
        setSearchTerm((e.target as HTMLInputElement).value); // Access to the value
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
