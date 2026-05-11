
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quvora',
    short_name: 'Quvora',
    description: "India's first AI-powered superapp.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F3',
    theme_color: '#121212',
    icons: [
      {
        src: 'https://placehold.co/192x192/7C4DFF/ffffff?text=Q',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://placehold.co/512x512/7C4DFF/ffffff?text=Q',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
