import { findAllConferences } from "@/features/conferences/actions"
import ListConferences from "@/features/conferences/components/list-conferences"
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

type Props = {
    params : Promise<{}>
}

export default async function Page() {

    const conferencesDocs = await findAllConferences();

    return <div className="flex flex-col w-full h-full mx-auto container">
        
        
        <div className="flex flex-row justify-between items-center py-4">
            <p>Conferences</p>
            <Link href={"conferences/create"} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
                Create
            </Link>
        </div>
        <ListConferences docs={conferencesDocs} />
    </div>

}