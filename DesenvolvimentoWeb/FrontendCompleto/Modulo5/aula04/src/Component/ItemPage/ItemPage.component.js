import PropTypes from 'prop-types';
import './ItemPage.style.css';
import Item from "Component/Item";

function ItemPage({ items, onAddToCart }) {
    return (
        <ul className="ItemPage-items">
            {items.map(item => (
                <li key={ item.id } className="ItemPage-item">
                    <Item onAddToCart={ () => onAddToCart(item) } item={ item }/>
                </li>
            ))}
        </ul>
    );
}

function onAddToCart(item) {

}

ItemPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default ItemPage;