'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { conferenceFormSchema, ConferenceFormSchema } from "../type";
import { createConferenceAction } from "../actions";
import { useRouter } from "next/navigation";

export const ConferenceForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ConferenceFormSchema>({
        resolver: zodResolver(conferenceFormSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const onSubmit = async (data: ConferenceFormSchema) => {
        setIsSubmitting(true);
        try {
            await createConferenceAction(data);
            router.push("/conferences");
            reset();
        } catch (error) {
            console.error("Pembuatan konferensi gagal:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Konferensi</h1>
                    <p className="text-gray-600">Tambahkan konferensi baru</p>
                </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Title Field */}
                        <div>
                            <label 
                                htmlFor="title" 
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Judul Konferensi
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                id="title"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
                                    errors.title 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-gray-200 bg-white focus:border-gray-500 hover:border-gray-300'
                                }`}
                                placeholder="Masukkan judul konferensi"
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Deskripsi
                            </label>
                            <textarea
                                {...register("description")}
                                id="description"
                                rows={4}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
                                    errors.description 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-gray-200 bg-white focus:border-gray-500 hover:border-gray-300'
                                }`}
                                placeholder="Masukkan deskripsi konferensi"
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>


                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className={`py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gray-600 hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Membuat Konferensi...
                                </div>
                            ) : (
                                'Buat Konferensi'
                            )}
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default ConferenceForm;