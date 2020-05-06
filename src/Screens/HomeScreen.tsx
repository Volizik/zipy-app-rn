import React, {FC, useRef} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {Platform, StyleSheet} from "react-native";
import DeviceInfo from 'react-native-device-info';
import {FacebookSignIn} from "../utils/facebook-signin";

export const HomeScreen: FC = () => {
    const webViewRef = useRef<WebView>(null);

    const onMessageHandler = (event: WebViewMessageEvent) => {
        const message = JSON.parse(event.nativeEvent.data);
        console.log(event.nativeEvent.data)
        if (message.type === 'facebookLogin') {
            FacebookSignIn((token) => {
                webViewRef?.current?.injectJavaScript(`
                    window.facebookAppLogin(${token});
                `)
            })
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
