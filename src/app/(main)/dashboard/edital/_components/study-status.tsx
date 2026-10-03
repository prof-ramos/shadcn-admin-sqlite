"use client";
import {RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useStudy} from "./study-provider";
export function StudyError(){const{error,loading,refresh}=useStudy();return error?<div role="alert" className="tcdf-error"><span>{error}</span><Button variant="outline" onClick={()=>void refresh()} disabled={loading}><RefreshCw/>Tentar novamente</Button></div>:null}
export function CoverageNotice(){return <p className="tcdf-coverage">Conteúdo fornecido por você. O progresso considera somente os itens-folha, sem contar os tópicos-pai duas vezes.</p>}
