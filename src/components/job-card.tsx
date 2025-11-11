import { Button } from "@/components/ui/button"

interface JobCardProps {
    job: {
        id: number
        status: string
        statusColor: string
        startDate: string
        title: string
        salary: string
    }
    handleClick: (id: number) => void
}

const JobCard = ({ job, handleClick }: JobCardProps) => {
    return (
        <div className="bg-white rounded-lg p-6 border border-[#e0e0e0] hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3 items-center">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${job.statusColor} border-accent border`}>{job.status}</span>
                    <span className={`px-3 py-1 rounded-md text-sm text-[#404040] font-medium border-[#E0E0E0] border`}>{job.startDate}</span>
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#1d1f20] mb-2">{job.title}</h3>
                    <p className="text-[#757575] text-sm">{job.salary}</p>
                </div>
                <div>
                    <Button
                        onClick={() => handleClick(job.id)}
                        className="bg-[#01959f] hover:bg-[#01959f]/90 text-white px-4 py-2 h-auto text-sm cursor-pointer">
                        Manage Job
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default JobCard