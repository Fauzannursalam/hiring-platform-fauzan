import React from 'react'
import Image from 'next/image'


const CandidateEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8 h-64 w-64">
        <Image
          src="/empty-candidates.png"
          width={500}
          height={500}
          alt="No jobs available"
          className="h-full w-full object-contain"
        />
      </div>

      <h2 className="mb-2 text-2xl font-semibold text-[#1d1f20]">No candidates found</h2>
      <p className="mb-8 text-center text-[#757575]">Share your job vacancies so that more candidates will apply</p>
    </div>
  )
}

export default CandidateEmpty
