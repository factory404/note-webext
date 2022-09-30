import { onMessage, sendMessage } from 'webext-bridge';

export default {
    send: (key: string, data: any) => {
        return sendMessage(key, data, 'background');
    },
    reslove: async (key: string, tabId: number, callback: (data: any) => Promise<any>) => {
        onMessage(key, (res: any) => {
            callback(res.data).then((res: any) => {
                sendMessage(`${key}:RESLOVE`, res, { context: 'content-script', tabId });
            });
        });
    },
};
