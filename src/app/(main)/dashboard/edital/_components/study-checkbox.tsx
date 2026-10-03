"use client";
import {Check,Minus} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
type Props={id:string;state:boolean|"indeterminate";disabled?:boolean;label:string;descriptionId?:string;onChange:(checked:boolean)=>void};
// The vendor Checkbox renders a check icon for both checked and indeterminate.
// Keep its accessible control, but render an explicit, distinct application indicator.
export function StudyCheckbox({id,state,disabled,label,descriptionId,onChange}:Props){const status=state==="indeterminate"?"partial":state?"complete":"unchecked";return <span className="tcdf-checkbox-control" data-study-status={status}><Checkbox id={id} className="tcdf-checkbox" checked={state} disabled={disabled} onCheckedChange={value=>onChange(value===true)} aria-label={label} aria-describedby={descriptionId} data-study-status={status}/>{state===true?<Check className="tcdf-study-indicator tcdf-complete-indicator" data-complete-indicator="true" aria-hidden="true"/>:state==="indeterminate"?<Minus className="tcdf-study-indicator tcdf-partial-indicator" data-partial-indicator="true" aria-hidden="true"/>:null}</span>}
