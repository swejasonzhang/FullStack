import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, getItems } from '../../store/item.js';
import ItemDisplay from './ItemDisplay.js';
import './ItemsIndex.css';

const ItemsIndex = () => {
    const dispatch = useDispatch();
    const allItems = useSelector(getItems);
    const searchTerm = useSelector(state => state.term)
    const selectedCategory = useSelector(state => state.category)
    const finalSearchTerm = Object.keys(searchTerm).length === 0 ? '""' : searchTerm.receivedTerm;
    const finalSelectedCategory = Object.keys(selectedCategory).length === 0 ? "All Departments" : selectedCategory.receivedCategory;

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    let filteredItems = Object.values(allItems);

    if (finalSelectedCategory !== "All Departments" && finalSearchTerm!== '""') {
        filteredItems = filteredItems.filter(item => {
            const matchesCategory = finalSelectedCategory === "All Departments" || item.category === finalSelectedCategory;
            const matchesSearchTerm = item.name.toLowerCase().startsWith(finalSearchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        });


        console.log(filteredItems)
    } else {
        filteredItems = allItems;
    }

    return (
        <div className="itemindex">
            {filteredItems.map((item) => (
                <ItemDisplay key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemsIndex;
