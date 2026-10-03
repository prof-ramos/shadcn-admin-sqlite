"use client";
import {usePathname} from "next/navigation";
import {Database, FlaskConical} from "lucide-react";
export function DataModeNotice(){const path=usePathname();const persistent=["/dashboard/default","/dashboard/tasks","/dashboard/users"].includes(path);return <div className="mb-5 flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">{persistent?<Database className="size-3.5 shrink-0"/>:<FlaskConical className="size-3.5 shrink-0"/>}<span>{persistent?"SQLite · dados privados, salvos no servidor":"Demonstração do template · dados fictícios; alterações nesta tela não são persistidas"}</span></div>}
