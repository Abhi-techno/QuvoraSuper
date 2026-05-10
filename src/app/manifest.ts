
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quvora Marketplace',
    short_name: 'Quvora',
    description: 'India\'s first AI-powered vernacular marketplace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1B2A',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
