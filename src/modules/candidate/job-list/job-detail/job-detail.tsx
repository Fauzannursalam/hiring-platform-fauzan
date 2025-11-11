"use client"

import React from "react"
import { Code2 } from "lucide-react"
import { Job } from "../job-card/job-card"

type JobDetailProps = {
  job: Job | null
  onApply?: (job: Job) => void
}

const JobDetail = ({ job, onApply }: JobDetailProps ) => {
  if (!job) {
    return (
      <div className="flex-1 border border-[#e0e0e0] rounded-lg p-8 flex items-center justify-center">
        <p className="text-[#808080]">Pilih pekerjaan untuk melihat detailnya</p>
      </div>
    )
  }

  return (
    <div className="flex-1 border border-[#e0e0e0] rounded-lg p-8 overflow-y-auto">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#01959f] rounded flex items-center justify-center flex-shrink-0">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-[#367a59] text-white text-xs font-semibold px-3 py-1 rounded">
                {job.type}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#1d1f20] mb-1">{job.title}</h1>
            <p className="text-[#808080]">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => onApply?.(job)}
          className="bg-[#fbc037] hover:bg-[#fdc039] text-[#1d1f20] font-semibold px-6 py-2 rounded transition-colors flex-shrink-0 cursor-pointer"
        >
          Apply
        </button>
      </div>

      <div className="space-y-3">
        <ul className="space-y-2 text-[#4c4c4c] text-sm leading-relaxed">
          {job.description.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-[#01959f] font-bold flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobDetail
