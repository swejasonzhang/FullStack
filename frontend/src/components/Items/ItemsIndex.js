import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, getItems } from '../../store/item.js';
import ItemDisplay from './ItemDisplay.js';
import './ItemsIndex.css';

const ItemsIndex = () => {
    const dispatch = useDispatch();
    const allItems = useSelector(getItems);
    const searchTerm = useSelector(state => state.term.receivedTerm);
    const selectedCategory = useSelector(state => state.category.receivedCategory);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    let filteredItems = Object.values(allItems);

    if (searchTerm === "" && selectedCategory === "All Departments") {
        filteredItems = allItems;
    } else {
        filteredItems = filteredItems.filter(item => {
            const matchesCategory = selectedCategory === "All Departments" || item.category === selectedCategory;
            const matchesSearchTerm = item.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        });
    }

    return (
        <div className="itemindex">
            {filteredItems.map(item => (
                <ItemDisplay key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemsIndex;