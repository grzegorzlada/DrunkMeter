import SettingsStore from './stores/SettingsStore';
import UserProfileStore from './stores/UserProfileStore';
import AlcoholLibraryStore from './stores/AlcoholLibraryStore';
import PartiesStore from './stores/PartiesStore';

export default class DrunkMeterStore {
    constructor() {
        console.log('Stores initializing...');
        this.SettingsStore = new SettingsStore();
        this.UserProfileStore = new UserProfileStore();
        this.AlcoholLibraryStore = new AlcoholLibraryStore();
        this.PartiesStore = new PartiesStore();
    }

    startAsynchronousStoreInitialization() {
        console.log('All stores async inistialization started');
        this.SettingsStore.initializeStore();
        this.UserProfileStore.initializeStore();
        this.AlcoholLibraryStore.initializeStore();
        this.PartiesStore.initializeStore();
    }
}
