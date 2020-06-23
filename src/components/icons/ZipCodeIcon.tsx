import React, {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ZipCodeIcon: FC<SvgProps> = (props) => (
    <Svg {...props}>
        <Path fill={props.color} d={"M20,7 L10,7 L10,13 L8,13 L8,5 L14,5 L14,1 L6,1 L6,7 L4,7 C2.9,7 2,7.9 2,9 L2,17 C2,18.1 2.9,19 4,19 L10,19 L10,23 L14,23 L14,19 L20,19 C21.1,19 22,18.1 22,17 L22,9 C22,7.9 21.1,7 20,7 Z"} />
    </Svg>
);
