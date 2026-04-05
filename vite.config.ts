import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Required for public tunnel hostnames (e.g. *.lhr.life)
    allowedHosts: true
  }
});
