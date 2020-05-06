import {AccessToken, LoginManager} from "react-native-fbsdk";

export type FacebookSignIn = (token: AccessToken | null) => void;

export const FacebookSignIn = (callback: FacebookSignIn): void => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async function (result) {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log(
                    'Login success with permissions: ' +
                    result?.grantedPermissions?.toString(),
                );
                const accessToken = await AccessToken.getCurrentAccessToken();
                callback(accessToken)
            }
        },
        function (error) {
            console.log('Login fail with error: ' + error);
        },
    );
};
