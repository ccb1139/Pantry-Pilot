import React, { useState, useEffect, useRef, useMemo } from 'react'
import debounce from 'lodash.debounce';


//Icon Imports
import { AiOutlineClose } from 'react-icons/ai'

function SearchBar({ search, setSearch }) {
    const searchRef = useRef(null);

    useEffect(() => {
        return () => {
            _handleSearchChange.cancel();
        };
    });


    const handleClear = (event) => {
        searchRef.current.value = "";
        setSearch("");
    }

    const handleSearchChange = (event) => {
        setSearch(searchRef.current.value);
    }

    const _handleSearchChange = useMemo(() => {
        return debounce(handleSearchChange, 200);
    }, []);

    



    return (
        <form className='Search-Bar' onSubmit={(e) => { e.preventDefault() }}>
            <input className='Search-Input' ref={searchRef} type="text" placeholder="Search" defaultValue={search} onChange={_handleSearchChange} />
            <AiOutlineClose className={(search === "") ? "Search-Clear-Inactive" : "Search-Clear-Active"} size={20} onClick={handleClear} />
        </form>
    )
}

export default SearchBar