import SettingsStore from './stores/SettingsStore';
import UserProfileStore from './stores/UserProfileStore';

export default class DrunkMeterStore {
    constructor() {
        console.log('Stores initializing...');
        this.SettingsStore = new SettingsStore();
        this.UserProfileStore = new UserProfileStore();
    }

    startAsynchronousStoreInitialization() {
        console.log('All stores async inistialization started');
        this.SettingsStore.initializeStore();
        this.UserProfileStore.initializeStore();
    }
}
