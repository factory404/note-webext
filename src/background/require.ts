class RequireCreate {
    baseURL = 'http://127.0.0.1:7001';

    constructor() {}
    get(url: string) {
        return fetch(`${this.baseURL}${url}`, {
            method: 'GET',
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
}
export default new RequireCreate();
