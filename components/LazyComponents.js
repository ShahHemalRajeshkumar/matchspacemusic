import dynamic from 'next/dynamic';

export const LazyMapboxMap = dynamic(() => import('./TeachersSearchMap/MapboxMap'), {
  ssr: false,
  loading: () => <div style={{ height: 550, background: '#f5f5f5' }}>Loading...</div>
});

export const LazySwiper = dynamic(() => import('./SwiperComponent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const LazyGoogleMap = dynamic(() => import('./GoogleMapComponent'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

export const LazyVideoComponent = dynamic(() => import('./VideoComponent'), {
  ssr: false,
  loading: () => <div>Loading video...</div>
});

export const LazyYoutubeComponent = dynamic(() => import('./YoutubeComponent'), {
  ssr: false,
  loading: () => <div>Loading video...</div>
});