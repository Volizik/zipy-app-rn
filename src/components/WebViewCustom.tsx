import React, {FC, memo, useRef, useState, forwardRef} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewNavigation, WebViewProps } from 'react-native-webview';
import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import UserAgent from 'react-native-user-agent';
import { HOME_URL_DOMAIN } from 'react-native-dotenv';

import { Loader } from "./Loader";
import { useParamsToUrl } from '../hooks/useParamsToUrl'

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

const injectedJavascript = `
document.documentElement.classList.add('zipy-mobile-app');
`;

//TODO: fix rerender
const MemoWebView = memo(forwardRef<WebView, WebViewCustomProps>((props, ref) => {
    console.log('rerender')
    return (
        <WebView
            style={styles.webView}
            ref={ref}
            allowsBackForwardNavigationGestures={true}
            onMessage={() => {}}
            injectedJavaScript={injectedJavascript}
            userAgent={UserAgent.getUserAgent()}
            startInLoadingState={true}
            renderLoading={() => <Loader />}
            {...props} 
        />
    )
}));

export const WebViewCustom: FC<WebViewCustomProps> = ({children, source, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const { addParamsToUrl, hasVersionParam, hasUtmParam } = useParamsToUrl();
    const [currentUrl, setCurrentUrl] = useState<string>(addParamsToUrl(source.uri));

    const onLoadStartHandler = ({nativeEvent: { url }}: WebViewNavigationEvent) => {
        if (!hasVersionParam(url) || !hasUtmParam(url)) {
            webViewRef.current?.stopLoading();

            const urlWithParams = addParamsToUrl(url);
            if (url.split('?')[0].includes(HOME_URL_DOMAIN) && urlWithParams !== currentUrl) {
                setCurrentUrl(urlWithParams);
            }
        }
    }

    const onShouldStartLoadWithRequest = ({ url }: WebViewNavigation) => {
        // reject zipy.co.il link if you are on this zipy.co.il, to escape redirect to v2
        return currentUrl.split('?')[0] !== url
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <MemoWebView
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                onLoadStart={onLoadStartHandler}
                source={{ uri: currentUrl }}
            />
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
