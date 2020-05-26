import React, {FC, useRef} from 'react';
import {WebView, WebViewMessageEvent, WebViewProps} from "react-native-webview";
import {AuthType} from "../types";
import {facebookSignIn} from "../utils/facebook-signin";
import {googleSignIn} from "../utils/google-signin";

export const WebViewCustom: FC<WebViewProps> = ({children, ...props}) => {
    const webViewRef = useRef<WebView>(null);

    const onSocialLoginCallbackHandler = (type: AuthType) => (email: string) => {
        webViewRef?.current?.injectJavaScript(`window.mobileSocialLogin("${email}", "${type}")`);
    }

    const onMessageHandler = (event: WebViewMessageEvent) => {
        const {type}: {type: AuthType} = JSON.parse(event.nativeEvent.data);

        if (type === 'facebook') {
            facebookSignIn(onSocialLoginCallbackHandler(type));
        } else if (type === 'google') {
            googleSignIn(onSocialLoginCallbackHandler(type));
        }
    }

    const injectedJavascript = `
            document.documentElement.classList.add('zipy-mobile-app');
            alert(document.documentElement.classList);
    `;

    return (
        <WebView
            ref={webViewRef}
            onMessage={onMessageHandler}
            injectedJavaScript={injectedJavascript}
            {...props}
        />
    );
}
