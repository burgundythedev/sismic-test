import React from "react";
import "./FilterActive.css";

interface FilterProps {
  showActiveOnly: boolean;
  onFilterChange: (showActiveOnly: boolean) => void;
}

const FilterActive: React.FC<FilterProps> = ({ showActiveOnly, onFilterChange }) => {
  const handleToggle = () => {
    onFilterChange(!showActiveOnly);
  };

  return (
    <div className="filter-container">
      <button className="filter-btn" onClick={handleToggle}>
        {showActiveOnly ? "Display All Users" : "Display Active Users"}
      </button>
    </div>
  );
};

export default FilterActive;