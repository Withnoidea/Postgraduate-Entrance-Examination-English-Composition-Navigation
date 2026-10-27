<template>
  <div class="text-framework-container">
    <!-- 顶部标题与导读 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-badge">考研英语一 · 新大纲文字材料题核心范式</div>
      <h2 class="book-section-title">
        <el-icon class="title-icon"><Document /></el-icon>
        第五章 文字作文 · 第一节 写作框架构建
      </h2>
      <p class="section-intro">
        文字作文通常要求考生在阅读给定文章的节选内容后撰写一篇短文。考生要在短文中<strong>解释自己是否同意或在多大程度上同意作者的观点</strong>，并用理由和相关例子来支撑论点。主要考查：<strong>阅读理解能力</strong>（提炼核心观点）、<strong>独立思考能力</strong>（明确个人立场）、<strong>结合实例佐证能力</strong>（强化论证链条）。
      </p>
    </el-card>

    <!-- 总体框架思维导图 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Share /></el-icon>
            文字作文三段式全景逻辑导图
          </span>
          <el-tag type="success" effect="dark" round>36句高分体系</el-tag>
        </div>
      </template>

      <div class="mindmap-container">
        <!-- 第一段 -->
        <div class="mind-col">
          <div class="mind-node-header p1-header">
            <div class="node-badge">第 1 段</div>
            <div class="node-title">铺垫背景（2句，30-40词）</div>
          </div>
          <div class="mind-node-body">
            <div class="node-item">
              <span class="item-tag tag-blue">句①</span>
              <span class="item-text">归纳作者观点（that 宾语从句）</span>
            </div>
            <div class="node-item">
              <span class="item-tag tag-blue">句②</span>
              <span class="item-text">表明态度（由衷同意 / 完全反对）</span>
            </div>
          </div>
        </div>

        <div class="mind-arrow">➜</div>

        <!-- 第二段 -->
        <div class="mind-col">
          <div class="mind-node-header p2-header">
            <div class="node-badge">第 2 段</div>
            <div class="node-title">分析原因（4句，90-110词）</div>
          </div>
          <div class="mind-node-body">
            <div class="node-item">
              <span class="item-tag tag-orange">句①</span>
              <span class="item-text">承上启下过渡句</span>
            </div>
            <div class="node-item">
              <span class="item-tag tag-orange">句②</span>
              <span class="item-text">角度一分析（First and foremost / On the one hand）</span>
            </div>
            <div class="node-item">
              <span class="item-tag tag-orange">句③</span>
              <span class="item-text">角度二分析（What is more / On the other hand）</span>
            </div>
            <div class="node-item highlight-item">
              <span class="item-tag tag-red">句④</span>
              <span class="item-text"><strong>举例佐证（CASS 73% 权威统计数据）</strong></span>
            </div>
            <div class="node-tip">
              💡 判定文字类型：品质类=妙句10选2；现象类=妙句7选2
            </div>
          </div>
        </div>

        <div class="mind-arrow">➜</div>

        <!-- 第三段 -->
        <div class="mind-col">
          <div class="mind-node-header p3-header">
            <div class="node-badge">第 3 段</div>
            <div class="node-title">总结（2句，30-40词）</div>
          </div>
          <div class="mind-node-body">
            <div class="node-item">
              <span class="item-tag tag-green">深度评价</span>
              <span class="item-text">品质/社会/双刃剑类 ➔ 借用图画尾段</span>
            </div>
            <div class="node-item">
              <span class="item-tag tag-green">预测未来</span>
              <span class="item-text">数据/调查/发展类 ➔ 借用图表尾段</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第一段：铺垫背景精讲 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Reading /></el-icon>
            第一段：铺垫背景（归纳观点 + 亮明态度）
          </span>
          <el-tag type="primary">2 句组合拳</el-tag>
        </div>
      </template>

      <div class="formula-block">
        <div class="formula-item">
          <div class="item-top">
            <span class="step-badge">第 1 句 · 归纳作者观点</span>
          </div>
          <div class="formula-code">
            This is an excerpt from a simple yet thought-provoking article, in which the author informs us that <span class="slot-tag">[作者核心观点]</span>.
          </div>
          <div class="formula-trans">
            <strong>译文：</strong>该段落节选自一篇简单但发人深省的文章，其中作者告诉我们 [作者观点]。
          </div>
          <div class="formula-note">
            📌 <strong>操作精髓：</strong>从题目所给文章节选中提炼核心论点，作为 <code>that</code> 从句的宾语。例如：<em>that perseverance is the key to conquering adversities</em>。
          </div>
        </div>

        <div class="formula-item">
          <div class="item-top">
            <span class="step-badge">第 2 句 · 亮明个人态度</span>
            <div class="attitude-radios">
              <el-radio-group v-model="selectedAttitude" size="small">
                <el-radio-button label="agree">支持作者 (推荐)</el-radio-button>
                <el-radio-button label="disagree">反对作者</el-radio-button>
              </el-radio-group>
            </div>
            
          </div>
          
          <div class="formula-code" v-if="selectedAttitude === 'agree'">
            I <span class="highlight-word">wholeheartedly agree</span> with the author's viewpoint.
          </div>
          <div class="formula-code" v-else>
            I <span class="highlight-word">completely disagree</span> with the author's viewpoint.
          </div>

          <div class="formula-trans">
            <strong>译文：</strong>{{ selectedAttitude === 'agree' ? '我由衷地同意作者的观点。' : '我完全不同意作者的观点。' }}
          </div>
          <div class="formula-note">
            💡 <strong>名师点拨：</strong>在开篇第二句直接亮明你的立场，能让阅卷老师第一时间把握你的文章走向。绝大多数考试建议选择 <code>wholeheartedly agree</code>，正面展开论证论据更丰富、不易跑题。
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第二段：分析原因精讲 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Operation /></el-icon>
            第二段：分析原因（4句论证闭环）
          </span>
          <el-tag type="warning">论证核心段</el-tag>
        </div>
      </template>

      <div class="p2-flow-list">
        <!-- 句1 -->
        <div class="p2-step-card">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title-row">
              <h4>第 1 句：承上启下过渡句</h4>
            </div>
            <div class="step-sentence">
              The reasons can be listed as follows.
            </div>
            <div class="step-trans"><strong>译文：</strong>原因可以列举如下。/ 原因如下。</div>
            <div class="step-desc">承上启下，为后文展开原因分析提供标准引导。</div>
          </div>
        </div>

        <!-- 句2 & 句3 搭配 -->
        <div class="p2-step-card">
          <div class="step-num">2 & 3</div>
          <div class="step-content">
            <div class="step-title-row">
              <h4>第 2 句 & 第 3 句：双维分析搭配套路</h4>
              <el-radio-group v-model="connectorStyle" size="small">
                <el-radio-button label="styleA">递进模式 (First and foremost / What is more)</el-radio-button>
                <el-radio-button label="styleB">对称模式 (On the one hand / On the other hand)</el-radio-button>
              </el-radio-group>
            </div>

            <div class="dual-sentence-box">
              <div class="sub-sentence">
                <div class="sub-label">第 2 句（角度一分析）：</div>
                <div class="sub-code">
                  {{ connectorStyle === 'styleA' ? 'First and foremost' : 'On the one hand' }}, <span class="slot-tag">[角度一原因论证]</span>.
                </div>
              </div>
              <div class="sub-sentence">
                <div class="sub-label">第 3 句（角度二分析）：</div>
                <div class="sub-code">
                  {{ connectorStyle === 'styleA' ? 'What is more' : 'On the other hand' }}, <span class="slot-tag">[角度二原因论证]</span>.
                </div>
              </div>
            </div>

            <div class="dimension-guide-box">
              <div class="guide-title">
                <el-icon><Compass /></el-icon>
                <strong>两大题材类型的分析切入角度（与前文各章无缝贯通）：</strong>
              </div>
              <el-row :gutter="16" style="margin-top: 10px;">
                <el-col :span="12">
                  <div class="angle-card">
                    <div class="angle-title">① 探讨品质 / 现象 / 事物双重性 / 认知差异</div>
                    <p class="angle-text">
                      参考<strong>图画作文第二段</strong>，可从<strong>「个人层面 vs 社会层面」</strong>、<strong>「正反观点」</strong>或<strong>「合理使用 vs 过度沉迷」</strong>角度展开；套用【品质类妙句 10 选 2】或【现象类妙句 7 选 2】。
                    </p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="angle-card">
                    <div class="angle-title">② 探讨数据分析 / 社会调查 / 市场演变</div>
                    <p class="angle-text">
                      参考<strong>图表作文第二段</strong>，从<strong>「个人角度 vs 社会角度」</strong>或<strong>「占比最大的重点核心元素」</strong>展开深入分析。
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <!-- 句4 举例 -->
        <div class="p2-step-card highlight-step">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title-row">
              <h4>第 4 句：权威数据举例论证（杀手锏）</h4>
              
            </div>
            <div class="step-sentence">
              For example, according to a recent survey conducted by the Chinese Academy of Social Sciences (CASS), 73% of the respondents believe that <span class="slot-tag">[受访者认同的核心论点]</span>.
            </div>
            <div class="step-trans">
              <strong>译文：</strong>例如，根据中国社会科学院（CASS）最近进行的一项统计，73%的受访者认为 [***]。
            </div>
            <div class="step-desc">
              ⭐ <strong>得分秘籍：</strong>引用国家级权威机构（中国社会科学院 CASS），配以具体百分比（如 73%），能够瞬间将抽象的说理升级为客观详实的事实论证，论点可信度大幅飙升！
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第三段：总结精讲 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Check /></el-icon>
            第三段：总结（按文字题材精准分类承袭）
          </span>
          <el-tag type="success">终局升华</el-tag>
        </div>
      </template>

      <div class="p3-bridge-container">
        <p class="p3-intro">
          文字作文末段无需死记新模板，直接根据材料讨论的主题属性，<strong>复用图画或图表作文经过验证的高分末段框架</strong>：
        </p>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="bridge-card bridge-pic">
              <div class="b-header">
                <el-icon><Picture /></el-icon>
                <span>承袭图画作文末段（深度评价）</span>
              </div>
              <div class="b-body">
                <p><strong>适用题材：</strong>个人品质、社会道德、科技双刃剑、认知心态等。</p>
                <ul>
                  <li><strong>好事情（倡导弘扬）：</strong><code>It is imperative that we carry forward ...</code></li>
                  <li><strong>坏事情（多维组合拳）：</strong><code>How to address this issue? ...</code>（政府、学校/媒体、个人）</li>
                  <li><strong>双刃剑（趋利避害）：</strong><code>maximize its advantages while minimizing the downsides ...</code></li>
                  <li><strong>认知差异（心态调整）：</strong><code>adopt a positive mindset and embrace challenges ...</code></li>
                </ul>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="bridge-card bridge-chart">
              <div class="b-header">
                <el-icon><DataAnalysis /></el-icon>
                <span>承袭图表作文末段（预测未来）</span>
              </div>
              <div class="b-body">
                <p><strong>适用题材：</strong>社会调查数据、经济科技变化、生活方式演变等。</p>
                <ul>
                  <li><strong>动态演进趋势：</strong><code>What about future trends? I am confident that the number/proportion of ... will steadily increase in the following decades.</code></li>
                  <li><strong>静态稳定现状：</strong><code>serving as a microcosm of the changes in the era, and will likely remain relatively stable in the following decades.</code></li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>
<script setup>
import { renderSlotPills } from '../utils/formatters'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Document,
  Share,
  Reading,
  Operation,
  Check,
  Compass,
  EditPen,
  Picture,
  DataAnalysis
} from '@element-plus/icons-vue'

const selectedAttitude = ref('agree')
const connectorStyle = ref('styleA')




</script>

<style scoped>
.text-framework-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.header-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #0369a1;
  background: #e0f2fe;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.book-section-title {
  margin: 0 0 10px 0;
  font-size: 22px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-intro {
  margin: 0;
  color: #475569;
  font-size: 14.5px;
  line-height: 1.65;
}

.section-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 导图样式 */
.mindmap-container {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding: 10px 0;
}

.mind-col {
  flex: 1;
  min-width: 240px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  overflow: hidden;
}

.mind-node-header {
  padding: 10px 14px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.p1-header { background: linear-gradient(135deg, #2563eb, #3b82f6); }
.p2-header { background: linear-gradient(135deg, #d97706, #f59e0b); }
.p3-header { background: linear-gradient(135deg, #059669, #10b981); }

.node-badge {
  font-size: 11px;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
  padding: 2px 6px;
  border-radius: 4px;
}

.node-title {
  font-size: 13.5px;
  font-weight: 600;
}

.mind-node-body {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.node-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #334155;
  line-height: 1.4;
}

.highlight-item {
  background: #fff1f2;
  border-radius: 6px;
  padding: 4px 6px;
  border: 1px dashed #f43f5e;
}

.item-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
  flex-shrink: 0;
}

.tag-blue { background: #dbeafe; color: #1e40af; }
.tag-orange { background: #fef3c7; color: #92400e; }
.tag-red { background: #ffe4e6; color: #9f1239; }
.tag-green { background: #d1fae5; color: #065f46; }

.node-tip {
  margin-top: 6px;
  font-size: 12px;
  color: #d97706;
  background: #fffbeb;
  padding: 6px 8px;
  border-radius: 6px;
}

.mind-arrow {
  font-size: 18px;
  color: #94a3b8;
  font-weight: bold;
}

/* 公式样式 */
.formula-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.formula-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.step-badge {
  font-size: 13px;
  font-weight: 700;
  color: #1e40af;
  background: #dbeafe;
  padding: 2px 10px;
  border-radius: 6px;
}

.formula-code {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 10px 14px;
  border-radius: 8px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 14.5px;
  color: #0f172a;
  line-height: 1.5;
  margin-bottom: 8px;
}

.slot-tag {
  background: #eff6ff;
  color: #2563eb;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px dashed #93c5fd;
  font-weight: 600;
}

.highlight-word {
  color: #059669;
  font-weight: bold;
  text-decoration: underline;
}

.formula-trans {
  font-size: 13.5px;
  color: #475569;
  margin-bottom: 6px;
}

.formula-note {
  font-size: 12.5px;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 10px;
  border-radius: 6px;
}

/* 第二段样式 */
.p2-flow-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.p2-step-card {
  display: flex;
  gap: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
}

.highlight-step {
  border-color: #f43f5e;
  background: #fff5f5;
}

.step-num {
  width: 32px;
  height: 32px;
  background: #0284c7;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.highlight-step .step-num {
  background: #e11d48;
}

.step-content {
  flex: 1;
}

.step-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.step-title-row h4 {
  margin: 0;
  font-size: 14.5px;
  color: #1e293b;
}

.step-sentence {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  color: #0f172a;
  margin-bottom: 6px;
}

.step-trans {
  font-size: 13px;
  color: #475569;
  margin-bottom: 6px;
}

.step-desc {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.5;
}

.dual-sentence-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.sub-sentence {
  background: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.sub-label {
  font-size: 12.5px;
  color: #64748b;
  margin-bottom: 4px;
}

.sub-code {
  font-family: monospace;
  font-size: 13.5px;
  color: #0f172a;
}

.dimension-guide-box {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
}

.guide-title {
  font-size: 13px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.angle-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}

.angle-title {
  font-size: 13px;
  font-weight: 700;
  color: #0369a1;
  margin-bottom: 6px;
}

.angle-text {
  font-size: 12.5px;
  color: #475569;
  margin: 0;
  line-height: 1.5;
}

/* 第三段 */
.p3-intro {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #475569;
}

.bridge-card {
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  padding: 14px;
}

.bridge-pic { border-top: 4px solid #3b82f6; }
.bridge-chart { border-top: 4px solid #10b981; }

.b-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14.5px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}

.b-body p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #64748b;
}

.b-body ul {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
}

.b-body code {
  background: #e2e8f0;
  padding: 1px 5px;
  border-radius: 4px;
  color: #0f172a;
}

/* 大纲真题样例 */
.sample-task-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.task-title {
  font-size: 13px;
  font-weight: 700;
  color: #166534;
  margin-bottom: 4px;
}

.task-directions {
  font-size: 13.5px;
  color: #15803d;
  line-height: 1.5;
}

.full-model-essay {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 16px;
}

.essay-title-tag {
  font-size: 13px;
  font-weight: 700;
  color: #0284c7;
  background: #e0f2fe;
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.essay-p-box {
  margin-bottom: 14px;
}

.p-num {
  font-size: 12.5px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 4px;
}

.essay-content {
  margin: 0;
  font-size: 14.5px;
  color: #1e293b;
  line-height: 1.7;
}

.highlight-code {
  color: #2563eb;
  font-weight: 600;
}

@media (max-width: 768px) {
  .mindmap-branch-tree {
    flex-direction: column !important;
    gap: 16px !important;
  }

  .branch-node-root {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 10px 16px !important;
  }

  .branch-leaves-grid {
    grid-template-columns: 1fr !important;
  }

  .dim-grid,
  .paradigm-grid,
  .samples-grid {
    grid-template-columns: 1fr !important;
  }

  .paradigm-card,
  .dimension-box,
  .sample-card {
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .book-section-title {
    font-size: 19px !important;
  }

  .header-card :deep(.el-card__body),
  .mindmap-card :deep(.el-card__body) {
    padding: 14px !important;
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }

  .leaf-card,
  .sample-card,
  .dim-card {
    padding: 10px 12px !important;
  }

  .leaf-en {
    font-size: 14px !important;
    line-height: 1.5 !important;
    white-space: normal !important;
    word-break: break-word !important;
  }

  .leaf-cn {
    font-size: 12px !important;
    line-height: 1.4 !important;
  }

  .branch-node-root {
    padding: 8px 12px !important;
    font-size: 14px !important;
  }
}

</style>
