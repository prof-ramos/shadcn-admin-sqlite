import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { ChatHeader } from "./_components/chat-header";
import { ChatSidebar } from "./_components/chat-sidebar";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col"><div className="border-b bg-muted p-2 text-center text-xs">Demonstração do template · dados fictícios, sem envio de mensagens</div>
        <ChatHeader />
        <div className="flex flex-1">
          <ChatSidebar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
