import { initFederation } from '@softarc/native-federation';

(async () => {
  // Initialize federation with remote mapping
  await initFederation({
    remote: 'http://localhost:5001/remoteEntry.json',
  });

  // Import and bootstrap the app after federation is ready
  const { default: bootstrap } = await import('./bootstrap');
  bootstrap();
})();

