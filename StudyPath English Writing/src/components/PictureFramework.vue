<template>
  <div class="picture-framework-container">
    <!-- 顶部标题与导读 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-badge">考研英语一 · 满分20分高分利器</div>
      <h2 class="book-section-title">
        <el-icon class="title-icon"><Notebook /></el-icon>
        第三章 图画作文 · 第一节 写作框架构建
      </h2>
      <p class="section-intro">
        图画作文通常以给定的漫画或照片为基础，要求考生根据图画内容进行描述、分析并发表观点。图画可能涉及社会、科技、文化等多个领域，考查考生四项核心能力：<strong>图画描述能力、内涵分析能力、现象剖析能力和深度评价能力</strong>。为了使作文有层次、有逻辑，我们通常采用<strong>三段式写作框架</strong>。
      </p>

      <div class="abilities-tags">
        <el-tag type="primary" effect="light" size="large"><el-icon><PictureFilled /></el-icon> ① 图画描述能力</el-tag>
        <el-tag type="success" effect="light" size="large"><el-icon><Compass /></el-icon> ② 内涵分析能力</el-tag>
        <el-tag type="warning" effect="light" size="large"><el-icon><DataAnalysis /></el-icon> ③ 现象剖析能力</el-tag>
        <el-tag type="danger" effect="light" size="large"><el-icon><Trophy /></el-icon> ④ 深度评价能力</el-tag>
      </div>
    </el-card>

    <!-- 思维导图总览交互卡片 -->
    <el-card class="mindmap-card" shadow="hover">
      <template #header>
        <div class="card-header-flex">
          <span class="card-title"><el-icon><Share /></el-icon> 图画作文三段式全景脑图 (Framework Blueprint)</span>
          <el-tag type="info" size="small">点击标签可快速定位各段落</el-tag>
        </div>
      </template>

      <div class="framework-tree">
        <!-- 根节点 -->
        <div class="tree-root">
          <div class="root-box">
            <span>图画作文</span>
            <small>三段式架构</small>
          </div>
        </div>

        <div class="tree-branches">
          <!-- 第一段 -->
          <div class="branch-node branch-p1" @click="activeTab = 'p1'">
            <div class="branch-header">
              <span class="branch-title">第一段：背景构筑</span>
              <span class="branch-rate">90% 经典结构</span>
            </div>
            <div class="branch-sublist">
              <div class="sub-item">
                <span class="sub-title">图画描述 (第一句)</span>
                <span class="sub-rule">框架 3 选 1</span>
                <ul class="sub-options">
                  <li>① 一个人 / 一群人动作一致</li>
                  <li>② A、B 之间发生互动</li>
                  <li>③ 双图模式（两幅图）</li>
                </ul>
              </div>
              <div class="sub-item">
                <span class="sub-title">内涵分析 (第二句)</span>
                <span class="sub-rule">框架 4 选 1</span>
                <ul class="sub-options">
                  <li>好事情 / 坏事情 / 双刃剑 / 认知差异</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 第二段 -->
          <div class="branch-node branch-p2" @click="activeTab = 'p2'">
            <div class="branch-header">
              <span class="branch-title">第二段：现象剖析</span>
              <span class="branch-rate">深度挖掘</span>
            </div>
            <div class="branch-sublist">
              <div class="sub-item">
                <span class="sub-title">承上启下过渡句</span>
                <p class="sub-desc">引出下文原因或利弊分析做铺垫</p>
              </div>
              <div class="sub-item">
                <span class="sub-title">原因/利弊剖析 (妙句 10 选 2)</span>
                <ul class="sub-options">
                  <li>个人 / 正方 / 合理使用分析</li>
                  <li>社会 / 反方 / 过度使用分析</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 第三段 -->
          <div class="branch-node branch-p3" @click="activeTab = 'p3'">
            <div class="branch-header">
              <span class="branch-title">第三段：深度评价</span>
              <span class="branch-rate">形成闭环</span>
            </div>
            <div class="branch-sublist">
              <div class="sub-item">
                <span class="sub-title">综合评价与倡议 (框架 4 选 1)</span>
                <ul class="sub-options">
                  <li>好事情：呼吁弘扬与倡议</li>
                  <li>坏事情：政府/学校/个人三维解决方案</li>
                  <li>双刃剑：取其精华、剔除糟粕</li>
                  <li>认知差异：提倡正向态度、坚决抵制错误</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 分段详细学习 Tabs -->
    <el-tabs v-model="activeTab" type="border-card" class="detail-tabs">
      <!-- 第一段：背景构筑 -->
      <el-tab-pane label="第一段：背景构筑 (第一句描图+第二句内涵)" name="p1">
        <div class="tab-pane-content">
          <div class="para-header-alert">
            <el-alert type="primary" :closable="false" show-icon>
              <template #title>
                <strong>第一段写作核心要义：</strong>
                本段由两部分组成，分别是<strong>图画描述</strong>和<strong>内涵分析</strong>。图画描述作为文章的开篇内容，关键在于通过生动的语言，准确描述图画所呈现的信息。<strong>注意：若没有特别年份标注，在描述图画时通常采用一般现在时！</strong>内涵分析要求深入挖掘图画寓意，提取关键词揭示全文主旨。
              </template>
            </el-alert>
          </div>

          <!-- 第一段第一句：图画描述 3 选 1 -->
          <div class="section-block">
            <h3 class="block-title">
              <el-tag type="primary" size="large">第一句</el-tag>
              图画描述 · 框架 3 选 1
            </h3>

            <!-- 描图口诀卡片 -->
            <div class="chant-box">
              <div class="chant-header">
                <el-icon><StarFilled /></el-icon> <strong>金牌描图口诀（动笔前中文串联，水到渠成）</strong>
              </div>
              <p class="chant-text">
                “如图所示，那儿有某人，在某地站着/坐着/跑着/躺着并且在干什么（核心动作），解释或修饰前面最后一个名词或整件事 / 动作的结果 / 它包含什么 / （非）伴随的状态。”
              </p>
              <div class="chant-note">手写秘诀批注：抓住“是什么 / 怎样”，动词状态先行，非谓语与从句展开！</div>
            </div>

            <el-collapse v-model="activeP1DescCollapse" accordion class="custom-collapse">
              <!-- 情况一 -->
              <el-collapse-item name="p1-desc-1">
                <template #title>
                  <div class="collapse-item-title">
                    <el-tag effect="dark" type="primary" class="mr-2">情况一</el-tag>
                    <span class="font-bold">一个人做某事，或者一群人做同样的事情 (历年考察率最高 90%)</span>
                  </div>
                </template>
                <div class="case-card-body">
                  <div class="formula-box">
                    <div class="formula-label">句型公式：</div>
                    <div class="formula-code">
                      As shown in the cartoon/picture, there be sb., doing₁ sth. and doing₂ sth., which + 定语从句 或者 with/without + 名词 / 动名词.
                    </div>
                  </div>

                  <el-table :data="p1Desc1Components" border stripe class="mt-3">
                    <el-table-column prop="term" label="语法要素 / 模块" width="260">
                      <template #default="{row}">
                        <code class="syntax-term">{{ row.term }}</code>
                      </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="功能说明与写作指导" />
                  </el-table>

                  <div class="exam-years-box">
                    <span class="exam-label"><el-icon><Collection /></el-icon> 对应历年真题：</span>
                    <el-tag v-for="y in p1Desc1Years" :key="y" class="year-tag" size="small">{{ y }}</el-tag>
                  </div>
                </div>
              </el-collapse-item>

              <!-- 情况二 -->
              <el-collapse-item name="p1-desc-2">
                <template #title>
                  <div class="collapse-item-title">
                    <el-tag effect="dark" type="success" class="mr-2">情况二</el-tag>
                    <span class="font-bold">图画主体为 A、B 双方，且 A 与 B 进行交流互动</span>
                  </div>
                </template>
                <div class="case-card-body">
                  <div class="handwriting-badge">
                    <el-icon><EditPen /></el-icon> 老师批注：A为动作激发发起人，B为动作回应者
                  </div>

                  <div class="formula-box">
                    <div class="formula-label">句型公式：</div>
                    <div class="formula-code">
                      As shown in the cartoon/picture, there be A, doing₁ sth. and doing₂ sth., while + 完整句（描述 B 的回应）.
                    </div>
                  </div>

                  <el-table :data="p1Desc2Components" border stripe class="mt-3">
                    <el-table-column prop="term" label="语法要素 / 模块" width="260">
                      <template #default="{row}">
                        <code class="syntax-term">{{ row.term }}</code>
                      </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="功能说明与写作指导" />
                  </el-table>

                  <div class="exam-years-box">
                    <span class="exam-label"><el-icon><Collection /></el-icon> 对应历年真题：</span>
                    <el-tag v-for="y in p1Desc2Years" :key="y" type="success" class="year-tag" size="small">{{ y }}</el-tag>
                  </div>
                </div>
              </el-collapse-item>

              <!-- 情况三 -->
              <el-collapse-item name="p1-desc-3">
                <template #title>
                  <div class="collapse-item-title">
                    <el-tag effect="dark" type="warning" class="mr-2">情况三</el-tag>
                    <span class="font-bold">两幅图模式（左/右对比，或上/下对比）</span>
                  </div>
                </template>
                <div class="case-card-body">
                  <div class="formula-box">
                    <div class="formula-label">句型公式：</div>
                    <div class="formula-code">
                      In the left-hand/upper cartoon/picture, there be sb., doing₁ sth. and doing₂ sth. On the contrary, in the right-hand/lower portrayal, + 右/下图描述（简单句，主谓宾）.
                    </div>
                  </div>

                  <el-table :data="p1Desc3Components" border stripe class="mt-3">
                    <el-table-column prop="term" label="语法要素 / 模块" width="260">
                      <template #default="{row}">
                        <code class="syntax-term">{{ row.term }}</code>
                      </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="功能说明与写作指导" />
                  </el-table>

                  <div class="exam-years-box">
                    <span class="exam-label"><el-icon><Collection /></el-icon> 对应历年真题：</span>
                    <el-tag v-for="y in p1Desc3Years" :key="y" type="warning" class="year-tag" size="small">{{ y }}</el-tag>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <el-divider />

          <!-- 第一段第二句：内涵分析 4 选 1 -->
          <div class="section-block">
            <h3 class="block-title">
              <el-tag type="success" size="large">第二句</el-tag>
              内涵分析 · 框架 4 选 1
            </h3>

            <div class="important-note">
              <strong>写作要领：</strong>
              <ol>
                <li>根据具体图画所传达的价值导向，从好事情、坏事情、双刃剑、认知差异中四选一。</li>
                <li>公式中的 <code>***</code> 具体内容需要根据图画内涵填入，<strong>且必须是名词性成分</strong>（名词、动名词或动名词短语）。</li>
              </ol>
            </div>

            <div class="cards-grid">
              <!-- 好事情 -->
              <el-card shadow="hover" class="pattern-card border-good">
                <template #header>
                  <div class="pattern-card-header">
                    <span class="pattern-badge badge-good">情况一：好事情</span>
                    <span class="pattern-condition">描绘社会或成长中的好风尚、好品质</span>
                  </div>
                </template>
                <div class="pattern-template">
                  <code>Evidently, the cartoonist/picture intends to convey to readers that it is <u>***</u> that play(s) an important and positive role both in our personal lives and in society.</code>
                </div>
                <div class="pattern-cn">
                  很明显，漫画作者/照片意在告诉读者，正是 *** 在我们的个人生活和社会中发挥着重要且积极的作用。
                </div>
                <div class="pattern-years">
                  <strong>对应真题：</strong>
                  <span>2001, 2002, 2004, 2008, 2010, 2013, 2014, 2021, 2023 年</span>
                </div>
              </el-card>

              <!-- 坏事情 -->
              <el-card shadow="hover" class="pattern-card border-bad">
                <template #header>
                  <div class="pattern-card-header">
                    <span class="pattern-badge badge-bad">情况二：坏事情</span>
                    <span class="pattern-condition">描绘不良现象、弊病、不好的品质</span>
                  </div>
                </template>
                <div class="pattern-template">
                  <code>Evidently, the cartoonist/picture intends to convey to readers that <u>***</u> is an issue that requires great attention both in our personal lives and in society.</code>
                </div>
                <div class="pattern-cn">
                  很明显，漫画作者/照片意在告诉读者，*** 是一个我们在个人生活和社会中都需要高度关注的问题。
                </div>
                <div class="pattern-years">
                  <strong>对应真题：</strong>
                  <span>2003, 2005, 2006, 2007, 2011 年</span>
                </div>
              </el-card>

              <!-- 双刃剑 -->
              <el-card shadow="hover" class="pattern-card border-sword">
                <template #header>
                  <div class="pattern-card-header">
                    <span class="pattern-badge badge-sword">情况三：双刃剑</span>
                    <span class="pattern-condition">事物具两面性（合理使用积极，过度使用消极）</span>
                  </div>
                </template>
                <div class="pattern-template">
                  <code>Evidently, the cartoonist/picture intends to convey to readers that it is <u>***</u> that can exert a great influence both in our personal lives and in society.</code>
                </div>
                <div class="pattern-cn">
                  很明显，漫画作者/照片意在告诉读者，正是 *** 在我们的个人生活和社会中都产生了重要影响。
                </div>
                <div class="pattern-years">
                  <strong>对应真题：</strong>
                  <span>2009, 2015 年</span>
                </div>
              </el-card>

              <!-- 认知差异 -->
              <el-card shadow="hover" class="pattern-card border-diff">
                <template #header>
                  <div class="pattern-card-header">
                    <span class="pattern-badge badge-diff">情况四：认知差异</span>
                    <span class="pattern-condition">面对相同情况，不同人反应截然不同形成对比</span>
                  </div>
                </template>
                <div class="pattern-template">
                  <code>Evidently, the cartoonist/picture intends to convey to readers that <u>***</u> is the brush that paints a bright future, while <u>***</u> is the shackle that hinders progress.</code>
                </div>
                <div class="pattern-cn">
                  很明显，漫画作者/照片意在告诉读者，*** 是描绘远大前程的画笔，而 *** 则是阻碍进步的枷锁。
                </div>
                <div class="pattern-years">
                  <strong>对应真题：</strong>
                  <span>2012, 2016, 2017, 2018, 2019, 2020, 2022 年</span>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 第二段：现象剖析 -->
      <el-tab-pane label="第二段：现象剖析 (过渡承接+妙句10选2)" name="p2">
        <div class="tab-pane-content">
          <div class="para-header-alert">
            <el-alert type="warning" :closable="false" show-icon>
              <template #title>
                <strong>第二段写作核心要义：</strong>
                现象剖析主要要求考生根据图画内容分析该现象产生的<strong>原因、具有的现实意义或存在的利弊</strong>，突出对现象或问题本质的深入挖掘和全面思考，展现考生的深入剖析能力。（老师手写精髓批注：<strong>全面 / 合理</strong>）
              </template>
            </el-alert>
          </div>

          <!-- 第一句过渡句 -->
          <div class="section-block">
            <h3 class="block-title">
              <el-tag type="warning" size="large">第一句</el-tag>
              承上启下过渡句
            </h3>
            <div class="p2-trans-box">
              <div class="formula-box">
                <div class="formula-label">承上启下黄金句型：</div>
                <div class="formula-code">
                  This phenomenon is thought-provoking in several ways, but two of them are particularly significant.
                </div>
                <div class="formula-trans">
                  这一现象在多个方面都引人深思，但其中两个方面尤为重要。
                </div>
              </div>
              <div class="handwriting-badge mt-2">
                <el-icon><EditPen /></el-icon> 老师批注：本句作用是承上启下，为下文的原因或利弊分析做铺垫（正反分析常搭配：缺少 lack of... / 忽视 neglecting...）
              </div>
            </div>
          </div>

          <el-divider />

          <!-- 第二句与第三句：妙句10选2 -->
          <div class="section-block">
            <h3 class="block-title">
              <el-tag type="danger" size="large">第二句 & 第三句</el-tag>
              原因 / 利弊剖析展开（妙句 10 选 2）
            </h3>

            <p class="section-subtext">
              第二句和第三句既可以从<strong>个人与社会</strong>的视角展开微观与宏观层面的分析，又可以从<strong>正方与反方</strong>这两个截然不同的维度进行利弊剖析。如此一来，可使本段的论证更为全面、客观，同时也更具说服力。
            </p>

            <div class="analysis-pairs">
              <!-- 个人与社会角度 -->
              <el-card shadow="hover" class="pair-card">
                <template #header>
                  <div class="pair-header">
                    <div class="pair-name">维度一：个人 / 社会视角（微观与宏观）</div>
                    <el-tag size="small">主流常考</el-tag>
                  </div>
                </template>
                <div class="pair-step">
                  <div class="step-badge">第2句 (个人维度)</div>
                  <code>First and foremost, + 个人角度分析.</code>
                </div>
                <div class="pair-step">
                  <div class="step-badge">第3句 (社会维度)</div>
                  <code>What is more, + 社会角度分析.</code>
                </div>
                <div class="pair-years">
                  <strong>对应历年真题：</strong> 2001, 2002, 2004, 2008, 2011, 2014, 2023 年
                </div>
              </el-card>

              <!-- 正方与反方角度 -->
              <el-card shadow="hover" class="pair-card">
                <template #header>
                  <div class="pair-header">
                    <div class="pair-name">维度二：正方 / 反方视角（对立辩证）</div>
                    <el-tag type="success" size="small">思辨性强</el-tag>
                  </div>
                </template>
                <div class="pair-step">
                  <div class="step-badge">第2句 (正方角度)</div>
                  <code>On the one hand, + 正方角度分析.</code>
                </div>
                <div class="pair-step">
                  <div class="step-badge">第3句 (反方角度)</div>
                  <code>On the other hand, + 反方角度分析.</code>
                </div>
                <div class="pair-years">
                  <strong>对应历年真题：</strong> 2003, 2005, 2007, 2010, 2012, 2013, 2016—2022 年
                </div>
              </el-card>

              <!-- 合理使用与过度使用角度 -->
              <el-card shadow="hover" class="pair-card">
                <template #header>
                  <div class="pair-header">
                    <div class="pair-name">维度三：合理使用 / 过度使用分析（双刃剑专属）</div>
                    <el-tag type="warning" size="small">科技与工具类</el-tag>
                  </div>
                </template>
                <div class="pair-step">
                  <div class="step-badge">第2句 (合理使用)</div>
                  <code>On the one hand, + 合理使用分析.</code>
                </div>
                <div class="pair-step">
                  <div class="step-badge">第3句 (过度使用)</div>
                  <code>On the other hand, + 过度使用分析.</code>
                </div>
                <div class="pair-years">
                  <strong>对应历年真题：</strong> 2006, 2009, 2015 年
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 第三段：深度评价 -->
      <el-tab-pane label="第三段：深度评价 (总结提倡+三维解决措施)" name="p3">
        <div class="tab-pane-content">
          <div class="para-header-alert">
            <el-alert type="success" :closable="false" show-icon>
              <template #title>
                <strong>第三段写作核心要义：</strong>
                作为全文最后一段，需要针对图画中涉及的社会现象或问题展开<strong>综合评价</strong>。同时，要与前文呼应，从而使整篇文章的论述形成一个<strong>闭环</strong>。
              </template>
            </el-alert>
          </div>

          <div class="p3-cases-accordion">
            <!-- 深度评价 情况一 -->
            <el-card shadow="hover" class="p3-card mb-4 border-good">
              <template #header>
                <div class="p3-card-header">
                  <span class="p3-title"><el-tag type="success">情况一</el-tag> 好事情：积极倡议与弘扬正能量</span>
                  <span class="p3-desc">适用于：好风尚、传统美德、奋斗精神、良好习惯</span>
                </div>
              </template>
              <div class="p3-formula-wrap">
                <div class="formula-code">
                  In brief, <u>***</u> is the catalyst for societal and personal development, from which we all stand to benefit. Therefore, we should actively support and advocate this quality/practice / we should actively promote and carry forward traditional culture. Only by doing so can we develop individual potential / fulfill our aspirations / create a happier life / build a more harmonious society / make our world shine with renewed brilliance.
                </div>
                <div class="formula-trans">
                  简而言之，*** 是社会和个人发展的推进器（催化剂），我们必将是其受益者。因此，我们应该积极支持和倡导这种品质/做法（行为） / 我们应该积极弘扬传统文化，只有这样我们才能够激发个人潜能 / 实现人生抱负 / 创造更幸福的生活 / 构筑更和谐的社会 / 令我们的世界焕发新的光彩。
                </div>
                <div class="handwriting-badge mt-2">
                  <el-icon><EditPen /></el-icon> 老师批注：catalyst=催化剂、推进器；practice=行为、做法；Only by doing so 采用倒装句提分！
                </div>
                <div class="p3-years">
                  <strong>对应真题：</strong> 2001, 2002, 2004, 2008, 2010, 2013, 2014, 2021, 2023 年
                </div>
              </div>
            </el-card>

            <!-- 深度评价 情况二 -->
            <el-card shadow="hover" class="p3-card mb-4 border-bad">
              <template #header>
                <div class="p3-card-header">
                  <span class="p3-title"><el-tag type="danger">情况二</el-tag> 坏事情：设问破局 + 三维度一揽子解决方案</span>
                  <span class="p3-desc">适用于：社会不良现象、沉迷网络、诚信缺失、手机依赖等</span>
                </div>
              </template>
              <div class="p3-formula-wrap">
                <div class="formula-code">
                  How can we put an end to the problem of <u>***</u>? It is suggested by many that we need a package deal, including doing₁ sth. and doing₂ sth. But would these measures be comprehensive enough? In reality, we also need to do sth. With the support of these measures, we can effectively tackle the issue at its core.
                </div>
                <div class="formula-trans">
                  我们如何才能解决 *** 问题？很多人建议，我们需要一揽子方案，包括做某事和做某事。但这些措施是否足够全面呢？实际上，我们还需要做某事。借助这些措施，我们可以有效地从根本上解决这个问题。
                </div>

                <!-- 政府/学校/个人 三维度具体措施库 -->
                <div class="solutions-library mt-3">
                  <div class="sol-title"><el-icon><Suitcase /></el-icon> 解决措施语料库（填入 doing₁ / doing₂ / do sth.）</div>
                  <el-row :gutter="16">
                    <el-col :span="8">
                      <div class="dimension-col">
                        <div class="dim-head gov-head"><el-icon><OfficeBuilding /></el-icon> 政府维度 (Government)</div>
                        <ul class="dim-list">
                          <li>
                            <span class="cn">(1) 颁布相关法律/规定</span>
                            <code class="en">issue related laws/regulations</code>
                          </li>
                          <li>
                            <span class="cn">(2) 加强监管</span>
                            <code class="en">enhance supervision</code>
                          </li>
                          <li>
                            <span class="cn">(3) 加强媒体舆论引导</span>
                            <code class="en">strengthen the guiding role of the media in public opinion</code>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="dimension-col">
                        <div class="dim-head school-head"><el-icon><School /></el-icon> 学校维度 (School)</div>
                        <ul class="dim-list">
                          <li>
                            <span class="cn">(1) 加强道德教育</span>
                            <code class="en">strengthen moral education</code>
                          </li>
                          <li>
                            <span class="cn">(2) 帮助学生培养合理价值观</span>
                            <code class="en">help students cultivate more rational values</code>
                          </li>
                          <li>
                            <span class="cn">(3) 鼓励家长积极采取行动</span>
                            <code class="en">encourage parents to take action actively</code>
                          </li>
                          <li>
                            <span class="cn">(4) 给学生灌输 *** 思想</span>
                            <code class="en">instill the idea of *** into students</code>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="dimension-col">
                        <div class="dim-head self-head"><el-icon><User /></el-icon> 个人维度 (Individual)</div>
                        <ul class="dim-list">
                          <li>
                            <span class="cn">(1) 有意识培养品质/美德</span>
                            <code class="en">foster the quality/virtue of *** deliberately</code>
                          </li>
                          <li>
                            <span class="cn">(2) 加强自我约束</span>
                            <code class="en">strengthen self-discipline</code>
                          </li>
                          <li>
                            <span class="cn">(3) 培养理性思维</span>
                            <code class="en">cultivate rational thinking</code>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="p3-years mt-3">
                  <strong>对应真题：</strong> 2003, 2005, 2006, 2007, 2011 年
                </div>
              </div>
            </el-card>

            <!-- 深度评价 情况三 -->
            <el-card shadow="hover" class="p3-card mb-4 border-sword">
              <template #header>
                <div class="p3-card-header">
                  <span class="p3-title"><el-tag type="warning">情况三</el-tag> 双刃剑：取其精华，剔除糟粕</span>
                  <span class="p3-desc">适用于：网络利弊、AI技术、兼职利弊等</span>
                </div>
              </template>
              <div class="p3-formula-wrap">
                <div class="formula-code">
                  Therefore, <u>***</u>, which is a pervasive social phenomenon, is a double-edged sword which can have a profoundly positive or negative influence on the development of young people. When facing this phenomenon, we need to extract its essence while eliminating its drawbacks, delving into how to maximize the positive impact and effectively mitigate or alleviate the negative aspects.
                </div>
                <div class="formula-trans">
                  因此，***，这一普遍存在的社会现象，是一把双刃剑，可以对年轻人的发展产生深刻的积极或消极影响。在面对这一现象时，我们需要在取其精华的同时剔除其糟粕，深入剖析如何最大程度地发挥其积极影响，同时有效地减轻或缓解其消极影响。
                </div>
                <div class="handwriting-badge mt-2">
                  <el-icon><EditPen /></el-icon> 核心提分搭配：pervasive 普遍存在的；extract its essence while eliminating its drawbacks 取其精华去其糟粕；mitigate or alleviate 缓解减轻
                </div>
                <div class="p3-years">
                  <strong>对应真题：</strong> 2009, 2015 年
                </div>
              </div>
            </el-card>

            <!-- 深度评价 情况四 -->
            <el-card shadow="hover" class="p3-card mb-4 border-diff">
              <template #header>
                <div class="p3-card-header">
                  <span class="p3-title"><el-tag type="info">情况四</el-tag> 认知差异：扬正气、抑谬误</span>
                  <span class="p3-desc">适用于：心态对比、悲观与乐观、不同选择等</span>
                </div>
              </template>
              <div class="p3-formula-wrap">
                <div class="formula-code">
                  In brief, <u>***</u> is the catalyst for societal and personal development, from which we all stand to benefit. Therefore, we should actively support and advocate this quality/practice / we should actively promote and carry forward traditional culture; additionally, we must be acutely aware of the detrimental effects of <u>***</u> to ensure our growth stays on course.
                </div>
                <div class="formula-trans">
                  简而言之，*** 是社会和个人发展的推进器，我们必将是其受益者。因此，我们应该积极支持和倡导这种品质/做法 / 我们应该积极弘扬传统文化；此外，我们必须敏锐地意识到 *** 的不利影响，让成长的列车不偏离方向。
                </div>
                <div class="handwriting-badge mt-2">
                  <el-icon><EditPen /></el-icon> 批注：倡导积极态度与正向做法，坚决抵制消极态度和错误行为；ensure our growth stays on course 绝妙比喻！
                </div>
                <div class="p3-years">
                  <strong>对应真题：</strong> 2012, 2016, 2017, 2018, 2019, 2020, 2022 年
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

      <!-- 快速自测与真题矩阵检索 -->
      <el-tab-pane label="历年真题框架对照表 (2001-2023)" name="matrix">
        <div class="tab-pane-content">
          <div class="matrix-header">
            <h3><el-icon><Grid /></el-icon> 历年考研英语一图画作文框架归类全景表</h3>
            <p>通过下方表格，可反向查阅历年考研大作文题目所匹配的第一段描图情况、内涵分类与第二/三段策略：</p>
          </div>

          <el-table :data="examYearMatrix" border stripe style="width: 100%">
            <el-table-column prop="year" label="真题年份" width="110" align="center" sortable>
              <template #default="{row}">
                <el-tag effect="dark" type="primary">{{ row.year }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="topic" label="考题主题" width="180">
              <template #default="{row}">
                <strong>{{ row.topic }}</strong>
              </template>
            </el-table-column>
            <el-table-column prop="p1Desc" label="第一段描图 (3选1)" width="180">
              <template #default="{row}">
                <el-tag size="small" :type="row.p1DescTag">{{ row.p1Desc }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="p1Meaning" label="第一段内涵 (4选1)" width="160">
              <template #default="{row}">
                <el-tag size="small" :type="row.p1MeaningTag">{{ row.p1Meaning }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="p2Angle" label="第二段剖析角度" width="160" />
            <el-table-column prop="p3Type" label="第三段评价模式" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Notebook,
  PictureFilled,
  Compass,
  DataAnalysis,
  Trophy,
  Share,
  StarFilled,
  EditPen,
  Collection,
  Suitcase,
  OfficeBuilding,
  School,
  User,
  Grid
} from '@element-plus/icons-vue'

const activeTab = ref('p1')
const activeP1DescCollapse = ref(['p1-desc-1'])

// 情况一组件解析
const p1Desc1Components = [
  { term: 'As shown in the cartoon/picture', desc: '固定开头状语，意为“如漫画/照片所示”，定下文章客观描述基调。' },
  { term: 'there be sb.', desc: '表示“那儿有某人”，sb. 作逻辑主语，可以表示单个人或一群人。' },
  { term: 'doing₁ sth. and doing₂ sth.', desc: '两个并列的动词短语。doing₁ sth. 描述 sb. 的位置或静态姿势（如 standing 在某地站着、sitting 坐着、running 跑着、lying 躺着）；doing₂ sth. 描述 sb. 正在进行的核心动态行为，为后续主题文本提供衔接。' },
  { term: 'which + 定语从句', desc: 'which 引导的非限制性定语从句，既可以是对前面最后一个 sth. 的解释或修饰，也可以是对前面整句事实的补充说明，使画面细节丰满翔实。' },
  { term: 'with/without + 名词/动名词', desc: '介词短语充当伴随状语，描述主体所携带的物品、心情或（非）伴随的状态。' }
]
const p1Desc1Years = ['2001', '2002', '2004', '2008', '2009', '2010', '2011', '2013', '2015', '2018']

// 情况二组件解析
const p1Desc2Components = [
  { term: 'As shown in the cartoon/picture', desc: '如漫画/照片所示。' },
  { term: 'there be A', desc: '表示那儿有 A，此处个体 A 为率先发起交流、对话或动作激发的个体（动作发起者）。' },
  { term: 'doing₁ sth. and doing₂ sth.', desc: 'doing₁ sth. 描述 A 的位置或姿势（站/坐/跑/躺）；doing₂ sth. 描述 A 说了什么话或发起了什么具体行为。' },
  { term: 'while + 完整句（描述 B 的回应）', desc: 'while 在此表示对比转折，相当于中文的“然而/而”。接完整主谓宾句子，生动刻画动作回应者 B 的反应、回话或神情动作。' }
]
const p1Desc2Years = ['2005', '2007', '2012', '2019', '2021', '2022', '2023']

// 情况三组件解析
const p1Desc3Components = [
  { term: 'In the left-hand / upper cartoon', desc: '如左边/上方漫画所示，精准指引视线位置。' },
  { term: 'there be sb., doing₁ sth. and doing₂ sth.', desc: '描述左图/上图中的人物及其核心动作与姿态。' },
  { term: 'On the contrary', desc: '“与此相反”，承接强烈的对比逻辑转折。' },
  { term: 'in the right-hand / lower portrayal', desc: '如右边/下方图画所描绘。' },
  { term: '右/下图描述（简单句，主谓宾）', desc: '由于考场篇幅和时间有限，右图/下图无需过分复杂展开，采用主谓宾明晰的简单句点明对比事实即可。' }
]
const p1Desc3Years = ['2003', '2006', '2014', '2016', '2017', '2020']

// 历年真题框架对照矩阵
const examYearMatrix = [
  { year: '2023', topic: '坚持与勇气 / 漫漫求学路', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：积极倡议与弘扬' },
  { year: '2022', topic: '面对困难的选择（爬山）', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：扬正气、抑谬误' },
  { year: '2021', topic: '传统文化走向世界 / 父子对话', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '正方/反方分析', p3Type: '情况一：弘扬传统文化' },
  { year: '2020', topic: '习惯与规划（先苦后甜 vs 拖延）', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：扬正气、抑谬误' },
  { year: '2019', topic: '求学途中的艰难与意志', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：认知引导' },
  { year: '2018', topic: '大学生选课与专注', p1Desc: '情况一：单人/众人', p1DescTag: 'primary', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：扬正气、抑谬误' },
  { year: '2017', topic: '书籍之争 / 传统阅读 vs 电子快餐', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：认知引导' },
  { year: '2016', topic: '携手同行 / 榜样力量', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：认知引导' },
  { year: '2015', topic: '手机低头族（聚餐看手机）', p1Desc: '情况一：众人一致', p1DescTag: 'primary', p1Meaning: '双刃剑', p1MeaningTag: 'warning', p2Angle: '合理使用/过度使用', p3Type: '情况三：双刃剑探究' },
  { year: '2014', topic: '相携相扶 / 尊老爱幼', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：弘扬倡导' },
  { year: '2013', topic: '半瓶水 / 悲观与乐观', p1Desc: '情况一：单人动作', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '正方/反方分析', p3Type: '情况一：积极心态倡议' },
  { year: '2012', topic: '乐观面对挫折（瓶子倒了）', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '认知差异', p1MeaningTag: 'info', p2Angle: '正方/反方分析', p3Type: '情况四：扬正气、抑谬误' },
  { year: '2011', topic: '旅途之余 / 环境垃圾', p1Desc: '情况一：单人/众人', p1DescTag: 'primary', p1Meaning: '坏事情', p1MeaningTag: 'danger', p2Angle: '个人/社会角度', p3Type: '情况二：三维解决措施' },
  { year: '2010', topic: '文化火锅 / 文化交融', p1Desc: '情况一：单图主体', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '正方/反方分析', p3Type: '情况一：弘扬倡导' },
  { year: '2009', topic: '网络的近与远（网络利弊）', p1Desc: '情况一：单图主体', p1DescTag: 'primary', p1Meaning: '双刃剑', p1MeaningTag: 'warning', p2Angle: '合理使用/过度使用', p3Type: '情况三：双刃剑探究' },
  { year: '2008', topic: '残疾人互助（你瘸我拐）', p1Desc: '情况一：两人动作一致', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：合作共赢倡议' },
  { year: '2007', topic: '自信 / 点球面前的守门员', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '坏事情 (缺乏自信)', p1MeaningTag: 'danger', p2Angle: '正方/反方分析', p3Type: '情况二：三维解决措施' },
  { year: '2006', topic: '追星之风 / 偶像崇拜', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '坏事情', p1MeaningTag: 'danger', p2Angle: '合理使用/过度使用', p3Type: '情况二：三维解决措施' },
  { year: '2005', topic: '赡养老人（三代同堂还是皮球）', p1Desc: '情况二：A、B互动', p1DescTag: 'success', p1Meaning: '坏事情', p1MeaningTag: 'danger', p2Angle: '正方/反方分析', p3Type: '情况二：三维解决措施' },
  { year: '2004', topic: '终点又是新起点', p1Desc: '情况一：单人跑步', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：积极倡议' },
  { year: '2003', topic: '温室里的花朵经不起风雨', p1Desc: '情况三：两幅图', p1DescTag: 'warning', p1Meaning: '坏事情', p1MeaningTag: 'danger', p2Angle: '正方/反方分析', p3Type: '情况二：三维解决措施' },
  { year: '2002', topic: '文化交流 / 民族的也是世界的', p1Desc: '情况一：单图展示', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：积极倡导' },
  { year: '2001', topic: '爱心是一盏灯', p1Desc: '情况一：手捧爱心', p1DescTag: 'primary', p1Meaning: '好事情', p1MeaningTag: 'success', p2Angle: '个人/社会角度', p3Type: '情况一：积极倡议' }
]
</script>

<style scoped>
.picture-framework-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-card {
  border-radius: 14px;
  background: linear-gradient(135deg, #f8faff 0%, #eef4fe 100%);
  border: 1px solid #d0e2ff;
  position: relative;
  overflow: hidden;
}

.header-badge {
  display: inline-block;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
  box-shadow: 0 2px 6px rgba(255, 126, 95, 0.3);
}

.book-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 800;
  color: #1e3a8a;
  margin: 0 0 12px 0;
}

.title-icon {
  color: #2563eb;
  font-size: 26px;
}

.section-intro {
  color: #4b5563;
  line-height: 1.7;
  font-size: 14.5px;
  margin-bottom: 16px;
}

.abilities-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 思维导图 */
.mindmap-card {
  border-radius: 14px;
  border: 1px solid #e2e8f0;
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.framework-tree {
  display: flex;
  gap: 20px;
  align-items: stretch;
  overflow-x: auto;
  padding: 10px 0;
}

.tree-root {
  display: flex;
  align-items: center;
}

.root-box {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 24px 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  min-width: 100px;
  text-align: center;
}

.root-box small {
  font-size: 12px;
  opacity: 0.85;
  margin-top: 4px;
  font-weight: normal;
}

.tree-branches {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
}

.branch-node {
  border-radius: 10px;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.branch-node:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.branch-p1 {
  background: #f0fdf4;
  border-left: 5px solid #22c55e;
  border-right: 1px solid #dcfce7;
  border-top: 1px solid #dcfce7;
  border-bottom: 1px solid #dcfce7;
}

.branch-p2 {
  background: #fffbeb;
  border-left: 5px solid #f59e0b;
  border-right: 1px solid #fef3c7;
  border-top: 1px solid #fef3c7;
  border-bottom: 1px solid #fef3c7;
}

.branch-p3 {
  background: #eff6ff;
  border-left: 5px solid #3b82f6;
  border-right: 1px solid #dbeafe;
  border-top: 1px solid #dbeafe;
  border-bottom: 1px solid #dbeafe;
}

.branch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.branch-title {
  font-weight: 700;
  font-size: 15px;
  color: #1f2937;
}

.branch-rate {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
}

.branch-sublist {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13.5px;
}

.sub-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.sub-title {
  font-weight: 600;
  color: #374151;
}

.sub-rule {
  font-size: 12px;
  color: #ef4444;
  background: #fee2e2;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.sub-options {
  margin: 0;
  padding-left: 18px;
  color: #4b5563;
  width: 100%;
}

.sub-desc {
  margin: 0;
  color: #6b7280;
}

/* Detail Tabs */
.detail-tabs {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tab-pane-content {
  padding: 10px 4px;
}

.para-header-alert {
  margin-bottom: 20px;
}

.section-block {
  margin-bottom: 24px;
}

.block-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 14px;
}

/* 口诀盒子 */
.chant-box {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border: 1px solid #fed7aa;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 16px;
}

.chant-header {
  color: #c2410c;
  font-size: 14.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.chant-text {
  font-size: 14.5px;
  line-height: 1.6;
  color: #7c2d12;
  font-weight: 500;
  margin: 0 0 6px 0;
}

.chant-note {
  font-size: 12.5px;
  color: #ea580c;
  font-style: italic;
}

.collapse-item-title {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.mr-2 {
  margin-right: 8px;
}

.font-bold {
  font-weight: 600;
}

.case-card-body {
  padding: 12px 4px;
}

.formula-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 14px;
}

.formula-label {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 6px;
}

.formula-code {
  font-family: 'Consolas', 'Fira Code', Courier, monospace;
  font-size: 14.5px;
  color: #0f172a;
  background: #f1f5f9;
  padding: 10px 12px;
  border-radius: 6px;
  line-height: 1.5;
  border-left: 4px solid #3b82f6;
}

.formula-trans {
  margin-top: 8px;
  font-size: 13.5px;
  color: #475569;
  line-height: 1.5;
}

.syntax-term {
  color: #2563eb;
  font-family: monospace;
  font-weight: 600;
}

.exam-years-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  background: #fafafa;
  padding: 8px 12px;
  border-radius: 6px;
}

.exam-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
}

.year-tag {
  font-size: 12px;
}

.handwriting-badge {
  background: #fdf2f8;
  border: 1px dashed #f472b6;
  color: #db2777;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

/* 内涵分析卡片 Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 16px;
  margin-top: 14px;
}

.pattern-card {
  border-radius: 10px;
  transition: all 0.2s ease;
}

.pattern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.border-good { border-top: 4px solid #10b981; }
.border-bad { border-top: 4px solid #ef4444; }
.border-sword { border-top: 4px solid #f59e0b; }
.border-diff { border-top: 4px solid #6366f1; }

.pattern-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pattern-badge {
  font-size: 14px;
  font-weight: bold;
}

.badge-good { color: #10b981; }
.badge-bad { color: #ef4444; }
.badge-sword { color: #f59e0b; }
.badge-diff { color: #6366f1; }

.pattern-condition {
  font-size: 12px;
  color: #6b7280;
}

.pattern-template {
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13.5px;
  line-height: 1.5;
  color: #1e293b;
  margin-bottom: 8px;
}

.pattern-template u {
  color: #2563eb;
  font-weight: bold;
}

.pattern-cn {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 10px;
}

.pattern-years {
  font-size: 12px;
  color: #94a3b8;
  border-top: 1px dashed #e2e8f0;
  padding-top: 8px;
}

.important-note {
  background: #f0fdfa;
  border-left: 4px solid #14b8a6;
  padding: 10px 14px;
  border-radius: 4px;
  font-size: 13px;
  color: #0f766e;
  margin-bottom: 12px;
}

.important-note ol {
  margin: 4px 0 0 0;
  padding-left: 18px;
}

/* 第二段展开 */
.analysis-pairs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 14px;
}

.pair-card {
  border-radius: 10px;
}

.pair-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pair-name {
  font-size: 15px;
  font-weight: bold;
  color: #1e293b;
}

.pair-step {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.step-badge {
  background: #e2e8f0;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.pair-step code {
  font-family: monospace;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  flex: 1;
}

.pair-years {
  font-size: 12.5px;
  color: #64748b;
  border-top: 1px dashed #e2e8f0;
  padding-top: 8px;
  margin-top: 4px;
}

/* 第三段措施库 */
.solutions-library {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
}

.sol-title {
  font-size: 14px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dimension-col {
  background: white;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  height: 100%;
}

.dim-head {
  font-size: 13.5px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f1f5f9;
}

.gov-head { color: #2563eb; }
.school-head { color: #059669; }
.self-head { color: #d97706; }

.dim-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dim-list li {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dim-list .cn {
  font-size: 12.5px;
  color: #334155;
  font-weight: 500;
}

.dim-list .en {
  font-size: 12px;
  color: #2563eb;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
}

.p3-card {
  border-radius: 10px;
}

.p3-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p3-title {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.p3-desc {
  font-size: 12.5px;
  color: #64748b;
}

.p3-years {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 10px;
}

/* 矩阵视图 */
.matrix-header {
  margin-bottom: 14px;
}

.matrix-header h3 {
  font-size: 17px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.matrix-header p {
  color: #64748b;
  font-size: 13.5px;
  margin: 0;
}
</style>
