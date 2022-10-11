import { onMessage } from 'webext-bridge';
import { GET_PANEL_WIDTH, SET_PANEL_WIDTH, GET_NOTE_DATA, SET_NOTE_DATA } from '../constant';

const PANEL_WIDTH = 'PANEL_WIDTH';
const NOTE_DATA = 'NOTE_DATA';

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

onMessage(GET_NOTE_DATA, () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([NOTE_DATA], function (result: any) {
            console.log('Value currently is ' + JSON.stringify(result));
            resolve(result[NOTE_DATA]);
        });
    });
});

onMessage(SET_NOTE_DATA, (message: { data: any }) => {
    chrome.storage.sync.set({ NOTE_DATA: message.data }, function () {
        console.log('Value is set to ' + message.data);
    });
});
