import React, {Component} from 'react';
import {View} from 'react-native';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

export const LoginFunc = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    async function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            result?.grantedPermissions?.toString(),
        );
        console.log(await AccessToken.getCurrentAccessToken());
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
};

export class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data);
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    );
  }
}
