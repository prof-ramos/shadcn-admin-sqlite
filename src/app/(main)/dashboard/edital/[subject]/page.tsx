import {notFound} from "next/navigation";
import {subjects} from "@/lib/study/catalog";
import {StudySubject} from "../_components/study-subject";
export async function generateMetadata({params}:{params:Promise<{subject:string}>}){const{id}= {id:(await params).subject};const subject=subjects.find(s=>s.id===id);return {title:`${subject?.name||"Matéria"} · Edital TCDF`}}
export default async function Page({params}:{params:Promise<{subject:string}>}){const{id}={id:(await params).subject};const subject=subjects.find(s=>s.id===id);if(!subject)notFound();return <StudySubject subject={subject}/>}
