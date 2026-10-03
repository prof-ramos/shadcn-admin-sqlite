import type {ReactNode} from "react";
import {requireChatGPTUser} from "@/app/chatgpt-auth";
import {StudyShell} from "./edital/_components/study-shell";
import "./edital/_components/study.css";
export const dynamic="force-dynamic";
export default async function Layout({children}:{children:ReactNode}){await requireChatGPTUser("/dashboard/default");return <StudyShell>{children}</StudyShell>}
