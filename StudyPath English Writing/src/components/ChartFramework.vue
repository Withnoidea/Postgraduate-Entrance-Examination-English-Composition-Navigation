<template>
  <div class="chart-framework-container">
    <!-- 顶部标题与导读 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-badge">考研英语二 · 满分15分提分利器</div>
      <h2 class="book-section-title">
        <el-icon class="title-icon"><DataAnalysis /></el-icon>
        第四章 图表作文 · 第一节 写作框架构建
      </h2>
      <p class="section-intro">
        对图表作文的考查，通常以<strong>柱状图、饼状图、折线图以及表格</strong>等形式为载体，要求考生对图表内容进行描述、分析并发表观点。在撰写图表作文时，为了让文章有层次、有逻辑、有深度，考生可以采用<strong>三段式写作框架</strong>：首段描述图表（2选1）→ 次段分析原因（妙句7选2）→ 尾段预测未来（2选1）。
      </p>

      <!-- 顶部高分思维脑图 -->
      <div class="mindmap-box">
        <div class="mindmap-title">
          <el-icon><Share /></el-icon>
          三段式写作框架全局思维导图
        </div>
        <div class="mindmap-tree">
          <div class="mm-root">图表作文</div>
          <div class="mm-branches">
            <div class="mm-node">
              <div class="node-badge p1">第一段</div>
              <div class="node-title">描述图表</div>
              <div class="node-tag">动态图 / 静态图 (框架2选1)</div>
            </div>
            <div class="mm-node">
              <div class="node-badge p2">第二段</div>
              <div class="node-title">分析原因</div>
              <div class="node-tag">过渡句 + 2个分析角度 + 总结 (妙句7选2)</div>
            </div>
            <div class="mm-node">
              <div class="node-badge p3">第三段</div>
              <div class="node-title">预测未来</div>
              <div class="node-tag">动态图 / 静态图 (框架2选1)</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 动态图 vs 静态图 对比认知看板 -->
    <el-card class="concept-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <el-icon class="sub-icon"><TrendCharts /></el-icon>
            图表两大核心分类标准（决定全文行文逻辑）
          </div>
          <el-tag type="danger" effect="plain" round>核心分水岭</el-tag>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <div class="chart-type-box dynamic-type">
            <div class="type-header">
              <span class="type-icon">📈</span>
              <h4>动态图（随时间推移 / 条件变化）</h4>
            </div>
            <div class="type-body">
              <p><strong>定义：</strong>指的是随着<strong>时间推移</strong>或<strong>特定条件变化</strong>而变化的图表。</p>
              <p><strong>常见载体：</strong>折线图（Line Chart）、时间序列柱状图（Bar Chart）、对比表格（Table）。</p>
              <p><strong>核心写法：</strong>描述起点到终点的变化趋势（Substantially risen / Decreased）与对比。</p>
              <el-tag size="small" type="primary">适用真题：2010~2014 / 2017 / 2019 / 2022 / 2023 英二 / 2025 英一</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="chart-type-box static-type">
            <div class="type-header">
              <span class="type-icon">🥧</span>
              <h4>静态图（特定时间点 / 占比构成）</h4>
            </div>
            <div class="type-body">
              <p><strong>定义：</strong>指的是在<strong>特定时间点或条件下</strong>呈现的图表，不具有随时间变化的特性。</p>
              <p><strong>常见载体：</strong>饼状图（Pie Chart）、单一年份多要素横向柱状图。</p>
              <p><strong>核心写法：</strong>描述百分比占比分解（Percentage breakdown），寻找最大占比项与次要项。</p>
              <el-tag size="small" type="success">适用真题：2015 / 2016 / 2018 / 2020 / 2021 / 2024 / 2025 英二</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 特色专栏：图表核心标题与注释翻译法则（近先翻、远后翻） -->
    <el-card class="translation-rule-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <el-icon class="sub-icon"><MagicStick /></el-icon>
            独家高分技法：图表标题与注释内容翻译三步法则
          </div>
          <el-tag type="warning" effect="dark">得分关键点</el-tag>
        </div>
      </template>

      <div class="tips-banner">
        <span class="tip-badge">名师手写精髓</span>
        <span>① 动态图条件允许，通常以 <code>the changes</code> 开头（坚决删除“统计/调查/图表”等套话废话）</span>
        <span style="margin-left: 15px;">② 若图表中元素众多，可在核心词前加上 <code>various / different</code></span>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <div class="step-num">Step 1</div>
          <div class="step-info">
            <h5>找到核心词（末端定位）</h5>
            <p>在注释内容中起主导作用、最为关键的单词。一旦删除核心词就会影响整个句子的理解。<strong>核心词通常置于中文注释的末端</strong>（若可数通常用复数形式）。</p>
          </div>
        </div>

        <div class="step-card">
          <div class="step-num">Step 2</div>
          <div class="step-info">
            <h5>划分意群（语义切割）</h5>
            <p>将注释内容按照语义和语法结构，把表达相对完整、意思单一的词组划分在一起（如时间、地点、主体对象）。</p>
          </div>
        </div>

        <div class="step-card">
          <div class="step-num">Step 3</div>
          <div class="step-info">
            <h5>近先翻，远后翻（倒装延伸）</h5>
            <p>从核心词开始，先翻译距离核心词<strong>最近</strong>的意群，然后逐渐向外延伸到距离较远的意群，并补充恰当介词。</p>
          </div>
        </div>
      </div>

      <!-- 实战拆解案例 -->
      <div class="case-study-box">
        <div class="case-header">
          <el-tag type="danger" effect="plain">真题实战拆解</el-tag>
          <span class="case-title">例：<strong>“20年间中国城镇人口、乡村人口变化”</strong></span>
        </div>
        <div class="case-steps">
          <div class="cs-row">
            <span class="cs-label">① 找核心词：</span>
            <span>核心词为末端的“变化”，可数名词使用 <strong>changes</strong>。</span>
          </div>
          <div class="cs-row">
            <span class="cs-label">② 划分意群：</span>
            <span>【20年间】 + 【中国】 + 【城镇人口和乡村人口】。</span>
          </div>
          <div class="cs-row">
            <span class="cs-label">③ 近先远后：</span>
            <span>从 <code>changes</code> 出发 ➔ 紧随其后翻译【城镇人口和乡村人口】 <code>in urban and rural populations</code> ➔ 接着翻译【中国】 <code>in China</code> ➔ 最后翻译【20年间】 <code>over the past 20 years</code>。</span>
          </div>
          <div class="cs-final">
            <span class="final-tag">最终高分译文：</span>
            <span class="final-en">the changes in urban and rural populations in China over the past 20 years</span>
            <el-button size="small" type="primary" plain @click="copyText('the changes in urban and rural populations in China over the past 20 years')">复制译文</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 第一段：描述图表（2选1） -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <span class="para-badge">第一段</span>
            描述图表（2-3句 · 40~50词 · 框架2选1）
          </div>
          <el-radio-group v-model="p1Mode" size="small">
            <el-radio-button label="dynamic">📈 情况一：动态图（随时间变化）</el-radio-button>
            <el-radio-button label="static">🥧 情况二：静态图（特定时间点）</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <!-- 动态图模板 -->
      <div v-if="p1Mode === 'dynamic'" class="tab-pane-content">
        <div class="case-desc-alert">
          <el-alert type="primary" :closable="false" show-icon>
            适用于折线图、时间跨度柱状图或表格。重点描绘起点数据、终点升降数值及元素对比。
          </el-alert>
        </div>

        <div class="formula-group">
          <div class="formula-block">
            <div class="f-num">句① 引出图表</div>
            <div class="f-text">
              <code>The line/bar chart/table clearly depicts <span class="slot-token">[图表上/下方注释内容的翻译]</span>.</code>
            </div>
            <div class="f-trans">该折线图/柱状图/表格清晰地描绘了 [***]。</div>
          </div>

          <div class="formula-block">
            <div class="f-num">句② 起止数值与变化幅度</div>
            <div class="f-text">
              <code>In <span class="slot-token">[时间头]</span>, the number/percentage of <span class="slot-token">[元素1]</span> was (approximately) <span class="slot-token">[数字头]</span>, but by <span class="slot-token">[时间尾]</span>, this figure/rate had substantially/gradually risen/decreased to (around) <span class="slot-token">[数字尾]</span>.</code>
            </div>
            <div class="f-trans">在起始时间点，元素1的数值/比例（约）为多少，然而到了结束时间点，这个数值/比例已经显著/缓慢增加/减少到（大约）多少。</div>
          </div>

          <div class="formula-block">
            <div class="f-num">句③ 元素2的对比/同期变动</div>
            <div class="f-text">
              <code>In contrast/Meanwhile, the number/proportion of <span class="slot-token">[元素2]</span> experienced a significant/slow increase/decline of (about) <span class="slot-token">[数字相减差额]</span> during the same period/from <span class="slot-token">[时间1]</span> to <span class="slot-token">[时间2]</span>.</code>
            </div>
            <div class="f-trans">相比之下/与此同时，在相同的时段/从时间1到时间2，元素2的数值/比例急剧/缓慢增长/下降了（约）多少（两点对应数字相减结果）。</div>
          </div>

          <div class="formula-block">
            <div class="f-num">句④ 元素3保持平稳（可选补充）</div>
            <div class="f-text">
              <code>Simultaneously, the number/percentage of <span class="slot-token">[元素3]</span> remained stable and steady.</code>
            </div>
            <div class="f-trans">与此同时，元素3的数值/比例保持稳定。</div>
          </div>
        </div>

        <div class="copy-bar">
          <el-button type="primary" size="default" @click="copyDynamicP1">
            <el-icon><DocumentCopy /></el-icon> 复制动态图第1段完整模板
          </el-button>
          <span class="exam-tag">真题溯源：2010~2014 / 2017 / 2019 / 2022 / 2023 英二 / 2025 英一</span>
        </div>
      </div>

      <!-- 静态图模板 -->
      <div v-else class="tab-pane-content">
        <div class="case-desc-alert">
          <el-alert type="success" :closable="false" show-icon>
            适用于饼状图或单一年份多类别数据。重点先呈现第一大占比项，再列举次要构成要素。
          </el-alert>
        </div>

        <div class="formula-group">
          <div class="formula-block">
            <div class="f-num">句① 引入图表占比</div>
            <div class="f-text">
              <code>The pie/bar chart clearly displays the percentage breakdown of <span class="slot-token">[图表上/下方注释内容的翻译]</span>.</code>
            </div>
            <div class="f-trans">该饼状图/柱状图清晰地展示了 [***] 的百分比分析结果。</div>
          </div>

          <div class="formula-block">
            <div class="f-num">句② 龙头项与次席项</div>
            <div class="f-text">
              <code><span class="slot-token">[元素A]</span> takes the lead at <span class="slot-token">[a%]</span>, followed by <span class="slot-token">[元素B]</span> at <span class="slot-token">[b%]</span>.</code>
            </div>
            <div class="f-trans">元素A占比最大，为 a%，其次是元素B，占比为 b%。</div>
          </div>

          <div class="formula-block">
            <div class="f-num">句③ 其他要素罗列</div>
            <div class="f-text">
              <code>Additionally, factors such as <span class="slot-token">[元素C]</span>, <span class="slot-token">[元素D]</span>, and <span class="slot-token">[元素E]</span> are also considered, accounting for <span class="slot-token">[c%]</span>, <span class="slot-token">[d%]</span>, and <span class="slot-token">[e%]</span>, respectively.</code>
            </div>
            <div class="f-trans">此外，例如元素C、元素D和元素E等也被考虑其中/包含在内，它们分别占据 c%、d% 和 e%。</div>
          </div>
        </div>

        <div class="copy-bar">
          <el-button type="success" size="default" @click="copyStaticP1">
            <el-icon><DocumentCopy /></el-icon> 复制静态图第1段完整模板
          </el-button>
          <span class="exam-tag">真题溯源：2015 / 2016 / 2018 / 2020 / 2021 / 2024 / 2025 英二</span>
        </div>
      </div>
    </el-card>

    <!-- 第二段：分析原因（过渡句 + 2个原因 + 总结句） -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <span class="para-badge">第二段</span>
            分析原因（3-4句 · 80~100词 · 承上启下+两大视角+总结）
          </div>
          <el-tag type="info">四步严密论证逻辑</el-tag>
        </div>
      </template>

      <div class="analysis-steps-grid">
        <div class="step-box">
          <div class="sb-header">
            <span class="sb-num">第1句</span>
            <span class="sb-title">承上启下过渡句</span>
          </div>
          <div class="sb-content">
            <code>The core reasons for the observed phenomenon can be summarized as follows.</code>
            <p>导致上述现象出现的根本原因可以总结如下。（为下文分析铺垫，逻辑严密紧凑）</p>
          </div>
        </div>

        <div class="step-box">
          <div class="sb-header">
            <span class="sb-num">第2句</span>
            <span class="sb-title">展开角度一分析</span>
          </div>
          <div class="sb-content">
            <code>To start with, <span class="slot-token">[角度一原因分析：个人/政策/经济]</span>.</code>
            <p>首先，从角度一展开剖析。（代入锦囊妙句或切中趋势的关键归因）</p>
          </div>
        </div>

        <div class="step-box">
          <div class="sb-header">
            <span class="sb-num">第3句</span>
            <span class="sb-title">展开角度二分析</span>
          </div>
          <div class="sb-content">
            <code>In addition, <span class="slot-token">[角度二原因分析：社会/文化/技术]</span>.</code>
            <p>此外/其次，从角度二展开更深层次的探究。</p>
          </div>
        </div>

        <div class="step-box">
          <div class="sb-header">
            <span class="sb-num">第4句</span>
            <span class="sb-title">段落总结句（呼应图表）</span>
          </div>
          <div class="sb-content">
            <code>Considering these factors, the depicted phenomenon in the chart/table is unsurprising.</code>
            <p>考虑到这些因素，图表/表格中呈现的现象并不令人意外。（呼应图表趋势，闭环有力）</p>
          </div>
        </div>
      </div>

      <!-- 角度选择策略指南 -->
      <div class="angles-guide">
        <div class="ag-title">
          <el-icon><Compass /></el-icon> 考场如何选择第二段分析角度？
        </div>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12">
            <div class="angle-card">
              <div class="ac-head">
                <h5>角度策略 A：个人 / 社会角度</h5>
                <el-tag size="small" type="primary">少元素 / 大趋势</el-tag>
              </div>
              <p>当图表涉及的元素相对较少、核心变化显著时（如大学生兼职、手机阅读时长），适合从个人内在诉求与宏观社会环境双向发力。</p>
              <div class="ac-exams">适用真题：2010 / 2011 / 2013 / 2014 / 2023 英二 / 2025 英一</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="angle-card">
              <div class="ac-head">
                <h5>角度策略 B：核心元素角度</h5>
                <el-tag size="small" type="success">多元素 / 结构分布</el-tag>
              </div>
              <p>当图表中包含多个元素、涉及多方面信息时（如不同消费结构、多种交通方式占比），紧抓占比最大或增速最显著的核心元素聚焦突破。</p>
              <div class="ac-exams">适用真题：2012 / 2015~2022 / 2024 / 2025 英二</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="copy-bar">
        <el-button type="primary" plain @click="copyP2Template">
          <el-icon><DocumentCopy /></el-icon> 复制第二段框架模板
        </el-button>
      </div>
    </el-card>

    <!-- 锦囊妙句专栏（先期集成锦囊妙句 1：政府努力） -->
    <el-card class="golden-sentence-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <el-icon class="sub-icon"><StarFilled style="color: #f59e0b;" /></el-icon>
            第二节 7个锦囊妙句 · 精华示范（妙句 1：政府努力与宏观投入）
          </div>
          <el-tag type="warning" effect="plain">百搭高分万能句</el-tag>
        </div>
      </template>

      <div class="gs-intro">
        考研图表作文的本质是分析和评价社会发展过程或生活中的现象变化。这7个锦囊妙句覆盖<strong>政府努力、态度转变、面临压力、优秀品质、习惯变化、产业进步和疫情影响</strong>七大支柱维度。以下为最核心的「政府努力」句型：
      </div>

      <div class="gs-box">
        <div class="gs-cn">
          <strong>中文思路：</strong>作为奏响变革乐章的指挥家，我们的政府付出巨大努力：<br>
          ① 建立了健全的教育体系，使得大学生能够有充足的机会继续深造。/<br>
          ② 促进经济增长并提高人民的购买力，使得人们能够负担得起曾经认为很昂贵的汽车。/<br>
          ③ 建造孔子学院来保护和弘扬中国的传统文化。
        </div>

        <div class="gs-en">
          <code>
            As the conductor orchestrating the symphony of changes, our government has made tremendous efforts to <br>
            <span class="branch-num">①</span> build a sound education system, enabling university students to have ample opportunities for further education. / <br>
            <span class="branch-num">②</span> drive economic growth and elevate the purchasing power of the populace, allowing them to afford automobiles that were previously deemed luxury items. / <br>
            <span class="branch-num">③</span> establish the Confucius Institutes, which serve as a means of preserving and promoting our traditional culture.
          </code>
        </div>

        <div class="gs-analysis">
          <strong>【句法语法精析】：</strong>
          <ul>
            <li>句首 <code>As the conductor orchestrating the symphony of changes</code> 使用了华丽的比喻（把政府比喻为变革交响乐的指挥家），其中 <code>orchestrating ...</code> 为现在分词短语作后置定语。</li>
            <li>主干结构 <code>... has/have made tremendous efforts to do sth.</code> 是表述国家、政府或相关部门宏观发力的顶级句型。</li>
            <li>后半句的 <code>enabling ...</code> / <code>allowing ...</code> 为现在分词作伴随状语，地道表达举措带来的深远成效。</li>
          </ul>
        </div>

        <div class="copy-bar">
          <el-button type="warning" size="small" @click="copyText('As the conductor orchestrating the symphony of changes, our government has made tremendous efforts to build a sound education system, enabling university students to have ample opportunities for further education.')">
            复制版本①（教育深造）
          </el-button>
          <el-button type="warning" size="small" @click="copyText('As the conductor orchestrating the symphony of changes, our government has made tremendous efforts to drive economic growth and elevate the purchasing power of the populace, allowing them to afford automobiles that were previously deemed luxury items.')">
            复制版本②（经济与消费力）
          </el-button>
          <el-button type="warning" size="small" @click="copyText('As the conductor orchestrating the symphony of changes, our government has made tremendous efforts to establish the Confucius Institutes, which serve as a means of preserving and promoting our traditional culture.')">
            复制版本③（文化传播）
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 第三段：预测未来（2选1） -->
    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <span class="para-badge">第三段</span>
            预测未来（2-3句 · 40~50词 · 框架2选1）
          </div>
          <el-radio-group v-model="p3Mode" size="small">
            <el-radio-button label="dynamic">📈 动态图未来预测（稳增/续减）</el-radio-button>
            <el-radio-button label="static">🥧 静态图未来展望（微观缩影/保持稳定）</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <!-- 动态图第三段 -->
      <div v-if="p3Mode === 'dynamic'" class="tab-pane-content">
        <div class="formula-group">
          <div class="formula-block">
            <div class="f-num">动态图趋势展望模板句</div>
            <div class="f-text">
              <code>
                What about future trends? I am confident that the number/proportion of <span class="slot-token">[某元素]</span> (is a clear sign of social improvement and) will steadily increase in the following decades. In contrast, the number/proportion of <span class="slot-token">[某元素]</span> will likely continue to decrease/remain relatively stable.
              </code>
            </div>
            <div class="f-trans">
              未来的趋势会是什么呢？我坚信 [某元素] 的数量/比例（是社会进步的标志，并且）将在接下来的几十年里稳步增长。相比之下，[某元素] 的数量/比例可能会继续减少/保持相对稳定。
            </div>
          </div>
        </div>

        <div class="copy-bar">
          <el-button type="primary" size="default" @click="copyDynamicP3">
            <el-icon><DocumentCopy /></el-icon> 复制动态图第3段模板
          </el-button>
          <span class="exam-tag">真题溯源：2010~2014 / 2017 / 2019 / 2022 / 2023 英二 / 2025 英一</span>
        </div>
      </div>

      <!-- 静态图第三段 -->
      <div v-else class="tab-pane-content">
        <div class="formula-group">
          <div class="formula-block">
            <div class="f-num">静态图趋势展望模板句</div>
            <div class="f-text">
              <code>
                What about future trends? I am confident that the above statistical figures accurately and truthfully reflect the choices of <span class="slot-token">[*** (人)]</span>, serving as a microcosm of the changes in the era, and will likely remain relatively stable in the following decades.
              </code>
            </div>
            <div class="f-trans">
              未来的趋势会是什么呢？我坚信上述统计数字准确而真实地反映了 [***] 的选择，是时代变迁的一个缩影，并且将继续在未来几十年保持相对稳定。
            </div>
          </div>
        </div>

        <div class="copy-bar">
          <el-button type="success" size="default" @click="copyStaticP3">
            <el-icon><DocumentCopy /></el-icon> 复制静态图第3段模板
          </el-button>
          <span class="exam-tag">真题溯源：2015 / 2016 / 2018 / 2020 / 2021 / 2024 / 2025 英二</span>
        </div>
      </div>
    </el-card>

    <!-- 历年真题对应考点检索表 -->
    <el-card class="matrix-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <div class="card-header-title">
            <el-icon class="sub-icon"><Calendar /></el-icon>
            2010 ~ 2025 年全国考研英语图表作文类型全景对照表
          </div>
        </div>
      </template>

      <el-table :data="examYearMatrix" border stripe style="width: 100%">
        <el-table-column prop="category" label="分类场景" width="130" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.type">{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="图表特征与主要考点" width="220" />
        <el-table-column prop="years" label="历年真题覆盖年份" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  DataAnalysis,
  Share,
  TrendCharts,
  MagicStick,
  Compass,
  StarFilled,
  DocumentCopy,
  Calendar
} from '@element-plus/icons-vue'

const p1Mode = ref('dynamic')
const p3Mode = ref('dynamic')

const examYearMatrix = [
  {
    category: '动态图',
    type: 'primary',
    desc: '时间跨度折线图、柱状图、对比表格',
    years: '2010年（手机话费与宽带）、2011年（国内轿车销量）、2012年（员工满意度）、2013年（大学生兼职）、2014年（城乡人口变化）、2017年（博物馆数量与游客）、2019年（本科生毕业去向）、2022年（快递业务量）、2023年（居民体检率）、2025年英语（一）真题'
  },
  {
    category: '静态图',
    type: 'success',
    desc: '特定年份饼状图、单一年份类别占比图',
    years: '2015年（春节假期花销构成）、2016年（高校学生旅行目的）、2018年（消费者选餐考量）、2020年（手机阅读动机）、2021年（运动习惯调查）、2024年（知识获取途径）、2025年英语（二）真题'
  }
]

const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('已复制到剪贴板！')
  }).catch(() => {
    ElMessage.error('复制失败，请手动选择复制')
  })
}

const copyDynamicP1 = () => {
  const tpl = `The [line/bar chart/table] clearly depicts [the changes in ... over the past ... years]. In [起始时间], the [number/percentage] of [元素1] was [数字头], but by [结束时间], this figure had substantially risen/decreased to [数字尾]. In contrast/Meanwhile, the proportion of [元素2] experienced a significant increase/decline of about [差额] during the same period. Simultaneously, the percentage of [元素3] remained stable and steady.`
  copyText(tpl)
}

const copyStaticP1 = () => {
  const tpl = `The [pie/bar chart] clearly displays the percentage breakdown of [***]. [元素A] takes the lead at [a%], followed by [元素B] at [b%]. Additionally, factors such as [元素C], [元素D], and [元素E] are also considered, accounting for [c%], [d%], and [e%], respectively.`
  copyText(tpl)
}

const copyP2Template = () => {
  const tpl = `The core reasons for the observed phenomenon can be summarized as follows. To start with, [角度一分析]. In addition, [角度二分析]. Considering these factors, the depicted phenomenon in the chart is unsurprising.`
  copyText(tpl)
}

const copyDynamicP3 = () => {
  const tpl = `What about future trends? I am confident that the number/proportion of [某元素] is a clear sign of social improvement and will steadily increase in the following decades. In contrast, the number/proportion of [某元素] will likely continue to decrease.`
  copyText(tpl)
}

const copyStaticP3 = () => {
  const tpl = `What about future trends? I am confident that the above statistical figures accurately and truthfully reflect the choices of [人群], serving as a microcosm of the changes in the era, and will likely remain relatively stable in the following decades.`
  copyText(tpl)
}
</script>

<style scoped>
.chart-framework-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.header-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
  border: 1px solid #bfdbfe;
}

.header-badge {
  display: inline-block;
  background: #2563eb;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 16px;
  margin-bottom: 10px;
}

.book-section-title {
  margin: 0 0 10px 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e3a8a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-intro {
  font-size: 14.5px;
  line-height: 1.7;
  color: #334155;
  margin: 0 0 18px 0;
}

/* 思维导图 */
.mindmap-box {
  background: #ffffff;
  border: 1px dashed #93c5fd;
  border-radius: 10px;
  padding: 16px;
}

.mindmap-title {
  font-size: 14px;
  font-weight: 600;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.mindmap-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.mm-root {
  background: #1e40af;
  color: #ffffff;
  font-weight: 700;
  padding: 8px 24px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.2);
}

.mm-branches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

.mm-node {
  flex: 1;
  min-width: 220px;
  max-width: 320px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.node-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  color: white;
  margin-bottom: 6px;
}
.node-badge.p1 { background: #3b82f6; }
.node-badge.p2 { background: #10b981; }
.node-badge.p3 { background: #8b5cf6; }

.node-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.node-tag {
  font-size: 12px;
  color: #64748b;
}

/* 分类看板 */
.concept-card, .translation-rule-card, .section-card, .golden-sentence-card, .matrix-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.card-header-title {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-type-box {
  padding: 16px;
  border-radius: 10px;
  height: 100%;
  box-sizing: border-box;
}

.dynamic-type {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.static-type {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.type-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.type-header h4 {
  margin: 0;
  font-size: 16px;
  color: #1e293b;
}

.type-icon {
  font-size: 20px;
}

.type-body p {
  margin: 6px 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #334155;
}

/* 翻译法则看板 */
.tips-banner {
  background: #fffbeb;
  border: 1px solid #fde68a;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13.5px;
  color: #92400e;
  margin-bottom: 16px;
  line-height: 1.6;
}

.tip-badge {
  background: #d97706;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 8px;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.step-card {
  display: flex;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.step-num {
  font-size: 13px;
  font-weight: 800;
  color: #2563eb;
  background: #dbeafe;
  padding: 4px 8px;
  border-radius: 6px;
  height: fit-content;
}

.step-info h5 {
  margin: 0 0 6px 0;
  font-size: 14px;
  color: #1e293b;
}

.step-info p {
  margin: 0;
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.5;
}

.case-study-box {
  background: #faf5ff;
  border: 1px solid #e9d5ff;
  border-radius: 8px;
  padding: 14px;
}

.case-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.case-title {
  font-size: 14px;
  color: #581c87;
}

.case-steps {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #374151;
}

.cs-label {
  font-weight: 600;
  color: #6b21a8;
}

.cs-final {
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px dashed #d8b4fe;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.final-tag {
  font-weight: 700;
  color: #047857;
}

.final-en {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  color: #1e40af;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 4px;
}

/* 句型区块 */
.para-badge {
  background: #0ea5e9;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
}

.formula-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.formula-block {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
}

.f-num {
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 6px;
}

.f-text code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  color: #0f172a;
  line-height: 1.6;
  display: block;
}

.slot-token {
  color: #d97706;
  background: #fef3c7;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.f-trans {
  margin-top: 6px;
  font-size: 13px;
  color: #64748b;
}

.copy-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.exam-tag {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 6px;
}

/* 第二段网格 */
.analysis-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.step-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.sb-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.sb-num {
  background: #3b82f6;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
}

.sb-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #1e293b;
}

.sb-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #1e40af;
  display: block;
  margin-bottom: 4px;
  line-height: 1.5;
}

.sb-content p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.angles-guide {
  margin-top: 18px;
  padding: 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
}

.ag-title {
  font-size: 14px;
  font-weight: 700;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.angle-card {
  background: #ffffff;
  border: 1px solid #dcfce7;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 8px;
}

.ac-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ac-head h5 {
  margin: 0;
  font-size: 13.5px;
  color: #1e293b;
}

.angle-card p {
  margin: 0 0 6px 0;
  font-size: 12.5px;
  color: #475569;
  line-height: 1.5;
}

.ac-exams {
  font-size: 11.5px;
  color: #059669;
  font-weight: 600;
}

/* 锦囊妙句卡片 */
.gs-intro {
  font-size: 13.5px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 14px;
}

.gs-box {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 14px;
}

.gs-cn {
  font-size: 13.5px;
  line-height: 1.7;
  color: #78350f;
  margin-bottom: 12px;
}

.gs-en {
  background: #ffffff;
  border: 1px solid #fef3c7;
  border-radius: 6px;
  padding: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13.5px;
  color: #1e3a8a;
  line-height: 1.7;
  margin-bottom: 12px;
}

.branch-num {
  font-weight: 700;
  color: #d97706;
}

.gs-analysis {
  font-size: 12.5px;
  color: #92400e;
  line-height: 1.6;
}

.gs-analysis ul {
  margin: 6px 0 0 0;
  padding-left: 20px;
}

.gs-analysis li {
  margin-bottom: 4px;
}
</style>
