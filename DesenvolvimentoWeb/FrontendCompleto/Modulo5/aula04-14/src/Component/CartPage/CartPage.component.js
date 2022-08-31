import PropTypes from 'prop-types';
import './CartPage.style.css';
import Item from "Component/Item";

function CartPage({ items, onAddItem, onRemoveItem }) {
    return (
        <ul className="CartPage-items">
            {items.map(item => (
                <li key={ item.id } className="CartPage-item">
                    <Item item={ item }>
                        <div className="CartPage-controls">
                            <button className="CartPage-removeItem" onClick={ () => onRemoveItem(item) }>-</button>
                            <span className="CartPage-count">{ item.count }</span>
                            <button className="CartPage-addItem" onClick={ () => onAddItem(item) }>+</button>
                        </div>
                    </Item>
                </li>
            ))}
        </ul>
    );
}

CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired
};

export default CartPage;