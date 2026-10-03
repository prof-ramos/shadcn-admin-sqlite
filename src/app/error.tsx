"use client";
import {Button} from "@/components/ui/button";
export default function Error({reset}:{reset:()=>void}){return <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center gap-4 p-6 text-center"><h1 className="text-xl font-medium">Não foi possível abrir esta tela</h1><p className="text-sm text-muted-foreground">Tente novamente. Seus registros salvos permanecem no banco de dados.</p><Button onClick={reset}>Tentar novamente</Button><a href="/dashboard/default" className="text-sm underline">Voltar ao painel</a></div>}
