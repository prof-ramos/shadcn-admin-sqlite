import { z } from "zod";
export const taskSchema = z.object({ title: z.string().trim().min(1, "Informe o título").max(200), description: z.string().trim().max(3000).default(""), status: z.enum(["todo","in_progress","done","cancelled"]).default("todo"), priority: z.enum(["low","medium","high"]).default("medium"), label: z.enum(["general","feature","bug","documentation"]).default("general"), due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null) }).strict();
export const memberSchema = z.object({ name: z.string().trim().min(1,"Informe o nome").max(120), email: z.string().trim().toLowerCase().email("E-mail inválido").max(254), role: z.enum(["admin","manager","member"]).default("member"), status: z.enum(["active","inactive"]).default("active"), team: z.string().trim().max(100).default("") }).strict();
export type Entity = "tasks" | "users";
export type RecordRow = { id: string; title?: string; description?: string; name?: string; email?: string; role?: string; team?: string; status: string; priority?: string; label?: string; due_date?: string | null; created_at: string; updated_at: string; };
export const statusLabels: Record<string,string> = { todo:"A fazer",in_progress:"Em andamento",done:"Concluída",cancelled:"Cancelada",active:"Ativo",inactive:"Inativo" };
export const priorityLabels: Record<string,string> = { low:"Baixa",medium:"Média",high:"Alta" };
export const roleLabels: Record<string,string> = { admin:"Administrador",manager:"Gestor",member:"Membro" };
export const labelLabels: Record<string,string> = { general:"Geral",feature:"Funcionalidade",bug:"Correção",documentation:"Documentação" };
