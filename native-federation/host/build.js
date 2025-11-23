import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { federationBuilder } = require('@softarc/native-federation/build');
const { createEsBuildAdapter } = require('@softarc/native-federation-esbuild');
const { reactReplacements } = require('@softarc/native-federation-esbuild/src/lib/react-replacements');
const esbuild = require('esbuild');

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = 'host';
const outputPath = 'dist';

async function build() {
  console.log('🚀 Building Host Application...');

  // Clean dist directory
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true });
  }
  fs.mkdirSync(outputPath, { recursive: true });

  // Initialize federation builder with React adapter
  await federationBuilder.init({
    options: {
      workspaceRoot: __dirname,
      outputPath,
      tsConfig: 'tsconfig.json',
      federationConfig: 'federation.config.cjs',
      dev: false,
      verbose: true,  // Enable verbose logging
    },
    adapter: createEsBuildAdapter({
      plugins: [],
      fileReplacements: reactReplacements.prod,
    }),
  });

  // Build the main application
  await esbuild.build({
    entryPoints: [path.join(__dirname, 'src', 'main.tsx')],
    bundle: true,
    format: 'esm',
    outdir: outputPath,
    splitting: true,
    sourcemap: true,
    platform: 'browser',
    target: ['es2020'],
    jsx: 'automatic',
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.css': 'css',
      '.svg': 'file',
    },
    external: federationBuilder.externals,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[name]-[hash]',
  });

  // Build federation bundles
  await federationBuilder.build();

  // Copy index.html and inject import map
  const indexHtmlPath = path.join(__dirname, 'index.html');
  const distIndexHtmlPath = path.join(outputPath, 'index.html');
  const importMapPath = path.join(outputPath, 'importmap.json');
  
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  let importMap = '';
  
  // Read and inject importmap if it exists
  if (fs.existsSync(importMapPath)) {
    const importMapData = JSON.parse(fs.readFileSync(importMapPath, 'utf-8'));
    // Prefix all import paths with ./
    for (const key in importMapData.imports) {
      if (!importMapData.imports[key].startsWith('./') && !importMapData.imports[key].startsWith('http')) {
        importMapData.imports[key] = './' + importMapData.imports[key];
      }
    }
    importMap = `<script type="importmap">\n${JSON.stringify(importMapData, null, 2)}\n</script>\n    `;
  }
  
  // Update the script src to point to the built file and add import map
  indexHtml = indexHtml.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    `${importMap}<script type="module" src="/main.js"></script>`
  );
  fs.writeFileSync(distIndexHtmlPath, indexHtml);

  console.log('✅ Host build completed!');
  console.log('📦 Output directory:', outputPath);
  console.log('📄 Files:', fs.readdirSync(outputPath).join(', '));
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  console.error(err.stack);
  process.exit(1);
});




