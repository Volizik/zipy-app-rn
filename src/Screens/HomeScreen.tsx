import React, {FC, useRef} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {Platform, StyleSheet} from "react-native";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn} from "../utils/google-signin";

export const HomeScreen: FC = () => {
    const webViewRef = useRef<WebView>(null);

    const onMessageHandler = (event: WebViewMessageEvent) => {
        const message = JSON.parse(event.nativeEvent.data);

        if (message.type === 'facebookLogin') {
            facebookSignIn((token) => {
                webViewRef?.current?.injectJavaScript(`window.facebookAppLogin("${token?.accessToken}")`)
            })
        } else if (message.type === 'googleLogin') {
            googleSignIn((token) => {})
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
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    }
});
