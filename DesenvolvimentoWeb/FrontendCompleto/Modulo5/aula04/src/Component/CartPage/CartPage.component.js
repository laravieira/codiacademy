import PropTypes from 'prop-types';
import './CartPage.style.css';
import Item from "Component/Item";

function CartPage({ items, onAddItem, onRemoveItem }) {
    return (
        <ul className="ItemPage-items">
            {items.map(item => (
                <li key={ item.id } className="ItemPage-item">
                    <Item item={ item }>
                        <div className="CartItem-controls">
                            <button className="CartItem-removeItem" onClick={ () => onRemoveItem(item) }>-</button>
                            <span className="CartItem-count">{ item.count }</span>
                            <button className="CartItem-addItem" onClick={ () => onAddItem(item) }>+</button>
                        </div>
                    </Item>
                </li>
            ))}
        </ul>
    );
};

CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired
};

export default CartPage;