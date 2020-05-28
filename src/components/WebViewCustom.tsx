import React, {FC, useRef, useState} from 'react';
import {WebView, WebViewMessageEvent, WebViewProps} from "react-native-webview";
import {AuthType} from "../types";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn} from "../utils/google-signin";
import {Loader} from "./Loader";

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

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
    `;

    return (
        <>
            <WebView
                ref={webViewRef}
                onMessage={onMessageHandler}
                injectedJavaScript={injectedJavascript}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
            <Loader visible={isLoading}/>
        </>
    );
}
