import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.hydrateRoot(
    document.getElementById('root'),
    <HelloWorld/>
)

function HelloWorld() {
    return <h1>Hello World!</h1>;
}