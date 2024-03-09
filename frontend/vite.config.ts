import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: { port: parseInt(process.env.PORT || "3000") },
  define: {
    'process.env': process.env,
  },
});
