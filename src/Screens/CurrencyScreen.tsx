import React from 'react';
import { HOME_URL } from 'react-native-dotenv';

import {WebViewCustom} from "../components/WebViewCustom";

export const CurrencyScreen = () => {
    return (
        <WebViewCustom
            source={{ uri: `${HOME_URL}/currency-exchange/dollar-rate` }}
        />
    );
}
