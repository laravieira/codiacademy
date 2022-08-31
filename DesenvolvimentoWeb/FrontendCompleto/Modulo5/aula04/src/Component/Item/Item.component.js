import './Item.style.css';
import PropTypes from "prop-types";

function Item({ item, children }) {
    return (
        <div className="Item">
            <div className="Item-left">
                <div className="Item-image"><img src={ item.picture } alt={ item.name }/></div>
                <div className="Item-title">{ item.name }</div>
                <div className="Item-description">{ item.description }</div>
            </div>
            <div className="Item-right">
                <div className="Item-price">R$: { item.price }</div>
                <div>{ children }</div>
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

export default Item;