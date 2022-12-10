import { onMessage } from 'webext-bridge';
import requiress from './require';
import { DEL_TAG, SET_TAG, LIST_TAGS_DATA } from '../constant';

onMessage(SET_TAG, async (message: { data: any }) => {
    const { value } = message.data;
    try {
        const res = await requiress.post('/api/v1/tags/create', { value });
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(LIST_TAGS_DATA, async (message: { data: any }) => {
    const { page, size } = message.data;
    try {
        const res = await requiress.get(`/api/v1/tags/items?page=${page}&size=${size}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(DEL_TAG, async (message: { data: any }) => {
    const { objectId } = message.data;
    try {
        const res = await requiress.delete(`/api/v1/tags/delete?objectId=${objectId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
});
