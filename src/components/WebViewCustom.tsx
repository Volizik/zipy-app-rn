import React, {FC, useRef, useState, useEffect} from 'react';
import {WebView, WebViewMessageEvent, WebViewNavigation, WebViewProps} from 'react-native-webview';
import {AuthType} from "../types";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn} from "../utils/google-signin";
import {Loader} from "./Loader";
import {SafeAreaView, StyleSheet} from "react-native";
import UserAgent from 'react-native-user-agent';

export const WebViewCustom: FC<WebViewProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('')

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

    const addParamsToUrl = (u: string): string => {
        let url = u;

        if (url.includes('utm_medium=app&utm_source=app_ios')) {
            // console.log('already includes params')
            return url;
        }

        if (url.includes('#')) {
            const urlArray = url.split('#');
            const params = url.includes('?') ? '&utm_medium=app&utm_source=app_ios' : '?utm_medium=app&utm_source=app_ios';
            url = `${urlArray[0]}${params}#${urlArray[1]}`;
            // console.log('includes #')
            return url
        } else {
            url += url.includes('?') ? '&utm_medium=app&utm_source=app_ios' : '?utm_medium=app&utm_source=app_ios';
            // console.log('added params')
            return url;
        }
    }
    const onNavigationStateChangeHandler = ({url}: WebViewNavigation) => {
        setUrl(addParamsToUrl(url));
    }

    useEffect(() => {
        // console.log('useEffect', url)
        webViewRef?.current?.injectJavaScript(`window.location = "${url}";`);
    }, [url])

    return (
        <SafeAreaView style={styles.wrapper} pointerEvents={isLoading ? 'none' : 'auto'}>
            <WebView
                style={styles.webView}
                ref={webViewRef}
                onMessage={onMessageHandler}
                onNavigationStateChange={onNavigationStateChangeHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                userAgent={UserAgent.getUserAgent()}
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
