# 📚 考研英语作文提分助手

模板带背，作文批改，历年真题例文...

这是一个专为考研英语作文备考设计的应用系统，帮助用户高效背诵作文模板句子，并提供 AI 智能批改功能。

适合需要考研英语一/英语二作文复习的人，背诵时长预计2h, 可短期速成，作文在复习后预计能达到英语一24+/30，英语二18+/25。

## 界面展示

![演示](https://cdn.jsdelivr.net/gh/Withnoidea/images/gyF13M7Z_converted.gif)

## 功能模块

### 背诵与默写
- **背诵模式**：中英文对照显示，逐句背诵
- **默写模式**：显示中文提示，输入英文后实时比对（绿色=正确，红色=错误，黄色=缺失）
- **进度统计**：准确率、完成度、错误数实时追踪

### 写作框架
- 应用文、图画作文、图表作文、文字作文、混合型作文五大题型
- 每种题型提供写作框架构建指导
- 配套锦囊妙句模板练习

### 真题参考
- 历年考研英语一/英语二应用文真题（2005-2013+）
- 图画作文、图表作文、文字作文、混合型真题
- 下拉选择年份，直接展示题目与范文
- 范文格式化显示（段落缩进、署名靠右）
- 支持折叠/展开范文

### AI智能批改
- 支持上传作文图片（PNG/JPG）或文本文件（TXT）
- 支持手动输入作文内容
- 多AI服务商支持：通义千问、OpenAI、DeepSeek、Kimi、Claude等
- 按考研评分标准（内容、结构、语言）给出批改建议
- 批改结果可导出

## 快速开始

```bash
# 进入项目目录
cd "StudyPath English Writing"

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

开发服务器默认运行在 `http://localhost:5173`。

## 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 | 前端框架（Composition API） |
| Element Plus | UI组件库 |
| Vite | 构建工具 |

## 项目结构

```
recite/
├── prototype/                        # 原型版本（纯HTML）
│   └── index.html
│
└── StudyPath English Writing/        # 完整版本（Vue 3）
    ├── public/
    │   ├── template.txt              # 应用文23句模板
    │   ├── template2.txt             # 图画作文9句模板
    │   └── templates/                # 各题型真题与模板
    ├── src/
    │   ├── App.vue                   # 主应用组件
    │   ├── chapters.js               # 章节配置
    │   └── components/
    ├── package.json
    └── vite.config.js
```

## 详细文档

完整功能说明请查看 [StudyPath English Writing/README.md](./StudyPath%20English%20Writing/README.md)

## 许可证

MIT License
