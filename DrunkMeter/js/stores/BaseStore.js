import LocalStorageRepo from './LocalStorageRepo';

export default class BaseStore {
    constructor(storeName) {
        this.StoreName = storeName;
        this.repository = new LocalStorageRepo();
        this.handlers = [];
        this.data = null;
    }

    initializeStore() {
        var retrievePromise = this.repository.retrieveData(this.StoreName);
        retrievePromise.then(this._onDataRetrieved.bind(this));
        console.log('Store ' + this.StoreName + ' initialized.');
    }

    _onDataRetrieved(data) {
        console.log(this.StoreName + ': all data retrieved.');
        if (data !== null) {
            this.data = JSON.parse(data);
        } else {
            this.data = this.getDefaultData();
        }

        this._notifyAllHandlersAboutRetrievedData();
    }

    getAllData(dataReceivedHandler) {
        if (this.data === null) {
            this.handlers.push(dataReceivedHandler);
        } else {
            dataReceivedHandler(this.data);
        }
    }

    _notifyAllHandlersAboutRetrievedData() {
        var handler = this.handlers.pop();
        while (handler) {
            handler(this.data);
            handler = this.handlers.pop();
        }
    }

    saveNewData(data) {
        this.data = data;
        var dataString = JSON.stringify(this.data);
        var storePromise = this.repository.storeData(this.StoreName, dataString);
        storePromise.then(this._onDataStored.bind(this));
    }

    _onDataStored(isSuccess) {
        console.log(this.StoreName + ': Save complete');
    }

    getDefaultData() {
        throw this.StoreName + ': getDefaultData not overriden!';
    }
}
