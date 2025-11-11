import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CreatedJob = {
    id: number;
    jobName: string;
    jobType: string;
    description: string;
    numberOfCandidates: number;
    salaryMin: number;
    salaryMax: number;
}

type JobStoreState = {
    jobs: CreatedJob[];
    addJob: (job: Omit<CreatedJob, 'id'>) => void;
    clear: () => void;
}

export const useJobStore = create<JobStoreState>()(
    persist(
        (set, get) => ({
            jobs: [],
            addJob: (job) =>
                set(() => {
                    const nextId = (get().jobs.at(-1)?.id ?? 0) + 1
                    return { jobs: [...get().jobs, { id: nextId, ...job }] }
                }),
            clear: () => set({ jobs: [] }),
        }),
        { name: 'admin-job-list' }
    )
)


