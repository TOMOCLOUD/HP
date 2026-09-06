/** ニュースの種別は、行頭の点の色で見分ける */
export const TAG_COLORS: Record<string, string> = {
  adoption: '#0d71a4',
  award: '#b35926',
  media: '#0f1e28',
  plain: '#58666f',
};

export function tagColor(key?: string) {
  return TAG_COLORS[key ?? 'plain'] ?? TAG_COLORS.plain;
}
