import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { copyFileSync, cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const legacyRoot = fileURLToPath(new URL('../dist', import.meta.url));
const outputRoot = fileURLToPath(new URL('../react-dist', import.meta.url));
const stylesheets = [
  'code/design-tokens.css', 'passwork-tokens.css', 'attio-buttons.css',
  'passwork.css', 'passwork-motion.css', 'client-logos.css',
  'hero-entrance.css', 'hero-scroll.css', 'security-switcher.css',
  'live-dashboard-base.css', 'live-dashboard-light.css',
  'team-dashboards.css', 'team-dashboards-light.css', 'site-footer.css',
];

export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  // Dev serves the archive as before. Production includes only assets the
  // React page actually requests, rather than publishing the whole clone.
  publicDir: command === 'serve' ? legacyRoot : false,
  plugins: command === 'build' ? [{
    name: 'copy-react-public-assets',
    closeBundle() {
      for (const file of stylesheets) {
        const target = join(outputRoot, file);
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(join(legacyRoot, file), target);
      }
      cpSync(join(legacyRoot, 'passwork-assets'), join(outputRoot, 'passwork-assets'), { recursive: true });
      cpSync(join(legacyRoot, 'vendor', 'gsap'), join(outputRoot, 'vendor', 'gsap'), { recursive: true });
    },
  }] : [],
  server: {
    fs: { allow: [projectRoot] },
  },
  build: {
    outDir: outputRoot,
    emptyOutDir: true,
  },
}));
