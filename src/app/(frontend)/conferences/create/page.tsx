import ConferenceForm from "@/features/conferences/components/form";
import isPageCanBeAccessed from "@/utilities/protectPageUtils";
import { redirect } from "next/navigation";

export default async function Page() {
    if(! (await isPageCanBeAccessed())) {
            redirect("/auth")
        }
    
    return <ConferenceForm />
}