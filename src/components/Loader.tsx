import React, {FC} from 'react';
import {View, StyleSheet} from "react-native";
import { WebView } from "react-native-webview";

export const Loader: FC = () => {
    return (
        <View style={styles.wrapper} pointerEvents='none'>
            <WebView style={styles.webview} source={require('./../assets/spinner.html')} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});
