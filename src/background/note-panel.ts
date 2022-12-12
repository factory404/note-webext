import { onMessage } from 'webext-bridge';
import requiress from './require';
import {
    SYNC_NOTE_DATA,
    CREATE_NEW_NOTE,
    LATELY_NOTE_DATA,
    LIST_NOTE_DATA,
    GET_ITEM_NOTE_DATA,
    DEL_ITEM_NOTE_DATA,
    // LOGIN_TOKEN,
} from '../constant';
import { dateFormat } from '~/utils';
import { getStorage, setStorage } from './db/db-constant';

// const uniqueid = 'OVlVP3byp0Gv1Q';

const LAST_NOTE_ITEM_ID_KEY = 'LAST_NOTE_ITEM_ID_KEY';

onMessage(CREATE_NEW_NOTE, async () => {
    try {
        // 2. 能否 service worker 通知到所有 tabs  ?  进行登录登出通知

        // const token: any = await getStorage(LOGIN_TOKEN);
        // if (token && token.uniqueid) {
        //     throw new Error('uniqueid is null');
        // }

        const res = await requiress.post('/api/v1/note/create', {
            title: `笔记 ${dateFormat()}`,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(LATELY_NOTE_DATA, async () => {
    try {
        const { objectId }: any = await getStorage(LAST_NOTE_ITEM_ID_KEY);
        const res = await requiress.get(`/api/v1/note/lately?objectId=${objectId || 'null'}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(LIST_NOTE_DATA, async (message: { data: any }) => {
    const { page, size } = message.data;
    try {
        const res = await requiress.get(`/api/v1/note/items?page=${page}&size=${size}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(GET_ITEM_NOTE_DATA, async (message: { data: any }) => {
    const { objectId } = message.data;
    try {
        const res = await requiress.get(`/api/v1/note/item?objectId=${objectId}`);
        await setStorage(LAST_NOTE_ITEM_ID_KEY, { objectId });
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(DEL_ITEM_NOTE_DATA, async (message: { data: any }) => {
    const { objectId } = message.data;
    try {
        const res = await requiress.delete(`/api/v1/note/delete?objectId=${objectId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});


let timer: any = null;
let lastTime = 0;
const THROTTLE_TIME = 5000;

onMessage(SYNC_NOTE_DATA, async (message: { data: any }) => {
    const note = message.data as INotePanelData;
    if (lastTime > new Date().getTime()) {
        clearTimeout(timer);
    }
    lastTime = new Date().getTime() + THROTTLE_TIME;
    return new Promise((reslove) => {
        timer = setTimeout(() => {
            clearTimeout(timer);
            requiress
                .put('/api/v1/note/update', {
                    objectId: note.objectId,
                    title: note.title,
                    markdown: note.markdown,
                    tag: note.tag,
                })
                .then((res) => {
                    reslove(res);
                })
                .catch((err) => {
                    console.log(err);
                    reslove(null);
                });
        }, THROTTLE_TIME);
    });
});
