module.exports = {
    plugins: [
        "tailwindcss",
        ["postcss-preset-env",{
            stage: 1,
            features: {
                'focus-within-pseudo-class': false
            }
        }],
        ...(process.env.NODE_ENV === 'production' ? [
            [
                '@fullhuman/postcss-purgecss',
                {
                    content: [
                        './pages/**/*.{js,jsx,ts,tsx}',
                        './components/**/*.{js,jsx,ts,tsx}',
                        './utils/**/*.{js,jsx,ts,tsx}',
                        './hooks/**/*.{js,jsx,ts,tsx}',
                        './functions/**/*.{js,jsx,ts,tsx}'
                    ],
                    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
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
                }
            ]
        ] : [])
    ]
}
