# 考研英语作文提分助手 智能批改/评分，带背，真题样文...

这是一个专为考研英语作文备考设计的应用系统，帮助用户高效背诵作文模板句子，并提供 AI 智能批改功能。、

## 界面展示

![gyF13M7Z_converted](https://cdn.jsdelivr.net/gh/Withnoidea/images/gyF13M7Z_converted.gif)

## 项目结构

```
E:\document\project\recite\
├── prototype/                        # 原型版本（纯HTML）
│   ├── index.html                    # 背诵应用原型
│   ├── template.txt                  # 模板文件
│   └── template_copy.txt             # 模板备份
│
└── StudyPath English Writing/        # 完整版本（Vue 3）
    ├── index.html                    # 入口HTML
    ├── package.json                  # 项目依赖配置
    ├── vite.config.js                # Vite构建配置
    ├── public/                       # 静态资源
    │   ├── template.txt              # 内置模板
    │   └── templates/                # 各题型模板文件
    ├── src/                          # 源代码
    │   ├── main.js                   # Vue入口
    │   ├── App.vue                   # 主应用组件
    │   ├── chapters.js               # 章节配置
    │   └── components/               # Vue组件
    └── 作文批改/                     # 批改相关文档
```

## 功能特性

### 核心功能
- 句子背诵练习（中文提示，输入英文）
- 实时比对与高亮显示（正确/错误/缺失）
- 进度统计（准确率、完成度、错误数）
- 支持自定义模板文件上传
- AI 智能批改作文
- 多种题型支持（应用文、图画作文、图表作文等）

### UI 特性
- 现代化渐变背景设计
- 响应式布局，支持移动端
- 直观的颜色标记
- 丰富的交互动画
- 键盘快捷键支持

## 快速开始

### 使用原型版本

直接在浏览器中打开 `prototype/index.html` 即可使用基础背诵功能。

### 使用完整版本

```bash
# 进入项目目录
cd "StudyPath English Writing"

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 模板文件格式

上传的自定义模板文件需遵循以下格式：

```
1，中文句子
英文句子

2，中文句子
英文句子
```

- 文件编码：UTF-8
- 中文行以数字和逗号开头
- 中英文之间用空行分隔

## 技术栈

| 项目 | 技术 |
|------|------|
| 框架 | Vue 3 |
| UI组件库 | Element Plus |
| 构建工具 | Vite |
| API | Vue Composition API |

## 详细文档

完整功能说明请查看 [StudyPath English Writing/README.md](./StudyPath%20English%20Writing/README.md)

## 许可证

MIT License

---

最后更新：2026年4月10日
