"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  domicile: string
  gender: string
  linkedinUrl: string
}

interface CandidateListProps {
  candidates: Candidate[]
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  // selection state: Set of selected candidate ids
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) => {
      if (candidates.length === 0) return new Set()
      // if all selected -> clear; otherwise select all
      return prev.size === candidates.length
        ? new Set()
        : new Set(candidates.map((c) => c.id))
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-9 px-4 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Job list
            </Button>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <Button
              variant="outline"
              className="h-9 px-4 text-sm font-medium text-gray-700 border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              Manage Candidate
            </Button>
          </div>
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-200">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Front End Developer</h1>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-white border-b border-gray-200 hover:bg-white">
                <TableHead className="w-12 px-6 py-4">
                  <Checkbox
                    checked={selectedRows.size === candidates.length && candidates.length > 0}
                    onCheckedChange={toggleAllRows}
                    className="border-cyan-500 data-[state=checked]:bg-cyan-500"
                  />
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  NAMA LENGKAP
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  EMAIL ADDRESS
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  PHONE NUMBERS
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  DATE OF BIRTH
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  DOMICILE
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  GENDER
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-gray-900 tracking-wide">
                  LINK LINKEDIN
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {candidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <Checkbox
                      checked={selectedRows.has(candidate.id)}
                      onCheckedChange={() => toggleRow(candidate.id)}
                      className="border-cyan-500 data-[state=checked]:bg-cyan-500"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {candidate.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {candidate.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {candidate.phone}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {candidate.dateOfBirth}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {candidate.domicile}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {candidate.gender}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <a
                      href={candidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 underline"
                    >
                      {candidate.linkedinUrl}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default CandidateList
