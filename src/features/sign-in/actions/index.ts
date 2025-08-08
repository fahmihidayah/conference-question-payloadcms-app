'use server'

import { getPayload } from "payload";
import { SignInFormSchema } from "../types"
import config from "@payload-config";

export const signInAction = async (signInForm : SignInFormSchema) => {
    const payload = await getPayload({config})

    const token = await payload.login({
        collection : 'users',
        data : {
            email : signInForm.email,
            password : signInForm.password
        }
    });

    return token;
}