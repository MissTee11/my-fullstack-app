import React from "react";

const SearchBar = ({value, onChange, placeholder ="Search....." })=>{
    return(
        <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='SearchBar'
        />
    );
};
export default SearchBar;