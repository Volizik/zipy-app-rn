import React, {FC, useEffect, useRef} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {Button, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn, googleSignInConfigure} from "../utils/google-signin";
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

export const HomeScreen: FC = () => {

    const webViewRef = useRef<WebView>(null);

    const onMessageHandler = (event: WebViewMessageEvent) => {
        const message = JSON.parse(event.nativeEvent.data);

        if (message.type === 'facebookLogin') {
            facebookSignIn((token) => {
                webViewRef?.current?.injectJavaScript(`window.facebookAppLogin("${token?.accessToken}")`)
            });
        } else if (message.type === 'googleLogin') {
            googleSignIn((userInfo) => {
                console.log(userInfo)
                const name = userInfo.user.name;
                const email = userInfo.user.email;
                const id = userInfo.user.id;
                webViewRef?.current?.injectJavaScript(`window.googleAppLogin("${name}", "${email}", "${id}")`)
            });
        }
    }

    return (
        <WebView
            style={styles.container}
            source={require('./index.html')}
            onMessage={onMessageHandler}
            ref={webViewRef}

            // source={{ uri: 'https://www.zipy.co.il/' }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
