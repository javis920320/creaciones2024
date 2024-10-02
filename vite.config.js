import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
//@vite(['resources/css/app.css', 'resources/js/app.js']);


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx','resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
});
