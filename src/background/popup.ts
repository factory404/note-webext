import { onMessage } from 'webext-bridge';
import require from './require';
import { IS_USER_LOGIN, SEND_SMS_CODE, USER_LOGIN, USER_LOGIN_OUT, LOGIN_TOKEN } from '../constant';
import { getStorage, setStorage } from './db/db-constant';

onMessage(IS_USER_LOGIN, async (message: { data: any }) => {
    try {
        return await getStorage(LOGIN_TOKEN);
    } catch (error) {
        console.log(error);
    }
});

onMessage(SEND_SMS_CODE, async (message: { data: any }) => {
    try {
        const res = await require.post('/api/v1/sms', { phone: message.data.phone });
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(USER_LOGIN, async (message: { data: any }) => {
    try {
        const res = await require.post('/api/v1/login', { phone: message.data.phone, smsCode: message.data.smsCode });
        if (res && res.token) {
            await setStorage(LOGIN_TOKEN, { token: res.token, phone: res.phone, uniqueid: res.uniqueid });
        }
        return res;
    } catch (error) {
        console.log(error);
    }
});

onMessage(USER_LOGIN_OUT, async (message: { data: any }) => {
    await setStorage(LOGIN_TOKEN, null);
});
