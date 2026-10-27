<template>
  <div class="ai-config-container">
    <el-card class="config-card" shadow="never">
      <template #header>
        <div class="card-header">
          <div>
            <div class="header-badge">
              <span class="pulse-dot"></span>
              LLM & Multimodal Vision Hub
            </div>
            <h3 class="header-title">大模型引擎与多模态服务配置</h3>
            <p class="header-desc">
              适配 GitHub / Netlify 纯静态部署，直接在浏览器端发起多模态请求。支持一键获取模型列表与真实连通性测试。
            </p>
          </div>
          <el-button type="primary" plain @click="goCorrection">
            <el-icon><Edit /></el-icon>
            返回批改面板
          </el-button>
        </div>
      </template>

      <el-form :model="configForm" label-position="top" class="config-form">
        <!-- 服务商选择 -->
        <el-form-item label="模型服务商 / API 聚合平台">
          <el-radio-group v-model="configForm.provider" @change="handleProviderChange" class="provider-radio-group">
            <el-radio-button 
              v-for="item in providerList" 
              :key="item.value" 
              :value="item.value"
            >
              <div class="radio-label-wrap">
                <span class="provider-name">{{ item.label }}</span>
                <span v-if="item.tag" class="provider-tag" :class="item.tagType">{{ item.tag }}</span>
              </div>
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- Base URL -->
        <el-form-item label="API Base URL (端点接口地址)">
          <el-input 
            v-model="configForm.baseUrl" 
            placeholder="https://api.openai.com/v1"
            clearable
          >
            <template #prepend>
              <span class="input-prepend-text">Endpoint</span>
            </template>
            <template #append>
              <el-button 
                :loading="fetchingModels" 
                @click="fetchModelsList" 
                type="primary"
                :disabled="!configForm.baseUrl"
              >
                <el-icon><Refresh /></el-icon>
                获取模型列表
              </el-button>
            </template>
          </el-input>
          <div class="field-hint">
            {{ currentProviderDesc }}
          </div>
        </el-form-item>

        <!-- API Key -->
        <el-form-item label="API Key (密钥凭据)">
          <el-input 
            v-model="configForm.apiKey" 
            type="password" 
            show-password 
            placeholder="sk-..."
            clearable
          />
          <div class="field-hint security-hint">
            <el-icon><Lock /></el-icon>
            纯静态部署规范：密钥仅存储于当前浏览器本地 LocalStorage 中，绝不经由任何第三方服务端中转。
          </div>
        </el-form-item>

        <!-- 模型选择 -->
        <el-form-item label="模型选择 (Model)">
          <div class="model-select-row">
            <el-select
              v-model="configForm.model"
              filterable
              allow-create
              default-first-option
              placeholder="选择预设或直接输入模型标识符"
              class="model-select"
            >
              <el-option-group v-if="dynamicModels.length > 0" label="在线动态拉取的模型">
                <el-option 
                  v-for="m in dynamicModels" 
                  :key="m.value" 
                  :label="m.label" 
                  :value="m.value"
                >
                  <div class="model-option-item">
                    <span>{{ m.label }}</span>
                    <el-tag size="small" type="success" effect="light">Online</el-tag>
                  </div>
                </el-option>
              </el-option-group>
              <el-option-group label="推荐前沿多模态 / 语言模型">
                <el-option 
                  v-for="m in currentModelOptions" 
                  :key="m.value" 
                  :label="m.label" 
                  :value="m.value"
                >
                  <div class="model-option-item">
                    <span>{{ m.label }}</span>
                    <el-tag v-if="m.badge" size="small" :type="m.badgeType || 'info'" effect="plain">
                      {{ m.badge }}
                    </el-tag>
                  </div>
                </el-option>
              </el-option-group>
            </el-select>

            <el-button 
              type="primary" 
              :loading="testing" 
              @click="testConnection"
              class="test-btn"
            >
              <el-icon><CircleCheck /></el-icon>
              测试连通性
            </el-button>
          </div>
          <div class="field-hint">
            支持直接手动键入任意第三方模型 ID（如 <code>claude-3-7-sonnet-20250219</code>, <code>gpt-4o</code>, <code>gemini-2.5-flash</code> 等）
          </div>
        </el-form-item>

        <!-- 测试状态信息展示 -->
        <transition name="el-fade-in">
          <div v-if="testResult" class="test-result-box" :class="testResult.status">
            <div class="test-result-header">
              <el-icon :size="18">
                <CircleCheckFilled v-if="testResult.status === 'success'" />
                <WarningFilled v-else />
              </el-icon>
              <span class="test-title">{{ testResult.title }}</span>
              <span class="test-latency" v-if="testResult.latency">{{ testResult.latency }}ms</span>
            </div>
            <div class="test-detail">{{ testResult.message }}</div>
          </div>
        </transition>

        <!-- 高级参数折叠 -->
        <el-collapse class="advanced-collapse">
          <el-collapse-item title="高级调用参数设置 (Temperature / Max Tokens)" name="1">
            <div class="advanced-params-grid">
              <el-form-item label="采样温度 (Temperature: 0~1)">
                <el-slider v-model="configForm.temperature" :min="0" :max="1" :step="0.05" show-input />
                <div class="field-hint">考研批改建议设置 0.2~0.4，以保证评分标准的严谨与稳定性。</div>
              </el-form-item>
              <el-form-item label="最大输出长度 (Max Tokens)">
                <el-input-number v-model="configForm.maxTokens" :min="500" :max="8192" :step="500" />
                <div class="field-hint">建议 3000~4096 以完整生成涵盖 OCR、诊断、错句订正和升格范文的长篇报告。</div>
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>

        <!-- 底部保存 -->
        <div class="form-actions">
          <el-button type="primary" size="large" @click="saveConfig">
            保存配置
          </el-button>
          <el-button size="large" @click="resetDefaults">
            恢复推荐默认值
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Edit, 
  Lock, 
  Refresh, 
  CircleCheck, 
  CircleCheckFilled, 
  WarningFilled 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['switch-section'])

// 默认配置
const defaultConfig = {
  provider: 'openrouter',
  baseUrl: 'https://openrouter.ai/api/v1',
  apiKey: '',
  model: 'anthropic/claude-3.7-sonnet',
  temperature: 0.3,
  maxTokens: 4000
}

const configForm = ref({ ...defaultConfig })
const dynamicModels = ref([])
const fetchingModels = ref(false)
const testing = ref(false)
const testResult = ref(null)

// 针对纯静态部署与全球前沿多模态优化的服务商清单
const providerList = [
  { label: 'OpenRouter (全球聚合)', value: 'openrouter', tag: '强推·免翻/全球模型', tagType: 'danger' },
  { label: 'OpenAI 官方', value: 'openai', tag: 'GPT-4o 多模态', tagType: 'primary' },
  { label: 'Anthropic Claude', value: 'claude', tag: 'Claude 3.7 旗舰', tagType: 'success' },
  { label: 'Google Gemini', value: 'gemini', tag: '超长上下文', tagType: 'warning' },
  { label: 'DeepSeek 官方', value: 'deepseek', tag: '深度思考 R1/V3', tagType: 'info' },
  { label: 'SiliconFlow 硅基流动', value: 'siliconflow', tag: '国内高并发免翻', tagType: 'success' },
  { label: '自定义兼容端点', value: 'custom', tag: 'Any OpenAI API', tagType: 'info' }
]

// 服务商默认 Base URL
const providerBaseUrls = {
  openrouter: 'https://openrouter.ai/api/v1',
  openai: 'https://api.openai.com/v1',
  claude: 'https://api.anthropic.com/v1',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/openai',
  deepseek: 'https://api.deepseek.com/v1',
  siliconflow: 'https://api.siliconflow.cn/v1',
  custom: 'https://api.example.com/v1'
}

// 服务商引导描述
const providerDescriptions = {
  openrouter: '全球最大聚合平台，官方支持 CORS 直连，一个 Key 即可直连 Claude 3.7 Sonnet、GPT-4o、Gemini 2.5、DeepSeek-R1 全系列多模态，Netlify 部署首选。',
  openai: 'OpenAI 官方接口（支持 gpt-4o, gpt-4o-mini, o1, o3-mini），国内环境需配合代理或科学环境使用。',
  claude: 'Anthropic 官方接口（原生 messages 协议与 Claude 3.7 Sonnet 思考模型）。注：浏览器直接跨域调用可能需代理转发。',
  gemini: 'Google Gemini 官方提供的 OpenAI 兼容接口，极速且性价比极高，多模态真迹识别极为出色。',
  deepseek: 'DeepSeek 官方 API，支持 DeepSeek-V3 与 DeepSeek-R1（深度思考推理模型，适合纯文本范文深度剖析）。',
  siliconflow: '国内免翻墙的专业大模型分发云，支持 Qwen2.5-VL 多模态识别、DeepSeek-R1/V3 极速推理。',
  custom: '任意兼容 OpenAI /v1 规范的自建代理、中转或中枢服务，如 NewAPI、OneAPI 等。'
}

// 推荐模型预设
const modelPresets = {
  openrouter: [
    { label: 'anthropic/claude-3.7-sonnet', value: 'anthropic/claude-3.7-sonnet', badge: '最强考研批改', badgeType: 'danger' },
    { label: 'anthropic/claude-3.7-sonnet:thinking', value: 'anthropic/claude-3.7-sonnet:thinking', badge: '思维链深度诊断', badgeType: 'danger' },
    { label: 'openai/gpt-4o-2024-11-20', value: 'openai/gpt-4o-2024-11-20', badge: '全能视觉多模态', badgeType: 'primary' },
    { label: 'google/gemini-2.0-flash-001', value: 'google/gemini-2.0-flash-001', badge: '极速视觉理解', badgeType: 'warning' },
    { label: 'deepseek/deepseek-r1', value: 'deepseek/deepseek-r1', badge: '满分升格解析', badgeType: 'success' }
  ],
  openai: [
    { label: 'gpt-4o (旗舰视觉多模态)', value: 'gpt-4o', badge: '多模态推荐', badgeType: 'primary' },
    { label: 'gpt-4o-mini (轻量极速批改)', value: 'gpt-4o-mini', badge: '轻量经济', badgeType: 'info' },
    { label: 'o3-mini (高逻辑深度推理)', value: 'o3-mini', badge: '推理强化', badgeType: 'warning' }
  ],
  claude: [
    { label: 'claude-3-7-sonnet-20250219 (当前全球最强)', value: 'claude-3-7-sonnet-20250219', badge: '旗舰推荐', badgeType: 'danger' },
    { label: 'claude-3-5-sonnet-20241022', value: 'claude-3-5-sonnet-20241022', badge: '高质稳定', badgeType: 'primary' },
    { label: 'claude-3-5-haiku-20241022', value: 'claude-3-5-haiku-20241022', badge: '极速轻量', badgeType: 'info' }
  ],
  gemini: [
    { label: 'gemini-2.0-flash (最新极速多模态)', value: 'gemini-2.0-flash', badge: '多模态强推', badgeType: 'warning' },
    { label: 'gemini-2.5-pro (深度逻辑高阶版)', value: 'gemini-2.5-pro', badge: '逻辑严密', badgeType: 'danger' }
  ],
  deepseek: [
    { label: 'deepseek-chat (DeepSeek-V3 纯文本)', value: 'deepseek-chat', badge: 'V3 高分改写', badgeType: 'primary' },
    { label: 'deepseek-reasoner (DeepSeek-R1 深度思考)', value: 'deepseek-reasoner', badge: 'R1 逻辑剖析', badgeType: 'success' }
  ],
  siliconflow: [
    { label: 'Qwen/Qwen2.5-VL-72B-Instruct (国内视觉开源旗舰)', value: 'Qwen/Qwen2.5-VL-72B-Instruct', badge: '手写OCR神级', badgeType: 'danger' },
    { label: 'deepseek-ai/DeepSeek-R1 (硅基极速版)', value: 'deepseek-ai/DeepSeek-R1', badge: '满速推理', badgeType: 'success' },
    { label: 'deepseek-ai/DeepSeek-V3', value: 'deepseek-ai/DeepSeek-V3', badge: '通用写作', badgeType: 'primary' }
  ],
  custom: [
    { label: 'gpt-4o', value: 'gpt-4o' },
    { label: 'claude-3-7-sonnet', value: 'claude-3-7-sonnet' }
  ]
}

const currentModelOptions = computed(() => {
  return modelPresets[configForm.value.provider] || []
})

const currentProviderDesc = computed(() => {
  return providerDescriptions[configForm.value.provider] || '请输入兼容 OpenAI /v1 格式的服务端点。'
})

// 切换服务商
const handleProviderChange = (newProvider) => {
  if (providerBaseUrls[newProvider]) {
    configForm.value.baseUrl = providerBaseUrls[newProvider]
  }
  const presets = modelPresets[newProvider]
  if (presets && presets.length > 0) {
    configForm.value.model = presets[0].value
  }
  dynamicModels.value = []
  testResult.value = null
}

// 规范化 Base URL
const getCleanBaseUrl = (url) => {
  let clean = (url || '').trim()
  if (clean.endsWith('/')) {
    clean = clean.slice(0, -1)
  }
  return clean
}

// 动态拉取模型列表 (/v1/models)
const fetchModelsList = async () => {
  if (!configForm.value.baseUrl) {
    ElMessage.warning('请先输入 Base URL！')
    return
  }

  const cleanBase = getCleanBaseUrl(configForm.value.baseUrl)
  const modelsUrl = `${cleanBase}/models`
  
  fetchingModels.value = true
  dynamicModels.value = []

  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (configForm.value.apiKey) {
      headers['Authorization'] = `Bearer ${configForm.value.apiKey}`
    }
    if (configForm.value.provider === 'openrouter') {
      headers['HTTP-Referer'] = window.location.origin
      headers['X-Title'] = 'StudyPath English Writing'
    }

    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errText.slice(0, 150)}`)
    }

    const data = await response.json()
    const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [])
    
    if (list.length === 0) {
      ElMessage.warning('接口响应成功，但返回的模型列表为空')
      return
    }

    // 格式化并排序（将多模态、前沿模型靠前）
    const mapped = list.map(item => {
      const id = typeof item === 'string' ? item : item.id
      return { label: id, value: id }
    })

    // 去重
    const unique = []
    const seen = new Set()
    for (const m of mapped) {
      if (!seen.has(m.value)) {
        seen.add(m.value)
        unique.push(m)
      }
    }

    // 排序：包含 claude, gpt-4, gemini, vl, r1 的靠前
    unique.sort((a, b) => {
      const score = (str) => {
        const s = str.toLowerCase()
        if (s.includes('claude-3-7')) return 100
        if (s.includes('claude-3-5')) return 90
        if (s.includes('gpt-4o')) return 85
        if (s.includes('gemini-2')) return 80
        if (s.includes('vl') || s.includes('vision')) return 75
        if (s.includes('r1')) return 70
        return 0
      }
      return score(b.value) - score(a.value)
    })

    dynamicModels.value = unique
    ElMessage.success(`成功从云端端点拉取到 ${unique.length} 个可用模型！`)
  } catch (err) {
    console.error('拉取模型失败:', err)
    ElMessage.error(`拉取模型列表失败: ${err.message}`)
  } finally {
    fetchingModels.value = false
  }
}

// 真实端点连通性测试 (发送最小测试 Payload)
const testConnection = async () => {
  if (!configForm.value.baseUrl) {
    ElMessage.warning('请先输入 Base URL！')
    return
  }
  if (!configForm.value.apiKey && configForm.value.provider !== 'custom') {
    ElMessage.warning('请输入 API Key 凭据后再进行连通性测试！')
    return
  }

  testing.value = true
  testResult.value = null
  const startTime = Date.now()

  try {
    const cleanBase = getCleanBaseUrl(configForm.value.baseUrl)
    const targetModel = configForm.value.model || 'gpt-4o'
    
    // 如果是 Claude 原生端点
    if (configForm.value.provider === 'claude') {
      const endpoint = `${cleanBase}/messages`
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': configForm.value.apiKey,
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: targetModel,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Ping' }]
        })
      })

      const latency = Date.now() - startTime
      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(`HTTP ${resp.status}: ${text.slice(0, 200)}`)
      }

      const data = await resp.json()
      testResult.value = {
        status: 'success',
        title: 'Anthropic 端点测试成功！',
        latency,
        message: `模型响应正常，返回 Token 数: ${data.usage?.output_tokens || 1}`
      }
      saveConfig()
      ElMessage.success(`Claude 连通测试通过！延迟 ${latency}ms`)
      return
    }

    // 标准 OpenAI /v1/chat/completions 兼容测试
    const endpoint = `${cleanBase}/chat/completions`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${configForm.value.apiKey}`
    }

    if (configForm.value.provider === 'openrouter') {
      headers['HTTP-Referer'] = window.location.origin
      headers['X-Title'] = 'StudyPath English Writing'
    }

    const payload = {
      model: targetModel,
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 8
    }

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    const latency = Date.now() - startTime

    if (!resp.ok) {
      const errText = await resp.text()
      throw new Error(`HTTP ${resp.status}: ${errText.slice(0, 200)}`)
    }

    const data = await resp.json()
    const reply = data.choices?.[0]?.message?.content || 'Pong'

    testResult.value = {
      status: 'success',
      title: 'API 接口连通性测试通过！',
      latency,
      message: `目标模型 [${targetModel}] 响应成功 (耗时 ${latency}ms): "${reply.trim()}"`
    }
    saveConfig()
    ElMessage.success(`连接成功！往返耗时 ${latency}ms`)
  } catch (err) {
    console.error('测试连通性出错:', err)
    const latency = Date.now() - startTime
    testResult.value = {
      status: 'error',
      title: '连通性测试未通过',
      latency,
      message: err.message || '网络请求超时或跨域被阻止'
    }
    ElMessage.error(`连通失败：${err.message}`)
  } finally {
    testing.value = false
  }
}

// 页面挂载时载入本地配置
onMounted(() => {
  const saved = localStorage.getItem('ai_api_config')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      configForm.value = { ...defaultConfig, ...parsed }
    } catch (e) {}
  }
})

// 保存配置
const saveConfig = () => {
  localStorage.setItem('ai_api_config', JSON.stringify(configForm.value))
  ElMessage.success('配置已成功持久化至浏览器 LocalStorage！')
}

// 重置默认
const resetDefaults = () => {
  configForm.value = { ...defaultConfig }
  dynamicModels.value = []
  testResult.value = null
  saveConfig()
  ElMessage.info('已恢复为 OpenRouter 推荐配置！')
}

// 快捷跳转
const goCorrection = () => {
  emit('switch-section', 'corr2-1')
}
</script>

<style scoped>
.ai-config-container {
  max-width: 860px;
  margin: 0 auto;
}

.config-card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  background: #ffffff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #f1f5f9;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.header-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.header-desc {
  margin: 6px 0 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: #64748b;
}

.config-form {
  margin-top: 8px;
}

/* 服务商单选组网格美化 */
.provider-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.provider-radio-group :deep(.el-radio-button) {
  margin: 0 !important;
}

.provider-radio-group :deep(.el-radio-button__inner) {
  border-radius: 8px !important;
  border: 1px solid #e2e8f0 !important;
  padding: 8px 14px;
  height: auto;
  box-shadow: none !important;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.provider-radio-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: #ffffff !important;
}

.radio-label-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.provider-name {
  font-weight: 600;
  font-size: 13px;
}

.provider-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: normal;
}

.provider-tag.danger {
  background: #fef2f2;
  color: #ef4444;
}

.provider-radio-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner .provider-tag.danger) {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.provider-tag.primary {
  background: #eff6ff;
  color: #3b82f6;
}

.provider-tag.success {
  background: #f0fdf4;
  color: #10b981;
}

.provider-tag.warning {
  background: #fffbeb;
  color: #f59e0b;
}

.provider-tag.info {
  background: #f1f5f9;
  color: #64748b;
}

.input-prepend-text {
  font-weight: 600;
  color: #475569;
  font-size: 12px;
}

.field-hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
  line-height: 1.4;
}

.security-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #059669;
}

.model-select-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.model-select {
  flex: 1;
}

.model-option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.test-btn {
  flex-shrink: 0;
}

/* 连通测试结果反馈框 */
.test-result-box {
  margin: 16px 0;
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.test-result-box.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.test-result-box.error {
  background: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}

.test-result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
}

.test-latency {
  margin-left: auto;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
}

.test-detail {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.5;
  word-break: break-all;
}

/* 高级折叠面板 */
.advanced-collapse {
  margin: 20px 0;
  border: none;
}

.advanced-collapse :deep(.el-collapse-item__header) {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  border-bottom: none;
}

.advanced-collapse :deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

.advanced-params-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-top: 8px;
}

@media (max-width: 768px) {
  .ai-config-container {
    padding: 0 4px !important;
  }

  .card-header {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 12px !important;
  }

  .card-header .el-button {
    width: 100% !important;
    justify-content: center !important;
  }

  .header-title {
    font-size: 18px !important;
  }

  .header-desc {
    font-size: 12px !important;
  }

  .preset-provider-grid {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }

  .advanced-params-grid {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }

  .form-actions {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 10px !important;
  }

  .form-actions .el-button {
    width: 100% !important;
    margin-left: 0 !important;
  }

  .test-status-box {
    padding: 12px !important;
    font-size: 12px !important;
  }
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}
</style>
