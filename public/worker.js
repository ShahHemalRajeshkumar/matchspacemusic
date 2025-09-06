// Web Worker for offloading heavy computations
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'PROCESS_SEARCH':
      // Process search results in background
      const processed = data.map(item => ({
        ...item,
        processed: true
      }));
      self.postMessage({ type: 'SEARCH_PROCESSED', data: processed });
      break;
      
    case 'FILTER_DATA':
      // Filter large datasets
      const filtered = data.filter(item => item.active);
      self.postMessage({ type: 'DATA_FILTERED', data: filtered });
      break;
      
    default:
      break;
  }
};