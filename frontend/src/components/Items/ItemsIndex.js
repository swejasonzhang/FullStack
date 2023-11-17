import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, getItems } from '../../store/item.js';
import ItemDisplay from './ItemDisplay.js';
import './ItemsIndex.css';

const ItemsIndex = () => {
    const dispatch = useDispatch();
    const allItems = useSelector(getItems);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <div className="itemindex">
            {allItems.map((item) => (
                <ItemDisplay item={item} key={item.id} />
            ))}
        </div>
    );
}

export default ItemsIndex;