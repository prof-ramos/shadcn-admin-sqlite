import { describe, expect, it } from "vitest";

import { getPageWindow } from "@/lib/pagination";

/** Implementação original duplicada em users/tasks/crm/ecommerce, mantida como oráculo. */
function legacyWindow3(currentPage: number, pageCount: number) {
  if (pageCount <= 3) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (currentPage <= 2) return [1, 2, 3];
  if (currentPage >= pageCount - 1) return [pageCount - 2, pageCount - 1, pageCount];
  return [currentPage - 1, currentPage, currentPage + 1];
}

/** Implementação original de products (base 0, janela de 5). */
function legacyProducts(pageIndex: number, rawPageCount: number) {
  const pageCount = Math.max(1, rawPageCount);
  const pageStart = Math.max(0, Math.min(pageIndex - 2, pageCount - 5));
  return Array.from({ length: Math.min(5, pageCount) }, (_, index) => pageStart + index);
}

describe("getPageWindow", () => {
  it("equivale à janela de 3 original para todas as combinações", () => {
    for (let pageCount = 0; pageCount <= 12; pageCount++) {
      for (let current = 1; current <= Math.max(1, pageCount); current++) {
        expect(getPageWindow(current, pageCount), `${current}/${pageCount}`).toEqual(legacyWindow3(current, pageCount));
      }
    }
  });

  it("equivale à janela de 5 original de products", () => {
    for (let pageCount = 0; pageCount <= 12; pageCount++) {
      for (let pageIndex = 0; pageIndex < Math.max(1, pageCount); pageIndex++) {
        const window = getPageWindow(pageIndex + 1, Math.max(1, pageCount), 5).map((page) => page - 1);
        expect(window, `${pageIndex}/${pageCount}`).toEqual(legacyProducts(pageIndex, pageCount));
      }
    }
  });
});
