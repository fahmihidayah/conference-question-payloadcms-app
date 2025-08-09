'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { signUpFormSchema, SignUpFormSchema } from "../types";
import { signUpAction } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                        <Input
                            {...register("name")}
                            type="text"
                            label="Nama Lengkap"
                            placeholder="Masukkan nama lengkap Anda"
                            error={errors.name?.message}
                            required
                        />

                        {/* Email Field */}
                        <Input
                            {...register("email")}
                            type="email"
                            label="Alamat Email"
                            placeholder="Masukkan email Anda"
                            error={errors.email?.message}
                            required
                        />

                        {/* Password Field */}
                        <Input
                            {...register("password")}
                            type="password"
                            label="Kata Sandi"
                            placeholder="Masukkan kata sandi"
                            error={errors.password?.message}
                            required
                        />

                        {/* Confirm Password Field */}
                        <Input
                            {...register("confirmPassword")}
                            type="password"
                            label="Konfirmasi Kata Sandi"
                            placeholder="Ulangi kata sandi"
                            error={errors.confirmPassword?.message}
                            required
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            loadingText="Mendaftarkan..."
                            variant="primary"
                            size="default"
                            className="w-full"
                        >
                            Daftar
                        </Button>
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