export default class SettingsStore {
    constructor() {
        console.log('Settings store constructed');
    }

    initializeSettingsList(resolveHandler, rejectHandler) {
        var initPromise = new Promise(function(resolve, reject) {
            console.log('Resolving store in promise...');
            var tmpStore = {
                'a': 100,
                'b': 500
            };
            resolve(tmpStore);
        });

        initPromise.then(resolveHandler, rejectHandler);
    }
}
