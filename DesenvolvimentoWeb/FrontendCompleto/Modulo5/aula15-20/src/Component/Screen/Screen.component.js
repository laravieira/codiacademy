import { Textfit } from 'react-textfit';
import './Screen.style.css';
import {
    SCREEN_TEXT_MODE,
    SCREEN_MAX_FONT_SIZE
} from './Screen.config';

function Screen({ value }) {
    return (
        <Textfit className="screen" mode={ SCREEN_TEXT_MODE } max={ SCREEN_MAX_FONT_SIZE }>
            { value }
        </Textfit>
    );
}

export default Screen;