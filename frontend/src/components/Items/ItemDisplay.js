import React from 'react';
import './ItemDisplay.css';
import { useHistory } from 'react-router-dom';

const ItemDisplay = ({ item }) => {
    const history = useHistory();

    const navigateToItemPage = (itemId) => {
        history.push(`/items/${itemId}`);
    };

    return (
        <div className="displayitem" onClick={() => navigateToItemPage(item.id)}>
            <div className="valorantImgContainer">
                <img className="valorantImg" src={item.imageUrl} alt={item.name} />
            </div>
            <div className="itemName">{item.name}</div>
            <div className="itemCost">${item.cost}</div>
        </div>
    );
}

export default ItemDisplay;
