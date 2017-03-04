import SettingsStore from './stores/SettingsStore';

export default class DrunkMeterStore {
    constructor() {
        console.log('Stores initializing...');
        this.SettingsStore = new SettingsStore();
    }

    startAsynchronousStoreInitialization() {
        console.log('All stores async inistialization started');
        this.SettingsStore.initializeSettingsStore();
    }
}
