import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, getItems } from '../../store/item.js';
import ItemDisplay from './ItemDisplay.js';
import './ItemsIndex.css';

const ItemsIndex = ({ selectedCategory, searchTerm }) => {
    const dispatch = useDispatch();
    const allItems = useSelector(getItems);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const filteredItems = Object.values(allItems).filter(item => {
        const matchesCategory = selectedCategory === "All Departments" || item.category === selectedCategory;
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFirstLetter = searchTerm === "" || item.name[0].toLowerCase() === searchTerm[0].toLowerCase();
        return matchesCategory && matchesSearchTerm && matchesFirstLetter;
    });

    return (
        <div className="itemindex">
            {filteredItems.map((item) => (
                <ItemDisplay key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemsIndex;