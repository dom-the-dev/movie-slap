import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from "./MovieCard";

const SearchResultsList = ({results, type}) => {

    const renderResults = () => (
        results.map(result => (
            <MovieCard asLink={true} key={result.id} movie={result} type={type}/>
        ))
    )

    return renderResults()
};

SearchResultsList.propTypes = {};

export default SearchResultsList;
