import { StyleProp, View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useAppSettingsContext } from '../../contexts/appSettingsContext';

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
