import React, {FC, useRef, useState} from 'react';
import {WebView, WebViewMessageEvent, WebViewNavigation, WebViewProps} from "react-native-webview";
import {AuthType} from "../types";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn} from "../utils/google-signin";
import {Loader} from "./Loader";
import {Linking, SafeAreaView, StyleSheet} from "react-native";

export const WebViewCustom: FC<WebViewProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSocialLoginCallbackHandler = (type: AuthType) => (token: string) => {
        if (type === 'googleLogin') {
            webViewRef?.current?.injectJavaScript(`window.googleAuthByToken("${token}")`);
        } else if (type === 'facebookLogin') {
            webViewRef?.current?.injectJavaScript(`window.facebookAuthByToken("${token}")`);
        }
    }

    const onMessageHandler = (event: WebViewMessageEvent) => {
        const {type}: {type: AuthType} = JSON.parse(event.nativeEvent.data);

        if (type === 'facebookLogin') {
            facebookSignIn(onSocialLoginCallbackHandler(type));
        } else if (type === 'googleLogin') {
            googleSignIn(onSocialLoginCallbackHandler(type));
        }
    }

    const onShouldStartLoadWithRequestHandler = ({url}: WebViewNavigation): boolean => {
        const regExp = new RegExp('http[s]?:\/\/[a-z.]{0,4}zipy.co.il');

        if (url.match(regExp) || url.includes('captcha')) {
            console.log(url);
            return true;
        }
        Linking.canOpenURL(url)
            .then(() => Linking.openURL(url))
            .catch(() => console.log(`Don't know how to open this URL: ${url}`))

        return false;
    }

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
    `;

    return (
        <SafeAreaView style={styles.wrapper} pointerEvents={isLoading ? 'none' : 'auto'}>
            <WebView
                style={styles.webView}
                ref={webViewRef}
                onMessage={onMessageHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequestHandler}
                {...props}
            />
            {isLoading && (
                <Loader />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    webView: {
        flex: 1,
    }
});
