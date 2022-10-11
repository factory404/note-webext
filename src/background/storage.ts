export const setStorage = (key: string, data: any) => {
    const _data: any = {};
    _data[key] = data;
    chrome.storage.sync.set(_data, function () {
        console.log('Value is set to ' + _data);
    });
};

export const getStorage = (key: string) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], function (result: any) {
            console.log('Value currently is ' + JSON.stringify(result));
            resolve(result[key]);
        });
    });
};
