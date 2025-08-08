'use server';
import config from "@payload-config";
import { getPayload } from "payload";
import { QuestionFormSchema } from "../type";
import { equal } from "assert";
import { sendEvent } from "@/utilities/pusher/pusher-server";


export const getListQuestionByConferenceId = async (id?: number ) => {
    const payload = await getPayload({config})

    const questions = await payload.find({
        collection : "questions",
        where: {
            conference : {
                equals: id
            }
        }
    })

    return questions;
}
export const createQuestion = async (form : FormData) => {
    const payload = await getPayload({config});
    const name = form.get("name") as string;
    const question = form.get('question') as string;
    const conferencesSlug = form.get("slug") as string;
    const conferenceResult = await payload.find({
        collection : "conferences",
        where : {
            slug : {
                equals : conferencesSlug
            }
        }
    });

    const conference = conferenceResult.docs[0];

    const questionResult = await payload.create({
        collection : "questions",
        data : {
            conference : conference.id,
            name : name,
            question : question 
        }
    });

    return questionResult;

}

export const createQuestionAction = async (questionData: QuestionFormSchema) => {
    const payload = await getPayload({config});

    // Cari konferensi berdasarkan slug
    const conferenceResult = await payload.find({
        collection: "conferences",
        where: {
            slug: {
                equals: questionData.conference
            }
        }
    });

    if (conferenceResult.docs.length === 0) {
        throw new Error("Konferensi tidak ditemukan");
    }

    const conference = conferenceResult.docs[0];

    // Buat pertanyaan
    const questionResult = await payload.create({
        collection: "questions",
        data: {
            conference: conference.id,
            name: questionData.name,
            question: questionData.question 
        }
    });


    const event = await sendEvent(questionData.conference)
    console.log("event is ", event)
    return questionResult;
}