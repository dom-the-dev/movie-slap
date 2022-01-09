import React from 'react';
import PropTypes from 'prop-types';
import {BsSearch} from "react-icons/bs";

const SearchBar = ({handleSearch, setQuery, query}) => {
    return (
        <form className={`w-full md:w-3/4 mt-5 relative`} onSubmit={handleSearch}>
            <input
                className={`w-full`}
                type="text"
                value={query}
                placeholder={"Search anything"}
                onChange={e => setQuery(e.target.value)}
            />
            <button type={"search"} className={`absolute top-1 right-1 hover:bg-brand hover:text-white`}>
                <BsSearch/>
                <span className="sr-only">search</span>
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    query: PropTypes.string
};

export default SearchBar;
