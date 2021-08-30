import React from 'react';
import { HOME_URL } from 'react-native-dotenv';
import { useIsFocused } from '@react-navigation/native';

import {WebViewCustom} from "../components/WebViewCustom";

export const TrackingScreen = () => {
    const uri = `${HOME_URL}/tracking`
    const isFocused = useIsFocused();
    const [key, setKey] = React.useState(Math.random())

    React.useEffect(() => {
        if (!isFocused) {
            setKey(Math.random);
        }
    }, [isFocused])
    
    return (
        <WebViewCustom
            key={key}
            source={{ uri }}
        />
    );
}
