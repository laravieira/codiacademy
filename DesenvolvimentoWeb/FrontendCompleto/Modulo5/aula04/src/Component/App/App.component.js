import { useState } from 'react';
import Nav from 'Component/Nav';
import ItemPage from 'Component/ItemPage';
import { items } from 'Storage/static-data';

import './App.style.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('items');
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
      setCart(prevCart => [...prevCart, item]);
    }

    return (
    <div className="App">
      <Nav activeTab={ activeTab } onTabChange={ setActiveTab }/>
      <main className="App-content">
          <Content tab={ activeTab } onAddToCart={ addToCart }/>
      </main>
    </div>
    );
};

const Content = ({ tab, onAddToCart }) => {
  switch (tab) {
      case 'items':
          return <ItemPage items={ items } onAddToCart={ onAddToCart }/>;
      case 'cart':
          return <span>the cart</span>;
  }
};

export default App;