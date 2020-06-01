import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import {SignInCallback} from "../types";
import {GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID} from 'react-native-dotenv';

export const googleSignIn = async (callback: SignInCallback): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        const token = await GoogleSignin.getTokens();
        callback(token.accessToken);
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
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID
    });
}
