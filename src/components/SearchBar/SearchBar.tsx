import { useState } from "react";
import "./SearchBar.css";


interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchProps) => {
  const [searchUser, setSearchUser] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchUser(query);
    onSearch(query); 
  };

  return (
    <div className="searchbar">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          value={searchUser}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
