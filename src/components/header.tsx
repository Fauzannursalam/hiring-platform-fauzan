"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/store/authStore"
import { toast } from "sonner"

export default function Header({ title }: { title?: string }) {
    const pathname = usePathname() ?? "/"
    const router = useRouter()
    const { logout, role } = useAuth()
    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLDivElement | null>(null)

    // derive default title from pathname if title not provided
    const derivedTitle = title ?? (pathname.startsWith("/dashboard") ? "Job List" : pathname.startsWith("/job-list") ? "Job List" : "Hiring Platform")

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!btnRef.current) return
            if (e.target instanceof Node && !btnRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    const handleLogout = () => {
        logout()
        setOpen(false)
        toast.success('Logout Successfully')
        router.replace("/")
    }

    return (
        <header className="bg-white border-b border-[#e0e0e0] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#1d1f20]">{derivedTitle}</h1>

            <div className="relative" ref={btnRef}>
                <button
                    aria-label="Open user menu"
                    onClick={() => setOpen((s) => !s)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#01959f] to-[#43936c] flex items-center justify-center text-white font-semibold cursor-pointer"
                >
                    {role?.[0]?.toUpperCase() ?? "A"}
                </button>

                {open && role && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-[#e6e6e6] rounded shadow-md z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 hover:bg-[#f3f3f3]"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
