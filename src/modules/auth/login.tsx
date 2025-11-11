"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { showSuccessNotification } from "@/components/success-notification";
import Image from "next/image";

const LoginForm = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { role, setRole } = useAuth();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (username === "admin" && password === "password") {
			setRole("admin");
			router.push("/dashboard");
			showSuccessNotification("Login Successfully");
			return;
		}

		if (username === "candidate" && password === "password") {
			setRole("candidate");
			router.push("/job-list");
			showSuccessNotification("Login Successfully");
			return;
		}

		toast.error("Invalid credentials");
	};

	useEffect(() => {
		if (!role) {
			const cookieRole = typeof document !== "undefined" ? document.cookie.match(/(^|;)\s*role=([^;]+)/)?.[2] ?? null : null;

			if (cookieRole) {
				setRole(cookieRole);
			}
		}
	}, [role, setRole]);

	useEffect(() => {
		if (!role) return;

		if (role === "admin") {
			router.replace("/dashboard");
			return;
		}

		if (role === "candidate") {
			router.replace("/job-list");
			return;
		}

		setRole(null);
	}, [role, router, setRole]);

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex flex-col w-full max-w-sm pt-8">
				{/* 👇 LOGO */}
				<div className="-ml-4 translate-y-12 mb-3">
					<Image src="/logo rakamin.png" alt="Logo Rakamin" width={120} height={160} className=" h-auto w-40 object-contain" priority />
				</div>

				{/* 👇 FORM */}
				<form onSubmit={handleSubmit} autoComplete="off" className="w-full border border-gray-300 bg-white p-6 shadow-lg space-y-5">
					<h2 className="text-lg font-semibold mb-1">Masuk Ke Rakamin</h2>
					<p className="text-sm text-muted-foreground mb-6">
						Belum punya akun?{" "}
						<a href="#" className="text-primary font-medium text-sm ">
							Daftar menggunakan email
						</a>
					</p>
					<Field>
						<FieldLabel>Username</FieldLabel>
						<Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" autoComplete="username" />
					</Field>
					<Field>
						<FieldLabel>Password</FieldLabel>
						<div className="relative">
							<Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
							<button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted">
								{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
							</button>
						</div>
					</Field>{" "}
					<a href="#" className="text-primary text-sm font-medium items-end flex justify-end">
						Lupa kata sandi?
					</a>
					<Button type="submit" className="w-full mt-5">
						Login
					</Button>
					{/* 👇 PEMBATAS DENGAN GARIS DAN "OR" */}
					<div className="flex items-center my-4">
						<div className=" grow h-px bg-gray-300" />
						<span className="px-3 text-gray-500 text-sm font-medium">OR</span>
						<div className=" grow h-px bg-gray-300" />
					</div>
					{/* 👇 BUTTON KIRIM LINK EMAIL */}
					<Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300">
						<Image src="/email.svg" alt="Mail Icon" width={16} height={16} />
						Kirim link email
					</Button>
					{/* 👇 BUTTON MASUK DENGAN GOOGLE */}
					<Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300">
						<Image src="/google.svg" alt="Google Icon" width={18} height={18} />
						Masuk dengan Google
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
