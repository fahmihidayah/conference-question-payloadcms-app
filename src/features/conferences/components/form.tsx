'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { conferenceFormSchema, ConferenceFormSchema } from "../type";
import { createConferenceAction } from "../actions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                        <Input
                            {...register("title")}
                            type="text"
                            label="Judul Konferensi"
                            placeholder="Masukkan judul konferensi"
                            error={errors.title?.message}
                            required
                        />

                        {/* Description Field */}
                        <div>
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Deskripsi
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                {...register("description")}
                                id="description"
                                rows={4}
                                className={`flex w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 touch-manipulation ${
                                    errors.description 
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                                }`}
                                placeholder="Masukkan deskripsi konferensi"
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    touchAction: 'manipulation'
                                }}
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>


                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            loadingText="Membuat Konferensi..."
                            variant="primary"
                            size="default"
                        >
                            Buat Konferensi
                        </Button>
                    </div>
            </div>
        </div>
    );
};

export default ConferenceForm;