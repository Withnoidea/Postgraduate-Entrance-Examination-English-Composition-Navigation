const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 添加 info-card 样式
const oldStyles = `/* 滚动条样式 */
:deep(.el-scrollbar__bar) {
  opacity: 0.5;
}

:deep(.el-scrollbar__bar:hover) {
  opacity: 1;
}
</style>`;

const newStyles = `/* 滚动条样式 */
:deep(.el-scrollbar__bar) {
  opacity: 0.5;
}

:deep(.el-scrollbar__bar:hover) {
  opacity: 1;
}

/* 信息展示卡片样式 */
.info-card {
  max-width: 100%;
}

.info-card .el-card {
  width: 100%;
}

.info-card h2 {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4facfe;
}

.info-card h3 {
  color: #34495e;
  font-size: 18px;
  margin: 20px 0 15px 0;
}

.info-card p {
  line-height: 1.8;
  color: #555;
  margin: 10px 0;
}

.info-card ul, .info-card ol {
  padding-left: 25px;
  line-height: 2;
  color: #555;
}

.info-card li {
  margin: 8px 0;
}

.info-card pre {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  overflow-x: auto;
}

.info-card kbd {
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 8px;
  font-family: monospace;
  font-size: 14px;
}

.info-card a {
  color: #4facfe;
  text-decoration: none;
}

.info-card a:hover {
  text-decoration: underline;
}

/* 表格样式优化 */
.info-card .el-table {
  margin-top: 15px;
}

.info-card .el-table th {
  background: #f5f7fa !important;
  color: #2c3e50;
  font-weight: 600;
}

/* 描述列表样式 */
.info-card .el-descriptions {
  margin-top: 15px;
}

.info-card .el-descriptions__title {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
}

/* 折叠面板样式 */
.info-card .el-collapse {
  margin-top: 20px;
}

.info-card .el-collapse-item__header {
  font-weight: 500;
  font-size: 15px;
  color: #2c3e50;
}

.info-card .el-collapse-item__content {
  padding: 15px;
  line-height: 1.8;
  color: #555;
}

/* 步骤条样式 */
.info-card .el-steps {
  margin: 20px 0;
}

/* 框架构建内容样式 */
.framework-content {
  max-width: 100%;
}

.framework-content .el-card {
  width: 100%;
}
</style>`;

content = content.replace(oldStyles, newStyles);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已添加 info-card 样式！');
