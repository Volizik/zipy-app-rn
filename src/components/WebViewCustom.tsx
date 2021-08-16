import React, {FC, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewNavigation, WebViewProps } from 'react-native-webview';
import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import UserAgent from 'react-native-user-agent';
import { HOME_URL_DOMAIN } from 'react-native-dotenv';

import {Loader} from "./Loader";
import { useParamsToUrl } from '../hooks/useParamsToUrl'

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

export const WebViewCustom: FC<WebViewCustomProps> = ({children, source, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { addParamsToUrl, hasVersionParam } = useParamsToUrl();
    const [currentURI, setCurrentURI] = useState<string>(addParamsToUrl(source.uri));

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
    `;

    const setNewUrl = (url: string) => {
        const urlWithParams = addParamsToUrl(url);
        if (url.includes(HOME_URL_DOMAIN) && urlWithParams !== currentURI) {
            setCurrentURI(urlWithParams);
        }
    }

    const onNavigaionStateChangeHandler = (state: WebViewNavigation) => {
        console.log('state', state.url)
        if (!hasVersionParam(state.url)) {
            setNewUrl(state.url)
        }
    }

    const onLoadStartHandler = ({nativeEvent: { url }}: WebViewNavigationEvent) => {
        console.log('onLoadStart ', url)
        setNewUrl(url)
        setIsLoading(true)
    }

    const onLoadEndHandler = () => {
        setIsLoading(false)
    }

    return (
        <SafeAreaView style={styles.wrapper} pointerEvents={isLoading ? 'none' : 'auto'}>
            <WebView
                style={styles.webView}
                ref={webViewRef}
                allowsBackForwardNavigationGestures
                onNavigationStateChange={onNavigaionStateChangeHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={onLoadStartHandler}
                onLoadEnd={onLoadEndHandler}
                userAgent={UserAgent.getUserAgent()}
                {...props}
                source={{ uri: currentURI }}
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
