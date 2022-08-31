import PropTypes from 'prop-types';
import './CartPage.style.css';
import Item from "Component/Item";

function CartPage({ items, onAddToCart }) {
    return (
        <ul className="ItemPage-items">
            {items.map(item => (
                <li key={ item.id } className="ItemPage-item">
                    <Item item={ item }/>
                </li>
            ))}
        </ul>
    );
}

CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default CartPage;