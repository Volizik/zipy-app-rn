import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

export const SettingsScreen: FC = () => {
    return (
        <View
            style={styles.container}>
            <Text>Settings!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    }
});
