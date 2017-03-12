import SettingsStore from './stores/SettingsStore';
import UserProfileStore from './stores/UserProfileStore';
import AlcoholLibraryStore from './stores/AlcoholLibraryStore';

export default class DrunkMeterStore {
    constructor() {
        console.log('Stores initializing...');
        this.SettingsStore = new SettingsStore();
        this.UserProfileStore = new UserProfileStore();
        this.AlcoholLibraryStore = new AlcoholLibraryStore();
    }

    startAsynchronousStoreInitialization() {
        console.log('All stores async inistialization started');
        this.SettingsStore.initializeStore();
        this.UserProfileStore.initializeStore();
        this.AlcoholLibraryStore.initializeStore();
    }
}
