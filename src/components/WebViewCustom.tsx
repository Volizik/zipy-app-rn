import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewProps } from 'react-native-webview';
import UserAgent from 'react-native-user-agent';
import OneSignal from 'react-native-onesignal'

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

const injectedJavascript = `
document.documentElement.classList.add('zipy-mobile-app');
`;

const setIsMarketingPushesEnabled = (payload: boolean) => {
    OneSignal.sendTag('marketingNotificationsEnabled', payload ? '1' : '0')
}

const messages: Record<string, (payload: any) => void> = {
    setIsMarketingPushesEnabled,
}

export const WebViewCustom: FC<WebViewCustomProps> = ({children, ...props}) => {

    const onMessageHandler = (event: any) => {
        const { data = '{}' } = event.nativeEvent || {};
        const { type, payload } = JSON.parse(data);
        messages[type]?.(payload);
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <WebView
                style={styles.webView}
                allowsBackForwardNavigationGestures={true}
                onMessage={onMessageHandler}
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
