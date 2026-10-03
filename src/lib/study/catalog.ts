// Full source supplied by the user. Text, numbering, hierarchy, notes and role are preserved.
// This material has not been independently verified against the official examination notice.
import source from "./syllabus.json" with {type:"json"};
export type StudySection = "basicos" | "especificos" | "especializados";
export type Topic = { id: string; number: string; text: string; children?: Topic[] };
export type Subject = { id: string; name: string; fullName:string; section: StudySection; topics: Topic[] };
type SourceTopic={numero:string;texto:string;subtopicos:SourceTopic[]};
const displayNames:Record<string,{id:string;name:string}>={
  "LÍNGUA PORTUGUESA": {
    "id": "portugues",
    "name": "Português"
  },
  "LEI ORGÂNICA DO DISTRITO FEDERAL": {
    "id": "lodf",
    "name": "LODF"
  },
  "CONHECIMENTOS DO DISTRITO FEDERAL E POLÍTICA PARA MULHERES": {
    "id": "politica-para-mulheres",
    "name": "Política para Mulheres"
  },
  "NOÇÕES DE PRIMEIROS SOCORROS": {
    "id": "primeiros-socorros",
    "name": "Primeiros Socorros"
  },
  "RACIOCÍNIO LÓGICO E MATEMÁTICA FINANCEIRA": {
    "id": "rlm-e-mf",
    "name": "RLM e MF"
  },
  "LEI ORGÂNICA DO TCDF E REGIMENTO INTERNO": {
    "id": "lei-organica-tcdf",
    "name": "Lei Orgânica TCDF"
  },
  "DIREITO CONSTITUCIONAL": {
    "id": "direito-constitucional",
    "name": "Direito Constitucional"
  },
  "DIREITO PREVIDENCIÁRIO": {
    "id": "direito-previdenciario",
    "name": "Direito Previdenciário"
  },
  "NOÇÕES DE DIREITO CIVIL": {
    "id": "direito-civil",
    "name": "Direito Civil"
  },
  "NOÇÕES DE DIREITO TRIBUTÁRIO": {
    "id": "direito-tributario",
    "name": "Direito Tributário"
  },
  "ANÁLISE DE DADOS, NOÇÕES DE ESTATÍSTICA E INTELIGÊNCIA ARTIFICIAL": {
    "id": "dados-estatistica-e-ia",
    "name": "Dados, Estatística e IA"
  },
  "DIREITO ADMINISTRATIVO": {
    "id": "direito-administrativo",
    "name": "Direito Administrativo"
  },
  "ADMINISTRAÇÃO FINANCEIRA E ORÇAMENTÁRIA": {
    "id": "afo",
    "name": "AFO"
  },
  "ADMINISTRAÇÃO GERAL E PÚBLICA": {
    "id": "adm-geral-e-publica",
    "name": "Adm Geral e Pública"
  },
  "REGIME JURÍDICO DOS SERVIDORES PÚBLICOS CIVIS DO DISTRITO FEDERAL": {
    "id": "rju-df",
    "name": "RJU DF"
  },
  "GESTÃO DE CONTRATOS": {
    "id": "contratos",
    "name": "Contratos"
  }
};
const sectionMeta:[StudySection,string,string][]=[ ["basicos","Conhecimentos básicos","Básicos"],["especificos","Conhecimentos específicos","Específicos"],["especializados","Conhecimentos especializados","Especializados"] ];
export const sections=source.secoes.map((section,i)=>({id:sectionMeta[i][0],name:sectionMeta[i][1],short:sectionMeta[i][2],sourceName:section.nome,notes:("notas" in section?section.notas:[]) as string[]}));
function mapTopics(topics:SourceTopic[],subjectId:string):Topic[]{return topics.map(t=>({id:`${subjectId}:${t.numero}`,number:t.numero,text:t.texto,...(t.subtopicos.length?{children:mapTopics(t.subtopicos,subjectId)}:{})}))}
export const subjects:Subject[]=source.secoes.flatMap((section,i)=>section.disciplinas.map(d=>{const meta=displayNames[d.nome];if(!meta)throw new Error(`Unknown subject in source: ${d.nome}`);return {...meta,fullName:d.nome,section:sectionMeta[i][0],topics:mapTopics(d.topicos,meta.id)}}));
export const syllabusRole=source.cargo;
export const syllabusExam=source.concurso;
export function leafIds(topics:Topic[]):string[]{return topics.flatMap(t=>t.children?.length?leafIds(t.children):[t.id])}
export function allTopics(topics:Topic[]):Topic[]{return topics.flatMap(t=>[t,...allTopics(t.children||[])])}
export const catalogTopics=subjects.flatMap(s=>allTopics(s.topics));
export const catalogLeafIds=subjects.flatMap(s=>leafIds(s.topics));
export function completion(topics:Topic[],completed:ReadonlySet<string>){const leaves=leafIds(topics);const done=leaves.filter(id=>completed.has(id)).length;return {done,total:leaves.length,percent:leaves.length?Math.round(done/leaves.length*100):null}}
export function topicState(topic:Topic,completed:ReadonlySet<string>):boolean|"indeterminate"{const stats=completion([topic],completed);return stats.done===0?false:stats.done===stats.total?true:"indeterminate"}
export const catalogVersion="tcdf-2fd1975f9a834eef";
