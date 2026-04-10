const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 添加 Download 图标导入
const oldImport = `import {
  UploadFilled,
  Reading,
  ArrowLeft,
  ArrowRight,
  RefreshLeft,
  Check,
  Upload,
  Document,
  Picture,
  DataAnalysis,
  Edit,
  Connection,
  Menu,
  Setting,
  MagicStick
} from '@element-plus/icons-vue'`;

const newImport = `import {
  UploadFilled,
  Reading,
  ArrowLeft,
  ArrowRight,
  RefreshLeft,
  Check,
  Upload,
  Download,
  Document,
  Picture,
  DataAnalysis,
  Edit,
  Connection,
  Menu,
  Setting,
  MagicStick
} from '@element-plus/icons-vue'`;

content = content.replace(oldImport, newImport);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已添加 Download 图标导入！');
