'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { signInFormSchema, SignInFormSchema } from "../types";
import { signInAction } from "../actions";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const SignInForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: SignInFormSchema) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await signInAction(data)
            router.push("/conferences")
            reset();
        } catch (error) {
            console.error("Masuk gagal:", error);
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
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Selamat Datang Kembali</h1>
                        <p className="text-blue-600">Masuk ke akun Anda</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
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
                            placeholder="Masukkan kata sandi Anda"
                            error={errors.password?.message}
                            required
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="ml-2 text-sm text-blue-700">Ingat saya</span>
                            </label>
                            <Button
                                type="button"
                                variant="link"
                                size="sm"
                            >
                                Lupa kata sandi?
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            loadingText="Sedang masuk..."
                            variant="primary"
                            size="default"
                            className="w-full"
                        >
                            Masuk
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-blue-600">
                            Belum punya akun?{' '}
                            <Button
                                variant="link"
                                size="sm"
                                className="font-semibold"
                            >
                                Daftar di sini
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};