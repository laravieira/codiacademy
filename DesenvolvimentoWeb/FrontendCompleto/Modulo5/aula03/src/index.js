import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

function HelloWorld() {
    return (
        <div>
            <Hello/> <World/>!
        </div>
    );
}

function Hello() {
    const isBR = true;

    return <span>{ isBR ? 'Olá' : 'Hello' }</span>;
}

function World() {
    const name = 'Lara';
    return <span>{name}</span>;
}

root.render(<HelloWorld/>);
