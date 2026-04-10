const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 替换 info-content 部分，添加详细内容
const oldInfoContent = `          <!-- 其他类型提示 -->
          <div v-if="currentSection.type === 'info'" class="info-content">
            <el-alert title="信息展示" type="info" :closable="false" show-icon>
              此章节为信息展示内容，暂无背诵练习。
            </el-alert>
          </div>`;

const newInfoContent = `          <!-- 信息展示内容 -->
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
          </div>`;

content = content.replace(oldInfoContent, newInfoContent);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已更新 info-content 部分！');
