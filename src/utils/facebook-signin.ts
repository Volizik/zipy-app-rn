import {AccessToken, LoginManager} from "react-native-fbsdk";
import {SignInCallback} from "../types";

export const facebookSignIn = async (callback: SignInCallback): Promise<void> => {
    try {
        const loginResult = await LoginManager.logInWithPermissions(['email']);

        if (loginResult.isCancelled) {
            console.log('Login cancelled');
        } else {
            const accessToken = await AccessToken.getCurrentAccessToken();

            if (accessToken !== null) {
                callback(accessToken.accessToken);
            } else {
                console.error('facebookSignIn: Token is null');
            }
        }
    } catch (e) {
        console.error(`facebookSignIn catch error: ${e.toString()}`);
    }
};
