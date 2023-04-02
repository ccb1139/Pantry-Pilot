import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Icon Imports
import { AiOutlineClose } from 'react-icons/ai'

function SearchBar({ search, setSearch }) {
    const searchRef = useRef(null);

    const handleClear = (event) => {
        searchRef.current.value = "";
        setSearch("");
    }

    return (
        <form className='Search-Bar' onSubmit={(e) => {e.preventDefault()}}>
            <input className='Search-Input' ref={searchRef} type="text" placeholder="Search" defaultValue={search} onChange={(e) => setSearch(searchRef.current.value)} />
            <AiOutlineClose className={(search === "") ? "Search-Clear-Inactive" : "Search-Clear-Active"} size={20} onClick={handleClear} />
        </form>
    )
}

export default SearchBar