import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info'

export const useInAppUpdate = () => {

    const openAppStore = () => {
        const link = 'itms-apps://apps.apple.com/IL/app/zipy/id1522906560?l=he';

        Linking.canOpenURL(link)
            .then(
                (supported) => supported ? Linking.openURL(link) : Alert.alert('resolve ', supported.toString()),
                (err) => Alert.alert('rejected ', err.toString())
            )
            .catch((err) => Alert.alert('catch ', err.toString()))
      };


    useEffect(() => {
        try {
            fetch('http://itunes.apple.com/lookup?bundleId=il.co.app.zipy&country=il', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((response) => {
                if (response && 
                    response.results && 
                    response.results[0] && 
                    response.results[0].version &&
                    response.results[0].version !== DeviceInfo.getVersion()
                    ) {
                        Alert.alert(
                            'עדכון זמין לאפליקציה',
                            'נא לוודא עדכון לגירסה האחרונה כדי ליהנות מכל התכונות והשיפורים באפליקציה',
                            [
                                {text: "בטל", style: 'cancel'},
                                {text: 'עדכן', onPress: openAppStore}
                            ]
                        )
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } catch(error) {
            console.error(error);
        }
    }, []);
}