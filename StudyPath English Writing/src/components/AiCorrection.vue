<template>
  <div class="ai-correction-container">
    <!-- 头部横幅与状态指示 -->
    <div class="ai-header-banner">
      <div class="banner-content">
        <div class="badge-wrapper">
          <span class="pulse-dot"></span>
          <span class="banner-badge">考研英语大纲高阶批改引擎 2026</span>
        </div>
        <h2 class="banner-title">AI 作文全方位智能诊断 & 多模态图文精批</h2>
        <p class="banner-subtitle">
          深度融合考研英语一/二命题大纲与四大评分维度，支持直接输入文本或一键上传真迹手写图、作图截图，极速解析纠错、高分升格与金句示范。
        </p>
      </div>
      <div class="banner-actions">
        <el-button 
          class="settings-trigger-btn" 
          @click="$emit('switch-section', 'corr2-2')"
          round
        >
          <el-icon><Setting /></el-icon>
          <span>当前引擎：{{ currentEngineLabel }}</span>
        </el-button>
      </div>
    </div>

    <!-- 核心表单与输入区 -->
    <el-card class="modern-card main-form-card" shadow="never">
      <!-- 题目元数据配置栏 -->
      <div class="meta-config-grid">
        <div class="meta-item">
          <label class="meta-label">考研科目</label>
          <el-select v-model="form.examType" placeholder="选择科目" size="large" class="meta-select">
            <el-option label="英语（一）" value="english1" />
            <el-option label="英语（二）" value="english2" />
          </el-select>
        </div>

        <div class="meta-item">
          <label class="meta-label">写作题型</label>
          <el-select v-model="form.essayCategory" placeholder="选择题型" size="large" class="meta-select">
            <el-option label="A 节：应用文 / 小作文 (满分 10 分)" value="small" />
            <el-option 
              v-if="form.examType === 'english1'" 
              label="B 节：图画大作文 (满分 20 分)" 
              value="big" 
            />
            <el-option 
              v-else 
              label="B 节：图表大作文 (满分 15 分)" 
              value="big" 
            />
            <el-option label="短文写作 / 自拟题目练习" value="custom" />
          </el-select>
        </div>

        <div class="meta-item">
          <label class="meta-label">真题年份 / 背景</label>
          <el-select 
            v-model="form.year" 
            placeholder="选填或自拟" 
            size="large" 
            filterable 
            allow-create
            class="meta-select"
          >
            <el-option v-for="y in yearsList" :key="y" :label="y + '年真题'" :value="y" />
            <el-option label="日常自拟练习" value="self" />
          </el-select>
        </div>

        <div class="meta-item full-width">
          <label class="meta-label">作文标题或指令要求（建议填写，以便精准判定是否扣题）</label>
          <el-input 
            v-model="form.title" 
            placeholder="例如：Directions: Write an essay based on the chart / Notice of Volunteer Recruitment..." 
            size="large"
            clearable
          />
        </div>
      </div>

      <el-divider class="form-divider" />

      <!-- 输入双模态选项卡：文本输入 / 多模态图片上传 -->
      <div class="input-tabs-wrapper">
        <div class="tabs-header">
          <button 
            type="button" 
            class="tab-btn" 
            :class="{ active: inputMode === 'both' }"
            @click="inputMode = 'both'"
          >
            <el-icon><Picture /></el-icon>
            <span>多模态图文协同（支持真迹/试卷拍照）</span>
          </button>
          <button 
            type="button" 
            class="tab-btn" 
            :class="{ active: inputMode === 'text' }"
            @click="inputMode = 'text'"
          >
            <el-icon><Document /></el-icon>
            <span>纯打字/复制文本</span>
          </button>
        </div>

        <!-- 多模态上传卡片 -->
        <div v-show="inputMode === 'both'" class="upload-zone-wrapper">
          <div 
            class="drop-zone"
            :class="{ 'has-image': !!imageData, 'drag-over': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @paste="handlePaste"
          >
            <template v-if="!imageData">
              <el-icon class="drop-icon"><UploadFilled /></el-icon>
              <div class="drop-text-primary">将手写答题卡、作图书页照片拖拽至此处，或粘贴剪贴板截图</div>
              <div class="drop-text-secondary">
                支持 JPG、PNG、WebP 高清真迹图像 · 前端自动轻量压缩并智能送入多模态模型进行字符识别与卷面分析
              </div>
              <label class="custom-file-upload">
                <input type="file" accept="image/*" @change="handleFileSelect" style="display: none;" />
                <el-button type="primary" plain round>选择本地图片</el-button>
              </label>
            </template>

            <template v-else>
              <div class="image-preview-card">
                <div class="preview-img-box">
                  <img :src="imageData" alt="作文照片" class="preview-img" />
                </div>
                <div class="preview-info-box">
                  <div class="img-name-row">
                    <el-tag type="success" effect="dark" size="small">多模态图片已就绪</el-tag>
                    <span class="img-filename">{{ imageName }}</span>
                  </div>
                  <p class="img-tip">已搭载至多模态视觉通道。模型将识别手写字迹、书写卷面工整度并结合下方文本或独立进行全方位诊断。</p>
                  <div class="img-actions">
                    <label class="re-upload-btn">
                      <input type="file" accept="image/*" @change="handleFileSelect" style="display: none;" />
                      <el-button size="small">更换图片</el-button>
                    </label>
                    <el-button type="danger" plain size="small" @click="removeImage">移除图片</el-button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 文本正文输入框 -->
        <div class="essay-textarea-wrapper">
          <div class="textarea-header-bar">
            <span class="textarea-title">
              <el-icon><Edit /></el-icon>
              作文正文内容
            </span>
            <div class="stats-group">
              <span class="stat-pill">单词数：<strong>{{ wordCount }}</strong></span>
              <span class="stat-pill">字符数：<strong>{{ form.content.length }}</strong></span>
              <el-dropdown trigger="click" @command="fillSampleEssay">
                <el-button link type="primary" size="small">
                  填入真题示范 <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="english1">2024 英语一图画大作文（满分20分）</el-dropdown-item>
                    <el-dropdown-item command="english2">2024 英语二图表大作文（满分15分）</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button 
                link 
                type="info" 
                size="small" 
                @click="form.content = ''" 
                v-if="form.content"
              >
                清空
              </el-button>
            </div>
          </div>

          <el-input
            v-model="form.content"
            type="textarea"
            :rows="9"
            placeholder="在此键入或粘贴作文英文全文... 若已上传手写答题卡照片，此处可留空或补充题目要求，大模型将自动读取图片文字并进行校对！"
            class="custom-modern-textarea"
          />
        </div>
      </div>

      <!-- 底部批改启动按钮与选项 -->
      <div class="action-footer">
        <div class="correction-options">
          <el-checkbox v-model="form.includeOcrTranscript">输出字迹转录与拼写校对</el-checkbox>
          <el-checkbox v-model="form.includeUpgradedEssay">提供高分升格示范与闪光替换</el-checkbox>
        </div>

        <el-button 
          type="primary" 
          size="large" 
          class="start-correct-btn"
          :loading="loading"
          @click="startCorrection"
        >
          <el-icon><MagicStick /></el-icon>
          <span>{{ loading ? '正在多维度深度诊断中...' : '开始考研标准智能批改' }}</span>
        </el-button>
      </div>
    </el-card>

    <!-- 诊断结果展示区 -->
    <transition name="el-zoom-in-top">
      <div v-if="result || loading" class="result-presentation-area">
        <el-card class="modern-card result-card" shadow="never">
          <template #header>
            <div class="result-card-header">
              <div class="header-left">
                <div class="pulse-indicator" :class="{ 'is-active': loading }"></div>
                <h3 class="result-title">考研作文深度诊断报告</h3>
              </div>
              <div class="header-right" v-if="result">
                <el-button size="small" plain @click="copyReport">
                  <el-icon><DocumentCopy /></el-icon>
                  复制报告
                </el-button>
                <el-dropdown trigger="click" @command="handleExportCommand">
                  <el-button size="small" type="primary" plain>
                    <el-icon><Download /></el-icon>
                    导出诊断报告
                    <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="markdown">
                        <el-icon><Document /></el-icon> 导出 Markdown (.md)
                      </el-dropdown-item>
                      <el-dropdown-item command="html">
                        <el-icon><Tickets /></el-icon> 导出高清独立网页 (.html)
                      </el-dropdown-item>
                      <el-dropdown-item command="print" divided>
                        <el-icon><Printer /></el-icon> 打印 / 保存为 PDF
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </template>

          <!-- 加载中动效 -->
          <div v-if="loading" class="loading-state-box">
            <div class="loading-spinner"></div>
            <div class="loading-text">大模型正在按考研官方评分标准逐句研读...</div>
            <div class="loading-subtext">正在核查语法词汇规范、段落衔接连贯性、立意主题契合度与提分亮点</div>
          </div>

          <!-- 正式批改报告 Markdown 渲染 -->
          <div v-else class="markdown-report-body" v-html="parsedMarkdown"></div>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  MagicStick, 
  Setting, 
  Picture, 
  Document, 
  UploadFilled, 
  Edit, 
  DocumentCopy, 
  Printer,
  Download,
  Tickets,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { marked } from 'marked'

// 配置 marked
marked.setOptions({
  gfm: true,
  breaks: true
})

const emit = defineEmits(['switch-section'])

// 年份列表
const currentYear = new Date().getFullYear()
const yearsList = Array.from({ length: 17 }, (_, i) => String(currentYear - i))

// 表单状态
const form = ref({
  examType: 'english1',
  essayCategory: 'big',
  year: '2024',
  title: '',
  content: '',
  includeOcrTranscript: true,
  includeUpgradedEssay: true
})

const inputMode = ref('both')
const isDragging = ref(false)
const imageData = ref(null)
const imageName = ref('')
const loading = ref(false)
const result = ref('')

// 计算单词数
const wordCount = computed(() => {
  const text = form.value.content.trim()
  if (!text) return 0
  const words = text.match(/[a-zA-Z0-9'-]+/g)
  return words ? words.length : 0
})

// 读取当前配置的引擎名称
const currentEngineLabel = computed(() => {
  const saved = localStorage.getItem('ai_api_config')
  if (!saved) return 'OpenRouter / Claude 3.7 (推荐)'
  try {
    const parsed = JSON.parse(saved)
    const pNames = {
      openrouter: 'OpenRouter (全球聚合)',
      openai: 'OpenAI 官方',
      claude: 'Anthropic Claude',
      gemini: 'Google Gemini',
      deepseek: 'DeepSeek 官方',
      siliconflow: 'SiliconFlow 硅基流动',
      custom: '自定义兼容端点'
    }
    return `${pNames[parsed.provider] || parsed.provider} (${parsed.model || '默认'})`
  } catch (e) {
    return '已配置引擎'
  }
})

// 解析 Markdown（增强考研答题卡范文格式支持）
const parsedMarkdown = computed(() => {
  if (!result.value) return ''
  try {
    let raw = result.value
    // 1. 保留模型输出的 &nbsp;&nbsp;&nbsp;&nbsp; 或四个半角空格的首行缩进
    raw = raw.replace(/^ {4}([A-Za-z])/gm, '&nbsp;&nbsp;&nbsp;&nbsp;$1')

    // 2. 自定义标记支持：将 ```essay-sheet 或 ```essay 转为高保真考研答题卡卡片
    raw = raw.replace(/```(?:essay-sheet|essay|text)?\n([\s\S]*?)```/g, (match, p1) => {
      // 保持英文答题卡排版
      return `<div class="essay-sheet-box"><div class="sheet-watermark">考研英语标准答题纸 (ANSWER SHEET)</div><div class="sheet-content">${p1.trim().replace(/\n\n+/g, '<br><br>')}</div></div>`
    })

    return marked(raw)
  } catch (e) {
    return result.value
  }
})

// 图片处理
const processImageFile = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    ElMessage.warning('请选择合法的图片文件（JPG/PNG/WebP）')
    return
  }
  imageName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    // 限制图片尺寸与自动压缩
    const img = new Image()
    img.onload = () => {
      const maxDim = 1920
      let w = img.width
      let h = img.height
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w)
          w = maxDim
        } else {
          w = Math.round((w * maxDim) / h)
          h = maxDim
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      imageData.value = canvas.toDataURL('image/jpeg', 0.88)
      ElMessage.success('图片已加载并完成轻量优化！')
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleFileSelect = (e) => {
  const file = e.target.files?.[0]
  if (file) processImageFile(file)
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) processImageFile(file)
}

const handlePaste = (e) => {
  const items = e.clipboardData?.items
  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        processImageFile(file)
        break
      }
    }
  }
}

const removeImage = () => {
  imageData.value = null
  imageName.value = ''
}

// 示范作文填充（严格按考研真题卷面首行缩进规范）
const fillSampleEssay = (type = 'english2') => {
  if (type === 'english1') {
    form.value.examType = 'english1'
    form.value.essayCategory = 'big'
    form.value.year = '2024'
    form.value.title = 'Directions: Write an essay based on the picture showing two students in front of a campus bulletin board discussing AI and future careers.'
    form.value.content = `    As is vividly portrayed in the drawing, two university students stand attentively before a campus bulletin board, deeply engrossed in a lively discussion regarding artificial intelligence and their future vocations. One student expresses apprehension about career prospects, while the other maintains that emerging technologies also herald unprecedented opportunities. The caption beneath reinforces this intriguing scenario.

    The profound implication conveyed by the cartoon deserves contemplation. First and foremost, the exponential rise of artificial intelligence has indeed revolutionized traditional employment sectors, prompting young intellectuals to reconsider the core competence required in the upcoming decade. Rather than succumbing to anxiety, proactive learners should regard intelligent algorithms as powerful instruments that augment human creativity and productivity. Moreover, adaptability and lifelong learning have emerged as the paramount qualities for college graduates in navigating this transformative era.

    In light of the analysis elaborated above, we ought to cultivate a balanced perspective towards technological progress. On the one hand, universities and educational authorities should modernize academic curricula to foster interdisciplinary talents. On the other hand, contemporary youth must sharpen critical discernment and emotional empathy—distinctive human attributes that can never be supplanted by synthetic machines. Only through proactive adaptation can we thrive amidst technological waves.`
    ElMessage.info('已载入 2024 年考研英语（一）图画大作文示范样例（已自动联动设置英语一、满分 20 分及对应题目要求）！')
  } else {
    form.value.examType = 'english2'
    form.value.essayCategory = 'big'
    form.value.year = '2024'
    form.value.title = 'Directions: Write an essay based on the chart showing Chinese residents reading habits.'
    form.value.content = `    As is vividly illustrated by the chart, the proportion of Chinese adults reading via digital devices witnessed a notable climb from 68.2% in 2018 to 80.1% in 2023. Meanwhile, traditional print reading experienced a slight downturn yet maintained a stable baseline around 58%. Such a striking contrast naturally captures extensive public attention and sparks profound reflections.

    Several underlying catalysts account for this salient trend. First and foremost, the rapid advancement of mobile Internet and smart gadgets has rendered digital reading exceptionally ubiquitous and convenient. Readers can effortlessly access vast oceans of information during fragmented commuting hours. Furthermore, multimedia e-books integrated with audio and interactive graphics deliver an immersive experience that paper books could hardly match. Nevertheless, the enduring charm of physical books—such as in-depth contemplation and tactile aroma—remains irreplaceable.

    To sum up, while digital media has undeniably evolved into the primary conduit of modern knowledge acquisition, print reading still serves as an anchor for deep cultural cultivation. Hence, we should embrace technological convenience while continuing to cherish profound reading traditions.`
    ElMessage.info('已载入 2024 年考研英语（二）图表大作文示范样例（已自动联动设置英语二、满分 15 分及对应题目要求）！')
  }
}

// 复制报告
const copyReport = async () => {
  if (!result.value) return
  try {
    await navigator.clipboard.writeText(result.value)
    ElMessage.success('批改报告已复制至剪贴板！')
  } catch (e) {
    ElMessage.error('复制失败，请手动选中文本复制')
  }
}

// 导出报告处理
const handleExportCommand = (command) => {
  if (command === 'markdown') {
    exportMarkdownFile()
  } else if (command === 'html') {
    exportHtmlFile()
  } else if (command === 'print') {
    printReport()
  }
}

// 导出 Markdown 文件
const exportMarkdownFile = () => {
  if (!result.value) return
  const timestamp = new Date().toISOString().slice(0, 10)
  const essayTitle = form.value.title ? form.value.title.slice(0, 18).replace(/[\s\/:*?"<>|]+/g, '_') : '考研作文'
  const filename = `考研英语作文AI诊断报告_${essayTitle}_${timestamp}.md`

  let fullMd = `# 📝 考研英语作文智能诊断与权威提分报告\n\n`
  fullMd += `> 考研类型：${form.value.examType === 'english1' ? '英语（一）' : '英语（二）'} | 类别：${form.value.essayCategory === 'big' ? '大作文' : '应用文（小作文）'} | 评估年份：${form.value.year}年\n\n`
  fullMd += `## 📌 考生原始作文输入\n\n`
  if (form.value.title) {
    fullMd += `**【题目要求 / Directions】**\n${form.value.title}\n\n`
  }
  if (form.value.content) {
    fullMd += `**【考生作文内容】**\n\`\`\`text\n${form.value.content}\n\`\`\`\n\n`
  }
  fullMd += `---\n\n## 📊 考研官方维度全方位批改报告\n\n`
  fullMd += result.value

  const blob = new Blob([fullMd], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已成功导出 Markdown 报告文件：${filename}`)
}

// 导出带考研高仿真答题纸样式的独立 HTML 报告
const exportHtmlFile = () => {
  if (!result.value) return
  const timestamp = new Date().toISOString().slice(0, 10)
  const essayTitle = form.value.title ? form.value.title.slice(0, 18).replace(/[\s\/:*?"<>|]+/g, '_') : '考研作文'
  const filename = `考研英语作文AI诊断报告_${essayTitle}_${timestamp}.html`

  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>考研英语作文诊断报告 - ${essayTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: #f8fafc; color: #1e293b; padding: 40px 20px; line-height: 1.7; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 40px; border: 1px solid #e2e8f0; }
    h1, h2, h3 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 28px; }
    .meta-tag { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    pre { background: #fdfbf7; border: 1px solid #e7dfd3; border-radius: 8px; padding: 20px; font-family: 'Times New Roman', Georgia, serif; font-size: 15px; line-height: 2.1; white-space: pre-wrap; word-break: break-word; }
    .essay-sheet-box { background: #fffdfa; background-image: repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px); border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 24px 28px; margin: 20px 0; }
    .sheet-watermark { font-size: 11px; letter-spacing: 2px; color: #94a3b8; font-weight: 800; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; margin-bottom: 16px; text-transform: uppercase; }
    .sheet-content { font-family: 'Times New Roman', Georgia, serif; font-size: 16px; line-height: 32px; color: #0f172a; }
    blockquote { background: #f8fafc; border-left: 4px solid #3b82f6; margin: 16px 0; padding: 12px 20px; border-radius: 0 8px 8px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background: #f1f5f9; }
    @media print { body { background: #fff; padding: 0; } .container { box-shadow: none; border: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="meta-tag">考研英语官方标准AI智能诊断体系</div>
    <div class="meta-info">
      <p><strong>考试类型：</strong>${form.value.examType === 'english1' ? '英语（一）' : '英语（二）'} | <strong>题材类别：</strong>${form.value.essayCategory === 'big' ? '大作文' : '应用文（小作文）'} | <strong>年份：</strong>${form.value.year}年</p>
    </div>
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
    ${parsedMarkdown.value}
  </div>
</body>
</html>`

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已成功导出高清独立 HTML 报告：${filename}`)
}

const printReport = () => {
  window.print()
}

// 启动批改
const startCorrection = async () => {
  if (!form.value.content.trim() && !imageData.value) {
    ElMessage.warning('请至少输入作文正文，或上传作文手写/作图照片！')
    return
  }

  // 读取配置
  const savedConfigStr = localStorage.getItem('ai_api_config')
  if (!savedConfigStr) {
    ElMessage.warning('检测到您尚未配置 API 密钥，请先前往「API设置」配置！')
    emit('switch-section', 'corr2-2')
    return
  }

  let config
  try {
    config = JSON.parse(savedConfigStr)
  } catch (e) {
    ElMessage.error('API 配置读取解析异常，请在设置面板重新保存！')
    return
  }

  if (!config.apiKey && config.provider !== 'custom') {
    ElMessage.warning('请先在「API设置」中填写对应服务商的 API Key！')
    emit('switch-section', 'corr2-2')
    return
  }

  loading.value = true
  result.value = ''

  try {
    const prompt = buildEvaluationPrompt()
    const responseText = await callModelAPI(config, prompt, imageData.value)
    result.value = responseText
    ElMessage.success('考研作文全方位诊断完成！')
  } catch (err) {
    console.error(err)
    ElMessage.error(`批改请求失败：${err.message || '未知错误'}`)
  } finally {
    loading.value = false
  }
}

// 构建严谨的考研四维评分 Prompt
const buildEvaluationPrompt = () => {
  const isEng1 = form.value.examType === 'english1'
  const exam = isEng1 ? '考研英语（一）' : '考研英语（二）'
  const itemMaxScore = form.value.essayCategory === 'small' ? 10 : (isEng1 ? 20 : 15)

  const categoryMap = {
    small: 'A 节：应用文小作文（满分 10 分）',
    big: isEng1 
      ? 'B 节：图画大作文（满分 20 分）' 
      : 'B 节：图表大作文（满分 15 分）',
    custom: `短文写作（满分 ${itemMaxScore} 分）`
  }
  const category = categoryMap[form.value.essayCategory] || '英语写作'

  // 格式规则：区分应用文（小作文）与大作文（图画/图表/文字）
  const formatGuidelines = form.value.essayCategory === 'small' 
    ? `【考研英语应用文（小作文）官方卷面排版格式规范铁律】：
1. **书信类格式**：
   - **称呼 (Salutation)**：顶格书写，如 \`Dear Sir or Madam,\` 或 \`Dear Professor Smith,\`，末尾务必使用【英文逗号】。
   - **正文排版（严格采用缩进式或齐头式之一，严禁混乱）**：
     - **推荐缩进式 (Indentation)**：每个正文段落首行严格缩进 4 个英文字符空格（在 Markdown 中请用四个半角空格 \`    \` 或 \`&nbsp;&nbsp;&nbsp;&nbsp;\` 明确体现），段与段之间不空行；
     - **或齐头式 (Block Format)**：各段首行顶格书写，但段与段之间必须空出一整行。
   - **结束语 (Complimentary Close)**：顶格（或靠右空出），首字母大写，如 \`Yours sincerely,\` 或 \`Yours faithfully,\`，末尾务必带【英文逗号】。
   - **署名 (Signature)**：结束语正下方，考研官方严格要求统一署名为 \`Li Ming\`（严禁写个人真实姓名）。
2. **通知/告示/纪要类 (Notice / Announcement)**：
   - 标题 \`NOTICE\` 必须居中且全部大写；
   - 正文首行严格缩进；
   - 发文单位与日期位于文末右下方。`
    : `【考研英语大作文（图画/图表/论说）官方卷面排版格式规范铁律】：
1. **段落排版规范（高分试卷铁律，严禁随意排版）**：
   - **严格采用标准首行缩进式 (Indentation)**：考研答题卡官方标杆排版要求**每一个自然段首行严格缩进 4 个英文字符空格**（在输出范文时，每段开头请务必带有 4 个空格缩进 \`    \` 或 \`&nbsp;&nbsp;&nbsp;&nbsp;\`），段落内部正常换行，段落之间保持连贯紧凑。
   - **段落数量**：标准三段式（Introduction 描述 ➔ Body 分析原因/影响 ➔ Conclusion 措施与展望）。
2. **标点与大小写**：句首首字母大写，标点符号（逗号、句号）紧跟单词且后留一个空格。`

  return `你是一名精通教育部考研英语命题规范与阅卷大纲的权威官方阅卷组专家。
请严格对照【${exam} - ${category}】的全国统考官方评分细则，对考生提交的作文进行全方位、专业且具有针对性的诊断。

【满分分值】：本次评分题项：${category}，单项满分 ${itemMaxScore} 分。你的终审得分与各维度得分总和绝对不能超过 ${itemMaxScore} 分！

【🔥 官方阅卷最高铁律：跑题 / 文不对题 / 生搬硬套模板“一票否决与降档惩罚机制”】
考研阅卷评分第一原则是【审题与扣题一致性】：
1. **题文一致性审查（第一道红线）**：
   - 题目给定要求/背景：${form.value.title || '（通用大纲题型要求）'}；年份背景：${form.value.year || '未指定'}。
   - 仔细对比考生正文的核心主题（Topic & Argument）与上述题目要求是否吻合！
   - **文不对题/生搬硬套模板典型情形**：例如题目要求写“2023年关于传统文化/大学生活”，考生却通篇抄录套用“2024年图书阅读习惯”或无关联的模板框架；或者题目是“建议信”正文却写成“辞职信”；题目要求写“网络利弊”正文却写“保护环境”。
2. **跑题惩罚量化扣分规则（严格执行降档惩罚，严禁给高分！）**：
   - **严重跑题 / 明显套用无关年份真题模板**：【内容切题度维度得分直接判为 0~2 分】；总分**一票否决直接降入第四档（1~${Math.round(itemMaxScore * 0.3)}分）**！并在诊断报告最顶端用醒目的 ⚠️ 严重警告标出“题目与正文严重脱节，涉嫌生搬硬套无关模板，考场将面临极低分风险”。
   - **部分偏题 / 论据牵强**：【内容切题度维度得分扣除 60% 以上】，总分最高不得超过及格线（${Math.round(itemMaxScore * 0.55)}分）。
   - **紧密扣题且论证充实**：方可根据语言规范与逻辑正常给高分。
【千万切记】：即使考生的英文句子语法完美、长难句华丽，只要“跑题/文不对题”，在考研统考阅卷中就必须判定为模板套作或跑题，一律降档打低分！严禁因为语言通顺而给跑题作文打高分！

${formatGuidelines}

【考生试卷信息】
- 考试类型：${exam}
- 作文类别：${category}
- 题目年份/说明：${form.value.year || '未指定'}
- 题目与要求：${form.value.title || '（未提供特定要求，请按标准大纲题型评估）'}
${imageData.value ? '- 考生已上传【答题卡/真迹图片】：请仔细辨识图片中的手写英文内容、卷面布局、首行缩进与字迹规范！' : ''}

【考生正文内容】
${form.value.content || '（考生直接上传了手写图片，未在输入框提供文本，请以图片手写 OCR 识别内容为准）'}

---------------------------------
【你的输出必须严格包含以下清晰的 Markdown 模块】：

### 一、 卷面与总评打分卡（单项满分 ${itemMaxScore} 分）
| 评估维度 | 满分标准 | 实得分 | 核心得分点与扣分主因（重点指出是否扣题） |
| :--- | :--- | :--- | :--- |
| **内容切题与立意深度** (Content & Task Fulfillment) | 扣题准确度、论据是否紧扣给定题目、有无偏题套题 | X分 / ${Math.round(itemMaxScore * 0.35)}分 | 明确指出题目与作文核心论点是否一致，有无套用无关模板 |
| **语言规范与句式多样性** (Language Accuracy & Variety) | 语法精准度、动词时态主谓一致、高级句式运用 | X分 / ${Math.round(itemMaxScore * 0.35)}分 | 简述语言质量 |
| **结构组织与逻辑衔接** (Organization & Coherence) | 三段式结构、指代词使用、逻辑连接词承转启合 | X分 / ${Math.round(itemMaxScore * 0.2)}分 | 简述段落衔接 |
| **卷面格式与书写规范** (Format & Handwriting) | 首行缩进、称呼署名对齐、工整度、标点规范 | X分 / ${Math.round(itemMaxScore * 0.1)}分 | 简述是否符合 4 空格首行缩进及官方格式 |
| **综合终审得分** | **满分 ${itemMaxScore} 分** | **X分 / 档次 (如：第X档 X-X分)** | 一句话核心诊断（若文不对题请标明【严重跑题】） |

> **扣题一致性核验结论**：【完全扣题 / 部分偏题 / 严重跑题套作】——（详细说明判定依据）

${form.value.includeOcrTranscript && imageData.value ? `
### 二、 手写字迹精准转录与卷面诊断
- **字迹 OCR 高保真转录**：（列出识别出的考生完整原文，严格还原其分段与缩进）
- **书写书面与格式评价**：针对答题卡字母饱满度、首行是否有标准缩进、涂改扣分风险给出专业点评。
` : ''}

### 三、 逐句细批与错词病句纠正（精确定位到原句）
请针对原文中存在语法瑕疵、中式英语、介词误用或词汇生硬之处，以如下格式逐一列出：
- ❌ **原句**：...
- ✅ **推荐订正**：...
- 💡 **失分与升格解析**：（解释语法病因、考研阅卷偏好与更地道的考研高阶替换）

### 四、 段落逻辑与架构升格建议
1. **第一段（引入/图画描述/背景/书信意图）**：
2. **第二段（深层原因/论证/影响分析/细节诉求）**：
3. **第三段（权衡总结/措施倡议/个人观点/期盼回信）**：

${form.value.includeUpgradedEssay ? `
### 五、 考研官方标准标杆升格范文（严格格式典范）
**【请严格遵循考研标准卷面排版格式输出，不得随意排版】**：
${form.value.essayCategory === 'small' 
  ? `> **小作文格式要求**：
> - 顶格书写称呼（如 \`Dear Sir or Madam,\`）；
> - 正文每个自然段首行**务必空出 4 个英文字符空格缩进**（\`&nbsp;&nbsp;&nbsp;&nbsp;\` 或 \`    \`）；
> - 规范结束语（如 \`Yours sincerely,\`）和专属署名（\`Li Ming\`）。`
  : `> **大作文格式要求**：
> - 采用官方标杆**首行缩进排版**：每一个自然段开头**务必缩进 4 个字符**（必须使用 \`&nbsp;&nbsp;&nbsp;&nbsp;\` 或四个空格缩进）；
> - 语言运用考研高频闪光词汇与多样化高阶句型（分词短语前置、倒装、同位语从句等）。`
}

请将完整的示范范文放在一个考研答题卡引用区块 \`\`\`essay-sheet ... \`\`\` 或规范排版区块中展示，并在范文末尾附上：
- 🌟 **【5个核心闪光词组/地道表达清单】**（标注考研替换价值）
- 📐 **【卷面格式自检清单】**（首行缩进说明、段落字数分布统计）
` : ''}

请使用排版考究、层次清晰的 Markdown 格式输出，语言严谨客观且富有鼓励性。`
}

// 统一的多模态与大模型 API 调用中枢（纯静态 / Netlify / 开源适配）
const callModelAPI = async (config, prompt, base64Image) => {
  const { provider, apiKey, baseUrl, model, temperature, maxTokens } = config
  const cleanBase = (baseUrl || '').trim().replace(/\/+$/, '')

  // 1. Anthropic Claude 原生 Messages API
  if (provider === 'claude') {
    const messages = []
    if (base64Image) {
      const match = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/)
      const mediaType = match ? match[1] : 'image/jpeg'
      const base64Data = match ? match[2] : base64Image
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64Data
            }
          },
          { type: 'text', text: prompt }
        ]
      })
    } else {
      messages.push({ role: 'user', content: prompt })
    }

    const endpoint = cleanBase ? `${cleanBase}/messages` : '/api/claude/v1/messages'
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true'
      },
      body: JSON.stringify({
        model: model || 'claude-3-7-sonnet-20250219',
        max_tokens: maxTokens || 4000,
        messages
      })
    })

    const data = await resp.json()
    if (!resp.ok) throw new Error(data.error?.message || `Claude 调用失败 HTTP ${resp.status}`)
    const textBlock = data.content?.find(c => c.type === 'text')
    return textBlock ? textBlock.text : (data.content?.[0]?.text || '')
  }

  // 2. 通用 OpenAI 兼容协议（OpenRouter, OpenAI, Gemini, DeepSeek, SiliconFlow, 自定义端点等）
  let targetUrl = ''
  if (cleanBase) {
    targetUrl = cleanBase.endsWith('/chat/completions') ? cleanBase : `${cleanBase}/chat/completions`
  } else {
    // 代理后备
    if (provider === 'openrouter') targetUrl = '/api/openrouter/api/v1/chat/completions'
    else if (provider === 'openai') targetUrl = '/api/openai/v1/chat/completions'
    else if (provider === 'deepseek') targetUrl = '/api/deepseek/chat/completions'
    else if (provider === 'siliconflow') targetUrl = '/api/siliconflow/v1/chat/completions'
    else targetUrl = '/api/chat/completions'
  }

  const headers = {
    'Content-Type': 'application/json'
  }
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }
  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = window.location.origin
    headers['X-Title'] = 'StudyPath English Writing'
  }

  // 构建标准 OpenAI 格式多模态消息体
  let messageContent
  if (base64Image) {
    messageContent = [
      {
        type: 'image_url',
        image_url: {
          url: base64Image,
          detail: 'high'
        }
      },
      {
        type: 'text',
        text: prompt
      }
    ]
  } else {
    messageContent = prompt
  }

  const requestBody = {
    model: model || 'anthropic/claude-3.7-sonnet',
    messages: [
      {
        role: 'user',
        content: messageContent
      }
    ],
    temperature: typeof temperature === 'number' ? temperature : 0.3,
    max_tokens: maxTokens || 4000
  }

  const resp = await fetch(targetUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  })

  const data = await resp.json()
  if (!resp.ok) {
    const errorMsg = data.error?.message || data.message || `请求失败 HTTP ${resp.status}`
    throw new Error(errorMsg)
  }

  const reply = data.choices?.[0]?.message?.content
  if (!reply) {
    throw new Error('模型返回内容为空，请检查模型服务商或配额！')
  }

  return reply
}
</script>

<style scoped>
.ai-correction-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 顶部 Banner */
.ai-header-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 14px;
  padding: 24px 28px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.badge-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
  animation: pulseAnim 2s infinite;
}

@keyframes pulseAnim {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.banner-badge {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #38bdf8;
}

.banner-title {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #f8fafc;
}

.banner-subtitle {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 820px;
}

.settings-trigger-btn {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: #e2e8f0 !important;
  font-size: 13px;
  padding: 10px 18px;
  transition: all 0.2s ease;
}

.settings-trigger-btn:hover {
  background: rgba(255, 255, 255, 0.18) !important;
  border-color: #38bdf8 !important;
  color: #38bdf8 !important;
}

/* 卡片基类 */
.modern-card {
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  transition: box-shadow 0.2s ease;
}

.main-form-card {
  padding: 10px;
}

/* 配置栅格 */
.meta-config-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 10px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-item.full-width {
  grid-column: span 3;
}

.meta-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.meta-select {
  width: 100%;
}

.form-divider {
  margin: 16px 0;
  border-color: #f1f5f9;
}

/* 输入模式切换 */
.input-tabs-wrapper {
  padding: 0 10px;
}

.tabs-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #e0f2fe;
  border-color: #38bdf8;
  color: #0369a1;
}

/* 上传区 */
.drop-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  background: #fafafa;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}

.drop-zone.drag-over {
  border-color: #0284c7;
  background: #f0f9ff;
}

.drop-zone.has-image {
  padding: 16px;
  background: #f8fafc;
  border-style: solid;
  border-color: #e2e8f0;
}

.drop-icon {
  font-size: 44px;
  color: #64748b;
  margin-bottom: 8px;
}

.drop-text-primary {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.drop-text-secondary {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}

.image-preview-card {
  display: flex;
  gap: 20px;
  align-items: center;
  text-align: left;
}

.preview-img-box {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  background: #000;
  flex-shrink: 0;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-info-box {
  flex: 1;
}

.img-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.img-filename {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.img-tip {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.img-actions {
  display: flex;
  gap: 10px;
}

/* 文本编辑区 */
.essay-textarea-wrapper {
  margin-top: 14px;
}

.textarea-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.textarea-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
}

.stats-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-pill {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 8px;
  border-radius: 6px;
}

.stat-pill strong {
  color: #0f172a;
}

.custom-modern-textarea :deep(.el-textarea__inner) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.7;
  padding: 16px;
  border-radius: 10px;
  border-color: #cbd5e1;
  background: #ffffff;
}

.custom-modern-textarea :deep(.el-textarea__inner:focus) {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
}

/* 底部操作区 */
.action-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 10px 10px;
}

.correction-options {
  display: flex;
  gap: 20px;
}

.start-correct-btn {
  padding: 14px 32px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%) !important;
  border: none !important;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35) !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease !important;
}

.start-correct-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45) !important;
}

/* 结果卡片 */
.result-presentation-area {
  margin-top: 10px;
}

.result-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
}

.pulse-indicator.is-active {
  background: #f59e0b;
  animation: pulseAnim 1.2s infinite;
}

.result-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.header-right {
  display: flex;
  gap: 8px;
}

/* 加载动画 */
.loading-state-box {
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 4px solid #e2e8f0;
  border-top-color: #0284c7;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.loading-subtext {
  font-size: 13px;
  color: #64748b;
}

/* Markdown 渲染报告样式 */
.markdown-report-body {
  padding: 10px 14px;
  color: #1e293b;
  line-height: 1.8;
  font-size: 14px;
}

.markdown-report-body :deep(h1),
.markdown-report-body :deep(h2),
.markdown-report-body :deep(h3),
.markdown-report-body :deep(h4) {
  color: #0f172a;
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 700;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 8px;
}

.markdown-report-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 13px;
}

.markdown-report-body :deep(th),
.markdown-report-body :deep(td) {
  border: 1px solid #cbd5e1;
  padding: 10px 14px;
  text-align: left;
}

.markdown-report-body :deep(th) {
  background: #f1f5f9;
  font-weight: 700;
  color: #0f172a;
}

.markdown-report-body :deep(tr:nth-child(even)) {
  background: #f8fafc;
}

.markdown-report-body :deep(blockquote) {
  margin: 14px 0;
  padding: 12px 18px;
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  border-radius: 0 8px 8px 0;
  color: #166534;
}

.markdown-report-body :deep(code) {
  background: #f1f5f9;
  color: #0369a1;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: Consolas, Monaco, monospace;
}

/* 考研答题卡标杆范文专属排版容器 */
.markdown-report-body :deep(.essay-sheet-box) {
  background: #fffdfa;
  background-image: repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px);
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 24px 28px;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
}

.markdown-report-body :deep(.sheet-watermark) {
  font-size: 11px;
  font-weight: 700;
  color: #b45309;
  background: #fef3c7;
  border: 1px solid #fde68a;
  padding: 3px 12px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.markdown-report-body :deep(.sheet-content) {
  font-family: 'Times New Roman', Georgia, serif;
  font-size: 16px;
  line-height: 32px;
  color: #0f172a;
  letter-spacing: 0.4px;
}

.markdown-report-body :deep(pre) {
  background: #fdfbf7;
  border: 1px solid #e7dfd3;
  border-radius: 10px;
  padding: 20px 24px;
  margin: 18px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow-x: auto;
}

.markdown-report-body :deep(pre)::before {
  content: '📝 考研官方答题卡标准排版示范 (Indentation Standard)';
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #92400e;
  background: #fef3c7;
  padding: 3px 10px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 14px;
  letter-spacing: 0.5px;
}

.markdown-report-body :deep(pre code) {
  background: transparent;
  color: #1e293b;
  padding: 0;
  border-radius: 0;
  font-family: 'Times New Roman', Times, Georgia, serif, -apple-system;
  font-size: 15px;
  line-height: 2.1;
  white-space: pre-wrap;
  word-break: break-word;
  display: block;
  letter-spacing: 0.3px;
}

/* 范文段落首行缩进规范保证 */
.markdown-report-body :deep(.standard-essay-p) {
  text-indent: 2.2em;
  margin-bottom: 12px;
  line-height: 2;
  font-family: 'Times New Roman', Georgia, serif;
}
</style>
