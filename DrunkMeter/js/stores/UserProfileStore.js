import BaseStore from './BaseStore';

var PROFILE_KEY = 'DrunkMeter_Store_UserProfile';

export default class UserProfileStore extends BaseStore {
    constructor() {
        super(PROFILE_KEY);
    }

    getUserProfile(profileReceivedHandler) {
        this.getAllData(profileReceivedHandler);
    }

    saveNewUserProfile(userProfile) {
        this.saveNewData(userProfile);
    }

    getDefaultData() {
        return {
            sex: 'male',
            height: 182,
            weight: 92
        };
    }
}
