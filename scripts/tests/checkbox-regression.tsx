import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {StudyCheckbox} from '../../src/app/(main)/dashboard/edital/_components/study-checkbox';
import {subjects,catalogTopics,topicState,leafIds} from '../../src/lib/study/catalog';
const parent=catalogTopics.find(t=>t.id==='portugues:4')!;
const only42=new Set(['portugues:4.2']);
assert.equal(topicState(parent,only42),'indeterminate');
assert.equal(topicState(catalogTopics.find(t=>t.id==='portugues:4.1')!,only42),false);
assert.equal(topicState(catalogTopics.find(t=>t.id==='direito-administrativo:4')!,only42),false);
function html(state:boolean|'indeterminate'){return renderToStaticMarkup(createElement(StudyCheckbox,{id:'regression-parent',state,label:'4 parent',onChange:()=>{}}))}
const partial=html(topicState(parent,only42));
assert(partial.includes('aria-checked="mixed"'));assert(partial.includes('data-study-status="partial"'));assert(partial.includes('data-partial-indicator="true"'));assert(!partial.includes('data-complete-indicator="true"'));assert(!partial.includes('checked=""'));
const all=new Set(leafIds([parent]));const complete=html(topicState(parent,all));assert(complete.includes('aria-checked="true"'));assert(complete.includes('data-complete-indicator="true"'));assert(!complete.includes('data-partial-indicator="true"'));
all.delete('portugues:4.1');assert.equal(topicState(parent,all),'indeterminate');
const empty=html(false);assert(empty.includes('aria-checked="false"'));assert(!empty.includes('data-partial-indicator="true"'));assert(!empty.includes('data-complete-indicator="true"'));
const root=catalogTopics.find(t=>t.id==='direito-administrativo:4')!;const nested=catalogTopics.find(t=>t.id==='direito-administrativo:4.4')!;const deep=new Set(['direito-administrativo:4.4.1']);assert.equal(topicState(root,deep),'indeterminate');assert.equal(topicState(nested,deep),'indeterminate');
console.log('PASS 4.2 only => parent mixed and explicit minus, sibling unchanged, no complete indicator, no subject collision; parent-all => checked; uncheck child => mixed; deep ancestor mixed.');
