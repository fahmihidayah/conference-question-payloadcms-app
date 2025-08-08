import { findByIdConferences } from "@/features/conferences/actions";
import ConferenceDetail from "@/features/conferences/components/detail";
import config from "@payload-config";
import { equal } from "assert";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type Props = {
    params : Promise<{
        slug : string
    }>
}

export default async function CreateQuestion(props : Props) {

    const payload = await getPayload({
        config
    })
    const conferenceWithQuestion = await findByIdConferences((await props.params).slug)

    return <div className="flex flex-col w-full h-full mx-auto items-center">
        <ConferenceDetail conference={conferenceWithQuestion?.conference} questions={conferenceWithQuestion?.questions} />
    </div>
}