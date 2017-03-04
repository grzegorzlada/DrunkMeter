export default class LocalStorageRepo {
    storeData(key, value) {
        var storePromise = new Promise(function(resolve, reject) {
            window.localStorage.setItem(key, value);
            resolve(true);
        });
        return storePromise;
    }

    retrieveData(key) {
        var retrievePromise = new Promise(function(resolve, reject) {
            var dataString = window.localStorage.getItem(key);
            if (typeof dataString === 'undefined') {
                dataString = null;
            }

            resolve(dataString);
        });

        return retrievePromise;
    }
}
