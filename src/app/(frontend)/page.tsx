import LandingPageWithAuth from '@/components/LandingPage/example'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'


type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page() {
    return <LandingPageWithAuth />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    return {
        title : "Conference App",
        description : "Conference apps"
    }
}
