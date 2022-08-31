function NavComponent({ activeTab, onTabChange }) {
    const itemClass = (tabName) => `AppComponent-nav-item ${ activeTab === tabName ? 'selected': '' }`;

    return (
      <nav className="App-nav">
        <ul>
          <li className={ itemClass('items') }>
            <button onClick={ () => onTabChange('items') }>Itens</button>
          </li>
          <li className={ itemClass('cart') }>
            <button onClick={ () => onTabChange('cart') }>Cart</button>
          </li>
        </ul>
      </nav>
    );
}

export default NavComponent;