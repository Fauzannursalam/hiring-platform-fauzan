"use client"

import { toast } from "sonner"
import { CheckCircle } from "lucide-react"

export function showSuccessNotification(message = "Job vacancy successfully created") {
  toast.custom(() => (
    <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-[#01959f] flex items-center gap-3 max-w-sm">
      <CheckCircle className="w-5 h-5 text-[#01959f] flex-shrink-0" />
      <span className="text-[#1d1f20] text-sm font-medium">{message}</span>
    </div>
  ))
}
    