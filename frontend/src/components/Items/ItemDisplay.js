import React from 'react';
import './ItemDisplay.css';
import { useHistory } from 'react-router-dom';

const ItemDisplay = ({ item }) => {
    const history = useHistory();

    const navigateToItemPage = (itemId) => {
        window.scrollTo(0, 0);
        history.push(`/items/${itemId}`);
    };

    return (
        <div className="displayitem" onClick={() => navigateToItemPage(item.id)}>
            <div className="imgContainer">
                <img className="img" src={item.imageUrl} alt={item.name} />
            </div>
            <div className="itemName">{item.name}</div>
            <div className="itemCost">${item.cost}</div>
        </div>
    );
}

export default ItemDisplay;
