import { z } from "zod";

export const FieldRequirement = z.enum(["mandatory", "optional", "off"]);
export type FieldRequirement = z.infer<typeof FieldRequirement>;

export const JobType = z.enum([
  "full-time",
  "contract",
  "part-time",
  "internship",
  "Freelance",
]);
export type JobType = z.infer<typeof JobType>;

export const ProfileRequirementsSchema = z.object({
  fullname: FieldRequirement,
  photo: FieldRequirement,
  gender: FieldRequirement,
  domicile: FieldRequirement,
  email: FieldRequirement,
  phone: FieldRequirement,
  linkedin: FieldRequirement,
  dob: FieldRequirement,
});
export type ProfileRequirements = z.infer<typeof ProfileRequirementsSchema>;

export const JobCreateSchema = z
  .object({
    jobName: z.string().min(1, "Job name is required"),
    jobType: JobType,
    description: z.string().min(1, "Job description is required"),
    // input is text in your form; preprocess to number
    numberOfCandidates: z
      .preprocess((val) => {
        if (typeof val === "string" && val.trim() !== "") return Number(val);
        return val;
      }, z.number().int().min(1, "At least 1 candidate is required")),
    salaryMin: z.preprocess(
      (val) => (typeof val === "string" && val.trim() !== "" ? Number(val) : val),
      z.number().min(1, "Salary min must be greater than 0")
    ),
    salaryMax: z.preprocess(
      (val) => (typeof val === "string" && val.trim() !== "" ? Number(val) : val),
      z.number().min(1, "Salary max must be greater than 0")
    ),
    profileRequirements: ProfileRequirementsSchema,
  })
  .refine((data) => {
    if (typeof data.salaryMin === "number" && typeof data.salaryMax === "number") {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  }, {
    path: ["salaryMax"],
    message: "Maximum salary must be greater than or equal to minimum salary",
  });

export type JobCreateInput = z.infer<typeof JobCreateSchema>;
