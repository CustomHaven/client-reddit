import React from 'react';

export const SearchForm = () => {
    return (
        <form className="search-form-wrapper" method="GET">
            <div className="search-icon-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input className="search-input" type="search" placeholder="Search" />
            </div>               
        </form>
    )
}