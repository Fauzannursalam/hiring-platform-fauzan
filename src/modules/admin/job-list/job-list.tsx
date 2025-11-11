'use client'

import JobCard from '@/components/job-card'
import JobCreateForm from '@/components/job-create-form'
import JobEmpty from '@/components/job-empty'
import PromoCard from '@/components/promo-card'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useJobList from './job-list.hook'
import { useJobStore } from '@/store/adminJobStore'
import { useAuth } from '@/store/authStore'

type JobCardProps = {
  id: number;
  status: string;
  statusColor: string;
  startDate: string;
  title: string;
  salary: string;
}

const JobList = () => {
  const router = useRouter()
  const { form, onSubmit, open, setOpen } = useJobList()
  const jobsFromStore = useJobStore((s) => s.jobs)
  const { role } = useAuth()

  // mounted flag to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // guard redirects only on client after mount
    if (!mounted) return

    if (!role) {
      router.replace('/')
      return
    }
    if (role !== 'admin') {
      router.replace('/job-list')
    }
  }, [role, router, mounted])

  // while we are not mounted yet, render nothing (or a client-only skeleton)
  if (!mounted) return null

  // optionally render a loading state until role is resolved
  if (!role || role !== 'admin') return <div>Redirecting…</div>

  const jobs: JobCardProps[] = jobsFromStore.map((j) => ({
    id: j.id,
    status: 'Active',
    statusColor: 'bg-[#F8FBF9] text-[#43936c]',
    startDate: 'started on today',
    title: j.jobName,
    // ensure deterministic formatting — you already used 'id-ID'
    salary: `Rp${j.salaryMin.toLocaleString('id-ID')} - Rp${j.salaryMax.toLocaleString('id-ID')}`,
  }))

  const handleManageJob = (id: number) => {
    router.push(`/dashboard/${id}`)
  }

  return (
    <div>
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search by job details"
              className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg bg-white text-[#1d1f20] placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#01959f]"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#01959f] w-5 h-5" />
          </div>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard handleClick={handleManageJob} key={job.id} job={job} />
              ))
            ) : (
              <JobEmpty onOpenChange={setOpen} />
            )}
          </div>
        </div>
        <div className="w-80">
          <PromoCard onOpenChange={setOpen} />
        </div>
      </div>
      {open && <JobCreateForm onSubmit={onSubmit} isOpen={open} onOpenChange={setOpen} formControl={form} />}
    </div>
  )
}

export default JobList
