"use client"

import { useEffect, useState } from "react"
import CandidateJobCard, { Job } from "./job-card/job-card"
import JobDetail from "./job-detail/job-detail"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/authStore"
import Header from "@/components/header"

const jobsData = [
    {
        id: 1,
        title: "UX Designer",
        company: "Rakamin",
        location: "Jakarta Selatan",
        salary: "Rp7.000.000 - Rp15.000.000",
        type: "Full-Time",
        description: [
            "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.",
            "Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.",
            "Integrate front-end components with APIs and backend services.",
            "Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.",
            "Write clean, reusable, and maintainable code following best practices and coding standards.",
            "Participate in code reviews, contributing to continuous improvement and knowledge sharing.",
            "Troubleshoot and debug issues to improve usability and overall application quality.",
            "Stay updated with emerging front-end technologies and propose innovative solutions.",
            "Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.",
        ],
    },
    {
        id: 2,
        title: "Frontend Engineer",
        company: "TechCorp",
        location: "Jakarta Pusat",
        salary: "Rp8.000.000 - Rp16.000.000",
        type: "Full-Time",
        description: [
            "Build scalable and performant user interfaces using React and Next.js.",
            "Collaborate with backend engineers to integrate APIs and services.",
            "Implement responsive design patterns and ensure cross-browser compatibility.",
            "Optimize application performance and user experience.",
            "Participate in code reviews and contribute to team knowledge sharing.",
            "Stay updated with latest frontend technologies and best practices.",
            "Debug and troubleshoot frontend issues in production environments.",
            "Work with design teams to implement pixel-perfect UI components.",
            "Mentor junior developers and contribute to team growth.",
        ],
    },
    {
        id: 3,
        title: "Backend Developer",
        company: "DataSystems",
        location: "Bandung",
        salary: "Rp9.000.000 - Rp18.000.000",
        type: "Full-Time",
        description: [
            "Design and develop robust backend services and APIs.",
            "Optimize database queries and ensure data integrity.",
            "Implement security best practices and authentication mechanisms.",
            "Scale applications to handle high traffic and large datasets.",
            "Collaborate with frontend teams to deliver seamless integrations.",
            "Write comprehensive unit and integration tests.",
            "Monitor and maintain production systems.",
            "Document code and maintain technical specifications.",
            "Participate in architectural decisions and system design.",
        ],
    },
    {
        id: 4,
        title: "Product Manager",
        company: "InnovateLabs",
        location: "Jakarta Selatan",
        salary: "Rp10.000.000 - Rp20.000.000",
        type: "Full-Time",
        description: [
            "Define product vision and strategy aligned with business goals.",
            "Conduct market research and competitive analysis.",
            "Gather and prioritize user requirements and feedback.",
            "Create detailed product specifications and user stories.",
            "Collaborate with engineering and design teams on product development.",
            "Track product metrics and KPIs to measure success.",
            "Manage product roadmap and release cycles.",
            "Communicate product updates to stakeholders.",
            "Drive product adoption and user engagement initiatives.",
        ],
    },
    {
        id: 5,
        title: "UI/UX Designer",
        company: "CreativeStudio",
        location: "Surabaya",
        salary: "Rp6.500.000 - Rp13.000.000",
        type: "Full-Time",
        description: [
            "Design intuitive and visually appealing user interfaces.",
            "Conduct user research and usability testing.",
            "Create wireframes, prototypes, and high-fidelity mockups.",
            "Develop and maintain design systems and component libraries.",
            "Collaborate with product and engineering teams.",
            "Ensure consistency across all digital touchpoints.",
            "Iterate on designs based on user feedback.",
            "Stay updated with design trends and best practices.",
            "Mentor junior designers and contribute to design excellence.",
        ],
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudInfra",
        location: "Jakarta Pusat",
        salary: "Rp9.500.000 - Rp19.000.000",
        type: "Full-Time",
        description: [
            "Design and implement CI/CD pipelines and automation.",
            "Manage cloud infrastructure and containerization.",
            "Monitor system performance and implement improvements.",
            "Implement security and disaster recovery procedures.",
            "Collaborate with development teams on deployment strategies.",
            "Troubleshoot infrastructure issues and optimize resources.",
            "Document infrastructure and maintain runbooks.",
            "Implement infrastructure as code practices.",
            "Ensure high availability and system reliability.",
        ],
    },
    {
        id: 7,
        title: "QA Engineer",
        company: "QualityFirst",
        location: "Medan",
        salary: "Rp5.500.000 - Rp11.000.000",
        type: "Full-Time",
        description: [
            "Design and execute comprehensive test plans and test cases.",
            "Perform manual and automated testing across platforms.",
            "Identify, document, and track software defects.",
            "Collaborate with developers to resolve issues.",
            "Develop and maintain automated test suites.",
            "Ensure product quality and user satisfaction.",
            "Participate in code reviews from QA perspective.",
            "Implement testing best practices and standards.",
            "Contribute to continuous improvement of testing processes.",
        ],
    },
]





const CandidateJobList = () => {
    const [activeJobId, setActiveJobId] = useState(1)
    const activeJob = jobsData.find((j) => j.id === activeJobId) ?? null
    const {role} = useAuth()

    const router = useRouter()

    const handleApply = (job: Job) => {
        router.push(`/job-list/${job.id}`)
    }

    useEffect(() => {
        if (!role) {
            router.replace('/')
            return
        }
        if (role !== 'candidate') {
            router.replace('/dashboard')
        }
    }, [role, router])

    if (!role || role !== 'candidate') return <div>Redirecting…</div>

    return (
        <div>
            <Header />
            <main className="flex gap-6 p-6 max-w-7xl mx-auto h-[calc(100vh-80px)]">
                <CandidateJobCard jobs={jobsData} activeJobId={activeJobId} onSelectJob={setActiveJobId} />

                <JobDetail job={activeJob} onApply={handleApply} />
            </main>
        </div>
    )
}


export default CandidateJobList