"use client"

import React from "react"
import { MapPin, DollarSign, Code2 } from "lucide-react"

export type Job = {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  description: string[]
}

type CandidateJobProps = {
  jobs: Job[]
  activeJobId: number
  onSelectJob: (id: number) => void
}

const CandidateJobCard= ({ jobs, activeJobId, onSelectJob }: CandidateJobProps) => {
  return (
    <div className="w-80 flex-shrink-0 overflow-y-auto pr-2">
      <div className="space-y-3">
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => onSelectJob(job.id)}
            aria-pressed={activeJobId === job.id}
            className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
              activeJobId === job.id
                ? "border-[#01959f] bg-[#f3fbfc]"
                : "border-[#e0e0e0] bg-white hover:border-[#01959f] hover:bg-[#f8fbf9]"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#01959f] rounded flex items-center justify-center flex-shrink-0">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[#1d1f20] truncate">{job.title}</h3>
                <p className="text-sm text-[#808080] truncate">{job.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2 text-[#4c4c4c]">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">{job.location}</span>
            </div>

            <div className="flex items-center gap-2 text-[#4c4c4c]">
              <DollarSign className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">{job.salary}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CandidateJobCard
