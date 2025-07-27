import { BannerAd } from 'react-native-google-mobile-ads';
import { Dimensions } from 'react-native';
import { spacing } from '@/constants/spacing';

const { width, height } = Dimensions.get("window")

const AdBanner = () => {
    return (
        <BannerAd
            unitId={"ca-app-pub-3940256099942544/6300978111"}
            size={`${width - spacing.lg * 2}x${height * 0.1}`}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
};

export default AdBanner