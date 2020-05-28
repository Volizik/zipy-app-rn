import React, {FC} from 'react';
import {Animated, Easing, StyleSheet, View} from "react-native";

export interface LoaderProps {
    visible?: boolean;
}

export const Loader: FC<LoaderProps> = ({ visible = true }) => {
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        )
    ).start();

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <>
            {visible && (
                <View style={styles.wrapper}>
                    <Animated.Image style={{transform: [{rotate: spin}], ...styles.image}} source={require('./../assets/images/Spinner.png')} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    image: {
        width: 100,
        height: 100,

    }
});
