import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, getItems } from '../../store/item.js';
import ItemDisplay from './ItemDisplay.js';
import './ItemsIndex.css';

const ItemsIndex = ({ selectedCategory }) => {
    const dispatch = useDispatch();
    const allItems = useSelector(getItems);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const filteredItems = selectedCategory === "AllDepartments" ? allItems : Object.values(allItems).filter(item => item.category === selectedCategory);

    return (
        <div className="itemindex">
            {Object.values(filteredItems).map((item) => (
                <ItemDisplay key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemsIndex;
