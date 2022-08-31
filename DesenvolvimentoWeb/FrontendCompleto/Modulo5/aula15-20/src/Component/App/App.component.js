import Wrapper from 'Component/Wrapper';
import Screen from 'Component/Screen';
import ButtonBox from 'Component/ButtonBox';
import Button from 'Component/Button';
import { BUTTONS_LAYOUT_VALUES } from './App.config';

function App() {
    const renderButton = (btn, i) => {
        return (
            <Button key={ i }
                    className={ btn === '=' ? 'equals' : '' }
                    value={ btn }
                    onClick={ () => console.log(`${ btn } clicked!`) } />
        );
    }

    return (
        <Wrapper>
            <Screen value="0" />
            <ButtonBox>
                { BUTTONS_LAYOUT_VALUES.flat().map(renderButton) }
            </ButtonBox>
        </Wrapper>
    );
}

export default App;
