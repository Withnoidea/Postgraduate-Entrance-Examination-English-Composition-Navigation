const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 替换框架构建内容
const oldFramework = `          <div v-if="currentSection.type === 'framework'" class="framework-content">
            <el-alert title="写作框架构建" type="warning" :closable="false" show-icon>
              此章节为写作框架构建内容，暂无背诵练习。
            </el-alert>
          </div>`;

const newFramework = `          <!-- 框架构建内容 -->
          <div v-if="currentSection.type === 'framework'" class="framework-content">
            <el-card shadow="hover">
              <h2>📐 写作框架构建</h2>
              
              <!-- 应用文框架 -->
              <div v-if="currentSection.id === 'app-1'">
                <el-divider content-position="left">应用文写作框架</el-divider>
                <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
                  应用文（小作文）主要包括：书信、通知、备忘录等，满分10分，要求100词左右。
                </el-alert>
                
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="第一段">
                    <strong>开篇点题</strong>：说明写信目的/背景（1-2句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第二段">
                    <strong>主体内容</strong>：展开具体内容，分点论述（3-5句）
                  </el-descriptions-item>
                  <el-descriptions-item label="第三段">
                    <strong>结尾总结</strong>：表达期望/感谢/建议（1-2句）
                  </el-descriptions-item>
                </el-descriptions>
                
                <el-divider content-position="left">常用开头句型</el-divider>
                <ul>
                  <li>I am writing to...（我写信是为了...）</li>
                  <li>I would like to...（我想要...）</li>
                  <li>I am writing to express my concern about...（我写信是为了表达我对...的关注）</li>
                </ul>
                
                <el-divider content-position="left">常用结尾句型</el-divider>
                <ul>
                  <li>I am looking forward to your reply.（期待您的回复）</li>
                  <li>I would appreciate it if you could...（如果您能...我将不胜感激）</li>
                  <li>Thank you for your time and consideration.（感谢您的时间和考虑）</li>
                </ul>
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
          </div>`;

content = content.replace(oldFramework, newFramework);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已添加框架构建内容！');
