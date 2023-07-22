import { SortFileds } from '../../constatns';
import { useAppDispatch } from '../../hooks/reduxTypesHooks';
import { selectFilter } from '../../slices/commonSlice'
import './filter.css';

const Filter = () => {
    const dispatch = useAppDispatch()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = e.target.value as SortFileds
        dispatch(selectFilter(filter))
    }
    return (
        <div className="filter">
            <select name="filter" id="filter" onChange={handleChange}>
                <option value={SortFileds.RateLow}>Most Popular</option>
                <option value={SortFileds.PriceHigh}>Price: Low to High</option>
                <option value={SortFileds.PriceLow}>Price: High to Low</option>
                <option value={SortFileds.TitleHigh}>Name: A to Z</option>
                <option value={SortFileds.TitleLow}>Name: Z to A</option>
            </select>
        </div>
    );
}

export default Filter;
