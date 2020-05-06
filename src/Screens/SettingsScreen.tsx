import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {WebView} from "react-native-webview";

export const SettingsScreen: FC = () => {
    return (
        <WebView
            style={styles.container}
            source={{ uri: 'https://www.zipy.co.il/tracking' }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    }
});
