import React, {FC, useRef, useEffect } from 'react';
import {Alert, SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewProps } from 'react-native-webview';
import UserAgent from 'react-native-user-agent';
import OneSignal from 'react-native-onesignal';

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

const injectedJavascript = `
document.documentElement.classList.add('zipy-mobile-app');
`;


export const WebViewCustom: FC<WebViewCustomProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView | null>(null);
    const tokenRef = useRef<string | null>(null)

    const setIsMarketingPushesEnabled = (payload: boolean) => {
        OneSignal.sendTag('marketingNotificationsEnabled', payload ? '1' : '0')
    }

    const getNotificationToken = () => {
        if (tokenRef.current) {
            webViewRef.current?.postMessage(JSON.stringify({type: 'onNotificationToken', payload: tokenRef.current}))
        }
    }

    const messages: Record<string, (payload: any) => void> = {
        setIsMarketingPushesEnabled,
        getNotificationToken,
    }

    const onMessageHandler = (event: any) => {
        const { data = '{}' } = event.nativeEvent || {};
        const { type, payload } = JSON.parse(data);
        messages[type]?.(payload);
    }

    useEffect(() => {
        OneSignal.addSubscriptionObserver((state) => {
            if (state.to?.userId) {
                tokenRef.current = state.to.userId;
            }
        });

        OneSignal.getDeviceState().then((state) => {
            if (!tokenRef.current && state?.userId) {
                tokenRef.current = state.userId;
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.wrapper}>
            <WebView
                ref={webViewRef}
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
