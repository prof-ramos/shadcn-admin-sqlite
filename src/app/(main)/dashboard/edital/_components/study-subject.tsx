"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {BookOpen,ChevronRight,Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {StudyCheckbox} from "./study-checkbox";
import {Label} from "@/components/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import {Progress} from "@/components/ui/progress";
import {subjects,sections,completion,topicState,type Subject,type Topic} from "@/lib/study/catalog";
import {useStudy} from "./study-provider";
import {CoverageNotice,StudyError} from "./study-status";
function TopicTree({topics,depth=0}:{topics:Topic[];depth?:number}){
 const{completed,loading,saving,error,mark}=useStudy();
 return <ul className="tcdf-topic-tree">{topics.map(topic=>{
  const state=topicState(topic,completed);
  const stats=completion([topic],completed);
  const partial=state==="indeterminate";
  const partialId=`partial-${topic.id}`;
  return <li key={topic.id}>
   <div className={`tcdf-topic-row depth-${Math.min(depth,3)} ${state===true?"is-complete":""}`} data-topic-state={partial?"partial":state?"complete":"unchecked"}>
    <StudyCheckbox id={`topic-${topic.id}`} state={state} disabled={loading||saving||!!error} onChange={checked=>{void mark(topic.id,checked).catch(()=>{})}} label={`${topic.number} ${topic.text}${topic.children?" — marcar todos os subtópicos":""}`} descriptionId={partial?partialId:undefined}/>
    <Label htmlFor={`topic-${topic.id}`} className="tcdf-topic-label"><span className="tcdf-topic-number">{topic.number}{topic.number.includes(".")?"":"."}</span>{topic.text}{partial&&<span id={partialId} className="tcdf-topic-partial">Parcial · {stats.done} de {stats.total} subtópicos estudados</span>}</Label>
   </div>
   {topic.children&&<TopicTree topics={topic.children} depth={depth+1}/>}
  </li>
 })}</ul>
}
export function StudySubject({subject}:{subject:Subject}){const{completed,loading,saving,error}=useStudy();const router=useRouter();const stats=completion(subject.topics,completed);const section=sections.find(s=>s.id===subject.section)!;return <><nav aria-label="Breadcrumb" className="tcdf-breadcrumb"><Link href="/dashboard/default">Dashboard</Link><ChevronRight/><span>Edital Verticalizado</span></nav><div className="tcdf-page-head tcdf-subject-head"><div><p className="tcdf-eyebrow">{section.name}</p><h1>{subject.name}</h1><p className="tcdf-lede tcdf-full-subject-name">{subject.fullName}</p></div><div className="tcdf-subject-picker"><Label htmlFor="subject-select">Matéria</Label><Select value={subject.id} onValueChange={id=>router.push(`/dashboard/edital/${id}`)}><SelectTrigger id="subject-select" className="tcdf-select"><SelectValue/></SelectTrigger><SelectContent className="tcdf-select-options">{subjects.map(s=><SelectItem value={s.id} key={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div></div><StudyError/>{stats.total?<><section className="tcdf-editor" aria-label={`Tópicos de ${subject.name}`}><header className="tcdf-editor-head"><div><h2>Conteúdo programático</h2><p>Marque um tópico-pai para selecionar seus subtópicos.</p></div><div className="tcdf-editor-progress"><strong>{loading||error?"—":`${stats.percent}%`}</strong><span>{loading?"Carregando…":`${stats.done} de ${stats.total} itens estudados`}</span><Progress className="tcdf-progress" value={loading?0:stats.percent??0} aria-label={`Progresso de ${subject.name}`}/></div></header><TopicTree topics={subject.topics}/></section><div className="tcdf-footer-note" role="status">{saving?<><Loader2 className="size-3 animate-spin"/>Salvando marcação…</>:error?"Não foi possível confirmar o progresso.":loading?"Carregando progresso…":"Marcações salvas na sua conta"}</div>{section.notes.length>0&&<aside className="tcdf-section-notes" aria-label="Notas da seção">{section.notes.map(note=><p key={note}>{note}</p>)}</aside>}<p className="tcdf-source-note">Conteúdo fornecido por você, sem conferência independente com o edital oficial.</p></>:<section className="tcdf-empty"><BookOpen className="size-8"/><h2>Os tópicos desta matéria ainda não foram fornecidos</h2><p>O material enviado lista {subject.name}, mas não inclui seu conteúdo programático. O progresso será calculado quando os tópicos do edital forem adicionados.</p><Button asChild variant="outline"><Link href="/dashboard/default">Voltar ao dashboard</Link></Button></section>}</>}
