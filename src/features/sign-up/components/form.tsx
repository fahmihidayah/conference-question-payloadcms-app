'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { signUpFormSchema, SignUpFormSchema } from "../types";
import { signUpAction } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: SignUpFormSchema) => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        
        try {
            const result = await signUpAction(data);
            
            if (result.success) {
                setSubmitMessage("Pendaftaran berhasil! Anda akan dialihkan ke dashboard...");
                reset();
                
                // Redirect to conferences after successful signup
                setTimeout(() => {
                    router.push("/conferences");
                    router.refresh(); // Refresh to update auth state
                }, 2000);
            } else {
                setSubmitMessage(result.error || "Pendaftaran gagal. Silakan coba lagi.");
            }
        } catch (error) {
            console.error("Pendaftaran gagal:", error);
            setSubmitMessage("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Buat Akun Baru</h1>
                        <p className="text-blue-600">Bergabunglah dengan KonfQ</p>
                    </div>

                    {/* Success/Error Message */}
                    {submitMessage && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            submitMessage.includes("berhasil") 
                                ? "bg-green-50 text-green-800 border border-green-200" 
                                : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                            {submitMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label 
                                htmlFor="name" 
                                className="block text-sm font-medium text-blue-900 mb-2"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                    errors.name 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-blue-200 bg-blue-50 focus:border-blue-500 hover:border-blue-300'
                                }`}
                                placeholder="Masukkan nama lengkap Anda"
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

                        {/* Email Field */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-blue-900 mb-2"
                            >
                                Alamat Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                    errors.email 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-blue-200 bg-blue-50 focus:border-blue-500 hover:border-blue-300'
                                }`}
                                placeholder="Masukkan email Anda"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-blue-900 mb-2"
                            >
                                Kata Sandi
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                id="password"
                                className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                    errors.password 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-blue-200 bg-blue-50 focus:border-blue-500 hover:border-blue-300'
                                }`}
                                placeholder="Masukkan kata sandi"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className="block text-sm font-medium text-blue-900 mb-2"
                            >
                                Konfirmasi Kata Sandi
                            </label>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                id="confirmPassword"
                                className={`text-black w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                    errors.confirmPassword 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                        : 'border-blue-200 bg-blue-50 focus:border-blue-500 hover:border-blue-300'
                                }`}
                                placeholder="Ulangi kata sandi"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.confirmPassword.message}
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
                                    Mendaftarkan...
                                </div>
                            ) : (
                                'Daftar'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-blue-600">
                            Sudah punya akun?{' '}
                            <Link 
                                href="/auth" 
                                className="font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200"
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};