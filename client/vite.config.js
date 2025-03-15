import { defineConfig } from 'vite';

export default defineConfig({
    envDir: '..',
    build: {
        outDir:'../public',
        emptyOutDir: true,
    },
});