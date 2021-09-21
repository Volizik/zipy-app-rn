import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {WebView, WebViewProps } from 'react-native-webview';
// import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import UserAgent from 'react-native-user-agent';
// import { HOME_URL_DOMAIN } from 'react-native-dotenv';

import { Loader } from "./Loader";
// import { useParamsToUrl } from '../hooks/useParamsToUrl'

interface WebViewCustomProps extends Omit<WebViewProps, 'source'> {
    source: {
        uri: string;
    }
}

const injectedJavascript = `
document.documentElement.classList.add('zipy-mobile-app');
`;

export const WebViewCustom: FC<WebViewCustomProps> = ({children, ...props}) => {
    // const webViewRef = useRef<WebView>(null);
    // const { addParamsToUrl, hasVersionParam, hasUtmParam } = useParamsToUrl();
    // const [currentUrl, setCurrentUrl] = useState<string>(addParamsToUrl(source.uri));

    // const onLoadStartHandler = ({nativeEvent: { url }}: WebViewNavigationEvent) => {
    //     if (!hasVersionParam(url) || !hasUtmParam(url)) {
    //         webViewRef.current?.stopLoading();

    //         const urlWithParams = addParamsToUrl(url);
    //         if (url.split('?')[0].includes(HOME_URL_DOMAIN) && urlWithParams !== currentUrl) {
    //             setCurrentUrl(urlWithParams);
    //         }
    //     }
    // }

    // const onShouldStartLoadWithRequest = ({ url }: WebViewNavigation) => {
    //     // reject zipy.co.il link if you are on this zipy.co.il, to escape redirect to v2
    //     return currentUrl.split('?')[0] !== url
    // }

    return (
        <SafeAreaView style={styles.wrapper}>
            <WebView
                style={styles.webView}
                // ref={webViewRef}
                allowsBackForwardNavigationGestures={true}
                onMessage={() => {}}
                injectedJavaScript={injectedJavascript}
                userAgent={UserAgent.getUserAgent().replace('ZipyRN', 'ZipyAppIOS')}
                startInLoadingState={true}
                renderLoading={() => <Loader />}
                mixedContentMode="compatibility"
                // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                // onLoadStart={onLoadStartHandler}
                // source={{ uri: currentUrl }}
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
