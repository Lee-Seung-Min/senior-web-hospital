import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig}*/
const config = {
  plugins: [basicSsl(), sveltekit()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    proxy: {
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/admin/, ''),
        secure: false,
        ws: true
      },
      '/auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ''),
        secure: false,
        ws: true
      },
      '/shop': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/shop/, ''),
        secure: false,
        ws: true
      },
      '/mobile': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/mobile/, ''),
        secure: false,
        ws: true
      }
    }
  }
};
 
export default config;
