import React, {FC} from 'react';
import {WebViewCustom} from "../components/WebViewCustom";
import { HOME_URL } from 'react-native-dotenv';

export const TrackingScreen: FC = () => {
    return (
        <WebViewCustom
            source={{ uri: `${HOME_URL}/tracking` }}
        />
    );
}
