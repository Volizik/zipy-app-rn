import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';
import {SignInCallback} from "../types";

export const googleSignIn = async (callback: SignInCallback): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo: User = await GoogleSignin.signIn();
        callback(userInfo.user.email);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('user cancelled', error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('in progress already', error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log('play services not available', error)
        } else {
            // some other error happened
            console.log('some other error happened', error)
        }
    }
}

export const googleSignInConfigure = () => {
    GoogleSignin.configure({
        webClientId: '586978086502-1f4ka1jb97h370iab7101pighvo9ulif.apps.googleusercontent.com',
    });
}
