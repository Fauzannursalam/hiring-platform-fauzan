"use client"

interface ChipProps {
  label: string
  isActive: boolean
  isDisabled: boolean
  onClick: () => void
}

export default function Chip({ label, isActive, isDisabled, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
        isDisabled
          ? "border-2 border-[#e0e0e0] text-[#9E9E9E] bg-[#EDEDED] cursor-not-allowed"
          : isActive
            ? "border-2 border-[#01959f] text-[#01959f] bg-white"
            : "border-2 border-[#e0e0e0] text-[#9e9e9e] bg-[#fafafa] hover:bg-[#f0f0f0] cursor-pointer"
      }`}
    >
      {label}
    </button>
  )
}
