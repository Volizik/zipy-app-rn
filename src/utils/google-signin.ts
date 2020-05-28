import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import {SignInCallback} from "../types";

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
        webClientId: '163697187066.apps.googleusercontent.com',
        iosClientId: '163697187066-ftlnh870p6ajh43u3m8pcqr69e53dbp8.apps.googleusercontent.com'
    });
}
