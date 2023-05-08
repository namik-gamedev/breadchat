import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
   base: '/breadchat/',
   plugins: [react()],
   resolve: {
      alias: {
         src: '/src',
      },
   },
});
