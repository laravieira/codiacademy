import Wrapper from 'Component/Wrapper';
import Screen from 'Component/Screen';
import ButtonBox from 'Component/ButtonBox';
import Button from 'Component/Button';
import { BUTTONS_LAYOUT_VALUES } from './App.config';

function AppComponent({ calc, onButtonClick }) {
    const renderButton = (btn, i) => {
        return (
            <Button key={ i }
                    className={ btn === '=' ? 'equals' : '' }
                    value={ btn }
                    onClick={ onButtonClick(btn) } />
        );
    }

    return (
        <Wrapper>
            <Screen value={ calc.num ? calc.num : calc.res }  />
            <ButtonBox>
                { BUTTONS_LAYOUT_VALUES.flat().map(renderButton) }
            </ButtonBox>
        </Wrapper>
    );
}

export default AppComponent;
