import { useState } from 'react';
import Nav from 'Component/Nav';
import ItemPage from 'Component/ItemPage';
import { items } from 'Storage/static-data';

import './App.style.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('items');

    return (
    <div className='App'>
      <Nav activeTab={activeTab} onTabChange={setActiveTab}/>
      <main className='App-content'>
          <Content tab={activeTab}/>
      </main>
    </div>
    );
}

const Content = ({tab}) => {
  switch (tab) {
      case 'items':
          return <ItemPage items={items}/>;
      case 'cart':
          return <span>the cart</span>;
  }
}

export default App;