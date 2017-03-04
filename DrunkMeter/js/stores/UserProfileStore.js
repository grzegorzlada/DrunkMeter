import LocalStorageRepo from './LocalStorageRepo';

var PROFILE_KEY = 'DrunkMeter_Store_UserProfile';

export default class UserProfileStore {
    constructor() {
        console.log('Profile store constructed');
        this.userProfile = null;
        this.repository = new LocalStorageRepo();
        this.profileReceivedHandlers = [];
    }

    initializeUserProfileStore() {
        console.log('Profile store initialization started');
        var profilePromise = this.repository.retrieveData(PROFILE_KEY);
        profilePromise.then(this.profileRetrieved.bind(this));
    }

    profileRetrieved(profile) {
        console.log('Profile received from promise');
        if (profile !== null) {
            this.userProfile = JSON.parse(profile);
        } else {
            this.userProfile = this.getDefaultUserProfile();
        }

        this.notifyAllHandlersAboutReceivedProfile();
    }

    notifyAllHandlersAboutReceivedProfile() {
        var handler = this.profileReceivedHandlers.pop();
        while (handler) {
            handler(this.userProfile);
            handler = this.profileReceivedHandlers.pop();
        }
    }

    getUserProfile(profileReceivedHandler) {
        if (this.userProfile === null) {
            this.profileReceivedHandlers.push(profileReceivedHandler);
        } else {
            profileReceivedHandler(this.settings);
        }
    }

    saveNewUserProfile(userProfile) {
        this.userProfile = userProfile;
        var profileString = JSON.stringify(userProfile);
        var storePromise = this.repository.storeData(PROFILE_KEY, profileString);
        storePromise.then(this.profileSaved);
    }

    profileSaved(isSuccess) {
        console.log('User profile save complete: ' + isSuccess);
    }

    getDefaultUserProfile() {
        return {
            sex: 'male',
            height: 182,
            weight: 92
        };
    }
}
