/**
 * URL 빌더 메서드
 *
 * @param {string} host: 호스트
 * @param {{ [ key: string ]: string | number | boolean | undefined }} query: 쿼리 파라미터
 *
 * @returns {string} URL
 */
export function urlBuilder(host: string, query: { [key: string]: string | number | boolean | undefined }): string {
  const param = Object.entries(query)
    .map(([key, value]) => (value ? `${key}=${encodeURIComponent(value)}` : ""))
    .join("&");
  return `${host}?${param}`;
}
