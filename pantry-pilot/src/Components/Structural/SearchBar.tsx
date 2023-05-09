import React, { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react'
import debounce from 'lodash.debounce';

import '../../css/Structrual.css'

//Icon Imports
import { AiOutlineClose } from 'react-icons/ai'


type Props = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({ search, setSearch }: Props) {
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            _handleSearchChange.cancel();
        };
    });


    const handleClear = (event: React.MouseEvent<SVGElement, MouseEvent>): void => {
        searchRef.current!.value = '';
        setSearch('');
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };

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