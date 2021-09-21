import React from 'react';
import { HOME_URL } from 'react-native-dotenv';

import {WebViewCustom} from "../components/WebViewCustom";
import { useParamsToUrl } from '../hooks/useParamsToUrl'

export const HomeScreen = () => {
    const { addParamsToUrl } = useParamsToUrl();

    return (
        <WebViewCustom
            source={{ uri: addParamsToUrl(HOME_URL) }}
        />
    );
};
