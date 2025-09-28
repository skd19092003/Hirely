/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ filename: 'dist/bundle-analysis.html', open: false })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core React
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor_react';
            }
            // Clerk auth
            if (id.includes('@clerk') || id.includes('clerk')) {
              return 'vendor_clerk';
            }
            // Supabase
            if (id.includes('@supabase') || id.includes('supabase-js')) {
              return 'vendor_supabase';
            }
            // Markdown editor
            if (id.includes('@uiw/react-md-editor')) {
              return 'vendor_mdeditor';
            }
            // Icon libraries
            if (id.includes('lucide-react') || id.includes('@tabler')) {
              return 'vendor_icons';
            }
            // Spinners / small UI libs
            if (id.includes('react-spinners')) {
              return 'vendor_spinners';
            }
            // Carousel
            if (id.includes('embla-carousel-react') || id.includes('embla-carousel-autoplay')) {
              return 'vendor_embla';
            }
            // Particles / heavy visual libs
            if (id.includes('tsparticles') || id.includes('@tsparticles') || id.includes('react-tsparticles')) {
              return 'vendor_particles';
            }
            // Country/state/city data
            if (id.includes('country-state-city')) {
              return 'vendor_country_state_city';
            }
            // React starfield (if used)
            if (id.includes('react-starfield')) {
              return 'vendor_starfield';
            }
            // vaul (drawer lib)
            if (id.includes('vaul')) {
              return 'vendor_vaul';
            }
            // Vercel analytics / speed-insights
            if (id.includes('@vercel') || id.includes('vercel')) {
              return 'vendor_vercel';
            }
            // utility / small libs
            if (id.includes('class-variance-authority') || id.includes('tailwind-merge') || id.includes('shadcn')) {
              const pkg = id.split('node_modules/')[1].split('/')[0];
              return `vendor_${pkg}`;
            }
            // Utility libs: lodash, date-fns, axios, zod, etc.
            if (id.match(/node_modules\/(lodash|date-fns|axios|zod)/)) {
              const pkg = id.split('node_modules/')[1].split('/')[0];
              return `vendor_${pkg}`;
            }
            // Markdown / syntax highlighting related (refractor, rehype, remark, unist)
            if (id.includes('refractor') || id.includes('rehype') || id.includes('remark') || id.includes('unist-util') || id.includes('hast-util') || id.includes('vfile') || id.includes('parse-numeric-range')) {
              return 'vendor_markdown';
            }
            // swr (data fetching helper)
            if (id.includes('swr')) {
              return 'vendor_swr';
            }
            // radix-ui and floating-ui (UI primitives used by shadcn)
            if (id.includes('@radix-ui') || id.includes('@floating-ui') || id.includes('aria-hidden') || id.includes('use-callback-ref')) {
              return 'vendor_ui_primitives';
            }
            // small helper libraries often pulled into misc
            if (id.includes('clsx') || id.includes('use-sidecar') || id.includes('use-callback-ref') || id.includes('use-') ) {
              // try to create a separate chunk per package when possible
              const parts = id.split('node_modules/')[1] || '';
              const pkg = parts.split('/')[0];
              if (pkg) return `vendor_${pkg}`;
            }
            // Fallback for remaining node_modules
            return 'vendor_misc';
          }
        }
      }
    }
  }
});