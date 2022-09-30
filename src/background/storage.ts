import { onMessage } from 'webext-bridge';
import { GET_PANEL_WIDTH, SET_PANEL_WIDTH } from '../constant';

const PANEL_WIDTH = 'PANEL_WIDTH';

onMessage(GET_PANEL_WIDTH, () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([PANEL_WIDTH], function (result: any) {
            console.log('Value currently is ' + JSON.stringify(result));
            resolve(result[PANEL_WIDTH]);
        });
    });
});

onMessage(SET_PANEL_WIDTH, (message: { data: { panelWidth: number } }) => {
    chrome.storage.sync.set({ PANEL_WIDTH: message.data.panelWidth }, function () {
        console.log('Value is set to ' + message.data.panelWidth);
    });
});
