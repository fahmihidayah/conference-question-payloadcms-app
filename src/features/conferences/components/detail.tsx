'use client';
import { Conference, Question } from "@/payload-types";
import { MessageCircle, Calendar, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ConferenceDetailProps {
    conference?: Conference;
    questions?: Question[];
}

export default function ConferenceDetail({ conference, questions }: ConferenceDetailProps) {
    const router = useRouter();

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Tidak diketahui';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 w-full">
            <div className="mx-auto px-10 w-full">
                {/* Header with back button */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Konferensi</span>
                    </button>
                </div>

                {/* Conference Details Card */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 ">
                        {conference?.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Dibuat: {formatDate(conference?.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{questions?.length} Pertanyaan</span>
                        </div>
                    </div>
                </div>

                {/* Questions Section */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Pertanyaan ({questions?.length})
                        </h2>
                    </div>

                    <div className="p-6">
                        {questions?.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Belum ada pertanyaan</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Jadilah yang pertama bertanya untuk konferensi ini!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 w-full overflow-y-auto">
                                {questions?.map((question, index) => (
                                    <div
                                        key={question.id}
                                        className={`flex justify-start w-full`}
                                    >
                                        <div
                                            className={`w-full p-4 rounded-2xl bg-blue-100 text-white rounded-br-sm shadow-sm`}
                                        >
                                            <div className="mb-2">
                                                <div className={`flex items-center gap-2 text-x text-blue-800
                                                    mb-2`}>
                                                    <User className="w-6 h-6" />
                                                    <span className="font-medium">{question.name}</span>
                                                    <span>{formatDate(question.createdAt)}</span>
                                                </div>
                                                <p className="text-lg leading-relaxed whitespace-pre-wrap text-blue-800">
                                                    {question.question}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

               
            </div>
        </div>
    );
}