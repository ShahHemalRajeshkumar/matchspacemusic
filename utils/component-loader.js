import { lazy, Suspense } from 'react';

const componentCache = new Map();

export const createLazyComponent = (importFn, fallback = null) => {
  const cacheKey = importFn.toString();
  
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey);
  }

  const LazyComponent = lazy(importFn);
  
  const WrappedComponent = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  componentCache.set(cacheKey, WrappedComponent);
  return WrappedComponent;
};

export const preloadComponent = (importFn) => {
  if (typeof window !== 'undefined') {
    requestIdleCallback(() => {
      importFn();
    });
  }
};