import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

type JobEmptyProps = {
  onOpenChange: (value: boolean) => void
}

const JobEmpty = ({ onOpenChange }: JobEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-8 h-64 w-64">
        <Image
          src="/empty.png"
          width={500}
          height={500}
          alt="No jobs available"
          className="h-full w-full object-contain"
        />
      </div>

      <h2 className="mb-2 text-2xl font-semibold text-[#1d1f20]">No job openings available</h2>
      <p className="mb-8 text-center text-[#757575]">Create a job opening now and start the candidate process.</p>

      <Button
        onClick={() => onOpenChange(true)}
        className="bg-[#f9bb0b] text-[#1d1f20] hover:bg-[#f9bb0b]/90 font-semibold px-8 py-2"
      >
        Create a new job
      </Button>
    </div>
  )
}

export default JobEmpty
