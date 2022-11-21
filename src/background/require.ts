import { getStorage } from './db/db-constant';
import { LOGIN_TOKEN } from '../constant';
class RequireCreate {
    baseURL = 'http://127.0.0.1:7020';

    constructor() {
        this.proxyFetch();
    }

    proxyFetch() {
        const oldFetch = self.fetch;
        self.fetch = function (input, options) {
            return new Promise((resolve, rejecte) => {
                getStorage(LOGIN_TOKEN)
                    .then((info: any) => {
                        return info && info.token;
                    })
                    .then((token) => {
                        if (token) {
                            if (options?.headers) {
                                options.headers = Object.assign(options.headers, { Authorization: `Bearer ${token}` });
                            } else if (options) {
                                options.headers = { Authorization: `Bearer ${token}` };
                            } else {
                                options = {
                                    headers: { Authorization: `Bearer ${token}` },
                                };
                            }
                        }
                        return oldFetch.apply(self, [input, options]);
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        rejecte(err);
                    });
            });
        };
    }

    get(url: string) {
        return fetch(`${this.baseURL}${url}`, {
            method: 'GET',
        }).then((res) => {
            return res.json();
        });
    }

    async post(url: string, data: any) {
        return fetch(`${this.baseURL}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        });
    }

    async put(url: string, data: any) {
        return fetch(`${this.baseURL}${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        });
    }

    async delete(url: string) {
        return fetch(`${this.baseURL}${url}`, {
            method: 'DELETE',
        }).then((res) => {
            return res.json();
        });
    }
}
export default new RequireCreate();
