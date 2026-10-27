<template>
  <div class="mixed-framework-container">
    <!-- 顶部标题与导读 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-badge">考研英语 · 新大纲破局命题大趋势</div>
      <h2 class="book-section-title">
        <el-icon class="title-icon"><Connection /></el-icon>
        第六章 混合型作文 · 第一节 写作框架构建
      </h2>
      <p class="section-intro">
        混合型作文是考研英语写作的一个重要趋势。在 <strong>2022 年考研英语（一）考研大纲样题</strong>中出现了<strong>双图表作文</strong>的命题形式（以往都是考查单一图表）。而在 <strong>2024 年英语（一）考试</strong>中更进一步，采用了<strong>图画和图表混合</strong>的出题形式。
      </p>
      <div class="intro-deep">
        这一趋势意味着，以往英语（一）侧重于考查图画作文和英语（二）侧重于考查图表作文的格局被打破。混合型作文的命题设计巧妙融合了<strong>描述性、叙述性、说明性和论述性</strong>的要求，真正实现了对考研大纲中各项写作技能的全面考查。考生在对前五章的内容有了清晰的把握后，完全可以采用<strong>三段式写作框架</strong>顺利应对。
      </div>
    </el-card>

    <!-- 总体框架思维导图 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Share /></el-icon>
            混合型作文三段式宏观框架总体分布
          </span>
          <el-tag type="success" effect="dark" round>模块自由组合</el-tag>
        </div>
      </template>

      <div class="mindmap-horizontal">
        <div class="main-root">混合型作文</div>
        <div class="branch-col">
          <div class="branch-row">
            <div class="branch-bubble p1-bubble">第一段：介绍背景</div>
            <div class="branch-line"></div>
            <div class="branch-target">--（图画 / 图表 / 文字框架自由组合）</div>
          </div>
          <div class="branch-row">
            <div class="branch-bubble p2-bubble">第二段：剖析现象</div>
            <div class="branch-line"></div>
            <div class="branch-target">--（图画框架或图表框架）</div>
          </div>
          <div class="branch-row">
            <div class="branch-bubble p3-bubble">第三段：深度评价 / 预测未来</div>
            <div class="branch-line"></div>
            <div class="branch-target">--（图画框架或图表框架）</div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第一段：介绍背景 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><EditPen /></el-icon>
            第一段：介绍背景（核心母框架与备选句）
          </span>
          <el-tag type="primary">万能组合母架</el-tag>
        </div>
      </template>

      <!-- 母框架 -->
      <div class="mother-framework-box">
        <div class="mf-title">
          <span>👑 第一段基础母框架结构</span>
          <el-button size="small" type="primary" @click="copyText('In the left-hand/upper cartoon/chart/excerpt, + 左/上图/表/文字描述. Simultaneously/On the contrary, in the right-hand/lower portrayal/chart/excerpt, + 右/下图/表/文字描述.')">
            复制母框架
          </el-button>
        </div>
        <div class="mf-formula">
          <code>
            In the <strong>left-hand / upper</strong> cartoon / chart / excerpt, + 
            <span class="hl-slot">[左/上图/表/文字描述]</span>. 
            <strong>Simultaneously / On the contrary</strong>, in the <strong>right-hand / lower</strong> portrayal / chart / excerpt, + 
            <span class="hl-slot">[右/下图/表/文字描述]</span>.
          </code>
        </div>
        <div class="mf-notice">
          <div class="notice-badge">⚠️ 关键衔接词使用判定规则：</div>
          <ul>
            <li><strong>使用 <code>Simultaneously</code>：</strong>当两个事件<strong>同步发生</strong>，或两个观点之间存在<strong>共同点、相似之处</strong>时使用。</li>
            <li><strong>使用 <code>On the contrary</code>：</strong>当两个事件<strong>不同步发生</strong>，两者之间存在<strong>对比或相反</strong>的关系，强调两者之间的<strong>差异</strong>时使用。</li>
          </ul>
        </div>
      </div>

      <!-- 备选句型库 -->
      <div class="sub-cases-title">
        <el-icon><Collection /></el-icon>
        备选句（根据左右或上下给定的不同素材形式填入母框架）：
      </div>

      <!-- 情况一：图画 -->
      <div class="case-card">
        <div class="case-header tag-pic">
          <span>情况一：图画（核心句型）</span>
          <el-button size="small" text type="primary" @click="copyText('There be sb., doing1 sth. and doing2 sth.')">复制</el-button>
        </div>
        <div class="case-body">
          <div class="case-formula">
            <code>There be sb., <strong>doing₁ sth.</strong> and <strong>doing₂ sth.</strong></code>
          </div>
          <div class="case-desc">
            <strong>用法规则解析：</strong>表示那儿有某人，<code>doing₁ sth.</code> 描述 sb. 的<strong>位置或状态</strong>（比如在某地站着、坐着、跑着、躺着）；而 <code>doing₂ sth.</code> 描述 sb. 正在进行的<strong>具体核心动作</strong>。
          </div>
        </div>
      </div>

      <!-- 情况二：图表 -->
      <div class="case-card" style="margin-top: 14px;">
        <div class="case-header tag-chart">
          <span>情况二：图表（三种经典统计句式）</span>
        </div>
        <div class="case-body">
          <!-- 图表 1 -->
          <div class="chart-item">
            <div class="ci-top">
              <span class="ci-badge">1. 起止时间变化</span>
              <el-button size="small" text type="primary" @click="copyText('In [时间头], the number/percentage of [元素 1] was (approximately) [数字头], but by [时间尾], this figure/rate had substantially/gradually risen/decreased to (around) [数字尾].')">复制</el-button>
            </div>
            <div class="case-formula">
              <code>In [时间头], the number/percentage of [元素 1] was (approximately) [数字头], but by [时间尾], this figure/rate had substantially/gradually risen/decreased to (around) [数字尾].</code>
            </div>
            <div class="ci-trans"><strong>释义：</strong>在起始时间点，元素 1 的数值/比例（约）为多少，然而到了结束时间点，这个数值/比例已经显著/缓慢增加/减少到（大约）多少。</div>
          </div>

          <!-- 图表 2 -->
          <div class="chart-item" style="margin-top: 10px;">
            <div class="ci-top">
              <span class="ci-badge">2. 对比与差额变化</span>
              <el-button size="small" text type="primary" @click="copyText('In contrast, the number/proportion of [元素 2] experienced a significant/slow increase/decline of (about) [差额数字] during the same period/from [时间 1] to [时间 2].')">复制</el-button>
            </div>
            <div class="case-formula">
              <code>In contrast, the number/proportion of [元素 2] experienced a significant/slow increase/decline of (about) *** (数字相减的结果) during the same period/from [时间 1] to [时间 2].</code>
            </div>
            <div class="ci-trans"><strong>释义：</strong>相比之下，在相同的时段/从时间 1 到时间 2，元素 2 的数值/比例急剧/缓慢增长/下降了约 ***（两个时间点对应数字相减的结果）。</div>
          </div>

          <!-- 图表 3 -->
          <div class="chart-item" style="margin-top: 10px;">
            <div class="ci-top">
              <span class="ci-badge">3. 饼图占比分解</span>
              <el-button size="small" text type="primary" @click="copyText('The pie chart clearly displays the percentage breakdown of [表头中文翻译]. [元素 A] takes the lead at a%, followed by [元素 B] at b%.')">复制</el-button>
            </div>
            <div class="case-formula">
              <code>The pie chart clearly displays the percentage breakdown of *** (表头内容的中文翻译). [元素 A] takes the lead at a%, followed by [元素 B] at b%.</code>
            </div>
            <div class="ci-trans"><strong>释义：</strong>该饼状图清晰地展示了 *** 的百分比分析结果。元素 A 占比最大，为 a%，其次是元素 B，占比为 b%。</div>
          </div>
        </div>
      </div>

      <!-- 情况三：文字 -->
      <div class="case-card" style="margin-top: 14px;">
        <div class="case-header tag-text">
          <span>情况三：文字（材料节选句型）</span>
          <el-button size="small" text type="primary" @click="copyText('The author informs us that + 作者观点.')">复制</el-button>
        </div>
        <div class="case-body">
          <div class="case-formula">
            <code>The author informs us that + <span class="hl-slot">[作者观点]</span>.</code>
          </div>
          <div class="case-desc">
            <strong>释义：</strong>作者告诉我们 + 作者观点。
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第二段：剖析现象 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Operation /></el-icon>
            第二段：剖析现象（二选一策略）
          </span>
          <el-tag type="warning">主体论证分流</el-tag>
        </div>
      </template>

      <div class="strategy-grid">
        <div class="strategy-card border-orange">
          <div class="st-tag tag-orange-bg">路径 A · 探讨品质/社会现象/双重性</div>
          <h4>参考【图画作文】框架分析</h4>
          <p>
            对于探讨<strong>个人品质、社会现象以及事物双重性</strong>的文章，可以参考图画作文：
          </p>
          <ul>
            <li>从<strong>个人和社会角度</strong>深入剖析；</li>
            <li>从<strong>正反观点</strong>进行辩证分析；</li>
            <li>从<strong>合理与过度使用</strong>的角度进行原因探究。</li>
          </ul>
        </div>

        <div class="strategy-card border-blue">
          <div class="st-tag tag-blue-bg">路径 B · 数据分析/调查研究/动态变化</div>
          <h4>参考【图表作文】框架分析</h4>
          <p>
            若话题涉及<strong>数据分析、社会调查、市场研究以及社会发展中出现的各种变化</strong>时，可以参考图表作文：
          </p>
          <ul>
            <li>从<strong>个人和社会角度</strong>进行深入剖析；</li>
            <li>或紧扣<strong>重点元素角度</strong>（占比最高、涨幅最大）展开论述。</li>
          </ul>
        </div>
      </div>
    </el-card>

    <!-- 第三段：深度评价/预测未来 -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="header-title">
            <el-icon><Compass /></el-icon>
            第三段：深度评价 / 预测未来（二选一策略）
          </span>
          <el-tag type="danger">完美收口分流</el-tag>
        </div>
      </template>

      <div class="strategy-grid">
        <div class="strategy-card border-green">
          <div class="st-tag tag-green-bg">收口路径 A · 针对品质/现象/双重性</div>
          <h4>参考【图画作文】末段框架（深度评价）</h4>
          <p>
            对于话题涉及<strong>个人品质、社会现象以及事物双重性</strong>的题目：
          </p>
          <ul>
            <li>从<strong>好事情（倡导弘扬）</strong>的角度收尾；</li>
            <li>从<strong>坏事情（治理措施）</strong>的角度收尾；</li>
            <li>从<strong>双刃剑 / 认知差异</strong>的角度辩证评价。</li>
          </ul>
        </div>

        <div class="strategy-card border-purple">
          <div class="st-tag tag-purple-bg">收口路径 B · 针对数据/调查/社会变化</div>
          <h4>参考【图表作文】末段框架（预测未来）</h4>
          <p>
            若话题涉及<strong>数据分析、社会调查、市场研究及社会发展中出现的各种变化</strong>：
          </p>
          <ul>
            <li>对<strong>未来发展趋势进行前瞻性预测和展望</strong>；</li>
            <li>结合时代缩影（microcosm of the era）表达信心。</li>
          </ul>
        </div>
      </div>
    </el-card>

  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import {
  Connection,
  Share,
  EditPen,
  Collection,
  Operation,
  Compass,
  Document
} from '@element-plus/icons-vue'

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板！')
  } catch (err) {
    ElMessage.error('复制失败，请手动选取复制')
  }
}
</script>

<style scoped>
.mixed-framework-container {
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
  background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
}

.header-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #0369a1;
  background: #bae6fd;
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
  margin: 0 0 10px 0;
  color: #334155;
  font-size: 14.5px;
  line-height: 1.65;
}

.intro-deep {
  color: #475569;
  font-size: 13.5px;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
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

/* 横向思维导图 */
.mindmap-horizontal {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #f8fafc;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.main-root {
  background: linear-gradient(135deg, #0284c7, #0369a1);
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
  text-align: center;
  writing-mode: horizontal-tb;
  letter-spacing: 1px;
}

.branch-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.branch-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.branch-bubble {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.p1-bubble { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.p2-bubble { background: linear-gradient(135deg, #f59e0b, #d97706); }
.p3-bubble { background: linear-gradient(135deg, #10b981, #059669); }

.branch-line {
  height: 2px;
  width: 20px;
  background: #cbd5e1;
}

.branch-target {
  font-size: 14px;
  color: #475569;
  font-weight: 600;
}

/* 母框架盒 */
.mother-framework-box {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.mf-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  color: #1e3a8a;
  margin-bottom: 12px;
}

.mf-formula {
  background: #ffffff;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 12px 14px;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  color: #0f172a;
  line-height: 1.6;
  margin-bottom: 12px;
}

.hl-slot {
  background: #fef3c7;
  color: #92400e;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px dashed #f59e0b;
}

.mf-notice {
  background: #ffffff;
  border-radius: 6px;
  padding: 10px 14px;
  border-left: 4px solid #3b82f6;
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
}

.notice-badge {
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 4px;
}

.mf-notice ul {
  margin: 0;
  padding-left: 18px;
}

/* 备选句 */
.sub-cases-title {
  font-weight: 700;
  font-size: 15px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.case-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.case-header {
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 13.5px;
}

.tag-pic { background: #e0f2fe; color: #0369a1; }
.tag-chart { background: #fef3c7; color: #92400e; }
.tag-text { background: #f3e8ff; color: #7e22ce; }

.case-body {
  padding: 12px 14px;
}

.case-formula {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13.5px;
  color: #0f172a;
  line-height: 1.5;
  margin-bottom: 8px;
}

.case-desc {
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
}

.chart-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
}

.ci-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ci-badge {
  font-size: 12px;
  font-weight: 700;
  color: #92400e;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 4px;
}

.ci-trans {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.4;
}

/* 策略卡片 */
.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.strategy-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.border-orange { border-top: 4px solid #f59e0b; }
.border-blue { border-top: 4px solid #3b82f6; }
.border-green { border-top: 4px solid #10b981; }
.border-purple { border-top: 4px solid #8b5cf6; }

.st-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.tag-orange-bg { background: #fef3c7; color: #92400e; }
.tag-blue-bg { background: #e0f2fe; color: #0369a1; }
.tag-green-bg { background: #d1fae5; color: #065f46; }
.tag-purple-bg { background: #ede9fe; color: #5b21b6; }

.strategy-card h4 {
  margin: 0 0 8px 0;
  font-size: 15px;
  color: #1e293b;
}

.strategy-card p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
}

.strategy-card ul {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
}

.strategy-card li {
  margin-bottom: 4px;
}

/* 考题示例 */
.exam-example-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
}

.exam-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #0f172a;
  margin-bottom: 12px;
}

.exam-directions {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 12px;
}

.dir-title {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.dir-content {
  font-family: 'Consolas', monospace;
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
}

.exam-tips {
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  background: #f1f5f9;
  padding: 8px 12px;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .mindmap-branch-tree {
    flex-direction: column !important;
    gap: 16px !important;
  }

  .branch-node-root {
    writing-mode: horizontal-tb !important;
    letter-spacing: 1px !important;
    padding: 10px 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .branch-leaves-grid {
    grid-template-columns: 1fr !important;
  }

  .pattern-card,
  .paradigm-card,
  .dimension-box {
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

  .sub-tag-group {
    flex-wrap: wrap !important;
  }
}
</style>
