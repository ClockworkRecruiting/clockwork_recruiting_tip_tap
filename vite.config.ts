import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClockworkTiptapEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style'
    },
    // Tiptap and ProseMirror are bundled so the consuming app only needs React.
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } }
    },
    cssCodeSplit: false,
    // dist/ is committed for the git dependency; source maps would add ~4MB per build.
    sourcemap: false,
    emptyOutDir: true
  }
});
