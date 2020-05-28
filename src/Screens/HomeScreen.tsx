import React, {FC} from 'react';
import {StyleSheet} from "react-native";
import {WebViewCustom} from "../components/WebViewCustom";

export const HomeScreen: FC = () => {
    return (
        <WebViewCustom
            style={styles.container}
            // source={require('./index.html')}
            source={{ uri: 'https://www.zipy.co.il/' }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
