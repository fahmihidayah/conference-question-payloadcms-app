'use server';

import { getPayload } from "payload";
import { QuestionFormSchema, ConferenceFormSchema } from "../type";
import config from "@payload-config";
import { cookies, headers } from "next/headers";
import { equal } from "assert";

export const findByIdConferences = async (slug: string) => {
    const payload = await getPayload({config});

    // Cari konferensi berdasarkan slug
    const conferenceResult = await payload.find({
        collection: 'conferences',
        where: {
            slug: {
                equals: slug
            }
        },
        limit: 1
    });

    if (conferenceResult.docs.length === 0) {
        return null;
    }

    const conference = conferenceResult.docs[0];

    // Cari semua pertanyaan untuk konferensi ini
    const questionsResult = await payload.find({
        collection: 'questions',
        where: {
            conference: {
                equals: conference.id
            }
        },
        sort: 'createdAt', // yang paling lama dulu
        limit: 1000
    });

    return {
        conference,
        questions: questionsResult.docs
    };
}

export const findAllConferences = async () => {
    const payload = await getPayload({config});

    return payload.find({
        collection : "conferences"
    });
}

export const deleteConference = async (slug : string ) => {
    const payload = await getPayload({config});

    const deleted = await payload.delete({
        collection: "conferences",
        where: {
            slug : {
                equals : slug
            }
        }
    })

    return deleted;
}

export const deleteConferenceById = async (id: number) => {
    const payload = await getPayload({config});

    try {
        // Pertama cari dan hapus semua pertanyaan terkait
        await payload.delete({
            collection: "questions",
            where: {
                conference: {
                    equals: id
                }
            }
        });

        // Kemudian hapus konferensi
        const deleted = await payload.delete({
            collection: "conferences",
            id: id
        });

        return deleted;
    } catch (error) {
        console.error("Kesalahan menghapus konferensi:", error);
        throw new Error(`Gagal menghapus konferensi: ${error instanceof Error ? error.message : 'Kesalahan tidak diketahui'}`);
    }
}

export const creatConference = async (questionFormSchema : QuestionFormSchema) => {

    const payload = await getPayload({config});

    const slug = questionFormSchema.title.toLowerCase().split(" ").join("-");

    const question = await payload.create({
        collection : "conferences",
        data : {
            slug : slug,
            ... questionFormSchema,
        }
    });

    return question;

}

export const createConferenceAction = async (conferenceForm: ConferenceFormSchema) => {
    const payload = await getPayload({config});
    
    const slug = conferenceForm.title.toLowerCase().split(" ").join("-");

    const conference = await payload.create({
        collection: "conferences",
        data: {
            slug: slug,
            ...conferenceForm,
        }
    });

    return conference;
}