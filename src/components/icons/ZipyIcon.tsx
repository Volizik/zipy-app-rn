import React, {FC} from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg'

export const ZipyIcon: FC<SvgProps> = (props) => (
    <Svg {...props}>
        <Path fill={props.color} d={"M24,6.0860234 L23.9944207,5.80203934 L18.058094,5.76354249 C17.1841038,4.8265067 15.3128218,5.01564343 15.3128218,5.01564343 C12.9226692,5.19334268 12.2375368,7.23311812 12.0598375,8.03374113 L11.0078691,9.30776389 C9.63425662,8.38021283 7.7844548,7.29225821 5.43586763,6.24754281 C5.43586763,6.24754281 5.65680611,7.47972116 6.94394012,9.31362211 C5.27797473,8.78973011 2.99299106,8.16820116 0,7.55029873 C0,7.55029873 1.61937861,10.5262731 5.7190148,13.288562 L7.35708391,14.201049 L3.70071949,19.1565428 L6.13522718,19.1565428 C11.4229656,18.8494049 13.9322353,14.5120925 13.9322353,14.5120925 L18.207339,7.09001024 C18.2770797,6.9862361 18.4101449,6.83866482 18.6079295,6.83922275 L18.6012344,6.8381069 L24,6.0860234 Z"} />
    </Svg>
);
