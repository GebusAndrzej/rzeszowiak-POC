import { defineConfig } from 'vite';
import million from 'million/compiler';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/rzeszowiak-POC/',
    build: {
        minify: 'terser',
        target: [
            'ES6',
            'edge88',
            'firefox78',
            'chrome87',
            'safari12',
        ],
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        million.vite({ auto: true }),
    ],
    resolve: {
        alias: [ { find: '@', replacement: '/src' } ],
    },
});
