import { SortFileds } from '../../constatns';
import { useAppDispatch } from '../../hooks/reduxTypesHooks';
import { IFilter } from '../../interfaces';
import { selectFilter } from '../../slices/commonSlice'
import './filter.css';


const Filter = () => {
    const dispatch = useAppDispatch()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let filed: unknown;
        for(const key in SortFileds) {
            if(SortFileds[key] === e.target.value.slice(0, -2)){
                filed = SortFileds[key]
            }
        }

        const filter = {
            field: e.target.value.slice(0, -2),
            direction: +e.target.value.slice(-2)
        }
        dispatch(selectFilter(filter))
    }
    return (
        <div className="filter">
            <select name="filter" id="filter" onChange={handleChange}>
                <option value={SortFileds.Rate + '+1'}>Most Popular</option>
                <option value={SortFileds.Price + '+1'}>Price: Low to High</option>
                <option value={SortFileds.Price + '-1'}>Price: High to Low</option>
                <option value={SortFileds.Title + '+1'}>Name: A to Z</option>
                <option value={SortFileds.Title + '-1'}>Name: Z to A</option>
            </select>
        </div>
    );
}

export default Filter;
