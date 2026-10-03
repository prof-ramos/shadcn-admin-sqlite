import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Edital TCDF",
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    title: "Edital TCDF · Acompanhamento de estudos",
    description:
      "Edital verticalizado com progresso por matéria e marcações de estudo salvas em SQLite.",
  },
};
