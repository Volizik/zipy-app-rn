import React, {FC} from 'react';
import {WebViewCustom} from "../components/WebViewCustom";

export const HomeScreen: FC = () => {
    return (
        <WebViewCustom
            source={{ uri: 'https://www.zipy.co.il/' }}
        />
    );
};
