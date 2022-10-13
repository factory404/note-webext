import { onMessage } from 'webext-bridge';
import requiress from './require';
import { SYNC_NOTE_DATA, CREATE_NEW_NOTE, LATELY_NOTE_DATA, LIST_NOTE_DATA } from '../constant';
import { dateFormat } from '~/utils';

const uniqueid = 'OVlVP3byp0Gv1Q';
const userid = '3385112ed5';

onMessage(CREATE_NEW_NOTE, async () => {
    try {
        const res = await requiress.post('/api/v1/note/create', {
            uniqueid,
            userid,
            title: `笔记 ${dateFormat()}`,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(LATELY_NOTE_DATA, async () => {
    try {
        const res = await requiress.get(`/api/v1/note/lately?uniqueid=${uniqueid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(LIST_NOTE_DATA, async (message: { data: any }) => {
    const { page, size } = message.data;
    try {
        const res = await requiress.get(`/api/v1/note/items?uniqueid=${uniqueid}&page=${page}&size=${size}`);
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
