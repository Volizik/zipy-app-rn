import React from 'react';
import { HOME_URL } from 'react-native-dotenv';

import {WebViewCustom} from "../components/WebViewCustom";

export const HomeScreen = () => {

    return (
        <WebViewCustom
            source={{ uri: HOME_URL }}
        />
    );
};
