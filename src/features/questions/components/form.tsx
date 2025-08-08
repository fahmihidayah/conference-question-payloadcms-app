'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questionFormSchema, QuestionFormSchema } from "../type";
import { createQuestionAction } from "../actions";

interface QuestionFormProps {
    conferenceSlug: string;
    conferenceName?: string;
}

export default function QuestionForm({ conferenceSlug, conferenceName }: QuestionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<QuestionFormSchema>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            name: "",
            question: "",
            conference: conferenceSlug
        }
    });

    const onSubmit = async (data: QuestionFormSchema) => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        
        try {
            await createQuestionAction(data);
            setSubmitMessage("Pertanyaan berhasil dikirim!");
            reset();
            
        } catch (error) {
            console.error("Gagal mengirim pertanyaan:", error);
            setSubmitMessage("Gagal mengirim pertanyaan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 w-full">
            <div className="w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajukan Pertanyaan</h1>
                    {conferenceName && (
                        <p className="text-gray-600">Untuk: {conferenceName}</p>
                    )}
                </div>

                {/* Success/Error Message */}
                {submitMessage && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        submitMessage.includes("successfully") 
                            ? "bg-green-50 text-green-800 border border-green-200" 
                            : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                        {submitMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Hidden conference field */}
                    <input
                        {...register("conference")}
                        type="hidden"
                        value={conferenceSlug}
                    />

                    {/* Name Field */}
                    <div>
                        <label 
                            htmlFor="name" 
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            Nama Anda
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            id="name"
                            className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
                                errors.name 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                    : 'border-gray-200 bg-white focus:border-gray-500 hover:border-gray-300'
                            }`}
                            placeholder="Masukkan nama Anda"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Question Field */}
                    <div>
                        <label 
                            htmlFor="question" 
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            Pertanyaan Anda
                        </label>
                        <textarea
                            {...register("question")}
                            id="question"
                            rows={6}
                            className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 resize-vertical ${
                                errors.question 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                    : 'border-gray-200 bg-white focus:border-gray-500 hover:border-gray-300'
                            }`}
                            placeholder="Ketik pertanyaan Anda di sini..."
                        />
                        {errors.question && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.question.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                            isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim Pertanyaan...
                            </div>
                        ) : (
                            'Kirim Pertanyaan'
                        )}
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full py-2 px-4 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Batal
                    </button>
                </form>
            </div>
        </div>
    );
}