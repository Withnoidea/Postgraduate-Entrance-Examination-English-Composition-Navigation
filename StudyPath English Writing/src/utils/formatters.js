/**
 * 将英文模板中的 [相关观点] / [主题词] 等占位符，渲染为高亮显眼的胶囊微标签
 */
export function renderSlotPills(text) {
  if (!text) return ''
  return text.replace(/\[([^\]]+)\]/g, '<span class="slot-pill">$1</span>')
}
