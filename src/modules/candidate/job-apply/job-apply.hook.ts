import { showSuccessNotification } from '@/components/success-notification'
import { profileFormSchema, ProfileFormValues } from '@/schema/apply-job/apply-job-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'


const useJobApply = (id: string | undefined) => {
    const router = useRouter()
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            profileImage: null,
            fullName: "",
            dateOfBirth: "",
            pronoun: "female",
            domicile: "jakarta",
            phoneNumber: "",
            email: "",
            linkedIn: "",
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    console.log(form.watch('profileImage'))

    const onSubmit = form.handleSubmit((data) => {
        console.log(data)
        console.log("button clicked")
        showSuccessNotification("Job Applied")
        form.reset()
        router.push(`/job-list/${id}/success`)
    })

    return {
        form,
        onSubmit
    }
}

export default useJobApply