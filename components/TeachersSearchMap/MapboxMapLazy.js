import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => <div style={{ height: 550, borderRadius: '12px', background: '#f5f5f5' }}>Loading map...</div>
});

export default MapboxMap;