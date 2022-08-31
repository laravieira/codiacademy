import { useState } from 'react';
import AppComponent from './App.component';
import {
    INPUT_LOCALE_PATTERN,
    OUTPUT_LOCALE_PATTERN
} from './App.config';

function App() {
    const [calc, setCalc] = useState({
        sign: '',
        num: 0,
        res: 0
    });

    const math = (a, b, sign) => {
        return sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b;
    };

    const toLocaleString = (num) => String(num).replace(INPUT_LOCALE_PATTERN, '$1 ');

    const removeSpaces = (num) => num.toString().replace(OUTPUT_LOCALE_PATTERN, '');

    const onResetClickHandler = () => {
        setCalc({
            ...calc,
            sign: '',
            num: 0,
            res: 0
        });
    };

    const onInvertClickHandler = () => {
        const num = removeSpaces(calc.num);
        const res = removeSpaces(calc.res);

        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(num * -1) : 0,
            res: calc.res ? toLocaleString(res * -1) : 0,
            sign: ''
        });
    };

    const onPercentClickHandler = () => {
        const num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        const res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: num / Math.pow(100, 1),
            res: res / Math.pow(100, 1),
            sign: ''
        });
    };

    const onEqualsClickHandler = () => {
        const canDivide = calc.num === '0' && calc.sign === '/';
        const num = removeSpaces(calc.num);
        const res = removeSpaces(calc.res);

        if(!calc.sign || !calc.num)
            return;

        const result = toLocaleString(math(Number(res), Number(num), calc.sign));

        setCalc({
            ...calc,
            num: 0,
            res: canDivide ? 'Can\'t divide by 0' : result,
            sign: ''
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
            num: 0
        });
    };

    const onNumClickHandler = (event) => {
        event.preventDefault();
        const value = event.target.innerHTML;
        const num = removeSpaces(calc.num);

        let number = toLocaleString(num + value);

        if(num === 0 && value === '0')
            number = '0';
        else if(num % 1 === 0)
            number = toLocaleString(Number(num + value));

        if(num.length < 16)
            setCalc({
                ...calc,
                num: number,
                res: !calc.sign ? 0 : calc.res
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
