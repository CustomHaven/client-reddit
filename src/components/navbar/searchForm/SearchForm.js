import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSearchQuery, searchThunk, querySearch } from '../../../feature/search/searchSlice.js';

export const SearchForm = () => {
    const query = useSelector(selectSearchQuery);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        dispatch(querySearch(e.target.value));
    }

    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(searchThunk(query))
        history.push(`/search?query=${query}`)
        dispatch(querySearch(''));
    }

    return (
        <form onSubmit={formSubmit} className="search-form-wrapper" method="GET">
            <div className="search-icon-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input value={query} onChange={handleChange} className="search-input" type="search" placeholder="Search" />
            </div>       
        </form>
    )
}