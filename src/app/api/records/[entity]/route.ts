import { getChatGPTUser } from "@/app/chatgpt-auth";
import { database } from "@/lib/admin-db";
import { taskSchema, memberSchema } from "@/lib/admin-records";
export const dynamic = "force-dynamic";
const response = (data:unknown,status=200) => Response.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
async function handle(request:Request, context:{params:Promise<{entity:string}>}) {
  const user = await getChatGPTUser();
  if (!user) return response({error:"Entre com sua conta para acessar os dados."},401);
  const {entity} = await context.params;
  if(entity!=="tasks" && entity!=="users") return response({error:"Módulo não encontrado."},404);
  const table = entity==="tasks"?"tasks":"members";
  if(request.method!=="GET") {
    const origin=request.headers.get("origin");
    if(origin && origin!==new URL(request.url).origin) return response({error:"Origem não autorizada."},403);
    if(!request.headers.get("content-type")?.includes("application/json")) return response({error:"Formato inválido."},415);
    if(Number(request.headers.get("content-length"))>16000) return response({error:"Dados muito extensos."},413);
  }
  try {
    const db=database();
    if(request.method==="GET") {
      const rows=await db.prepare(`SELECT * FROM ${table} WHERE owner_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`).bind(user.userId).all();
      return response({records:rows.results.map(({owner_id,deleted_at,...row})=>row),storage:"SQLite / Cloudflare D1"});
    }
    const raw=await request.text(); if(raw.length>16000) return response({error:"Dados muito extensos."},413);
    let body:Record<string,unknown>;try{body=JSON.parse(raw);}catch{return response({error:"JSON inválido."},400);}
    if(!body || typeof body!=="object" || Array.isArray(body)) return response({error:"Dados inválidos."},400);
    const now=new Date().toISOString();
    if(request.method==="DELETE") {
      if(typeof body.id!=="string") return response({error:"Registro inválido."},400);
      const result=await db.prepare(`UPDATE ${table} SET deleted_at=?,updated_at=? WHERE id=? AND owner_id=? AND deleted_at IS NULL`).bind(now,now,body.id,user.userId).run();
      return result.meta.changes ? response({deleted:true}) : response({error:"Registro não encontrado."},404);
    }
    const id=request.method==="POST"?crypto.randomUUID():body.id;
    if(typeof id!=="string" || id.length>100) return response({error:"Registro inválido."},400);
    const {id:ignored,...input}=body;
    const parsed=(entity==="tasks"?taskSchema:memberSchema).safeParse(input);
    if(!parsed.success) return response({error:parsed.error.issues[0]?.message || "Confira os campos."},400);
    const data=parsed.data;const keys=Object.keys(data);const values=Object.values(data);
    if(request.method==="POST") {
      await db.prepare(`INSERT INTO ${table} (id,owner_id,${keys.join(",")},created_at,updated_at) VALUES (${[...keys,"id","owner_id","created_at","updated_at"].map(()=>"?").join(",")})`).bind(id,user.userId,...values,now,now).run();
    } else {
      const result=await db.prepare(`UPDATE ${table} SET ${keys.map(k=>`${k}=?`).join(",")},updated_at=? WHERE id=? AND owner_id=? AND deleted_at IS NULL`).bind(...values,now,id,user.userId).run();
      if(!result.meta.changes) return response({error:"Registro não encontrado."},404);
    }
    const row=await db.prepare(`SELECT * FROM ${table} WHERE id=? AND owner_id=?`).bind(id,user.userId).first();
    if(!row) throw new Error("Record readback failed");const {owner_id,deleted_at,...record}=row;
    return response({record},request.method==="POST"?201:200);
  } catch(error) {
    console.error("admin_storage_error",error);
    if(String(error).includes("UNIQUE constraint failed"))return response({error:"Este e-mail já possui um cadastro ativo na lista. Use outro e-mail."},409);
    return response({error:"Não foi possível acessar o banco. Seus campos foram mantidos; tente novamente."},503);
  }
}
export const GET=handle;export const POST=handle;export const PATCH=handle;export const DELETE=handle;
