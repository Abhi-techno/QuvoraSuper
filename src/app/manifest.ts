
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quvora Marketplace',
    short_name: 'Quvora',
    description: 'India\'s first AI-powered vernacular marketplace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B14',
    theme_color: '#0B0B14',
    icons: [],
  }
}
