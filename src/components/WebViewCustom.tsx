import React, {FC, useRef, useState} from 'react';
import {WebView, WebViewMessageEvent, WebViewNavigation, WebViewProps} from 'react-native-webview';
import {AuthType} from '../types';
import {Loader} from "./Loader";
import {SafeAreaView, StyleSheet} from "react-native";
import UserAgent from 'react-native-user-agent';
import {googleSignIn} from '../utils/google-signin';
import {facebookSignIn} from '../utils/facebook-signin';
import { HOME_URL } from 'react-native-dotenv';

const addParamsToUrl = (u: string): string => {
    let url = u;

    if (url.includes('utm_medium=app&utm_source=app_ios')) {
        return url;
    }

    if (url.includes('#')) {
        const urlArray = url.split('#');
        const params = url.includes('?') ? '&utm_medium=app&utm_source=app_ios' : '?utm_medium=app&utm_source=app_ios';
        if (urlArray.length === 1) {
            return url = urlArray[0]; // если после # ничего нет
        }
        url = `${urlArray[0]}${params}#${urlArray[1]}`;
        return url
    } else {
        url += url.includes('?') ? '&utm_medium=app&utm_source=app_ios' : '?utm_medium=app&utm_source=app_ios';
        return url;
    }
}

export const WebViewCustom: FC<WebViewProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentURI, setURI] = useState((props.source && 'uri' in props.source && props.source.uri) || '');
    const newSource = { ...props.source, uri: currentURI };

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

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
    `;

    const onShouldStartLoadWithRequestHandler = (request: WebViewNavigation): boolean => {
        const newUri = request.mainDocumentURL;

        if (newUri === `${HOME_URL}/#`) return false; // if anchor used like a button

        setURI((prevUrl) => addParamsToUrl(newUri || prevUrl));

        return newUri === currentURI;
    }

    return (
        <SafeAreaView style={styles.wrapper} pointerEvents={isLoading ? 'none' : 'auto'}>
            <WebView
                style={styles.webView}
                ref={webViewRef}
                onMessage={onMessageHandler}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequestHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                userAgent={UserAgent.getUserAgent()}
                {...props}
                source={newSource}
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
