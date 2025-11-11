"use client"

import Chip from "./ui/chip"

type FieldRequirement = "mandatory" | "optional" | "off"

interface FieldRowProps {
  label: string
  requirement: FieldRequirement
  onRequirementChange: (requirement: FieldRequirement) => void
  disabledOptions?: FieldRequirement[]
}

export default function FieldRadioChips({ label, requirement, onRequirementChange, disabledOptions = [] }: FieldRowProps) {
  const options: FieldRequirement[] = ["mandatory", "optional", "off"]

  return (
    <div className="flex items-center justify-between py-6 px-0">
      <span className="text-sm text-[#404040]">{label}</span>

      <div className="flex items-center gap-3">
        {options.map((option) => (
          <Chip
            key={option}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            isActive={requirement === option}
            isDisabled={disabledOptions.includes(option)}
            onClick={() => !disabledOptions.includes(option) && onRequirementChange(option)}
          />
        ))}
      </div>
    </div>
  )
}
