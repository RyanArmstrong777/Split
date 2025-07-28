import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'your-production-ad-id';

export default function AdBanner() {
  return (
    <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
            console.log('Ad loaded');
        }}
        onAdFailedToLoad={(error) => {
            console.error('Ad failed to load: ', error);
        }}
    />
  );
}
