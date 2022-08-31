import './Item.style.css';
import PropTypes from "prop-types";

function Item({ item, onAddToCart }) {
    return (
        <div className="Item">
            <div className="Item-left">
                <div className="Item-image"><img src={ item.picture } alt={ item.name }/></div>
            </div>

            <div className="Item-middle">
                <div className="Item-title">{ item.name }</div>
                <div className="Item-description">{ item.description }</div>
            </div>

            <div className="Item-right">
                <div className="Item-price">R$: { item.price }</div>
                <div><button className="Item-addToCart" onClick={ onAddToCart }>Adicionar ao carrinho</button></div>
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default Item;