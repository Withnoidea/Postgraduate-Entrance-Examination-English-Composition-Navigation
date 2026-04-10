const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 替换AI智能批改表单部分
const oldAIForm = `                <!-- 文本输入区域 -->
                <div v-else class="ai-text-input">
                  <el-form :model="aiEssayForm" label-width="100px">
                    <el-form-item label="作文类型">
                      <el-select v-model="aiEssayForm.type" placeholder="请选择作文类型">
                        <el-option label="英语一" value="english1" />
                        <el-option label="英语二" value="english2" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="作文类别">
                      <el-select v-model="aiEssayForm.category" placeholder="请选择作文类别">
                        <el-option label="应用文（小作文）" value="application" />
                        <el-option label="图画作文（大作文）" value="picture" />
                        <el-option label="图表作文（大作文）" value="chart" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="作文题目">
                      <el-input v-model="aiEssayForm.title" placeholder="请输入作文题目" />
                    </el-form-item>
                    <el-form-item label="作文内容">
                      <el-input
                        v-model="aiEssayForm.content"
                        type="textarea"
                        :rows="15"
                        placeholder="请输入你的作文内容..."
                      />
                    </el-form-item>
                  </el-form>

                  <el-button type="primary" @click="performAICorrection" :loading="aiCorrectionLoading" style="width: 100%;">
                    {{ aiCorrectionLoading ? '正在批改中...' : '开始智能批改' }}
                  </el-button>
                </div>`;

const newAIForm = `                <!-- 文本输入区域 -->
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
                </div>`;

content = content.replace(oldAIForm, newAIForm);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已更新AI批改表单！');
