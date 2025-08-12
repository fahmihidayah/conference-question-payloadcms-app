import React from 'react'
import type { Metadata } from 'next'
import TermOfService from '@/components/term-of-service'

export const metadata: Metadata = {
  title: 'Syarat dan Ketentuan Layanan',
  description: 'Syarat dan Ketentuan Layanan platform konferensi dan tanya jawab. Pelajari aturan dan pedoman penggunaan platform kami.',
  openGraph: {
    title: 'Syarat dan Ketentuan Layanan',
    description: 'Syarat dan Ketentuan Layanan platform konferensi dan tanya jawab. Pelajari aturan dan pedoman penggunaan platform kami.',
  },
}

export default function TermOfServicesPage() {
  return <TermOfService />
}