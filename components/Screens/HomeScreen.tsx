import React, {FC} from 'react';
import { WebView } from 'react-native-webview';
import {Platform, StyleSheet} from "react-native";
import DeviceInfo from 'react-native-device-info';

export const HomeScreen: FC = () => {
    return (
        <WebView
            style={styles.container}
            source={{ uri: 'https://www.zipy.co.il/' }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    }
});
