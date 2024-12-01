import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import { setSearchQuery } from "../../Store/usersSlice";
import { RootState } from "../../Store/store";




const SearchBar = () => {

  const searchQuery = useSelector((state: RootState) => state.users.searchQuery);
  const dispatch = useDispatch(); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query)); 
  };

  return (
    <div className="searchbar">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
