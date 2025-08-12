import React from 'react'
import type { Metadata } from 'next'
import PrivacyPolicy from '@/components/privacy-policy'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan Privasi platform konferensi dan tanya jawab. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.',
  openGraph: {
    title: 'Kebijakan Privasi',
    description: 'Kebijakan Privasi platform konferensi dan tanya jawab. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}