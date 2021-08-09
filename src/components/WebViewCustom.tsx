import React, {FC, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewNavigation, WebViewProps} from 'react-native-webview';
import UserAgent from 'react-native-user-agent';
import { HOME_URL_DOMAIN } from 'react-native-dotenv';

import {Loader} from "./Loader";

const addParamsToUrl = (u: string): string => {
    let url = u;
    const params = 'utm_medium=app&utm_source=app_ios&utm_zipy_version=3';

    if (url.includes(params) || decodeURIComponent(url).includes(params)) {
        return url;
    }

    const paramsWithSymbol = url.includes('?') ? `&${params}` : `?${params}`;

    // May be used only if url doesn't contain #
    const addSlash = (url: string): string => {
        if (url.includes('?')) {
            const arr = url.split('?');
            const firstPart = arr[0];

            return `${firstPart[firstPart.length - 1] === '/' ? firstPart : `${firstPart}/`}?${arr[1]}`
        }

        return url[url.length - 1] === '/' ? url : `${url}/`
    }

    if (url.includes('#')) {
        const urlArray = url.split('#');

        if (urlArray.length === 1) {
            return url = urlArray[0]; // если после # ничего нет
        }
        url = `${addSlash(urlArray[0])}${paramsWithSymbol}#${urlArray[1]}`;
        return url
    } else {
        return addSlash(url) + paramsWithSymbol;
    }
}

export const WebViewCustom: FC<WebViewProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentURI, setCurrentURI] = useState((props.source && 'uri' in props.source && props.source.uri) || '');

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
    `;

    const onShouldStartLoadWithRequestHandler = (request: WebViewNavigation): boolean => {
        const newUri = request.mainDocumentURL;

        setCurrentURI((prevUrl) => addParamsToUrl(newUri || prevUrl));

        console.log(newUri)
        return newUri?.split('?')[1] === currentURI.split('?')[1];
    }


    return (
        <SafeAreaView style={styles.wrapper} pointerEvents={isLoading ? 'none' : 'auto'}>
            <WebView
                style={styles.webView}
                ref={webViewRef}
                allowsBackForwardNavigationGestures={true}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequestHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                userAgent={UserAgent.getUserAgent()}
                {...props}
                source={{ ...props.source, uri: currentURI }}
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
