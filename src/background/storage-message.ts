import { onMessage } from 'webext-bridge';
import { getStorage, setStorage } from './storage';
import { GET_PANEL_WIDTH, SET_PANEL_WIDTH } from '../constant';

const PANEL_WIDTH = 'PANEL_WIDTH';

onMessage(GET_PANEL_WIDTH, () => {
    return getStorage(PANEL_WIDTH);
});

onMessage(SET_PANEL_WIDTH, (message: { data: { panelWidth: number } }) => {
    setStorage(PANEL_WIDTH, message.data.panelWidth);
});
