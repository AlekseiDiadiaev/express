import './searchBar.css';
import ico from '../../assets/ico/search-ico.svg'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxTypesHooks';
import { IProductData } from '../../interfaces';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('')
    const productsData = useAppSelector((state => state.productsData))
    const [foundEvents, setFoundEvents] = useState<IProductData[]>([]);

    useEffect(() => {
        if (!productsData) return;
        const options = {
            includeScore: true,
            keys: ['title']
        }
        const fuse = new Fuse(productsData, options)
        const searchResults = fuse.search(searchValue).map((result) => result.item);
        setFoundEvents(searchResults)
    }, [searchValue])

    const handleClickFoundEvent = () => {
        setSearchValue('');
    }

    const foundList = foundEvents.map((item, i) => {
        return (<li
            className='search__found-list-item'
            key={i}>
            <Link to={`product/${item.id}`} onClick={handleClickFoundEvent}>
                <span>{item.title}</span>
            </Link>
        </li>)
    })

    return (
        <div className="search">
            <img src={ico} alt="search" className="search__ico" />
            <input
                type="text"
                className="search__input"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
            <ul className="search__found-list">
                {foundList}
            </ul>
      </div>
    );
}

export default SearchBar;
