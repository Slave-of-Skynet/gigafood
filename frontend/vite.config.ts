import { defineConfig } from 'vite';

export default defineConfig({
  // `allowedHosts: true` keeps the dev/preview server usable behind a proxied or
  // non-localhost hostname. The demo launcher still pins `--host 127.0.0.1` on the CLI.
  server: {
    host: '127.0.0.1',
    allowedHosts: true,
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
  preview: {
    host: '127.0.0.1',
    allowedHosts: true,
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
});
