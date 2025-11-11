import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { JobCreateSchema, JobCreateInput } from '@/schema/create-job/create-job-schema'
import { showSuccessNotification } from '@/components/success-notification';
import { useState } from 'react';
import { useJobStore } from '@/store/adminJobStore';


const useJobList = () => {
    const [open, setOpen] = useState(false)
    const form = useForm<JobCreateInput>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(JobCreateSchema) as Resolver<JobCreateInput, any>,
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            jobName: "",
            jobType: "full-time",
            description: "",
            numberOfCandidates: 1,
            salaryMin: 0,
            salaryMax: 0,
            profileRequirements: {
                fullname: "mandatory",
                photo: "mandatory",
                gender: "mandatory",
                domicile: "mandatory",
                email: "mandatory",
                phone: "mandatory",
                linkedin: "mandatory",
                dob: "mandatory",
            },
        },
    });

    const addJob = useJobStore((s) => s.addJob)

    const onSubmit = form.handleSubmit((data) => {
        addJob({
            jobName: data.jobName,
            jobType: data.jobType,
            description: data.description,
            numberOfCandidates: data.numberOfCandidates,
            salaryMin: data.salaryMin,
            salaryMax: data.salaryMax,
        })
        showSuccessNotification();
        setOpen(false)
        form.reset()
    })
    return {
        form,
        onSubmit,
        open,
        setOpen
    }
}

export default useJobList