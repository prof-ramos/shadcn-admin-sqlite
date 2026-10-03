"use client";
import {LogOut} from "lucide-react";
import {Avatar,AvatarFallback} from "@/components/ui/avatar";
import {SidebarMenu,SidebarMenuItem,SidebarMenuButton} from "@/components/ui/sidebar";
export function NavUser({user}:{user:{name:string;email:string}}){return <SidebarMenu><SidebarMenuItem><div className="flex items-center gap-2 p-2"><Avatar className="size-8"><AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{user.name}</p><p className="truncate text-xs text-muted-foreground">Conta privada</p></div></div><SidebarMenuButton asChild><a href="/signout-with-chatgpt?return_to=/" target="_top"><LogOut/>Sair</a></SidebarMenuButton></SidebarMenuItem></SidebarMenu>}
