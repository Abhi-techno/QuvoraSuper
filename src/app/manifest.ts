// This file is kept but disconnected from the root layout to avoid workstation proxy CORS errors.
// It will be re-enabled during production deployment.

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quvora',
    short_name: 'Quvora',
    description: "India's first AI-powered superapp.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F3',
    theme_color: '#1A6AFF',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
