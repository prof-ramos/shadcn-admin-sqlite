import {existsSync,copyFileSync,mkdirSync} from "node:fs";
const folder=new URL("../.openai/",import.meta.url);const target=new URL("hosting.json",folder);
mkdirSync(folder,{recursive:true});if(!existsSync(target))copyFileSync(new URL("hosting.example.json",folder),target);
