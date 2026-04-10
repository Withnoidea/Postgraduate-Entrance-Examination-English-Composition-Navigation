const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 找到并替换AI批改区域
const oldAICorrection = `              <!-- AI智能批改 -->
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
                    </div>`;

const newAICorrection = `              <!-- AI智能批改 -->
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
                    </div>`;

content = content.replace(oldAICorrection, newAICorrection);

fs.writeFileSync(filePath, content, 'utf8');
console.log('AI批改界面样式已优化！');
