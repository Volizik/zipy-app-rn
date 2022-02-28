import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import Siren from 'react-native-siren'

export const useInAppUpdate = () => {

    const openAppStore = () => {
        const link = 'itms-apps://apps.apple.com/IL/app/zipy/id1522906560?l=he';

        Linking.canOpenURL(link).then(
          (supported) => supported && Linking.openURL(link),
          (err) => console.log(err)
        );
      };

    useEffect(() => {
        Siren.performCheck({ country: 'IL' }).then(({ updateIsAvailable }) => {
            if (updateIsAvailable) {
                Alert.alert(
                    'Update your app', 
                    'This version contains a bug. You must update to be able to use our app.',
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Upgrade", onPress: openAppStore }
                    ]
                );
            }
        })
    }, [])
}