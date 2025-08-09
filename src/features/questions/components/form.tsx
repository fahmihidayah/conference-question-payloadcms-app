'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questionFormSchema, QuestionFormSchema } from "../type";
import { createQuestionAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                    <Input
                        {...register("name")}
                        type="text"
                        label="Nama Anda"
                        placeholder="Masukkan nama Anda"
                        error={errors.name?.message}
                        required
                    />

                    {/* Question Field */}
                    <div>
                        <label 
                            htmlFor="question" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Pertanyaan Anda
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            {...register("question")}
                            id="question"
                            rows={6}
                            className={`flex w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 touch-manipulation resize-vertical ${
                                errors.question 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                            }`}
                            placeholder="Ketik pertanyaan Anda di sini..."
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                touchAction: 'manipulation'
                            }}
                        />
                        {errors.question && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.question.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        loadingText="Mengirim Pertanyaan..."
                        variant="primary"
                        size="default"
                        className="w-full"
                    >
                        Kirim Pertanyaan
                    </Button>

                    {/* Cancel Button */}
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        variant="ghost"
                        size="default"
                        className="w-full"
                    >
                        Batal
                    </Button>
                </form>
            </div>
        </div>
    );
}