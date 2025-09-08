const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

async function optimizeCSS() {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './utils/**/*.{js,jsx,ts,tsx}',
      './hooks/**/*.{js,jsx,ts,tsx}',
      './functions/**/*.{js,jsx,ts,tsx}'
    ],
    css: ['./styles/**/*.css', './styles/**/*.scss'],
    safelist: {
      standard: [
        'html', 'body', 'swiper-slide', 'swiper-container',
        'mapboxgl-map', 'mapboxgl-canvas', 'mapboxgl-popup',
        /^ms_/, /^material-icons/, /^btn-/, /^text-/, /^bg-/,
        /^hover:/, /^focus:/, /^active:/, /^group-hover:/,
        /^sm:/, /^md:/, /^lg:/, /^xl:/, /^2xl:/
      ],
      deep: [/^swiper/, /^mapbox/, /^algolia/, /^instantsearch/],
      greedy: [/^react-/, /^next-/]
    }
  });

  console.log('CSS optimization completed');
  console.log(`Removed ${purgeCSSResult.length} unused CSS rules`);
}

if (require.main === module) {
  optimizeCSS().catch(console.error);
}

module.exports = optimizeCSS;