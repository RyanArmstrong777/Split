import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'your-production-ad-id';

interface AdBannerProps {
  style?: StyleProp<ViewStyle>;
}

export default function AdBanner({ style }: AdBannerProps) {
  const { settings } = useAppSettingsContext();

  if (settings?.removeAds === 1) return null;

  return (
    <View style={style}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
