import { cookies } from "next/headers";

import type { Metadata } from "next";

import { mails } from "./_components/data";
import { MailComponent } from "./_components/mail";
import { MAIL_LAYOUT_COOKIE, parseMailLayout } from "./_components/mail-layout-config";

export const metadata: Metadata = {
  title: "Cliente de e-mail open source com shadcn/ui",
  description:
    "Explore um cliente de e-mail open source com navegação por caixa de entrada, busca de mensagens, leitura, resposta e arquivamento.",
  alternates: {
    canonical: "/mail",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const defaultLayout = parseMailLayout(cookieStore.get(MAIL_LAYOUT_COOKIE)?.value);

  return (
    <div className="h-dvh min-h-0 overflow-hidden">
      <MailComponent mails={mails} defaultLayout={defaultLayout} />
    </div>
  );
}
