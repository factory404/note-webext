import { onMessage } from 'webext-bridge';
import { getStorage, setStorage } from './db/db-constant';
import { GET_PANEL_WIDTH, SET_PANEL_WIDTH } from '../constant';

const PANEL_WIDTH = 'PANEL_WIDTH';

onMessage(GET_PANEL_WIDTH, async () => {
    const res: any = await getStorage(PANEL_WIDTH);
    if (res && res.panelWidth) {
        return res.panelWidth;
    }
});

onMessage(SET_PANEL_WIDTH, (message: { data: { panelWidth: number } }) => {
    console.log('===message.data.panelWidth==', message.data.panelWidth);
    setStorage(PANEL_WIDTH, { panelWidth: message.data.panelWidth });
});
