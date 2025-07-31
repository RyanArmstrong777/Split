import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AdBannerProps {
  style?: StyleProp<ViewStyle>;
  id: string
}

export default function AdBanner({ style, id }: AdBannerProps) {
  const { settings } = useAppSettingsContext();

  if (settings?.removeAds === 1) return null;

  return (
    <View style={style}>
      <BannerAd
        unitId={id}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
