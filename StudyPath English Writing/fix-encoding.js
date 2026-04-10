const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 修复所有编码问题
const fixes = [
  { pattern: /description="请从左侧选择章节开始学[^"]*>/g, replacement: 'description="请从左侧选择章节开始学习">' },
  { pattern: /一目了[^<]</g, replacement: '一目了然<' },
  { pattern: /现代化界[^<]/g, replacement: '现代化界面' },
  { pattern: /提升学习体[^<]/g, replacement: '提升学习体验' }
];

fixes.forEach(({ pattern, replacement }) => {
  content = content.replace(pattern, replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('编码问题已修复！');
