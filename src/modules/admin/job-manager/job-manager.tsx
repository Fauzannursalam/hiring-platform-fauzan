"use client"

import CandidateList from "./candidate-list/candidate-list"
import CandidateEmpty from "./empty/empty-candidates"

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

const JobManager = () => {

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Aurelie Yukiko",
    email: "aurelieyukiko.yahoo.com",
    phone: "08212090876",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "2",
    name: "Dityo Hendyawan",
    email: "dityohendyawan@yaho...",
    phone: "08118418067",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "3",
    name: "Mira Workman",
    email: "miraworkman@yahoo.c...",
    phone: "08167200710",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "4",
    name: "Paityn Culhane",
    email: "paitynculhane@yahoo....",
    phone: "08152150071",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "5",
    name: "Emerson Baptista",
    email: "emersonbaptista@yah...",
    phone: "08216700824",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "6",
    name: "Indra Zein",
    email: "indrazein@yahoo.com",
    phone: "08118163056",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "7",
    name: "Joyce",
    email: "joyce@yahoo.com",
    phone: "08428877101",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "8",
    name: "Eriberto",
    email: "eriberto@yahoo.com",
    phone: "08386241912",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "9",
    name: "Javon",
    email: "javon@yahoo.com",
    phone: "08328344550",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "10",
    name: "Emory",
    email: "emory@yahoo.com",
    phone: "08718828636",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "11",
    name: "Ella",
    email: "ella@yahoo.com",
    phone: "08830691383",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
  {
    id: "12",
    name: "Sylvan",
    email: "sylvan@yahoo.com",
    phone: "08775210522",
    dateOfBirth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedinUrl: "https://www.linkedin.com/in/use...",
  },
]

 return <div>{candidates.length > 0 ? <CandidateList candidates={candidates} /> : <CandidateEmpty />}</div>
}

export default JobManager