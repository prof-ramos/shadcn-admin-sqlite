/**
 * Janela de números de página (base 1) centrada na página atual, presa aos limites.
 * Ex.: getPageWindow(5, 10) → [4, 5, 6]; getPageWindow(1, 10) → [1, 2, 3].
 */
export function getPageWindow(currentPage: number, pageCount: number, size = 3): number[] {
  const length = Math.max(0, Math.min(size, pageCount));
  const start = Math.max(1, Math.min(currentPage - Math.floor(size / 2), pageCount - length + 1));

  return Array.from({ length }, (_, index) => start + index);
}

/** Links de paginação usam `href="#"` por semântica; a navegação é feita pelo estado da tabela. */
export function preventPaginationNavigation(event: { preventDefault: () => void }) {
  event.preventDefault();
}
