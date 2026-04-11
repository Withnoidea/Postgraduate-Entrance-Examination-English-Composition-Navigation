<template>
  <div class="app-container">
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <el-aside width="280px" class="sidebar" :class="{ 'mobile-visible': sidebarVisible }">
        <div class="sidebar-header">
          <h2>📚 考研英语作文背诵</h2>
        </div>
        
        <el-scrollbar class="sidebar-content">
          <el-menu
            :default-active="activeMenu"
            :default-openeds="defaultOpeneds"
            class="chapter-menu"
            @select="handleMenuSelect"
          >
            <el-sub-menu
              v-for="chapter in chapters"
              :key="chapter.id"
              :index="chapter.id"
            >
              <template #title>
                <el-icon><component :is="getChapterIcon(chapter.icon)" /></el-icon>
                <span>{{ chapter.title }}</span>
              </template>
              
              <el-menu-item
                v-for="section in chapter.sections"
                :key="section.id"
                :index="section.id"
              >
                <span>{{ section.title }}</span>
                <el-tag
                  v-if="section.type === 'practice'"
                  size="small"
                  type="success"
                  effect="plain"
                  class="menu-tag"
                >
                  练习
                </el-tag>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content">
        <!-- 移动端顶部导航栏 -->
        <div v-if="isMobile" class="mobile-header">
          <div class="mobile-logo">📚 考研英语背诵</div>
          <el-button class="menu-toggle" type="primary" :icon="Menu" circle @click="toggleSidebar" />
        </div>
        
        <!-- 侧边栏遮罩层 -->
        <div v-if="isMobile && sidebarVisible" class="sidebar-overlay" @click="toggleSidebar"></div>
        
        <!-- 欢迎页面 -->
        <div v-if="!currentSection" class="welcome-section">
          <el-empty description="请从左侧选择章节开始学习">
            <template #image>
              <el-icon :size="100" color="#4facfe"><Reading /></el-icon>
            </template>
          </el-empty>
        </div>

        <!-- 内容区域 -->
        <div v-else class="content-section">
          <!-- 页面标题 -->
          <div class="page-header">
            <h1>{{ currentSection.title }}</h1>
            <el-tag :type="getSectionTypeTag(currentSection.type)" size="large" effect="dark">
              {{ getSectionTypeText(currentSection.type) }}
            </el-tag>
          </div>

          <!-- 练习模式 -->
          <div v-if="currentSection.type === 'practice' && currentSection.id !== 'corr2-1'" class="practice-content">
            <!-- 上传区域 -->
            <div v-if="!hasLoadedContent" class="upload-section">
              <el-card shadow="hover">
                <el-upload
                  ref="uploadRef"
                  class="upload-demo"
                  drag
                  :auto-upload="false"
                  :show-file-list="false"
                  accept=".txt"
                  @change="handleFileChange"
                >
                  <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <template #tip>
                    <div class="el-upload__tip">只能上传 .txt 格式的文件</div>
                  </template>
                </el-upload>

                <el-divider content-position="center">或</el-divider>

                <el-button type="primary" size="large" @click="loadBuiltinTemplate" :loading="loading">
                  <el-icon><Reading /></el-icon>
                  使用内置模板
                </el-button>

                <div v-if="fileInfo" class="file-info" :class="{ success: fileSuccess, error: fileError }">
                  {{ fileInfo }}
                </div>
              </el-card>
            </div>

            <!-- 练习内容 -->
            <div v-else class="practice-area">
              <!-- 进度条 -->
              <el-progress
                :percentage="progressPercentage"
                :stroke-width="8"
                :color="progressColor"
                class="progress-bar"
              />

              <!-- 模式切换 -->
              <div class="mode-switch">
                <el-radio-group v-model="practiceMode" size="large" @change="handleModeChange">
                  <el-radio-button value="recite">
                    <el-icon><Reading /></el-icon>
                    背诵模式
                  </el-radio-button>
                  <el-radio-button value="dictation">
                    <el-icon><Edit /></el-icon>
                    默写模式
                  </el-radio-button>
                </el-radio-group>
              </div>

              <!-- 句子显示 -->
              <div class="sentence-container">
                <el-card class="sentence-card">
                  <div class="sentence-number">句子 {{ currentSentence.number }}</div>
                  <div class="chinese-text">{{ currentSentence.chinese }}</div>
                  
                  <!-- 背诵模式：直接显示英文 -->
                  <div v-if="practiceMode === 'recite'" class="english-answer">
                    <el-alert title="英文句子" type="success" :closable="false">
                      <div class="answer-text">{{ currentSentence.english }}</div>
                    </el-alert>
                  </div>

                  <!-- 默写模式：输入区域 -->
                  <template v-if="practiceMode === 'dictation'">
                    <!-- 英文答案（完成后显示） -->
                    <div v-if="showAnswer" class="english-answer">
                      <el-alert title="正确答案" type="success" :closable="false">
                        <div class="answer-text">{{ currentSentence.english }}</div>
                      </el-alert>
                    </div>

                    <!-- 输入区域 -->
                    <el-input
                      v-model="userInput"
                      type="textarea"
                      :rows="6"
                      placeholder="在此输入英文句子..."
                      class="input-textarea"
                      @input="handleInput"
                      @keydown="handleKeyDown"
                      ref="inputRef"
                    />

                    <!-- 比对结果 -->
                    <div v-if="showResult" class="result-section">
                      <el-alert title="比对结果" type="info" :closable="false">
                        <div class="result-legend">
                          <span class="legend-item correct">✓ 绿色 = 正确</span>
                          <span class="legend-item incorrect">✗ 红色 = 错误</span>
                          <span class="legend-item missing">○ 黄色 = 缺失</span>
                        </div>
                        <div class="result-text" v-html="highlightedResult"></div>
                      </el-alert>
                    </div>
                  </template>
                </el-card>
              </div>

              <!-- 统计信息 -->
              <div class="stats-container">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-statistic title="准确率" :value="accuracy">
                      <template #suffix>%</template>
                    </el-statistic>
                  </el-col>
                  <el-col :span="8">
                    <el-statistic title="完成度" :value="completion">
                      <template #suffix>%</template>
                    </el-statistic>
                  </el-col>
                  <el-col :span="8">
                    <el-statistic title="错误数" :value="errors" />
                  </el-col>
                </el-row>
              </div>

              <!-- 控制按钮 -->
              <div class="controls">
                <el-button type="info" @click="previousSentence" :disabled="currentIndex === 0">
                  <el-icon><ArrowLeft /></el-icon>
                  上一个
                </el-button>
                <!-- 默写模式下显示这些按钮 -->
                <template v-if="practiceMode === 'dictation'">
                  <el-button type="danger" @click="resetInput">
                    <el-icon><RefreshLeft /></el-icon>
                    清空输入
                  </el-button>
                  <el-button type="success" @click="checkAnswer">
                    <el-icon><Check /></el-icon>
                    完成
                  </el-button>
                </template>
                <el-button type="primary" @click="nextSentence" :disabled="currentIndex === sentences.length - 1">
                  下一个
                  <el-icon><ArrowRight /></el-icon>
                </el-button>
                <el-button type="warning" @click="reuploadFile">
                  <el-icon><Upload /></el-icon>
                  重新上传
                </el-button>
              </div>
            </div>
          </div>

          <!-- AI智能批改 -->
          <div v-if="currentSection.id === 'corr2-1'" class="ai-correction">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <h2>🤖 AI智能批改</h2>
                </div>
              </template>
              <div class="ai-correction-body">
                <el-alert
                  title="上传作文（支持图片和文本）"
                  type="success"
                  :closable="false"
                  show-icon
                  style="margin-bottom: 20px;"
                >
                  支持上传作文图片（PNG、JPG）或文本文件（TXT），系统将根据考研英语评分标准进行智能批改。
                </el-alert>

                <!-- 上传区域 -->
                <div v-if="!aiEssayForm.content" class="ai-upload-section">
                  <el-upload
                    ref="aiUploadRef"
                    class="ai-upload-demo"
                    drag
                    :auto-upload="false"
                    :show-file-list="false"
                    accept=".txt,.png,.jpg,.jpeg"
                    @change="handleAIFileChange"
                  >
                    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <template #tip>
                      <div class="el-upload__tip">支持上传 .txt 文本文件或 .png/.jpg 图片文件</div>
                    </template>
                  </el-upload>

                  <el-divider content-position="center">或</el-divider>

                  <el-button type="primary" size="large" @click="showTextInput" style="width: 100%;">
                    <el-icon><Edit /></el-icon>
                    手动输入作文
                  </el-button>
                </div>

                <!-- 文本输入区域 -->
                <div v-else class="ai-text-input">
                  <el-form :model="aiEssayForm" label-width="100px" :rules="aiFormRules" ref="aiFormRef">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="考试类型" prop="type">
                          <el-select v-model="aiEssayForm.type" placeholder="请选择" style="width: 100%;">
                            <el-option label="英语一" value="english1" />
                            <el-option label="英语二" value="english2" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="作文年份" prop="year">
                          <el-select v-model="aiEssayForm.year" placeholder="请选择年份" style="width: 100%;" filterable>
                            <el-option v-for="year in availableYears" :key="year" :label="year + '年'" :value="year" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="作文类别" prop="category">
                          <el-select v-model="aiEssayForm.category" placeholder="请选择类别" style="width: 100%;">
                            <el-option label="小作文（应用文）" value="application" />
                            <el-option label="大作文（图画/图表）" value="essay" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="作文题型" prop="essayType" v-if="aiEssayForm.category === 'essay'">
                          <el-select v-model="aiEssayForm.essayType" placeholder="请选择题型" style="width: 100%;">
                            <el-option label="图画作文" value="picture" v-if="aiEssayForm.type === 'english1'" />
                            <el-option label="图表作文" value="chart" v-if="aiEssayForm.type === 'english2'" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    
                    <el-form-item label="作文题目">
                      <el-input v-model="aiEssayForm.title" placeholder="请输入作文题目（可选）" />
                    </el-form-item>
                    
                    <el-form-item label="作文内容" prop="content">
                      <el-input
                        v-model="aiEssayForm.content"
                        type="textarea"
                        :rows="15"
                        placeholder="请输入你的作文内容..."
                        show-word-limit
                        maxlength="1000"
                      />
                    </el-form-item>
                  </el-form>
                  
                  <el-alert type="info" :closable="false" style="margin-bottom: 15px;">
                    <template #title>
                      <strong>📋 评分标准说明</strong>
                    </template>
                    <div style="margin-top: 8px;">
                      <p style="margin: 5px 0;">• <strong>内容</strong>：符合作文考查主题，不能偏题、瞎写乱写</p>
                      <p style="margin: 5px 0;">• <strong>结构</strong>：符合应用文/正常文体格式要求；结构层次清晰</p>
                      <p style="margin: 5px 0;">• <strong>语言</strong>：词汇拼写正确、优美高级；句子无语法错误、句式多样</p>
                    </div>
                  </el-alert>

                  <el-button type="primary" @click="performAICorrection" :loading="aiCorrectionLoading" style="width: 100%;" size="large">
                    <el-icon><Check /></el-icon>
                    {{ aiCorrectionLoading ? '正在批改中...' : '开始智能批改' }}
                  </el-button>
                </div>

                <!-- 批改结果 -->
                <div v-if="aiCorrectionResult" class="ai-result">
                  <el-divider />
                  
                  <div class="result-header">
                    <el-icon :size="24" color="#4facfe"><DataAnalysis /></el-icon>
                    <h3>批改结果</h3>
                  </div>
                  
                  <el-card shadow="hover" class="result-card">
                    <div class="result-content" v-html="aiCorrectionResult"></div>
                  </el-card>
                  
                  <div class="result-actions">
                    <el-button type="success" size="large" @click="exportAIResult">
                      <el-icon><Download /></el-icon>
                      导出批改结果
                    </el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- API设置 -->
          <div v-if="currentSection.id === 'corr2-2'" class="api-settings">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <h2>⚙️ API设置</h2>
                </div>
              </template>
              <div class="api-settings-body">
                <el-alert
                  title="API Key配置"
                  type="info"
                  :closable="false"
                  show-icon
                  style="margin-bottom: 20px;"
                >
                  请选择AI服务提供商并输入API Key。API Key将保存在本地浏览器中，不会上传到服务器。
                </el-alert>

                <el-form :model="apiConfig" label-width="120px">
                  <el-form-item label="API提供商">
                    <el-select v-model="apiConfig.provider" placeholder="请选择API提供商" @change="handleProviderChange">
                      <el-option label="通义千问（阿里云）" value="qwen" />
                      <el-option label="OpenAI" value="openai" />
                      <el-option label="智增增" value="zhizengzeng" />
                      <el-option label="DeepSeek" value="deepseek" />
                      <el-option label="Kimi（月之暗面）" value="kimi" />
                      <el-option label="Claude" value="claude" />
                      <el-option label="自定义" value="custom" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Base URL">
                    <el-input v-model="apiConfig.baseUrl" placeholder="API基础地址" :disabled="apiConfig.provider !== 'custom'">
                      <template #append>
                        <el-button @click="apiConfig.provider = 'custom'">自定义</el-button>
                      </template>
                    </el-input>
                    <div style="font-size: 12px; color: #909399; margin-top: 5px;">
                      当前：{{ apiConfig.baseUrl }}
                    </div>
                  </el-form-item>
                  <el-form-item label="API Key">
                    <el-input v-model="apiConfig.apiKey" type="password" placeholder="请输入API Key" show-password />
                  </el-form-item>
                  <el-form-item label="模型名称">
                    <el-select v-model="apiConfig.model" placeholder="请选择模型" filterable allow-create>
                      <!-- 通义千问模型 -->
                      <el-option-group v-if="apiConfig.provider === 'qwen'" label="Qwen Omni系列（全模态✅）">
                        <el-option label="qwen-omni-plus（图文✅）" value="qwen-omni-plus" />
                        <el-option label="qwen-omni-turbo（图文✅）" value="qwen-omni-turbo" />
                        <el-option label="qwen-omni-lite（图文✅）" value="qwen-omni-lite" />
                      </el-option-group>
                      <el-option-group v-if="apiConfig.provider === 'qwen'" label="Qwen VL系列（图文✅）">
                        <el-option label="qwen-vl-max（图文）" value="qwen-vl-max" />
                        <el-option label="qwen-vl-plus（图文）" value="qwen-vl-plus" />
                      </el-option-group>
                      <el-option-group v-if="apiConfig.provider === 'qwen'" label="Qwen 文本系列">
                        <el-option label="qwen-turbo（快速）" value="qwen-turbo" />
                        <el-option label="qwen-plus（增强）" value="qwen-plus" />
                        <el-option label="qwen-max（最强）" value="qwen-max" />
                        <el-option label="qwen-long（长文本）" value="qwen-long" />
                      </el-option-group>
                      <!-- OpenAI模型 -->
                      <el-option-group v-if="apiConfig.provider === 'openai'" label="GPT-4 系列（支持图文）">
                        <el-option label="gpt-4o（最新多模态）" value="gpt-4o" />
                        <el-option label="gpt-4o-mini（轻量多模态）" value="gpt-4o-mini" />
                        <el-option label="gpt-4-turbo（快速）" value="gpt-4-turbo" />
                        <el-option label="gpt-4（标准）" value="gpt-4" />
                      </el-option-group>
                      <el-option-group v-if="apiConfig.provider === 'openai'" label="GPT-3.5 系列">
                        <el-option label="gpt-3.5-turbo（快速经济）" value="gpt-3.5-turbo" />
                        <el-option label="gpt-3.5-turbo-16k（长文本）" value="gpt-3.5-turbo-16k" />
                      </el-option-group>
                      <!-- 智增增模型 -->
                      <el-option-group v-if="apiConfig.provider === 'zhizengzeng'" label="智增增模型">
                        <el-option label="gpt-4o（图文）" value="gpt-4o" />
                        <el-option label="gpt-4o-mini（图文）" value="gpt-4o-mini" />
                        <el-option label="gpt-4-turbo" value="gpt-4-turbo" />
                        <el-option label="gpt-3.5-turbo" value="gpt-3.5-turbo" />
                        <el-option label="claude-3-opus（图文）" value="claude-3-opus-20240229" />
                        <el-option label="claude-3-sonnet（图文）" value="claude-3-sonnet-20240229" />
                        <el-option label="gemini-pro（图文）" value="gemini-pro" />
                      </el-option-group>
                      <!-- DeepSeek模型 -->
                      <el-option-group v-if="apiConfig.provider === 'deepseek'" label="DeepSeek模型">
                        <el-option label="deepseek-chat（对话）" value="deepseek-chat" />
                        <el-option label="deepseek-coder（代码）" value="deepseek-coder" />
                        <el-option label="deepseek-reasoner（推理）" value="deepseek-reasoner" />
                      </el-option-group>
                      <!-- Kimi模型 -->
                      <el-option-group v-if="apiConfig.provider === 'kimi'" label="Kimi模型">
                        <el-option label="moonshot-v1-8k" value="moonshot-v1-8k" />
                        <el-option label="moonshot-v1-32k（长文本）" value="moonshot-v1-32k" />
                        <el-option label="moonshot-v1-128k（超长文本）" value="moonshot-v1-128k" />
                      </el-option-group>
                      <!-- Claude模型 -->
                      <el-option-group v-if="apiConfig.provider === 'claude'" label="Claude模型（支持图文）">
                        <el-option label="claude-3-opus（最强）" value="claude-3-opus-20240229" />
                        <el-option label="claude-3-sonnet（平衡）" value="claude-3-sonnet-20240229" />
                        <el-option label="claude-3-haiku（快速）" value="claude-3-haiku-20240307" />
                        <el-option label="claude-3.5-sonnet（最新）" value="claude-3-5-sonnet-20241022" />
                      </el-option-group>
                      <!-- 自定义 -->
                      <el-option-group v-if="apiConfig.provider === 'custom'" label="自定义模型">
                        <el-option label="自定义模型名称" value="custom-model" />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-form>
                
                <el-collapse style="margin-top: 15px;">
                  <el-collapse-item title="📊 模型说明与图文支持" name="model-info">
                    <el-descriptions :column="1" border size="small">
                      <el-descriptions-item label="✅ 支持图文">
                        <strong>OpenAI</strong>：gpt-4o、gpt-4o-mini<br>
                        <strong>Claude</strong>：claude-3/3.5全系列<br>
                        <strong>智增增</strong>：gpt-4o、claude-3、gemini<br>
                        <strong>通义千问</strong>：qwen-omni系列、qwen-vl系列
                      </el-descriptions-item>
                      <el-descriptions-item label="❌ 仅文本">
                        <strong>DeepSeek</strong>：deepseek-chat/coder<br>
                        <strong>Kimi</strong>：moonshot-v1系列<br>
                        <strong>通义千问</strong>：qwen-turbo/plus/max/long
                      </el-descriptions-item>
                      <el-descriptions-item label="💰 性价比推荐">
                        <strong>通义千问</strong>：omni系列有免费额度<br>
                        <strong>DeepSeek</strong>：极便宜，效果不错<br>
                        <strong>Kimi</strong>：免费额度，长文本强
                      </el-descriptions-item>
                      <el-descriptions-item label="🎯 批改推荐">
                        <strong>文本批改</strong>：qwen-turbo、DeepSeek<br>
                        <strong>图文批改</strong>：qwen-omni-plus、gpt-4o-mini
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-collapse-item>
                </el-collapse>

                <el-button type="primary" @click="saveAPIConfig">保存配置</el-button>
                <el-button @click="testAPIConnection" :loading="apiTestLoading">测试连接</el-button>
              </div>
            </el-card>
          </div>

          <!-- 信息展示内容 -->
          <div v-if="currentSection.type === 'info'" class="info-content">
            <!-- 欢迎使用 -->
            <div v-if="currentSection.id === 'start-1'" class="info-card">
              <el-card shadow="hover">
                <h2>🎉 欢迎使用考研英语作文背诵系统</h2>
                <p>本系统专为考研英语作文备考设计，帮助您高效背诵和练习作文模板句型。</p>
                
                <el-divider />
                
                <h3>📚 系统特色</h3>
                <ul>
                  <li><strong>句子背诵</strong>：中英文对照，实时比对输入结果</li>
                  <li><strong>多种题型</strong>：涵盖应用文、图画作文、图表作文等</li>
                  <li><strong>智能批改</strong>：AI辅助作文批改，给出专业评分建议</li>
                  <li><strong>进度追踪</strong>：实时统计准确率和完成度</li>
                </ul>
                
                <el-divider />
                
                <h3>🚀 快速开始</h3>
                <ol>
                  <li>从左侧菜单选择章节</li>
                  <li>上传自定义模板或使用内置模板</li>
                  <li>根据中文提示输入英文句子</li>
                  <li>查看比对结果，纠正错误</li>
                </ol>
              </el-card>
            </div>
            
            <!-- 使用指南 -->
            <div v-if="currentSection.id === 'start-2'" class="info-card">
              <el-card shadow="hover">
                <h2>📖 使用指南</h2>
                
                <el-collapse>
                  <el-collapse-item title="1️⃣ 如何开始背诵练习？" name="1">
                    <p>选择左侧菜单中的任意练习章节（带有"练习"标签），然后：</p>
                    <ol>
                      <li>点击"使用内置模板"加载预设句子</li>
                      <li>或上传自己准备的 .txt 格式模板文件</li>
                      <li>根据显示的中文句子，在输入框中输入对应的英文</li>
                      <li>点击"完成"查看比对结果</li>
                    </ol>
                  </el-collapse-item>
                  
                  <el-collapse-item title="2️⃣ 模板文件格式要求" name="2">
                    <p>模板文件应为 .txt 格式，每句格式如下：</p>
                    <pre>1,中文翻译
英文原句

2,中文翻译
英文原句</pre>
                    <p>注意：中文行以数字和逗号开头，英文可以跨多行。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="3️⃣ 如何使用AI智能批改？" name="3">
                    <ol>
                      <li>选择"作文批改2" → "智能批改"</li>
                      <li>上传作文文件（支持 .txt、.png、.jpg）</li>
                      <li>或手动输入作文内容</li>
                      <li>选择作文类型和类别</li>
                      <li>点击"开始智能批改"</li>
                    </ol>
                    <el-alert type="warning" :closable="false" style="margin-top: 10px;">
                      使用AI批改前，请先在"API设置"中配置API Key。
                    </el-alert>
                  </el-collapse-item>
                  
                  <el-collapse-item title="4️⃣ 快捷键说明" name="4">
                    <ul>
                      <li><kbd>Ctrl + →</kbd> 或 <kbd>Ctrl + N</kbd>：下一个句子</li>
                      <li><kbd>Ctrl + ←</kbd> 或 <kbd>Ctrl + P</kbd>：上一个句子</li>
                      <li><kbd>Ctrl + R</kbd>：清空输入</li>
                      <li><kbd>Tab</kbd>：插入空格</li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
            </div>
            
            <!-- 功能说明 -->
            <div v-if="currentSection.id === 'start-3'" class="info-card">
              <el-card shadow="hover">
                <h2>⚙️ 功能说明</h2>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="句子背诵">
                    根据中文提示输入英文句子，系统实时比对并高亮显示正确、错误和缺失部分。
                  </el-descriptions-item>
                  <el-descriptions-item label="进度统计">
                    显示当前句子的准确率、完成度和错误数量，帮助您了解学习进度。
                  </el-descriptions-item>
                  <el-descriptions-item label="AI智能批改">
                    基于考研英语评分标准，AI自动批改作文，给出分数和改进建议。
                  </el-descriptions-item>
                  <el-descriptions-item label="多题型支持">
                    支持应用文、图画作文、图表作文、文字作文等多种题型练习。
                  </el-descriptions-item>
                  <el-descriptions-item label="自定义模板">
                    支持上传自定义模板文件，灵活扩展学习内容。
                  </el-descriptions-item>
                </el-descriptions>
              </el-card>
            </div>
            
            <!-- 评分标准 -->
            <div v-if="currentSection.id === 'corr-1'" class="info-card">
              <el-card shadow="hover">
                <h2>📊 考研英语写作评分标准</h2>
                
                <el-divider content-position="left">一、评分维度</el-divider>
                
                <el-table :data="gradingStandards" stripe style="width: 100%">
                  <el-table-column prop="dimension" label="评分维度" width="120" />
                  <el-table-column prop="requirement" label="标准要求" />
                  <el-table-column prop="solution" label="解决方法" />
                </el-table>
                
                <el-divider content-position="left">二、作文给分标准</el-divider>
                
                <el-table :data="scoreStandards" stripe style="width: 100%">
                  <el-table-column prop="level" label="档位" width="150" />
                  <el-table-column prop="english1" label="英语一" width="120" />
                  <el-table-column prop="english2" label="英语二" width="120" />
                  <el-table-column prop="description" label="要求说明" />
                </el-table>
                
                <el-divider content-position="left">三、字数要求</el-divider>
                <p><strong>英语一：</strong>160-200 words（大作文满分20分）</p>
                <p><strong>英语二：</strong>at least 150 words（大作文满分15分）</p>
              </el-card>
            </div>
            
            <!-- 历年真题 -->
            <div v-if="currentSection.id === 'corr-2'" class="info-card">
              <el-card shadow="hover">
                <h2>📝 历年大作文主题一览</h2>
                
                <el-divider content-position="left">英语一 (2005-2024)</el-divider>
                
                <el-table :data="english1Topics" stripe style="width: 100%" max-height="400">
                  <el-table-column prop="year" label="年份" width="80" />
                  <el-table-column prop="topic" label="话题/主题词" />
                  <el-table-column prop="category" label="话题分类" width="120" />
                </el-table>
                
                <el-divider content-position="left">英语二 (2011-2024)</el-divider>
                
                <el-table :data="english2Topics" stripe style="width: 100%" max-height="400">
                  <el-table-column prop="year" label="年份" width="80" />
                  <el-table-column prop="topic" label="话题/主题词" />
                  <el-table-column prop="category" label="话题分类" width="120" />
                </el-table>
              </el-card>
            </div>
            
            <!-- 写作报告模板 -->
            <div v-if="currentSection.id === 'corr-3'" class="info-card">
              <el-card shadow="hover">
                <h2>📋 写作报告生成样式</h2>
                
                <el-steps :active="4" finish-status="success" simple>
                  <el-step title="整体分析" />
                  <el-step title="词汇分析" />
                  <el-step title="句型分析" />
                  <el-step title="篇章分析" />
                </el-steps>
                
                <el-divider />
                
                <el-descriptions title="1. 整体分析" :column="1" border>
                  <el-descriptions-item label="整体打分">英语一大作文满分20分；英语二大作文满分15分</el-descriptions-item>
                  <el-descriptions-item label="写作初印象">整体评价文章质量</el-descriptions-item>
                </el-descriptions>
                
                <el-descriptions title="2. 词汇分析" :column="1" border style="margin-top: 20px;">
                  <el-descriptions-item label="亮眼词">使用得当、表达地道的词汇</el-descriptions-item>
                  <el-descriptions-item label="拼写错误词">拼写有误的单词</el-descriptions-item>
                </el-descriptions>
                
                <el-descriptions title="3. 句型分析" :column="1" border style="margin-top: 20px;">
                  <el-descriptions-item label="亮眼句">结构优美、表达准确的句子</el-descriptions-item>
                  <el-descriptions-item label="语法错误句">存在语法问题的句子及修改建议</el-descriptions-item>
                </el-descriptions>
                
                <el-descriptions title="4. 篇章分析" :column="1" border style="margin-top: 20px;">
                  <el-descriptions-item label="写作框架">文章结构评价</el-descriptions-item>
                  <el-descriptions-item label="完整性">是否完整回应题目要求</el-descriptions-item>
                  <el-descriptions-item label="段落间的连贯性">连接词使用情况</el-descriptions-item>
                  <el-descriptions-item label="切题度">是否偏离主题</el-descriptions-item>
                </el-descriptions>
              </el-card>
            </div>
            
            <!-- KIMI使用指南 -->
            <div v-if="currentSection.id === 'corr-4'" class="info-card">
              <el-card shadow="hover">
                <h2>🤖 KIMI作文批改操作指南</h2>
                
                <el-steps :active="7" finish-status="success" simple>
                  <el-step title="注册" />
                  <el-step title="添加常用语" />
                  <el-step title="指令1-2" />
                  <el-step title="指令3-4" />
                  <el-step title="指令5" />
                  <el-step title="批改" />
                  <el-step title="追问" />
                </el-steps>
                
                <el-divider />
                
                <el-collapse>
                  <el-collapse-item title="第一步：注册账号" name="1">
                    <p>打开 KIMI 官网：<a href="https://kimi.moonshot.cn/" target="_blank">https://kimi.moonshot.cn/</a></p>
                    <p>使用微信或手机号注册一个用户账号。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第二步：添加常用语" name="2">
                    <p>注册完成后，点击对话框第一个图案，把指令设置为常用语。可自己命名为：指令1，指令2...</p>
                    <p>后续提问无需再复制粘贴。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第三步：复制指令1-2" name="3">
                    <p><strong>「指令1」</strong>你现在是一位考研英语的判卷考官，请认真学习《晶婷弟子班写作评分源文件》的附件，接下来你将按照这个文档中的标准来批改我的作文。</p>
                    <el-divider />
                    <p><strong>「指令2」</strong>这个是我写的英语一/二的作文。请按照文档中的："四、写作报告生成样式"帮我仔细批改这篇作文。批改结果需要生成表格。我写的作文：20xx年的英语一/二的大作文。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第四步：复制指令3-4" name="4">
                    <p><strong>「指令3」</strong>请详细告诉我作文中拼写错误的单词和语法错误的句子。同时，给出我改正后的单词和句子。</p>
                    <el-divider />
                    <p><strong>「指令4」</strong>在不改动原文意思的情况下，请帮我润色作文句子，让作文更加地道、形象。在改写过程中须注意以下几点：①注重原文的完整性和连贯性，避免过度改写导致内容失真。②充分考虑原文的语境和语义，确保改写后的文案忠于原文。③通过替换词汇、调整句式等方式，使文章更加流畅自然。④注重语言的精准性和表达的自然性。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第五步：复制指令5" name="5">
                    <p><strong>「指令5」</strong>请帮我罗列出具体改写了的点。</p>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第六步：开始批改" name="6">
                    <ol>
                      <li>上传评分标准的文档，选择"附件"按钮添加评分标准文档</li>
                      <li>在对话框中找到常用语指令1，再点击"发送"</li>
                      <li>依次输入你的作文 + 指令2</li>
                    </ol>
                  </el-collapse-item>
                  
                  <el-collapse-item title="第七步：追问" name="7">
                    <p>根据指令2结果，依次输入指令3、4、5对结果进行追问。</p>
                  </el-collapse-item>
                </el-collapse>
                
                <el-divider />
                
                <el-alert title="注意事项" type="warning" :closable="false" show-icon>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>小作文的批改因KIMI无法识别格式问题，建议直接输入单词、语法和段落指令</li>
                    <li>支持上传文档/图片/复制文字，建议使用打字文档以获得更好效果</li>
                    <li>手写图片需字迹工整，部分单词可能识别不准确</li>
                    <li>每次批改提问可以固定在同一历史会话中进行</li>
                  </ul>
                </el-alert>
              </el-card>
            </div>
          </div>

          <!-- 框架构建内容 -->
          <div v-if="currentSection.type === 'framework'" class="framework-content">
            <el-card shadow="hover">
              <h2>📐 写作框架构建</h2>
              
              <!-- 应用文框架 -->
              <div v-if="currentSection.id === 'app-1'">
                <el-divider content-position="left">应用文写作框架</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  应用文（小作文）主要包括：<strong>书信</strong>、<strong>通知/告示</strong>、<strong>备忘录/会议纪要</strong>等，满分10分，要求100词左右。
                </el-alert>
                
                <!-- 书信格式 -->
                <el-divider content-position="left">一、书信格式</el-divider>
                
                <!-- 称呼 -->
                <el-card shadow="hover" style="margin-bottom: 15px;">
                  <template #header>
                    <strong style="color: #409EFF;">【称呼 Salutation】</strong>
                  </template>
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="私人信件">
                      Dear + 名字，<br>
                      例如：<code>Dear Tom,</code> <code>Dear Mary,</code>
                    </el-descriptions-item>
                    <el-descriptions-item label="公务信函">
                      Dear + 头衔/姓氏，<br>
                      例如：<code>Dear Professor,</code> <code>Dear Mr. Smith,</code> <code>Dear Sir/Madam,</code>
                    </el-descriptions-item>
                  </el-descriptions>
                  <el-alert type="warning" :closable="false" style="margin-top: 10px;">
                    注意：称呼后必须加<strong>逗号</strong>，且单独占一行
                  </el-alert>
                </el-card>
                
                <!-- 正文 -->
                <el-card shadow="hover" style="margin-bottom: 15px;">
                  <template #header>
                    <strong style="color: #67C23A;">【正文 Body】</strong>
                  </template>
                  
                  <!-- 第一段 -->
                  <el-descriptions title="第一段（开篇点题）" :column="1" border style="margin-bottom: 15px;">
                    <el-descriptions-item label="私人信件">
                      <strong>问候 + 表明目的</strong>（不要自我介绍）<br>
                      <el-collapse style="margin-top: 10px;">
                        <el-collapse-item title="去信句型" name="go">
                          <ul style="padding-left: 20px; margin: 0;">
                            <li><code>I hope this letter/email finds you well.</code> 希望你收到此信时一切安好</li>
                            <li><code>Welcome to ***, and I hope this letter finds you well.</code></li>
                          </ul>
                        </el-collapse-item>
                        <el-collapse-item title="回信句型" name="back">
                          <ul style="padding-left: 20px; margin: 0;">
                            <li><code>Thank you for your kind letter, in which you mentioned that...</code></li>
                            <li><code>I was truly delighted/saddened to hear that...</code> 得知...我感到高兴/难过</li>
                          </ul>
                        </el-collapse-item>
                        <el-collapse-item title="表明目的" name="purpose">
                          <ul style="padding-left: 20px; margin: 0;">
                            <li><code>My purpose of this letter is to...</code> 我写这封信的目的是...（改写题干）</li>
                            <li><code>I am writing to...</code> 我写信是为了...</li>
                          </ul>
                        </el-collapse-item>
                      </el-collapse>
                    </el-descriptions-item>
                    <el-descriptions-item label="公务信函">
                      <strong>问候 + 自我介绍 + 表明目的</strong><br>
                      <el-alert type="info" :closable="false" style="margin-top: 10px;">
                        适用对象：同事、师长、领导、客户<br>
                        需要介绍自己的身份和背景，为后续交流提供明确框架
                      </el-alert>
                    </el-descriptions-item>
                  </el-descriptions>
                  
                  <!-- 第二段 -->
                  <el-descriptions title="第二段（主体内容）" :column="1" border style="margin-bottom: 15px;">
                    <el-descriptions-item label="写作要求">
                      展开具体内容，分点论述（3-5句）<br>
                      使用连接词：First, ... Second, ... Finally, ... 或 To begin with, ... Moreover, ... Last but not least, ...
                    </el-descriptions-item>
                  </el-descriptions>
                  
                  <!-- 第三段 -->
                  <el-descriptions title="第三段（结尾总结）" :column="1" border>
                    <el-descriptions-item label="常用表达">
                      <el-table :data="closingExpressionsData" border style="width: 100%;" size="small">
                        <el-table-column prop="type" label="类型" width="100" />
                        <el-table-column prop="english" label="英文表达" />
                        <el-table-column prop="chinese" label="中文说明" />
                      </el-table>
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
                
                <!-- 落款 -->
                <el-card shadow="hover" style="margin-bottom: 20px;">
                  <template #header>
                    <strong style="color: #E6A23C;">【落款 Signature Block】</strong>
                  </template>
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="结尾语">
                      首字母大写 + 逗号，单独占一行<br>
                      <el-row :gutter="10" style="margin-top: 10px;">
                        <el-col :span="8"><code>Yours sincerely,</code>（知道姓名）</el-col>
                        <el-col :span="8"><code>Yours faithfully,</code>（不知姓名）</el-col>
                        <el-col :span="8"><code>Best wishes,</code>（熟人）</el-col>
                      </el-row>
                    </el-descriptions-item>
                    <el-descriptions-item label="签名">
                      右对齐，使用题目虚构姓名（如 <code>Li Hua</code>），<strong>不可写真名</strong>
                    </el-descriptions-item>
                    <el-descriptions-item label="日期">
                      右对齐，位于签名下方<br>
                      格式：<code>May 20, 2025</code>（美式）或 <code>20 May 2025</code>（英式）
                    </el-descriptions-item>
                  </el-descriptions>
                  <el-alert type="success" :closable="false" style="margin-top: 10px;">
                    <strong>完整示例：</strong><br>
                    <pre style="margin: 5px 0;">Yours sincerely,
                    Li Hua</pre>
                  </el-alert>
                </el-card>
                
                <!-- 通知/告示格式 -->
                <el-divider content-position="left">二、通知/告示格式</el-divider>
                <el-card shadow="hover" style="margin-bottom: 20px;">
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="标题">
                      居中，首字母大写，如 <code>NOTICE</code> 或 <code>Notice</code>
                    </el-descriptions-item>
                    <el-descriptions-item label="正文第一段">
                      <strong>欢迎/问候/活动背景 + 表明目的</strong><br>
                      <ul style="padding-left: 20px; margin: 5px 0;">
                        <li><code>Welcome sb. to ***.</code> 欢迎某人来到***</li>
                        <li><code>I hope this notice finds you well.</code></li>
                        <li><code>The intention of this notice is to...</code> 这则通知的目的是...</li>
                      </ul>
                    </el-descriptions-item>
                    <el-descriptions-item label="正文第二段">
                      提供详细信息：日期、时间、地点、参与人员等
                    </el-descriptions-item>
                    <el-descriptions-item label="正文第三段">
                      鼓励参与 + 提供联系方式
                    </el-descriptions-item>
                    <el-descriptions-item label="落款">
                      右对齐，日期 + 签名（如：<code>May 20, 2025</code> 换行 <code>Students' Union</code>）
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
                
                <!-- 会议纪要格式 -->
                <el-divider content-position="left">三、会议纪要格式</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 15px;">
                  会议纪要不是流水账，应突出<strong>决策、行动、责任人、时间节点</strong>。语言需客观、简洁、准确，多用第三人称。
                </el-alert>
                <el-table :data="meetingMinutesData" border style="width: 100%">
                  <el-table-column prop="field" label="英文字段" width="150" />
                  <el-table-column prop="chinese" label="中文含义" width="120" />
                  <el-table-column prop="description" label="填写说明" />
                </el-table>
              </div>
              
              <!-- 图画作文框架 -->
              <div v-if="currentSection.id === 'pic-1'">
                <el-divider content-position="left">图画作文写作框架（英语一）</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  图画作文是英语一的特色题型，满分20分，要求160-200词。
                </el-alert>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="第一段">
                    <strong>描述图画</strong>：客观描述图画内容，揭示寓意（3-4句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第二段">
                    <strong>分析原因/意义</strong>：分析现象背后的原因或揭示其深层意义（5-7句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第三段">
                    <strong>给出建议/结论</strong>：提出个人看法、建议或展望（3-4句）
                  </el-descriptions-item>
                </el-descriptions>
                
                <el-divider content-position="left">常用描写句型</el-divider>
                <ul>
                  <li>As is vividly depicted in the cartoon...（如图画生动描绘的那样...）</li>
                  <li>The cartoon portrays a scene where...（这幅漫画描绘了一个...的场景）</li>
                  <li>What looks beyond dispute is that...（毫无疑问的是...）</li>
                </ul>
                
                <el-divider content-position="left">常用分析句型</el-divider>
                <ul>
                  <li>Why does this phenomenon arise? Several factors account for this.（为什么会出现这种现象？有几个因素可以解释。）</li>
                  <li>The reasons can be listed as follows.（原因可以列举如下。）</li>
                  <li>This phenomenon is closely related to...（这一现象与...密切相关。）</li>
                </ul>
              </div>
              
              <!-- 图表作文框架 -->
              <div v-if="currentSection.id === 'chart-1'">
                <el-divider content-position="left">图表作文写作框架（英语二）</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  图表作文是英语二的特色题型，满分15分，要求至少150词。
                </el-alert>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="第一段">
                    <strong>描述图表</strong>：客观描述图表数据和变化趋势（3-4句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第二段">
                    <strong>分析原因</strong>：分析数据变化的原因（5-6句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第三段">
                    <strong>总结趋势/预测</strong>：总结发展趋势或给出建议（2-3句）
                  </el-descriptions-item>
                </el-descriptions>
                
                <el-divider content-position="left">常用描述句型</el-divider>
                <ul>
                  <li>As is shown in the chart, there is a dramatic increase in...（如图表所示，...大幅增加）</li>
                  <li>According to the chart, the number of... has been on the rise.（根据图表，...的数量一直在上升）</li>
                  <li>From the chart, we can clearly see that...（从图表中我们可以清楚地看到...）</li>
                </ul>
                
                <el-divider content-position="left">常用趋势词汇</el-divider>
                <ul>
                  <li><strong>上升</strong>：increase, rise, grow, climb, ascend</li>
                  <li><strong>下降</strong>：decrease, decline, drop, fall, descend</li>
                  <li><strong>稳定</strong>：remain stable, stay steady, level off</li>
                  <li><strong>波动</strong>：fluctuate, vary, oscillate</li>
                </ul>
              </div>
              
              <!-- 文字作文框架 -->
              <div v-if="currentSection.id === 'text-1'">
                <el-divider content-position="left">文字作文写作框架</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  文字作文要求根据给定的文字材料写作，重点在于提炼观点并展开论述。
                </el-alert>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="第一段">
                    <strong>引出话题</strong>：引用材料，引出讨论主题（2-3句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第二段">
                    <strong>阐述观点</strong>：分析问题，表达自己的观点（5-7句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第三段">
                    <strong>总结升华</strong>：重申观点，给出建议或展望（2-3句）
                  </el-descriptions-item>
                </el-descriptions>
                
                <el-divider content-position="left">常用开头句型</el-divider>
                <ul>
                  <li>Recently, the issue of... has aroused wide concern.（最近，...的问题引起了广泛关注）</li>
                  <li>It is generally believed that...（人们普遍认为...）</li>
                  <li>There is a growing concern over...（人们越来越关注...）</li>
                </ul>
              </div>
              
              <!-- 混合型作文框架 -->
              <div v-if="currentSection.id === 'mixed-1'">
                <el-divider content-position="left">混合型作文写作框架</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  混合型作文可能包含图画+文字、图表+文字等多种形式，需要灵活应对。
                </el-alert>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="第一段">
                    <strong>描述材料</strong>：描述图画/图表，引用文字材料（3-4句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第二段">
                    <strong>分析论证</strong>：结合材料分析问题，展开论述（5-7句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第三段">
                    <strong>总结建议</strong>：总结观点，提出建议或措施（2-3句）
                  </el-descriptions-item>
                </el-descriptions>
                
                <el-alert type="warning" :closable="false" style="margin-top: 20px;">
                  <strong>写作提示：</strong>混合型作文需要综合运用多种写作技巧，注意图画/图表与文字材料的有机结合。
                </el-alert>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
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
} from '@element-plus/icons-vue'
import { chapters, findSection } from './chapters.js'

// 章节导航
const activeMenu = ref('')
const defaultOpeneds = ref(['chapter-start'])
const currentSection = ref(null)

// 移动端控制
const sidebarVisible = ref(false)
const isMobile = ref(false)

// 练习相关
const sentences = ref([])
const currentIndex = ref(0)
const userInput = ref('')
const showAnswer = ref(false)
const showResult = ref(false)
const highlightedResult = ref('')
const hasLoadedContent = ref(false)
const loading = ref(false)
const fileInfo = ref('')
const fileSuccess = ref(false)
const fileError = ref(false)

// 背诵/默写模式：背诵模式默认显示中英文，默写模式只显示中文
const practiceMode = ref('recite') // 'recite' 背诵模式 | 'dictation' 默写模式

// 统计数据
const accuracy = ref(0)
const completion = ref(0)
const errors = ref(0)

// 输入框引用
const inputRef = ref(null)

// AI批改相关
const aiEssayForm = ref({
  type: 'english1',
  year: '2024',
  category: 'application',
  essayType: '',
  title: '',
  content: '',
  imageData: null,  // 图片的base64数据
  imageName: ''     // 图片文件名
})
const aiCorrectionResult = ref('')
const aiCorrectionLoading = ref(false)
const aiFileInfo = ref('')
const aiFileSuccess = ref(false)
const aiFileError = ref(false)
const aiFormRef = ref(null)

// 表单验证规则
const aiFormRules = {
  type: [{ required: true, message: '请选择考试类型', trigger: 'change' }],
  year: [{ required: true, message: '请选择年份', trigger: 'change' }],
  category: [{ required: true, message: '请选择作文类别', trigger: 'change' }],
  essayType: [{ required: true, message: '请选择作文题型', trigger: 'change' }],
  content: [{ required: true, message: '请输入作文内容', trigger: 'blur' }]
}

// 可选年份
const availableYears = ref([
  '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', 
  '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009',
  '2008', '2007', '2006', '2005'
])

// 私人信件数据
const personalLetterData = ref([
  { 
    type: '去信', 
    english: 'I hope this letter/email finds you well.', 
    chinese: '希望你收到此信/邮件时一切安好' 
  },
  { 
    type: '去信', 
    english: 'Welcome to ***, and I hope this letter finds you well.', 
    chinese: '欢迎来到***，希望你收到此信时一切安好' 
  },
  { 
    type: '回信', 
    english: 'Thank you for your kind letter/email, in which you mentioned that...', 
    chinese: '感谢您的来信，信中您提到...' 
  },
  { 
    type: '回信', 
    english: 'I was truly delighted/saddened to hear that...', 
    chinese: '得知...，我感到非常高兴/难过' 
  },
  { 
    type: '表目的', 
    english: 'My purpose of this letter/email is to...', 
    chinese: '我写这封信/邮件的目的是...' 
  }
])

// 结尾表达数据
const closingExpressionsData = ref([
  { 
    type: '表感谢', 
    english: 'Thank you for your kind consideration and time.', 
    chinese: '感谢您抽时间查看并考虑相关问题' 
  },
  { 
    type: '盼回复', 
    english: 'Looking forward to hearing from you at your earliest convenience.', 
    chinese: '期待您的回复' 
  },
  { 
    type: '送祝福', 
    english: 'Wish you all the best.', 
    chinese: '祝你一切顺利' 
  },
  { 
    type: '提要求', 
    english: 'It would be appreciated if the issue could be addressed as soon as possible.', 
    chinese: '希望问题能尽快解决（投诉信常用）' 
  },
  { 
    type: '表希望', 
    english: 'Hopefully, the recommendations provided will be helpful to you.', 
    chinese: '希望建议对您有帮助（建议信常用）' 
  }
])

// 会议纪要数据
const meetingMinutesData = ref([
  { field: 'Title of Meeting', chinese: '会议标题', description: '简明扼要说明会议主题' },
  { field: 'Date', chinese: '日期', description: '会议召开的具体日期（年/月/日）' },
  { field: 'Time', chinese: '时间', description: '会议起始和结束时间，如：14:00-15:30' },
  { field: 'Location', chinese: '地点', description: '会议举办地点（线上/线下）' },
  { field: 'Attendees', chinese: '参会人员', description: '列出所有出席者姓名及职务' },
  { field: 'Presided by', chinese: '主持人', description: '主持会议的负责人姓名与职务' },
  { field: 'Meeting Record', chinese: '会议记录', description: '按议程顺序简述讨论要点、发言摘要' },
  { field: 'Decisions', chinese: '决议事项', description: '已达成的决议、责任人、完成时限' }
])

// API配置
const apiConfig = ref({
  provider: 'qwen',
  apiKey: '',
  model: 'qwen-turbo',
  baseUrl: 'https://dashscope.aliyuncs.com'
})
const apiTestLoading = ref(false)

// 评分标准数据
const gradingStandards = ref([
  { dimension: '美观', requirement: '字越漂亮越好，起码不能太丑', solution: '采用衡水体印刷，手写体较差的同学跟着多练' },
  { dimension: '内容', requirement: '应符合作文考查主题，不能偏题、瞎写乱写', solution: '注意审题，不要过度引申' },
  { dimension: '结构', requirement: '符合应用文/正常文体格式要求；结构层次清晰', solution: '按照标准结构展开，结构清晰' },
  { dimension: '语言', requirement: '词汇：拼写正确，单词优美、高级、多样；句子：无语法错误、句式多样；利用连接词使段落结构清晰、主旨突出', solution: '补充必会单词、同义替换词的高级表达、常用句式等' }
])

const scoreStandards = ref([
  { level: '第五档（很好）', english1: '17-20分', english2: '13-15分', description: '包含所有内容要点；使用丰富的语法结构和词汇；语言自然流畅，语法错误极少' },
  { level: '第四档（较好）', english1: '13-16分', english2: '10-12分', description: '包含所有内容要点，允许漏掉1-2个次重点；使用较丰富的语法结构和词汇' },
  { level: '第三档（基本）', english1: '9-12分', english2: '7-9分', description: '虽漏掉一些内容，但包含多数内容要点；有一些语法及词汇错误，但不影响理解' },
  { level: '第二档（较差）', english1: '5-8分', english2: '4-6分', description: '漏掉或未能有效阐述一些内容要点；语法结构单调、词汇项目有限' },
  { level: '第一档（差）', english1: '1-4分', english2: '1-3分', description: '明显遗漏主要内容，且有许多不相关的内容；语言错误多，有碍理解' }
])

// 英语一历年真题
const english1Topics = ref([
  { year: '2005', topic: 'disregarding filial piety towards parents（不孝顺）', category: '两代关系' },
  { year: '2006', topic: 'idol worship（偶像崇拜）', category: '文化类' },
  { year: '2007', topic: 'self-confidence（自信）', category: '人生哲理类' },
  { year: '2008', topic: 'teamwork（团队合作）', category: '文化类' },
  { year: '2009', topic: 'using the Internet reasonably（适度使用网络）', category: '文化类' },
  { year: '2010', topic: 'cultural fusion（文化融合）', category: '文化类' },
  { year: '2011', topic: 'environmental protection（环境保护）', category: '环境类' },
  { year: '2012', topic: 'being optimistic or pessimistic（乐观VS悲观）', category: '人生哲理类' },
  { year: '2013', topic: 'making a right choice（选择）', category: '青年面对社会类' },
  { year: '2014', topic: 'filial piety（孝顺/陪伴）', category: '两代关系类' },
  { year: '2015', topic: 'using mobile phones reasonably（适度使用手机）', category: '文化类' },
  { year: '2016', topic: 'the role of example（榜样/家庭教育）', category: '两代关系类' },
  { year: '2017', topic: 'taking actions（行动/读书）', category: '人生哲理类' },
  { year: '2018', topic: 'bravely facing challenges（勇于面对困难）', category: '人生哲理类' },
  { year: '2019', topic: 'persistence（坚持/鼓励）', category: '人生哲理类' },
  { year: '2020', topic: 'developing a good habit（培养良好习惯）', category: '青年面对社会类' },
  { year: '2021', topic: 'pursuing hobby/interest（追求兴趣）', category: '人生哲理类' },
  { year: '2022', topic: 'comprehensive learning（全面学习/求知）', category: '青年面对社会类' },
  { year: '2023', topic: 'traditional culture（传统文化）', category: '文化类' },
  { year: '2024', topic: 'physical fitness / importance of parks（健康/公园）', category: '健康类' }
])

// 英语二历年真题
const english2Topics = ref([
  { year: '2011', topic: 'automobile / brand image（汽车/品牌形象）', category: '热点类/经济类' },
  { year: '2012', topic: 'job satisfaction（工作满意度）', category: '社会类' },
  { year: '2013', topic: 'part-time job（兼职/工作经验）', category: '教育文化类' },
  { year: '2014', topic: 'demographic change（人口变化）', category: '热点类/经济类' },
  { year: '2015', topic: 'reasonable consumption（消费）', category: '热点类/经济类' },
  { year: '2016', topic: 'purpose of the trip（旅行目的）', category: '社会类' },
  { year: '2017', topic: 'improving cultural standards（提高文化水平）', category: '教育文化类' },
  { year: '2018', topic: 'pursuing spiritual enjoyment（追求精神享受）', category: '热点类/经济类' },
  { year: '2019', topic: 'higher education（高等教育）', category: '教育文化类' },
  { year: '2020', topic: 'using mobiles properly（适当使用手机）', category: '教育文化类' },
  { year: '2021', topic: 'physical exercise（体育锻炼）', category: '社会类' },
  { year: '2022', topic: 'express delivery / online shopping（快递/网购）', category: '热点类/经济类' },
  { year: '2023', topic: 'health literacy（健康素养）', category: '社会类' },
  { year: '2024', topic: 'practice class harvest（实践课收获）', category: '教育文化类' }
])

// 计算属性
const currentSentence = computed(() => {
  return sentences.value[currentIndex.value] || { number: '', chinese: '', english: '' }
})

const progressPercentage = computed(() => {
  if (sentences.value.length === 0) return 0
  return Math.round(((currentIndex.value + 1) / sentences.value.length) * 100)
})

const progressColor = computed(() => {
  return [
    { color: '#ff6b6b', percentage: 20 },
    { color: '#ffd93d', percentage: 40 },
    { color: '#6bcb77', percentage: 60 },
    { color: '#4d96ff', percentage: 80 },
    { color: '#4facfe', percentage: 100 }
  ]
})

// 图标映射
const getChapterIcon = (iconName) => {
  const iconMap = {
    'Reading': Reading,
    'Document': Document,
    'Picture': Picture,
    'DataAnalysis': DataAnalysis,
    'Edit': Edit,
    'Connection': Connection,
    'Setting': Setting,
    'MagicStick': MagicStick
  }
  return iconMap[iconName] || Document
}

// 菜单处理
const handleMenuSelect = (sectionId) => {
  hasLoadedContent.value = false
  resetPracticeData()
  
  const section = findSection('', sectionId)
  currentSection.value = section

  nextTick(() => {
    if (currentSection.value?.type === 'practice' && currentSection.value?.templateFile) {
      loadBuiltinTemplate()
    }
  })
}

// 切换侧边栏
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

// 检查移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 模式切换处理
const handleModeChange = (mode) => {
  // 切换模式时重置输入和结果
  userInput.value = ''
  showAnswer.value = false
  showResult.value = false
  highlightedResult.value = ''
  accuracy.value = 0
  completion.value = 0
  errors.value = 0
  
  if (mode === 'dictation') {
    // 切换到默写模式，聚焦输入框
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
}

// 获取章节类型标签
const getSectionTypeTag = (type) => {
  const tagMap = {
    info: '',
    framework: 'warning',
    practice: 'success'
  }
  return tagMap[type] || ''
}

// 获取章节类型文本
const getSectionTypeText = (type) => {
  const textMap = {
    info: '信息展示',
    framework: '框架构建',
    practice: '练习模式'
  }
  return textMap[type] || '未知类型'
}

// 重置练习数据
const resetPracticeData = () => {
  sentences.value = []
  currentIndex.value = 0
  userInput.value = ''
  showAnswer.value = false
  showResult.value = false
  accuracy.value = 0
  completion.value = 0
  errors.value = 0
}

// 重置输入
const resetInput = () => {
  userInput.value = ''
  showAnswer.value = false
  showResult.value = false
  highlightedResult.value = ''
  accuracy.value = 0
  completion.value = 0
  errors.value = 0
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

// 处理文件上传
const handleFileChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target.result
    loadContent(text, file.name)
  }
  reader.readAsText(file.raw)
}

// 加载内容
const loadContent = (text, filename) => {
  try {
    const lines = text.split('\n').filter(line => line.trim())
    const parsed = []
    let i = 0
    
    while (i < lines.length) {
      if (/^\d+[,，]/.test(lines[i])) {
        const chinese = lines[i]
        let english = ''
        i++
        
        while (i < lines.length && !/^\d+[,，]/.test(lines[i])) {
          if (lines[i].trim()) {
            english += (english ? '\n' : '') + lines[i]
          }
          i++
        }
        
        const match = chinese.match(/^(\d+)[,，]/)
        parsed.push({
          number: match ? match[1] : parsed.length + 1,
          chinese: chinese.replace(/^\d+[,，]\s*/, ''),
          english: english.trim()
        })
      } else {
        i++
      }
    }
    
    if (parsed.length === 0) {
      throw new Error('未找到有效的句子')
    }
    
    sentences.value = parsed
    currentIndex.value = 0
    hasLoadedContent.value = true
    resetInput()
    
    fileInfo.value = `成功加载 ${filename}，共 ${parsed.length} 个句子`
    fileSuccess.value = true
    fileError.value = false
    
  } catch (error) {
    fileInfo.value = `文件解析失败：${error.message}`
    fileSuccess.value = false
    fileError.value = true
  }
}

// 加载内置模板
const loadBuiltinTemplate = async () => {
  if (!currentSection.value?.templateFile) {
    ElMessage.error('该章节没有内置模板！')
    return
  }

  loading.value = true
  fileInfo.value = '正在加载内置模板...'
  fileSuccess.value = false
  fileError.value = false

  try {
    const response = await fetch(currentSection.value.templateFile)
    if (response.ok) {
      const text = await response.text()
      loadContent(text, '内置模板')
    } else {
      throw new Error('文件不存在')
    }
  } catch (error) {
    ElMessage.error('模板文件加载失败！')
    fileInfo.value = '模板文件加载失败，请重试'
    fileError.value = true
  } finally {
    loading.value = false
  }
}

// 处理输入
const handleInput = () => {
  showAnswer.value = false
  showResult.value = false
}

// 处理键盘按键
const handleKeyDown = (e) => {
  if (e.key === 'Tab') {
    e.preventDefault()
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    userInput.value = userInput.value.substring(0, start) + ' ' + userInput.value.substring(end)
    nextTick(() => {
      e.target.selectionStart = e.target.selectionEnd = start + 1
    })
  }
}

// 检查答案
const checkAnswer = () => {
  if (!userInput.value.trim()) {
    ElMessage.warning('请输入内容后再点击完成！')
    return
  }

  showAnswer.value = true
  showResult.value = true

  const correctText = currentSentence.value.english
  highlightedResult.value = compareTextsWithAnswer(userInput.value, correctText)

  updateStats()
}

// 比较文本
const compareTextsWithAnswer = (userInput, correctText) => {
  let result = ''
  let userIdx = 0
  let correctIdx = 0

  const normalizeSpaces = (str) => str.replace(/\s+/g, ' ').trim()
  const userNormalized = normalizeSpaces(userInput)
  const correctNormalized = normalizeSpaces(correctText)

  const userChars = userNormalized.split('')
  const correctChars = correctNormalized.split('')

  const isEmpty = userChars.length === 0

  while (correctIdx < correctChars.length || userIdx < userChars.length) {
    if (correctIdx >= correctChars.length) {
      result += `<span class="extra-char">[多余: "${escapeHtml(userChars[userIdx])}"]</span>`
      userIdx++
    } else if (userIdx >= userChars.length) {
      if (isEmpty) {
        result += `<span class="incorrect-char">${escapeHtml(correctChars[correctIdx])}</span>`
      } else {
        result += `<span class="missing-char">${escapeHtml(correctChars[correctIdx])}</span>`
      }
      correctIdx++
    } else {
      const userChar = userChars[userIdx]
      const correctChar = correctChars[correctIdx]

      if (userChar === correctChar) {
        result += `<span class="correct-char">${escapeHtml(correctChar)}</span>`
        userIdx++
        correctIdx++
      } else {
        if (userChar === ' ' && correctChar !== ' ') {
          result += `<span class="extra-char">[多余空格]</span>`
          userIdx++
        } else if (userChar !== ' ' && correctChar === ' ') {
          result += `<span class="missing-char"> </span>`
          correctIdx++
        } else {
          result += `<span class="incorrect-char">${escapeHtml(correctChar)}</span>`
          userIdx++
          correctIdx++
        }
      }
    }
  }

  return result
}

// 转义HTML
const escapeHtml = (text) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// 更新统计
const updateStats = () => {
  if (!showResult.value) {
    accuracy.value = 0
    completion.value = 0
    errors.value = 0
    return
  }

  const userText = userInput.value.trim()
  const correctText = currentSentence.value.english.trim()

  if (!userText) {
    accuracy.value = 0
    completion.value = 0
    errors.value = 0
    return
  }

  const normalizeSpaces = (str) => str.replace(/\s+/g, ' ').trim()
  const userNormalized = normalizeSpaces(userText)
  const correctNormalized = normalizeSpaces(correctText)

  const userChars = userNormalized.split('')
  const correctChars = correctNormalized.split('')

  let correctCount = 0
  let errorCount = 0
  let userIdx = 0
  let correctIdx = 0

  while (correctIdx < correctChars.length || userIdx < userChars.length) {
    if (correctIdx >= correctChars.length) {
      errorCount++
      userIdx++
    } else if (userIdx >= userChars.length) {
      errorCount++
      correctIdx++
    } else {
      if (userChars[userIdx] === correctChars[correctIdx]) {
        correctCount++
        userIdx++
        correctIdx++
      } else {
        errorCount++
        if (userChars[userIdx] === ' ') {
          userIdx++
        } else if (correctChars[correctIdx] === ' ') {
          correctIdx++
        } else {
          userIdx++
          correctIdx++
        }
      }
    }
  }

  errorCount += Math.abs(userChars.length - correctChars.length)

  const totalChars = Math.max(userChars.length, correctChars.length)
  accuracy.value = totalChars > 0 ? Math.round((correctCount / totalChars) * 100) : 0
  completion.value = correctChars.length > 0 ? Math.round((userIdx / correctChars.length) * 100) : 0
  errors.value = errorCount
}

// 下一个句子
const nextSentence = () => {
  if (currentIndex.value < sentences.value.length - 1) {
    currentIndex.value++
    resetInput()
  }
}

// 上一个句子
const previousSentence = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetInput()
  }
}

// 重新上传
const reuploadFile = async () => {
  try {
    await ElMessageBox.confirm('确定要重新上传文件吗？当前进度将被重置。', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    hasLoadedContent.value = false
    resetPracticeData()
  } catch {
    // 用户取消
  }
}

// AI相关函数
const showTextInput = () => {
  aiEssayForm.value.content = ' '
}

const handleAIFileChange = (file) => {
  const fileName = file.name.toLowerCase()
  
  if (fileName.endsWith('.txt')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      aiEssayForm.value.content = e.target.result
      aiFileInfo.value = `✅ 已加载文本文件：${file.name}`
      aiFileSuccess.value = true
      aiFileError.value = false
      ElMessage.success('文件加载成功！请填写其他信息后开始批改')
    }
    reader.readAsText(file.raw)
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    ElMessageBox.confirm(
      'AI可以识别图片中的文字，但建议使用文本文件以获得更准确的批改结果。请选择处理方式：',
      '图片处理方式',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '直接识别图片',
        cancelButtonText: '手动输入内容',
        type: 'info'
      }
    ).then(() => {
      // 用户选择直接识别图片
      const reader = new FileReader()
      reader.onload = (e) => {
        // 存储图片的base64数据
        aiEssayForm.value.imageData = e.target.result
        aiEssayForm.value.imageName = file.name
        aiEssayForm.value.content = `[图片文件：${file.name}，将由AI自动识别]`
        aiFileInfo.value = `📷 已加载图片文件：${file.name}，AI将自动识别图片中的文字`
        aiFileSuccess.value = true
        aiFileError.value = false
        ElMessage.success('图片加载成功！请填写其他信息后开始批改')
      }
      reader.readAsDataURL(file.raw)
    }).catch((action) => {
      // 用户选择手动输入
      if (action === 'cancel') {
        aiEssayForm.value.content = ' '
        aiFileInfo.value = `📷 图片已选择，请手动输入作文内容`
        aiFileSuccess.value = true
        aiFileError.value = false
        ElMessage.info('请在下方文本框中输入图片中的作文内容')
      } else {
        // 用户点击关闭按钮
        aiFileInfo.value = ''
      }
    })
  }
}

const performAICorrection = async () => {
  // 表单验证
  if (!aiFormRef.value) {
    ElMessage.error('表单未初始化')
    return
  }
  
  try {
    await aiFormRef.value.validate()
  } catch (error) {
    ElMessage.warning('请完整填写表单信息')
    return
  }

  if (!aiEssayForm.value.content.trim()) {
    ElMessage.warning('请输入作文内容！')
    return
  }

  if (!apiConfig.value.apiKey) {
    ElMessage.warning('请先配置API Key！')
    return
  }

  aiCorrectionLoading.value = true
  aiCorrectionResult.value = ''

  // 确定作文类型和满分
  const isEnglish1 = aiEssayForm.value.type === 'english1'
  const isSmallEssay = aiEssayForm.value.category === 'application'
  const maxScore = isSmallEssay ? 10 : (isEnglish1 ? 20 : 15)
  const wordCount = isSmallEssay ? '100词左右' : (isEnglish1 ? '160-200词' : '至少150词')
  
  // 确定题型名称
  let essayTypeName = ''
  if (isSmallEssay) {
    essayTypeName = '应用文（小作文）'
  } else {
    essayTypeName = aiEssayForm.value.essayType === 'picture' ? '图画作文（大作文）' : '图表作文（大作文）'
  }

  try {
    // 构建基础prompt
    let basePrompt = `你是一位考研英语阅卷专家，请根据以下标准批改这篇作文：

## 评分标准（晶婷弟子班写作评分标准）

### 一、评分维度
1. **美观**：字越漂亮越好，起码不能太丑
2. **内容**：应符合作文考查主题，不能偏题、瞎写乱写
3. **结构**：符合应用文/正常文体格式要求；结构层次清晰
4. **语言**：词汇拼写正确、优美高级；句子无语法错误、句式多样

### 二、作文给分标准
**第五档（很好）**：${isEnglish1 ? (isSmallEssay ? '9-10分' : '17-20分') : (isSmallEssay ? '9-10分' : '13-15分')}
- 包含所有内容要点
- 使用丰富的语法结构和词汇
- 语言自然流畅

**第四档（较好）**：${isEnglish1 ? (isSmallEssay ? '7-8分' : '13-16分') : (isSmallEssay ? '7-8分' : '10-12分')}
**第三档（基本）**：${isEnglish1 ? (isSmallEssay ? '5-6分' : '9-12分') : (isSmallEssay ? '5-6分' : '7-9分')}
**第二档（较差）**：${isEnglish1 ? (isSmallEssay ? '3-4分' : '5-8分') : (isSmallEssay ? '3-4分' : '4-6分')}
**第一档（差）**：${isEnglish1 ? (isSmallEssay ? '1-2分' : '1-4分') : (isSmallEssay ? '1-2分' : '1-3分')}

## 作文信息
- 考试类型：${isEnglish1 ? '英语一' : '英语二'}
- 年份：${aiEssayForm.value.year}年
- 作文类别：${essayTypeName}
- 满分：${maxScore}分
- 字数要求：${wordCount}
- 题目：${aiEssayForm.value.title || '未提供'}`

    // 检查是否有图片数据
    const hasImage = aiEssayForm.value.imageData && aiEssayForm.value.imageData.startsWith('data:image')
    
    let messages = []
    
    if (hasImage) {
      // 图片识别模式
      basePrompt += `

## 作文内容
请从上传的图片中识别作文内容，然后按照以下格式批改：

### 整体分析
**整体打分**：给出具体分数（满分${maxScore}分）
**写作初印象**：简要评价

### 词汇分析
**亮眼词**：列举3-5个
**拼写错误词**：列出所有错误

### 句型分析
**亮眼句**：列举1-3个
**语法错误句**：给出修改建议

### 篇章分析
**写作框架**：评价结构
**完整性**：是否回应题目
**连贯性**：连接词使用
**切题度**：是否偏题

### 改进建议
给出具体建议和润色示例`
      
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: basePrompt
            },
            {
              type: 'image_url',
              image_url: {
                url: aiEssayForm.value.imageData
              }
            }
          ]
        }
      ]
    } else {
      // 文本模式
      basePrompt += `

## 作文内容
${aiEssayForm.value.content}

## 输出要求
请严格按照以下格式输出批改结果：

### 整体分析
**整体打分**：给出具体分数（满分${maxScore}分）
**写作初印象**：简要评价

### 词汇分析
**亮眼词**：列举3-5个
**拼写错误词**：列出所有错误

### 句型分析
**亮眼句**：列举1-3个
**语法错误句**：给出修改建议

### 篇章分析
**写作框架**：评价结构
**完整性**：是否回应题目
**连贯性**：连接词使用
**切题度**：是否偏题

### 改进建议
给出具体建议和润色示例`
      
      messages = [
        { role: 'user', content: basePrompt }
      ]
    }

    let response
    const provider = apiConfig.value.provider
    const apiKey = apiConfig.value.apiKey
    const model = apiConfig.value.model || 'qwen-turbo'
    
    // 通义千问
    if (provider === 'qwen') {
      const isOmniModel = model.includes('omni')
      
      if (isOmniModel) {
        // Omni系列：使用兼容模式接口
        response = await fetch('/api/qwen/compatible-mode/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            max_tokens: 2048
          })
        })
      } else {
        // 普通模型和VL模型：使用原接口
        const actualModel = hasImage ? 'qwen-vl-max' : model
        const requestBody = {
          model: actualModel,
          input: { messages: messages }
        }
        
        response = await fetch('/api/qwen/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify(requestBody)
        })
      }
    }
    // 智增增、DeepSeek、Kimi
    else if (['zhizengzeng', 'deepseek', 'kimi'].includes(provider)) {
      response = await fetch(`/api/${provider}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 2048
        })
      })
    }
    // Claude
    else if (provider === 'claude') {
      const claudeMessages = messages.map(m => {
        if (typeof m.content === 'string') {
          return { role: m.role, content: m.content }
        }
        return m
      })
      
      response = await fetch('/api/claude/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model,
          messages: claudeMessages,
          max_tokens: 2048
        })
      })
    }
    // OpenAI及其他
    else {
      const visionModel = hasImage ? 'gpt-4o' : model
      
      response = await fetch('/api/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
          model: visionModel,
          messages: messages,
          max_tokens: 2048
        })
      })
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || errorData.message || 'API请求失败: ' + response.status)
    }

    const data = await response.json()
    
    // 解析结果
    const isOmniModel = model.includes('omni')
    
    if (provider === 'qwen' && !isOmniModel) {
      aiCorrectionResult.value = data.output?.text || data.output?.choices?.[0]?.message?.content || '批改结果解析失败'
    } else if (provider === 'claude') {
      aiCorrectionResult.value = data.content?.[0]?.text || '批改结果解析失败'
    } else {
      aiCorrectionResult.value = data.choices?.[0]?.message?.content || '批改结果解析失败'
    }
    
    // 将Markdown转换为HTML
    aiCorrectionResult.value = convertMarkdownToHtml(aiCorrectionResult.value)
    
    ElMessage.success('批改完成！请查看下方结果')
    
    // 滚动到结果区域
    nextTick(() => {
      const resultElement = document.querySelector('.ai-result')
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } catch (error) {
    ElMessage.error('批改失败：' + error.message)
  } finally {
    aiCorrectionLoading.value = false
  }
}

const exportAIResult = () => {
  const result = `AI智能批改结果\n${'='.repeat(50)}\n\n${aiCorrectionResult.value.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '')}`
  const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'AI批改结果.txt'
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('批改结果已导出')
}

// Markdown转HTML函数
const convertMarkdownToHtml = (markdown) => {
  let html = markdown
  
  // 轉换标题
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  
  // 轉换粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 轉换斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 轉换分隔线
  html = html.replace(/^---$/gm, '<hr>')
  
  // 轉换列表项
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>')
  
  // 轉换段落（连续的<li>标签不包裹在<p>中）
  const lines = html.split('\n')
  let result = []
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isListItem = line.trim().startsWith('<li>')
    const isHeader = line.trim().startsWith('<h') || line.trim().startsWith('<hr')
    
    if (isListItem || isHeader) {
      if (!isListItem && inList) {
        result.push('</ul>')
        inList = false
      }
      if (isListItem && !inList) {
        result.push('<ul>')
        inList = true
      }
      result.push(line)
    } else if (line.trim() === '') {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push('')
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push('<p>' + line + '</p>')
    }
  }
  
  if (inList) {
    result.push('</ul>')
  }
  
  return result.join('\n')
}

// API配置相关
const handleProviderChange = (provider) => {
  // 切换提供商时自动设置默认模型和baseUrl
  const configs = {
    qwen: {
      model: 'qwen-turbo',
      baseUrl: 'https://dashscope.aliyuncs.com'
    },
    openai: {
      model: 'gpt-4o-mini',
      baseUrl: 'https://api.openai.com'
    },
    zhizengzeng: {
      model: 'gpt-4o-mini',
      baseUrl: 'https://api.zhizengzeng.com'
    },
    deepseek: {
      model: 'deepseek-chat',
      baseUrl: 'https://api.deepseek.com'
    },
    kimi: {
      model: 'moonshot-v1-8k',
      baseUrl: 'https://api.moonshot.cn'
    },
    claude: {
      model: 'claude-3-5-sonnet-20241022',
      baseUrl: 'https://api.anthropic.com'
    },
    custom: {
      model: '',
      baseUrl: ''
    }
  }
  
  const config = configs[provider] || configs.custom
  apiConfig.value.model = config.model
  apiConfig.value.baseUrl = config.baseUrl
}

const saveAPIConfig = () => {
  if (!apiConfig.value.apiKey) {
    ElMessage.warning('请输入API Key！')
    return
  }

  localStorage.setItem('ai_api_config', JSON.stringify(apiConfig.value))
  ElMessage.success('API配置已保存！')
}

const testAPIConnection = async () => {
  if (!apiConfig.value.apiKey) {
    ElMessage.warning('请先输入API Key！')
    return
  }

  apiTestLoading.value = true

  try {
    const provider = apiConfig.value.provider
    const apiKey = apiConfig.value.apiKey
    const model = apiConfig.value.model || 'qwen-turbo'
    
    let response
    
    // 通义千问
    if (provider === 'qwen') {
      const isOmniModel = model.includes('omni')
      
      if (isOmniModel) {
        // Omni系列：使用兼容模式接口
        response = await fetch('/api/qwen/compatible-mode/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'Hello' }],
            max_tokens: 10
          })
        })
      } else {
        // 普通模型：使用原接口
        response = await fetch('/api/qwen/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            input: {
              messages: [{ role: 'user', content: 'Hello' }]
            }
          })
        })
      }
    }
    // 智增增、DeepSeek、Kimi
    else if (['zhizengzeng', 'deepseek', 'kimi'].includes(provider)) {
      response = await fetch(`/api/${provider}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        })
      })
    }
    // Claude
    else if (provider === 'claude') {
      response = await fetch('/api/claude/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        })
      })
    }
    // OpenAI及其他
    else {
      response = await fetch('/api/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        })
      })
    }

    if (response.ok) {
      ElMessage.success('API连接成功！')
    } else {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.error?.message || errorData.message || errorData.code || `状态码: ${response.status}`
      throw new Error(errorMsg)
    }
  } catch (error) {
    ElMessage.error(`API连接失败：${error.message}`)
  } finally {
    apiTestLoading.value = false
  }
}

// 加载保存的API配置
const loadSavedAPIConfig = () => {
  const saved = localStorage.getItem('ai_api_config')
  if (saved) {
    try {
      apiConfig.value = JSON.parse(saved)
    } catch {
      // 解析失败，使用默认值
    }
  }
}

// 全局键盘快捷键
const handleGlobalKeyDown = (e) => {
  if (document.activeElement === inputRef.value) return

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'ArrowRight' || e.key === 'n') {
      e.preventDefault()
      nextSentence()
    } else if (e.key === 'ArrowLeft' || e.key === 'p') {
      e.preventDefault()
      previousSentence()
    } else if (e.key === 'r') {
      e.preventDefault()
      resetInput()
    }
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeyDown)
  checkMobile()
  window.addEventListener('resize', checkMobile)
  loadSavedAPIConfig()
  
  // 默认显示"开始使用"章节
  nextTick(() => {
    const startSection = chapters[0].sections.find(sec => sec.id === 'start-1')
    if (startSection) {
      activeMenu.value = startSection.id
      currentSection.value = startSection
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeyDown)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1600px;
  height: calc(100vh - 40px);
  display: flex;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  background: #fafbfc;
  border-right: 1px solid #e8eaed;
  border-radius: 16px 0 0 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1001;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px !important;
    max-width: 80vw;
    z-index: 1001;
    transform: translateX(-100%);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 0;
  }
  
  .sidebar.mobile-visible {
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 24px 20px;
  background: #4facfe;
  color: white;
  text-align: center;
  box-shadow: 0 2px 8px rgba(79, 172, 254, 0.2);
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.chapter-menu {
  border: none;
  background: transparent;
}

.menu-tag {
  margin-left: 8px;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #e8eaed;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mobile-logo {
  font-size: 16px;
  font-weight: 600;
  color: #4facfe;
}

.menu-toggle {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.welcome-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content-section {
  max-width: 100%;
  width: 100%;
}

.page-header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.page-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 练习区域 */
.practice-content {
  padding: 0;
  max-width: 100%;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-section .el-card {
  width: 100%;
}

.upload-demo {
  margin-bottom: 20px;
  width: 100%;
}

.file-info {
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.file-info.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.file-info.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.practice-area {
  max-width: 100%;
}

.mode-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.mode-switch .el-radio-group {
  gap: 0;
}

.mode-switch .el-radio-button__inner {
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
}

.mode-switch .el-radio-button__inner .el-icon {
  margin-right: 6px;
  vertical-align: middle;
}

.progress-bar {
  margin-bottom: 30px;
}

.sentence-container {
  margin-bottom: 30px;
}

.sentence-card {
  border-left: 5px solid #4facfe;
}

.sentence-number {
  font-weight: bold;
  color: #4facfe;
  font-size: 16px;
  margin-bottom: 10px;
}

.chinese-text {
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.english-answer {
  margin-bottom: 15px;
}

.answer-text {
  font-size: 16px;
  line-height: 1.6;
  padding: 15px;
  background: #fff9e6;
  border-radius: 8px;
  border: 2px solid #ffd700;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.input-textarea {
  margin-bottom: 15px;
}

.input-textarea :deep(textarea) {
  font-family: 'Courier New', monospace;
  font-size: 16px;
}

.result-section {
  margin-top: 15px;
}

.result-legend {
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.legend-item {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.legend-item.correct {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.legend-item.incorrect {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.legend-item.missing {
  color: #ffc107;
  background: rgba(255, 193, 7, 0.2);
}

.result-text {
  font-size: 16px;
  line-height: 1.6;
  padding: 15px;
  background: #fff9e6;
  border-radius: 8px;
  border: 2px solid #ffd700;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.result-text :deep(.correct-char) {
  color: #28a745;
  background: transparent;
  font-weight: 500;
}

.result-text :deep(.incorrect-char) {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
  text-decoration: underline;
  font-weight: 500;
}

.result-text :deep(.missing-char) {
  color: #d8802c;
  background: rgba(255, 193, 7, 0.25);
  font-weight: 500;
}

.result-text :deep(.extra-char) {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
  font-size: 12px;
}

.stats-container {
  margin-bottom: 30px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

/* AI批改样式 */
.ai-correction, .api-settings {
  max-width: 100%;
}

.ai-correction .el-card,
.api-settings .el-card {
  width: 100%;
}

.card-header h2 {
  margin: 0;
  color: #2c3e50;
}

.ai-correction-body,
.api-settings-body {
  width: 100%;
}

.ai-upload-section {
  margin-bottom: 20px;
}

.ai-upload-demo {
  width: 100%;
}

.ai-text-input {
  margin-top: 20px;
}

.ai-result {
  margin-top: 20px;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.result-card {
  width: 100%;
  margin-bottom: 20px;
}

.result-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.result-content {
  font-size: 14px;
  line-height: 1.8;
}

.result-content :deep(h1) {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin: 20px 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #4facfe;
}

.result-content :deep(h2) {
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
  margin: 18px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.result-content :deep(h3) {
  font-size: 16px;
  font-weight: bold;
  color: #34495e;
  margin: 15px 0 10px 0;
}

.result-content :deep(p) {
  margin: 10px 0;
  line-height: 1.8;
}

.result-content :deep(strong) {
  font-weight: bold;
  color: #2c3e50;
}

.result-content :deep(em) {
  font-style: italic;
  color: #7f8c8d;
}

.result-content :deep(ul) {
  margin: 10px 0;
  padding-left: 30px;
}

.result-content :deep(li) {
  margin: 8px 0;
  line-height: 1.6;
  list-style-type: disc;
}

.result-content :deep(hr) {
  margin: 20px 0;
  border: none;
  border-top: 2px solid #eee;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px !important;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 0;
    background: #f8f9fa;
  }
  
  .main-container {
    border-radius: 0;
    height: 100vh;
    box-shadow: none;
  }
  
  .main-content {
    padding: 16px;
  }
  
  .page-header h1 {
    font-size: 22px;
  }
  
  .controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .controls .el-button {
    width: 100%;
  }
}

/* 滚动条样式 */
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
</style>