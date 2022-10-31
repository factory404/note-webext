class DBConstant {
    db: any = null;
    databaseName = 'DB_EASY_NOTE_CONSTANT';
    tableName = 'CONSTANT';
    version = 1;

    constructor() {
        // this.init();
    }

    init() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this);
            }
            const request = self.indexedDB.open(this.databaseName, this.version);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this);
            };
            request.onerror = (event) => {
                console.log('数据库打开报错');
                reject();
            };
            request.onupgradeneeded = (event: any) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.tableName)) {
                    this.db.createObjectStore(this.tableName, { keyPath: 'key' });
                }
                const transaction = event.target.transaction;
                transaction.oncomplete = () => {
                    resolve(this);
                };
            };
        });
    }

    add(key: string, data: any) {
        return new Promise((resolve, reject) => {
            if (typeof data !== 'object') {
                reject();
            }
            const request = this.db
                .transaction([this.tableName], 'readwrite')
                .objectStore(this.tableName)
                .add({ key, ...data });
            request.onsuccess = function () {
                console.log('数据写入成功');
                resolve(null);
            };

            request.onerror = function (event: any) {
                console.log('数据写入失败', event);
                reject();
            };
        });
    }

    // read(key) {
    //     return new Promise((resolve, reject) => {
    //         const transaction = this.db.transaction([this.tableName]);
    //         const objectStore = transaction.objectStore(this.tableName);
    //         const index = objectStore.index(key)
    //         const request = objectStore.get(index);

    //         request.onerror = function (event) {
    //             console.log('事务失败');
    //             reject();
    //         };

    //         request.onsuccess = function (event) {
    //             console.log('==request==', request);
    //             if (request.result) {
    //                 resolve(request.result);
    //             } else {
    //                 console.log('未获得数据记录');
    //                 resolve();
    //             }
    //         };
    //     });
    // }

    read(key: string) {
        return new Promise((resolve, reject) => {
            const objectStore = this.db.transaction(this.tableName).objectStore(this.tableName);

            objectStore.openCursor().onsuccess = function (event: any) {
                const cursor = event.target.result;

                if (cursor) {
                    if (cursor.value && cursor.value.key === key) {
                        resolve(Object.assign({ id: cursor.key }, cursor.value));
                    } else {
                        cursor.continue();
                    }
                } else {
                    console.log('没有更多数据了！');
                    resolve(null);
                }
            };
        });
    }

    update(key: string, data: any) {
        return new Promise((resolve, reject) => {
            if (typeof data !== 'object') {
                reject();
            }
            console.log('3333', data);
            const request = this.db
                .transaction([this.tableName], 'readwrite')
                .objectStore(this.tableName)
                .put({ key, ...data });

            request.onsuccess = function () {
                console.log('数据更新成功');
                resolve(null);
            };

            request.onerror = function (event: any) {
                console.log('数据更新失败', event);
                reject();
            };
        });
    }

    remove(key: string) {
        return new Promise((resolve, reject) => {
            var request = this.db.transaction([this.tableName], 'readwrite').objectStore(this.tableName).delete(key);

            request.onsuccess = function () {
                console.log('数据删除成功');
                resolve(null);
            };

            request.onerror = function (event: any) {
                console.log('数据更新失败', event);
                reject();
            };
        });
    }

    async setData(key: string, data: any) {
        const res = await this.read(key);
        console.log(res);
        if (res) {
            await this.update(key, data);
        } else {
            await this.add(key, data);
        }
    }

    async getData(key: string) {
        const res = await this.read(key);
        return res;
    }
}

const dbConstant = new DBConstant();

export const getStorage = async (key: string) => {
    await dbConstant.init();
    const res = await dbConstant.getData(key);
    return res;
};

export const setStorage = async (key: string, data: any) => {
    await dbConstant.init();
    await dbConstant.setData(key, data);
};
