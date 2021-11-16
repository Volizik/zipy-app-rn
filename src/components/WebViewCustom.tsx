import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewProps } from 'react-native-webview';
import UserAgent from 'react-native-user-agent';

// import { Loader } from "./Loader";

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

const injectedJavascript = `
document.documentElement.classList.add('zipy-mobile-app');
`;

export const WebViewCustom: FC<WebViewCustomProps> = ({children, ...props}) => {

    return (
        <SafeAreaView style={styles.wrapper}>
            <WebView
                style={styles.webView}
                allowsBackForwardNavigationGestures={true}
                onMessage={() => {}}
                injectedJavaScript={injectedJavascript}
                userAgent={UserAgent.getUserAgent().replace('ZipyRN', 'ZipyAppIOS')}
                startInLoadingState={true}
                mixedContentMode="compatibility"
                originWhitelist={['https://']}
                {...props}
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
