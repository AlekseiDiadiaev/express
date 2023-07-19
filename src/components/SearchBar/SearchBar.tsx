import './searchBar.css';
import ico from '../../assets/ico/search-ico.svg' 

const SearchBar = () => {
    return (
        <div className="search">
            <img src={ico} alt="search" className="search__ico" />
            <input type="text" className="search__input" />
        </div>
    );
}

export default SearchBar;
