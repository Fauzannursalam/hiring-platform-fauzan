import { z } from "zod";

const MIN_AGE = 18

export const profileFormSchema = z.object({
    fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    dateOfBirth: z
        .string()
        .refine((val) => {
            const d = new Date(val)
            if (Number.isNaN(d.getTime())) return false
            const today = new Date()
            let age = today.getFullYear() - d.getFullYear()
            const m = today.getMonth() - d.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
            return age >= MIN_AGE
        }, `Kamu harus berusia minimal ${MIN_AGE} tahun`),
    pronoun: z.enum(["female", "male"]),
    domicile: z.enum(["jakarta", "surabaya", "bandung", "medan"]),
    phoneNumber: z
        .string()
        .min(6, "Nomor telepon terlalu pendek")
        .max(15, "Nomor telepon terlalu panjang")
        .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
        .refine((val) => {
            const cleaned = val.replace(/^(\+|0)+/, "")
            return cleaned.length >= 8
        }, "Format nomor tidak valid"),
    email: z.string().email("Format email tidak valid"),
    linkedIn: z
        .string()
        .refine((val) => val.includes("linkedin.com"), "URL harus mengandung linkedin.com"),
    profileImage: z.string().nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
