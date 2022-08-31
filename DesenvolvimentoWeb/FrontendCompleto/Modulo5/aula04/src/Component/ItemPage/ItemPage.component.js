import PropTypes from 'prop-types';
import './ItemPage.style.css';
import Item from "Component/Item";

function ItemPage({ items, onAddToCart }) {
    return (
        <ul className="ItemPage-items">
            {items.map(item => (
                <li key={ item.id } className="ItemPage-item">
                    <Item item={ item }>
                        <button className="Item-addToCart" onClick={ () => onAddToCart(item) }>Adicionar ao carrinho</button>
                    </Item>
                </li>
            ))}
        </ul>
    );
}

ItemPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default ItemPage;