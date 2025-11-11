import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./ui/input-group"
import { useState } from "react"
import FieldRadioChips from "./field-radio-chip"
import { Controller, UseFormReturn } from "react-hook-form"
import { JobCreateInput } from "@/schema/create-job/create-job-schema"

type JobCreateFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  formControl: UseFormReturn<JobCreateInput>;
}

type FieldRequirement = "mandatory" | "optional" | "off"

interface ProfileField {
  id: string
  label: string
  requirement: FieldRequirement
  disabledOptions?: FieldRequirement[]
}

const initialFields: ProfileField[] = [
  { id: "fullname", label: "Full name", requirement: "mandatory", disabledOptions: ["optional", "off"] },
  { id: "photo", label: "Photo Profile", requirement: "mandatory" },
  { id: "gender", label: "Gender", requirement: "mandatory" },
  { id: "domicile", label: "Domicile", requirement: "mandatory" },
  { id: "email", label: "Email", requirement: "mandatory", disabledOptions: ["optional", "off"] },
  { id: "phone", label: "Phone number", requirement: "mandatory" },
  { id: "linkedin", label: "Linkedin link", requirement: "mandatory" },
  { id: "dob", label: "Date of birth", requirement: "mandatory" },
]


const JobCreateForm = ({ isOpen, onOpenChange, onSubmit, formControl }: JobCreateFormProps) => {
  const [fields, setFields] = useState<ProfileField[]>(initialFields)

  const { watch, setValue, formState } = formControl

  const profileRequirements = watch("profileRequirements");

  const handleRequirementChange = (id: string, requirement: FieldRequirement) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, requirement } : field)))
    setValue(`profileRequirements.${id as keyof typeof profileRequirements}`, requirement, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="lg:min-w-[900px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader>
          <DialogTitle>Create a job</DialogTitle>
          <DialogDescription>
            Fill the form to create a new job.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 w-full h-[70vh] overflow-auto">
          <FieldGroup>
            <Controller
              control={formControl.control}
              name="jobName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Job Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Ex. Front End Engineer"
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              control={formControl.control}
              name="jobType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Job Type</FieldLabel>
                  <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              control={formControl.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Job Description</FieldLabel>
                  <Textarea placeholder="Ex" {...field} />
                </Field>
              )}
            />
            <Controller
              control={formControl.control}
              name="numberOfCandidates"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Number of Candidate Needed</FieldLabel>
                  <Input type="text" placeholder="Ex. 2" {...field} />
                </Field>
              )}
            />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-4">Job Salary</h3>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  control={formControl.control}
                  name="salaryMin"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Minimum Estimated Salary</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>Rp</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="7.000.000"
                          value={String(field.value ?? "")}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            field.onChange(Number(val || 0));
                          }}
                        />
                      </InputGroup>
                    </Field>
                  )}
                />

                <Controller
                  control={formControl.control}
                  name="salaryMax"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Maximum Estimated Salary</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>Rp</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="8.000.000"
                          value={String(field.value ?? "")}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            field.onChange(Number(val || 0));
                          }}
                        />
                      </InputGroup>
                    </Field>
                  )}
                />
              </div>
            </div>
            <div className="p-4 border border-[#EDEDED] shadow-xl rounded-2xl">
              <h1 className="text-sm font-semibold text-foreground mb-4">Minimum Profile Information Required</h1>
              <div className="space-y-3 rounded-lg">
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <FieldRadioChips
                      label={field.label}
                      requirement={field.requirement}
                      onRequirementChange={(req) => handleRequirementChange(field.id, req)}
                      disabledOptions={field.disabledOptions}
                    />
                    {index < fields.length - 1 && <div className="h-px bg-[#e0e0e0]" />}
                  </div>
                ))}
              </div>
            </div>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" disabled={!formState.isValid}>
              Publish Job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default JobCreateForm
