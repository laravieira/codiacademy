import { useState } from 'react';
import AppComponent from './App.component';

function App() {
    const [calc, setCalc] = useState({
        sign: '',
        num: 0,
        res: 0,
    });

    const math = (a, b, sign) => {
        return sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b;
    };

    const onResetClickHandler = () => {
        setCalc({
            ...calc,
            sign: '',
            num: 0,
            res: 0,
        });
    };

    const onInvertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: '',
        });
    };

    const onPercentClickHandler = () => {
        const num = calc.num ? parseFloat(calc.num) : 0;
        const res = calc.res ? parseFloat(calc.res) : 0;

        setCalc({
            ...calc,
            num: num / Math.pow(100, 1),
            res: res / Math.pow(100, 1),
            sign: '',
        });
    };

    const onEqualsClickHandler = () => {
        const canDivide = calc.num === '0' && calc.sign === '/';

        if(!calc.sign || !calc.num)
            return;

        setCalc({
            ...calc,
            res: canDivide ? 'Can\'t divide by 0' : math(Number(calc.res), Number(calc.num), calc.sign),
            sign: '',
            num: 0,
        });
    };

    const onCommaClickHandler = (event) => {
        event.preventDefault();
        const value = event.target.innerHTML;
        const canAddComma = !calc.num.toString().includes('.');

        setCalc({
            ...calc,
            num: canAddComma ? calc.num + value : calc.num,
        });
    };

    const onSignClickHandler = (event) => {
        event.preventDefault();
        const value = event.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    const onNumClickHandler = (event) => {
        event.preventDefault();
        const value = event.target.innerHTML;
        let number = calc.num + value;

        if(calc.num === 0 && value === '0')
            number = '0';
        else if(calc.num % 1 === 0)
            number = Number(calc.num + value);

        if(calc.num.length < 16)
            setCalc({
                ...calc,
                num: number,
                res: !calc.sign ? 0 : calc.res,
            });
    };

    const onButtonClick = (btn) => {
        switch (btn) {
            case 'C':
                return onResetClickHandler;
            case '+-':
                return onInvertClickHandler;
            case '%':
                return onPercentClickHandler;
            case '=':
                return onEqualsClickHandler;
            case '.':
                return onCommaClickHandler;
            case '/':
            case 'X':
            case '-':
            case '+':
                return onSignClickHandler;
            default:
                return onNumClickHandler;
        }
    };

    const containerProps = {
        calc
    };

    const containerFunctions = {
        onButtonClick
    };

    return (
        <AppComponent { ...containerProps } { ...containerFunctions } />
    );
}

export default App;
