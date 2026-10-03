import vinext from "vinext";
import {defineConfig} from "vite";
import storage from "./.openai/hosting.json";
import {sites} from "./build/sites-vite-plugin";
import "./scripts/local-env.mjs";
export default defineConfig(async()=>{const {cloudflare}=await import("@cloudflare/vite-plugin");return {
 plugins:[vinext(),sites(),cloudflare({viteEnvironment:{name:"rsc",childEnvironments:["ssr"]},inspectorPort:false,config:{
  name:"tcdf-study",main:"./build/worker.ts",compatibility_date:"2026-05-15",compatibility_flags:["nodejs_compat"],
  d1_databases:storage.d1?[{binding:storage.d1,database_name:"tcdf-study-local",database_id:"00000000-0000-4000-8000-000000000000"}]:[]
 }})]
}});
