'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SuccessApply = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/job-list")
        }, 3000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className=" flex items-center justify-center px-4 min-h-screen">
            <div className="flex flex-col items-center justify-center max-w-2xl text-center">
                {/* Celebration Illustration */}
                <div className="mb-8">
                    <Image
                        src="/Verified.png"
                        alt="Celebration illustration with three people jumping"
                        width={214}
                        height={214}
                        priority

                    />
                </div>

                {/* Heading with Emoji */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#1d1f20] mb-4 flex items-center justify-center gap-2">
                    <span>🎉</span>
                    <span>Your application was sent!</span>
                </h1>

                {/* Body Text */}
                <p className="text-lg text-[#404040] leading-relaxed">
                    Congratulations! You&apos;ve taken the first step towards a rewarding career at Rakamin.
                    <br />
                    We look forward to learning more about you during the application process.
                </p>
            </div>
        </div>
    )
}

export default SuccessApply
