import {AccessToken, LoginManager, UserData} from "react-native-fbsdk";
import {SignInCallback} from "../types";

export const facebookSignIn = async (callback: SignInCallback): Promise<void> => {
    try {
        const loginResult = await LoginManager.logInWithPermissions(['email']);

        if (loginResult.isCancelled) {
            console.log('Login cancelled');
        } else {
            const token = await AccessToken.getCurrentAccessToken();

            if (token !== null) {
                const userInfo = await fetchUserInfoByToken(token.accessToken);

                if (userInfo?.email) {
                    callback(userInfo.email);
                } else {
                    console.error('facebookSignIn: UserData is undefined');
                }
            } else {
                console.error('facebookSignIn: Token is null');
            }
        }
    } catch (e) {
        console.error(`facebookSignIn catch error: ${e.toString()}`);
    }
};

const fetchUserInfoByToken = async (token: string): Promise<UserData | undefined> => {
    try {
        const response = await fetch(`https://graph.facebook.com/me?fields=email&access_token=${token}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
