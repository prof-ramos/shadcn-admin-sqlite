import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {subjects,sections,catalogTopics,catalogLeafIds,leafIds,completion,topicState,syllabusRole} from '../src/lib/study/catalog.ts';
assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../src/lib/study/syllabus.json',import.meta.url))).digest('hex'),'2fd1975f9a834eefb867ba3362e524fa9c10ebf3009ba4cb4d400a7e23a3a96a');
const raw=JSON.parse(fs.readFileSync(new URL('../src/lib/study/syllabus.json',import.meta.url),'utf8'));
assert.equal(subjects.length,16);assert.equal(sections.length,3);assert.equal(catalogTopics.length,298);assert.equal(catalogLeafIds.length,234);assert.equal(new Set(catalogTopics.map(x=>x.id)).size,298);
assert.deepEqual(sections.map(s=>subjects.filter(x=>x.section===s.id).length),[5,6,5]);assert(subjects.every(s=>s.topics.length));
function compare(original,mapped){assert.equal(original.length,mapped.length);original.forEach((o,i)=>{assert.equal(mapped[i].number,o.numero);assert.equal(mapped[i].text,o.texto);compare(o.subtopicos,mapped[i].children||[])})}
const originals=raw.secoes.flatMap(s=>s.disciplinas);originals.forEach((s,i)=>{assert.equal(s.nome,subjects[i].fullName);compare(s.topicos,subjects[i].topics)});
assert.equal(syllabusRole,raw.cargo);raw.secoes.forEach((s,i)=>assert.deepEqual(sections[i].notes,s.notas||[]));
const total=subjects.flatMap(s=>s.topics);assert.equal(completion(total,new Set()).percent,0);assert.equal(completion(total,new Set(catalogTopics.map(t=>t.id))).done,234);
const root=catalogTopics.find(t=>t.id==='direito-administrativo:4');const branch=catalogTopics.find(t=>t.id==='direito-administrativo:4.4');assert.equal(leafIds([branch]).length,3);
const partial=new Set([leafIds([branch])[0]]);assert.equal(topicState(branch,partial),'indeterminate');assert.equal(topicState(root,partial),'indeterminate');assert.equal(topicState(branch,new Set(leafIds([branch]))),true);assert.equal(topicState(root,new Set(leafIds([branch]))),'indeterminate');
assert(catalogTopics.some(t=>t.number==='1.1.1'));assert(catalogTopics.some(t=>t.number==='4.4.1'));
console.log('PASS exact source text, accents, numbers, notes and role; 16 subjects, 298 nodes, 234 leaves; deep mixed parents; leaf-only progress.');
