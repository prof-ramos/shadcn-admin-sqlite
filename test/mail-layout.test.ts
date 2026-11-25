import { describe, expect, it } from "vitest";

import { DEFAULT_MAIL_LAYOUT, parseMailLayout } from "../src/app/(main)/mail/_components/mail-layout-config";

describe("parseMailLayout", () => {
  it("aceita um layout válido", () => {
    expect(parseMailLayout("[40,60]")).toEqual([40, 60]);
  });

  it.each([undefined, "", "lixo", '{"a":1}', "[1]", "[1,2,3]", '["40","60"]', "[0,100]", "[null,50]"])(
    "cai no padrão para %j",
    (raw) => {
      expect(parseMailLayout(raw)).toEqual([...DEFAULT_MAIL_LAYOUT]);
    },
  );
});
