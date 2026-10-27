<template>
  <div class="practical-framework-container">
    <!-- 顶部标题与导读 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-badge">考研英语 · 小作文满分基石</div>
      <h2 class="book-section-title">
        <el-icon class="title-icon"><Document /></el-icon>
        第二章 应用文 · 第一节 写作框架构建
      </h2>
      <p class="section-intro">
        应用文是一种针对具体事务或问题、目的明确的书面表达形式，其目的通常是传达信息、解决问题、请求帮助、提供建议等。应用文的主要特点是<strong>实用性和明确性</strong>，它强调针对特定目标的有效沟通。在考研写作中，应用文考查的类型包括<strong>书信、通知、告示、纪要</strong>等。而能否巧妙地组织语言、构建严谨的框架并使用准确的格式，是决定最终得分的关键。
      </p>
    </el-card>

    <!-- 快捷四大类型 Tab 切换 -->
    <el-tabs v-model="activeTab" class="practical-tabs" type="border-card">
      
      <!-- ================= 一、书信 ================= -->
      <el-tab-pane label="✉️ 一、书信 (核心常考)" name="letter">
        <div class="tab-inner">
          <div class="sub-intro-box">
            书信是通过文字传递信息、表达感情或交流思想的载体。考研常考：建议信、推荐信、邀请信、投诉信、辞职信、感谢信、道歉信和申请信等。
            由<strong>称呼 (1分)、正文 (3段菱形, 8分)、落款 (1分)</strong> 三部分组成。
          </div>

          <!-- 1. 书信总体格式与菱形结构规范 -->
          <el-card class="format-card" shadow="never">
            <div class="card-tag">格式与评分要点</div>
            <div class="letter-layout-spec">
              <div class="spec-line sal-line">
                <span class="spec-lbl">称呼 (1分)：</span>
                <span class="spec-val">顶格书写，后加逗号 (如 <code>Dear Tom,</code> / <code>Dear Mr. Smith,</code>)</span>
              </div>
              <div class="spec-diamond-box">
                <div class="diamond-badge">3段菱形结构 (8分)</div>
                <div class="d-row d-p1">第一段：铺垫背景 · 简明扼要 (约2句，中等长度)</div>
                <div class="d-row d-p2">第二段：详细展开 · 分点阐述 (3~4句，最长核心)</div>
                <div class="d-row d-p3">第三段：礼貌收尾 · 灵活组合 (1~2句，精炼收敛)</div>
              </div>
              <div class="spec-line sign-line">
                <span class="spec-lbl">落款 (1分)：</span>
                <span class="spec-val">右下方对齐 (两行：结语 + 署名，如 <code>Yours sincerely,</code> 换行 <code>Li Ming</code>)</span>
              </div>
            </div>
          </el-card>

          <!-- 2. (一) 称呼专项与避坑手写批注 -->
          <el-card class="detail-card" shadow="hover">
            <template #header>
              <div class="card-h-flex">
                <span class="h-title">（一）称呼 5大情境规范 & 手写避坑点</span>
                <el-tag type="danger" effect="plain" round>高频扣分雷区</el-tag>
              </div>
            </template>

            <!-- 避坑提醒条 -->
            <div class="pitfall-box">
              <div class="pit-title">✍️ 阅卷手写批注避坑指南：</div>
              <div class="pit-items">
                <div class="pit-item">
                  <span class="pit-err">Dear friends ❌</span>
                  <el-icon><Right /></el-icon>
                  <span class="pit-ok">Dear Friends, ✔️</span>
                  <span class="pit-note">(首字母必须大写，句末必须加逗号)</span>
                </div>
                <div class="pit-item">
                  <span class="pit-err">Dear tom, ❌</span>
                  <el-icon><Right /></el-icon>
                  <span class="pit-ok">Dear Tom, ✔️</span>
                  <span class="pit-note">(专有名词首字母大写)</span>
                </div>
                <div class="pit-item">
                  <span class="pit-err">Dear Jordan ❌ / Michael Jordan ❌</span>
                  <el-icon><Right /></el-icon>
                  <span class="pit-ok">Dear Michael, ✔️ (直呼其名) 或 Dear Mr. Jordan, ✔️ (称谓+姓氏)</span>
                </div>
              </div>
            </div>

            <!-- 5大情境称呼表格 -->
            <!-- 桌面端表格呈现 -->
            <div class="desktop-only">
              <el-table :data="salutationList" border stripe style="width: 100%; margin-top: 14px;">
                <el-table-column prop="relation" label="关系类型" width="130" />
                <el-table-column prop="formula" label="标准称呼公式" width="240">
                  <template #default="scope">
                    <span class="code-span">{{ scope.row.formula }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="desc" label="使用规则与情境释义" />
              </el-table>
            </div>

            <!-- 移动端自适应卡片流呈现（告别横滑挤压） -->
            <div class="mobile-only salutation-card-list">
              <div v-for="(item, idx) in salutationList" :key="idx" class="mobile-salutation-card">
                <div class="card-relation-badge">{{ item.relation }}</div>
                <div class="card-formula-code">{{ item.formula }}</div>
                <div class="card-desc-text">{{ item.desc }}</div>
              </div>
            </div>
          </el-card>

          <!-- 3. (二) 正文三段式全景脑图与逐句公式 -->
          <el-card class="detail-card" shadow="hover">
            <template #header>
              <div class="card-h-flex">
                <span class="h-title">（二）正文三段式公式库</span>
                <span class="h-sub">P1开篇(私信/公函2选1) ➔ P2展开(妙句分点) ➔ P3结尾(6大功能自由组合)</span>
              </div>
            </template>

            <!-- 第一段 -->
            <div class="section-block">
              <div class="block-label p1-color">
                <el-icon><Flag /></el-icon>
                <span>第一段：铺垫背景 (框架2选1)</span>
              </div>

              <!-- 情况一：私人信件 -->
              <div class="case-card">
                <div class="case-h">
                  <span class="case-badge">情况一：私人信件</span>
                  <span class="case-note">同学/朋友/家庭成员 ➔ <strong>问候致意 + 表明目的（不要自我介绍）</strong></span>
                </div>
                
                <div class="formula-group">
                  <div class="fg-title">第①句：问候致意 (去信 / 回信)</div>
                  <div class="f-item" v-for="(item, idx) in privateP1Sentence1" :key="idx">
                    <div class="f-top">
                      <span class="f-type-tag">{{ item.type }}</span>
                    </div>
                    <div class="f-en"><span v-html="renderSlotPills(item.en)"></span></div>
                    <div class="f-cn">{{ item.cn }}</div>
                  </div>

                  <div class="fg-title" style="margin-top: 14px;">第②句：表明目的</div>
                  <div class="f-item">
                    <div class="f-top">
                      <span class="f-type-tag">目的核心句</span>
                    </div>
                    <div class="f-en">My purpose of this letter/email is to <span class="slot-text">*** (改写题干)</span>.</div>
                    <div class="f-cn">我写这封信/邮件的目的是 ***。</div>
                  </div>
                </div>
              </div>

              <!-- 情况二：公务信函 -->
              <div class="case-card" style="margin-top: 14px;">
                <div class="case-h">
                  <span class="case-badge public-badge">情况二：公务信函</span>
                  <span class="case-note">同事/师长/领导/客户 ➔ <strong>问候致意 + 自我介绍 + 表明目的 (一气呵成)</strong></span>
                </div>
                <div class="f-item" style="margin-top: 10px;">
                  <div class="f-top">
                    <span class="f-type-tag">公务万能开篇</span>
                  </div>
                  <div class="f-en">
                    I hope this letter/email finds you well. I, <span class="slot-text">an ordinary consumer / a senior student [大四]</span> (个人名义) 或者 <span class="slot-text">on behalf of *** [机构(集体名义), 如 the Student Union / ABC University]</span>, am writing this letter/email to <span class="slot-text">*** (改写题干)</span>.
                  </div>
                  <div class="f-cn">
                    我希望您收到此信/邮件时一切安好。我是一名普通的消费者/是一名大四学生/代表***，写这封信/邮件的目的是***。
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二段 -->
            <div class="section-block" style="margin-top: 24px;">
              <div class="block-label p2-color">
                <el-icon><Operation /></el-icon>
                <span>第二段：分析论证 / 展开主体 (妙句19选3至4)</span>
              </div>
              <div class="case-card">
                <div class="case-note" style="margin-bottom: 10px;">
                  根据书信类型分点详细阐述问题、提出建议、说明可行措施或明确要求。<strong>句1、句2、句3分别只写一句话（有时两句），该段最多写四句</strong>。
                </div>
                <div class="f-en p2-formula">
                  First and foremost (首先), + <span class="slot-text">句1</span>. What is more (其次), + <span class="slot-text">句2</span>. Last but not least (最后), + <span class="slot-text">句3</span>.
                </div>
                <div class="tip-bar">💡 提分锦囊：可结合下节《19个锦囊妙句》进行功能填充；特殊情况下也可以不需要连接词。</div>
              </div>
            </div>

            <!-- 第三段 -->
            <div class="section-block" style="margin-top: 24px;">
              <div class="block-label p3-color">
                <el-icon><CircleCheck /></el-icon>
                <span>第三段：结尾总结 (6大功能模块自由组合)</span>
              </div>
              
              <div class="closing-grid">
                <div class="closing-item-card" v-for="(c, cidx) in closingList" :key="cidx">
                  <div class="c-h">
                    <span class="c-type">{{ c.type }}</span>
                    <el-tag size="small" type="info" effect="plain">{{ c.scene }}</el-tag>
                  </div>
                  <div class="c-en">{{ c.en }}</div>
                  <div class="c-cn">{{ c.cn }}</div>
                  <div class="c-tip">📌 {{ c.usage }}</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 4. (三) 落款 -->
          <el-card class="detail-card compact-card" shadow="hover">
            <template #header>
              <div class="card-h-flex">
                <span class="h-title">（三）落款 规范与真题排版</span>
                <el-tag type="success" effect="plain" size="small">右下对齐·标准答题纸</el-tag>
              </div>
            </template>
            
            <div class="sign-exam-container">
              <!-- 答题纸真实信纸效果（100%全宽舒展展示，不折行） -->
              <div class="sign-paper-canvas">
                <div class="paper-watermark">考研英语答题纸规范</div>
                <div class="paper-body-placeholder">
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line short"></div>
                </div>
                <div class="sign-aligned-block">
                  <div class="sign-top-phrase">Yours sincerely,</div>
                  <div class="sign-name-phrase">Li Ming / Zhang Wei</div>
                </div>
              </div>

              <!-- 核心得分要点高密度药丸/列表展示（字字干货，不挤压） -->
              <div class="sign-specs-pills">
                <div class="spec-pill-item">
                  <span class="pill-badge">📍 排版位置</span>
                  <span class="pill-desc">正文下方<strong>靠右对齐</strong>（留出适当下边距）</span>
                </div>
                <div class="spec-pill-item">
                  <span class="pill-badge">✍ 礼貌短语</span>
                  <span class="pill-desc">首字母大写，<strong>末尾必带英文逗号 (,)</strong>。常用 <em>Yours sincerely,</em> 或 <em>Yours faithfully,</em></span>
                </div>
                <div class="spec-pill-item">
                  <span class="pill-badge">🚫 署名红线</span>
                  <span class="pill-desc">严格依题目要求署名（如 <em>Li Ming / Zhang Wei</em>），<strong>严禁书写真实姓名</strong></span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- ================= 二、通知 ================= -->
      <el-tab-pane label="📢 二、通知 (Notice)" name="notice">
        <div class="tab-inner">
          <div class="sub-intro-box">
            通知是用于向特定对象或群体传达信息、通知事项或安排的书面形式。主要由四部分组成：<strong>标题、日期、正文、落款</strong>。
          </div>

          <!-- 通知四大组成部分 -->
          <div class="notice-layout-grid">
            <div class="n-card">
              <div class="n-card-title">（一）标题 Title</div>
              <div class="n-card-body">
                标题应该简洁明了，准确概括主题。若担心在考试中出错，<strong>可以直接使用 <code>Notice</code> 作为标题，并居中显示</strong>。
              </div>
            </div>
            <div class="n-card">
              <div class="n-card-title">（二）日期 Date</div>
              <div class="n-card-body">
                通知的日期应该放在<strong>标题下方并与正文右对齐</strong>，通常采用“月日年”格式：<br>
                <code>December 26, 2025</code>
              </div>
            </div>
          </div>

          <!-- 通知正文 -->
          <el-card class="detail-card" shadow="hover" style="margin-top: 14px;">
            <template #header>
              <div class="card-h-flex">
                <span class="h-title">（三）通知正文 (三段式框架)</span>
              </div>
            </template>

            <!-- 通知第一段 -->
            <div class="section-block">
              <div class="block-label p1-color">
                <el-icon><Flag /></el-icon>
                <span>第一段：介绍背景 + 表明目的 (自由组合)</span>
              </div>
              <div class="notice-p1-grid">
                <div class="np-box">
                  <div class="np-h">第①句备选：欢迎 / 问候 / 活动</div>
                  <div class="np-item">
                    <span class="np-tag">欢迎</span>
                    <code>Welcome sb. to ***.</code>
                    <span class="np-cn">欢迎某人来到 ***。</span>
                  </div>
                  <div class="np-item">
                    <span class="np-tag">问候</span>
                    <code>I hope this notice finds you well.</code>
                    <span class="np-cn">我希望你们看到这则通知时一切安好。</span>
                  </div>
                  <div class="np-item">
                    <span class="np-tag">活动</span>
                    <code>*** will be held.</code>
                    <span class="np-cn">即将举办 ***。</span>
                  </div>
                </div>

                <div class="np-box">
                  <div class="np-h">第②句：直截了当表明目的</div>
                  <div class="np-item">
                    <span class="np-tag">目的</span>
                    <code>The intention of this notice is to *** (改写题干).</code>
                    <span class="np-cn">这则通知的目的是 ***。</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 通知第二段 -->
            <div class="section-block" style="margin-top: 20px;">
              <div class="block-label p2-color">
                <el-icon><Operation /></el-icon>
                <span>第二段：详细信息 (日期、时间、地点、人员或组织)</span>
              </div>
              <div class="case-card">
                <div class="f-en p2-formula">
                  First and foremost (首先), + <span class="slot-text">句1</span>. What is more (其次), + <span class="slot-text">句2</span>. Last but not least (最后), + <span class="slot-text">句3</span>.
                </div>
                <div class="tip-bar">提供关于通知主题的详细信息，使读者能够全面了解所涉及活动的各个方面（妙句19选3至4）。</div>
              </div>
            </div>

            <!-- 通知第三段 -->
            <div class="section-block" style="margin-top: 20px;">
              <div class="block-label p3-color">
                <el-icon><CircleCheck /></el-icon>
                <span>第三段：收尾模块 (2选1)</span>
              </div>
              <div class="notice-p3-grid">
                <div class="p3-opt-card">
                  <div class="p3-h">
                    <span>选项一：鼓励参与 (活动/项目/机会)</span>
                  </div>
                  <div class="f-en">If you are interested in this activity, please scan the QR code to register.</div>
                  <div class="f-cn">如果你对这个活动感兴趣，请扫描二维码注册报名。</div>
                </div>
                <div class="p3-opt-card">
                  <div class="p3-h">
                    <span>选项二：提供联系信息 (事项安排/情况介绍)</span>
                    
                  </div>
                  <div class="f-en">If you have any questions, please get in touch with us at telephone number 1234567 (before next Sunday).</div>
                  <div class="f-cn">如果你有任何问题，请（在下周日之前）与我们联系，电话号码是 1234567。</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 通知落款 -->
          <div class="n-card" style="margin-top: 14px;">
            <div class="n-card-title">（四）落款 Sign-off</div>
            <div class="n-card-body">
              一般放在正文的<strong>右下方</strong>。根据场景不同，落款可以是单位或个人：<br>
              <code>The Student Union</code> / <code>ABC University</code> / <code>Li Ming</code>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- ================= 三、纪要 ================= -->
      <el-tab-pane label="📝 三、纪要 (Meeting Minutes)" name="minutes">
        <div class="tab-inner">
          <div class="sub-intro-box">
            纪要通常由<strong>会议标题、参与者、讨论要点、决定事项和下一步行动计划</strong>组成，适用于会议、活动或工作场合。简明扼要呈现重要信息，便于事件梳理归档。
          </div>

          <el-card class="detail-card" shadow="hover">
            <template #header>
              <div class="card-h-flex">
                <span class="h-title">纪要写作标准模板 (Meeting Minutes)</span>
              </div>
            </template>

            <div class="minutes-box">
              <div class="m-center-title">Meeting Minutes</div>
              <div class="m-grid">
                <div class="m-row"><span class="m-key">Title of Meeting:</span> <span class="m-val">会议标题</span></div>
                <div class="m-row"><span class="m-key">Date:</span> <span class="m-val">日期</span></div>
                <div class="m-row"><span class="m-key">Time:</span> <span class="m-val">会议起始和结束时间</span></div>
                <div class="m-row"><span class="m-key">Location:</span> <span class="m-val">地址</span></div>
                <div class="m-row"><span class="m-key">Attendees:</span> <span class="m-val">参会人员</span></div>
                <div class="m-row"><span class="m-key">Presided by:</span> <span class="m-val">会议主持人员</span></div>
                <div class="m-row"><span class="m-key">Recorded by:</span> <span class="m-val">会议记录人员</span></div>
                <div class="m-row"><span class="m-key">Meeting Record:</span> <span class="m-val">会议记录 (写会议的核心内容)</span></div>
                <div class="m-row"><span class="m-key">Decisions and Action Items:</span> <span class="m-val">决定和行动项</span></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- ================= 四、告示 ================= -->
      <el-tab-pane label="📋 四、告示 (Bulletin)" name="bulletin">
        <div class="tab-inner">
          <div class="sub-intro-box">
            英文中的告示通常用于公共场所，如学校、办公室等，用于传达重要的信息、规定、通告或警示。
          </div>
          <el-alert type="success" :closable="false" title="规范提示">
            <template #default>
              <strong>由于告示的写作格式与通知完全一致</strong>，在考研写作中可完全套用「二、通知」的格式（标题居中、日期右对齐、正文三段式展开、落款右下角）。
            </template>
          </el-alert>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script setup>
import { renderSlotPills } from '../utils/formatters'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, Right, Flag, Operation, CircleCheck } from '@element-plus/icons-vue'

const activeTab = ref('letter')

const salutationList = [
  {
    relation: '亲密关系',
    formula: 'Dear ***,',
    copyVal: 'Dear Bob,',
    desc: '同学、朋友或家庭成员。使用具体的名字（Given Name），比如 Bob、Lily、James 等。'
  },
  {
    relation: '公务关系',
    formula: 'Dear Mr./Mrs./Prof. ***,',
    copyVal: 'Dear Professor Smith,',
    desc: '同事、师长、领导或客户。使用具体的姓氏（Family Name），比如 Smith、White、Roberts 等。'
  },
  {
    relation: '机构单位',
    formula: 'Dear Sir or Madam,',
    copyVal: 'Dear Sir or Madam,',
    desc: '不知道收信人具体姓名、无法确定性别，或写给某机构单位。适用于正式咨询、求职等情境。'
  },
  {
    relation: '投诉信专有',
    formula: 'To Whom It May Concern,',
    copyVal: 'To Whom It May Concern,',
    desc: '向某公司或机构提出投诉，但不知道应该直接联系哪个具体负责人时的常见规范。'
  },
  {
    relation: '群体 / 职务',
    formula: 'Dear Friends / Members / Fellow Students / Experts / President,',
    copyVal: 'Dear Fellow Students,',
    desc: '给某个群体或处于特定职位的人写信时的标准称谓。'
  }
]

const privateP1Sentence1 = [
  {
    type: '去信 · 普通问候',
    en: 'I hope this letter/email finds you well.',
    cn: '我希望你收到此信/邮件时一切安好。'
  },
  {
    type: '去信 · 欢迎+问候',
    en: 'Welcome to ***, and I hope this letter/email finds you well.',
    cn: '欢迎来到 ***，我希望你收到此信/邮件时一切安好。'
  },
  {
    type: '回信 · 普通回信',
    en: 'Thank you for your kind letter/email, in which you (mentioned that) ***.',
    cn: '感谢你亲切友好的来信/邮件，在信/邮件中你（提到）***。'
  },
  {
    type: '回信 · 好/坏事',
    en: 'I was truly delighted/saddened to hear that ***.',
    cn: '得知 ***，我感到非常高兴/难过。'
  }
]

const publicP1Formula = 'I hope this letter/email finds you well. I, an ordinary consumer / a senior student, am writing this letter/email to '

const closingList = [
  {
    type: '表感谢',
    scene: '通用礼貌',
    en: 'Thank you for your kind consideration and time.',
    cn: '感谢您能抽时间查看这封信件并考虑相关问题。',
    usage: '礼貌性结尾，为信件的结束画上积极而谦恭的句号。'
  },
  {
    type: '盼回复 / 见面',
    scene: '期待反馈',
    en: 'Looking forward to hearing from you / meeting you at your earliest convenience.',
    cn: '期待您在方便之时尽早回复/期待在方便之时尽早与您会面。',
    usage: '增加保持沟通的可能性。'
  },
  {
    type: '送祝福',
    scene: '营造氛围',
    en: 'Wish you all the best.',
    cn: '祝你一切顺利。',
    usage: '祝福身体健康、取得成功等，营造友好的交流氛围。'
  },
  {
    type: '提要求',
    scene: '投诉信专有',
    en: 'It would be appreciated if the issue (I raised) could be addressed as soon as possible.',
    cn: '如果我提出的问题能够尽快得到解决，我将不胜感激。',
    usage: '明确表达自己的需求，以推动后续步骤，一般在投诉信中使用。'
  },
  {
    type: '表希望',
    scene: '建议信专有',
    en: 'Hopefully, the recommendations/suggestions (provided) will be helpful to you.',
    cn: '希望提供的推荐/建议对你有所帮助。',
    usage: '通常在建议信中使用，表示希望前文中提及的措施是有效的。'
  },
  {
    type: '致歉意',
    scene: '道歉信专有',
    en: 'Once again, I deeply regret any inconvenience caused and hope that you can accept my apology and understand my situation.',
    cn: '再次，我由衷地为造成的不便道歉，希望你能接受我的道歉并理解我的处境。',
    usage: '通常在道歉信中使用，再次表达自己的歉意。'
  }
]

const meetingMinutesTemplate = `Meeting Minutes

Title of Meeting: 
Date: 
Time: 
Location: 
Attendees: 
Presided by: 
Recorded by: 
Meeting Record: 
Decisions and Action Items: `


</script>

<style scoped>
.practical-framework-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px 10px 40px;
}

.header-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  margin-bottom: 20px;
}

.header-badge {
  display: inline-block;
  padding: 3px 10px;
  background: #3b82f6;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.book-section-title {
  margin: 0 0 10px 0;
  font-size: 22px;
  color: #1e3a8a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: #2563eb;
}

.section-intro {
  margin: 0;
  font-size: 14px;
  color: #475569;
  line-height: 1.7;
}

.practical-tabs {
  border-radius: 10px;
  overflow: hidden;
}

.tab-inner {
  padding: 8px 4px;
}

.sub-intro-box {
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 10px 14px;
  font-size: 14px;
  color: #334155;
  margin-bottom: 16px;
  border-radius: 0 8px 8px 0;
  line-height: 1.6;
}

.format-card {
  background: #fafafa;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  margin-bottom: 18px;
}

.card-tag {
  font-size: 13px;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 10px;
}

.letter-layout-spec {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-line {
  font-size: 14px;
}

.spec-lbl {
  font-weight: 600;
  color: #1e293b;
}

.spec-val {
  color: #475569;
}

.spec-diamond-box {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.diamond-badge {
  font-size: 12px;
  font-weight: 600;
  background: #e0f2fe;
  color: #0369a1;
  padding: 2px 10px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.d-row {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
}

.d-p1 {
  background: #eff6ff;
  color: #1d4ed8;
  width: 70%;
}

.d-p2 {
  background: #ecfdf5;
  color: #047857;
  font-weight: 600;
  width: 88%;
}

.d-p3 {
  background: #fefce8;
  color: #b45309;
  width: 60%;
}

.detail-card {
  border-radius: 10px;
  margin-bottom: 18px;
}

.card-h-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.h-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.h-sub {
  font-size: 13px;
  color: #64748b;
}

.pitfall-box {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 8px;
  padding: 12px 14px;
}

.pit-title {
  font-size: 14px;
  font-weight: 700;
  color: #be123c;
  margin-bottom: 8px;
}

.pit-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.pit-err {
  color: #e11d48;
  font-family: monospace;
  font-weight: 600;
}

.pit-ok {
  color: #059669;
  font-family: monospace;
  font-weight: 600;
}

.pit-note {
  color: #64748b;
  font-size: 12.5px;
}

.code-span {
  font-family: monospace;
  font-weight: 600;
  color: #2563eb;
}

.section-block {
  margin-top: 10px;
}

.block-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e2e8f0;
}

.p1-color {
  color: #2563eb;
  border-bottom-color: #bfdbfe;
}

.p2-color {
  color: #059669;
  border-bottom-color: #a7f3d0;
}

.p3-color {
  color: #d97706;
  border-bottom-color: #fde68a;
}

.case-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #e2e8f0;
}

.case-h {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.case-badge {
  background: #3b82f6;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.public-badge {
  background: #0284c7;
}

.case-note {
  font-size: 13.5px;
  color: #334155;
}

.fg-title {
  font-size: 13.5px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.f-item {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 8px;
}

.f-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.f-type-tag {
  font-size: 12px;
  color: #4338ca;
  background: #e0e7ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.f-en {
  font-size: 14px;
  color: #0f172a;
  line-height: 1.5;
  font-family: inherit;
}

.slot-text {
  background: #fef3c7;
  color: #92400e;
  padding: 1px 4px;
  border-radius: 4px;
  font-weight: 600;
}

.f-cn {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 4px;
}

.p2-formula {
  background: #fff;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  color: #1e293b;
}

.tip-bar {
  margin-top: 10px;
  font-size: 13px;
  color: #0284c7;
  background: #e0f2fe;
  padding: 6px 10px;
  border-radius: 4px;
}

.closing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .closing-grid {
    grid-template-columns: 1fr;
  }
}

.closing-item-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.c-h {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.c-type {
  font-weight: 700;
  font-size: 14px;
  color: #b45309;
}

.c-en {
  font-size: 13.5px;
  color: #1e293b;
  line-height: 1.4;
}

.c-cn {
  font-size: 12.5px;
  color: #64748b;
}

.c-tip {
  font-size: 12px;
  color: #059669;
  background: #ecfdf5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 4px;
}

.sign-demo-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 24px;
}

.sign-content {
  background: #fff;
  border: 1px dashed #94a3b8;
  border-radius: 6px;
  padding: 16px 24px;
  min-width: 180px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sign-top {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.sign-name {
  font-size: 15px;
  color: #475569;
  margin-top: 6px;
}

.sign-explain {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13.5px;
  color: #334155;
  justify-content: center;
}

.notice-layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.n-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
}

.n-card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #0369a1;
  margin-bottom: 8px;
}

.n-card-body {
  font-size: 13.5px;
  color: #334155;
  line-height: 1.6;
}

.notice-p1-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 768px) {
  .notice-p1-grid {
    grid-template-columns: 1fr;
  }
}

.np-box {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px;
}

.np-h {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
}

.np-item {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.np-tag {
  display: inline-block;
  align-self: flex-start;
  font-size: 11px;
  background: #eff6ff;
  color: #2563eb;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.np-cn {
  font-size: 12px;
  color: #64748b;
}

.notice-p3-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 768px) {
  .notice-p3-grid {
    grid-template-columns: 1fr;
  }
}

.p3-opt-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.p3-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.minutes-box {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 20px 24px;
  font-family: monospace;
}

.m-center-title {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
  border-bottom: 2px dashed #cbd5e1;
  padding-bottom: 10px;
}

.m-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.m-row {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.5;
}

.m-key {
  font-weight: 700;
  color: #1e3a8a;
  min-width: 220px;
}

.m-val {
  color: #475569;
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

  .types-grid,
  .dim-grid,
  .paradigm-grid,
  .samples-grid {
    grid-template-columns: 1fr !important;
  }

  .type-card,
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

/* ================= 高密度考研手卡风格重构 (PracticalFramework) ================= */
.sign-exam-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sign-paper-canvas {
  background: #fdfdfd;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 16px 20px;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
}

.paper-watermark {
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 1px;
  margin-bottom: 12px;
  text-transform: uppercase;
  font-family: monospace;
}

.paper-body-placeholder {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  opacity: 0.35;
}

.placeholder-line {
  height: 2px;
  background: #94a3b8;
  width: 100%;
  border-radius: 2px;
}

.placeholder-line.short {
  width: 75%;
}

.sign-aligned-block {
  text-align: right;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.sign-top-phrase {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
}

.sign-name-phrase {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.5px;
  white-space: nowrap;
  margin-top: 4px;
}

.sign-specs-pills {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-pill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
}

.pill-badge {
  font-weight: 650;
  color: #0369a1;
  background: #e0f2fe;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 12px;
}

.pill-desc {
  flex: 1;
}

@media (max-width: 768px) {
  .spec-pill-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 8px 10px;
  }
  
  .sign-paper-canvas {
    padding: 12px 14px;
  }
  
  .sign-top-phrase {
    font-size: 15px;
  }
  
  .sign-name-phrase {
    font-size: 16px;
  }

  .el-card__body {
    padding: 10px !important;
  }
}


@media (max-width: 768px) {
  .sub-intro-box {
    padding: 10px 12px !important;
    font-size: 13px !important;
    line-height: 1.5 !important;
    margin-bottom: 12px !important;
  }

  .letter-layout-spec {
    gap: 10px !important;
  }

  .spec-line {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 4px !important;
    padding: 8px 10px !important;
  }

  .spec-diamond-box {
    padding: 10px !important;
  }

  .d-row {
    font-size: 12.5px !important;
    padding: 6px 8px !important;
  }

  .sal-grid {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }

  .sal-card {
    padding: 10px 12px !important;
  }

  .sal-header {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  .closing-grid,
  .notice-layout-grid,
  .notice-p1-grid,
  .notice-p2-grid,
  .notice-p3-grid {
    grid-template-columns: 1fr !important;
  }

  .card-h-flex {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  .h-title {
    font-size: 15px !important;
  }

  .closing-item-card {
    padding: 10px !important;
  }

  .ci-english {
    font-size: 14px !important;
    line-height: 1.4 !important;
  }
}


/* 称呼列表响应式卡片流 */
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block !important;
  }
  .salutation-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 14px;
  }
  .mobile-salutation-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
  .card-relation-badge {
    font-size: 12px;
    font-weight: bold;
    color: var(--color-primary, #2563eb);
    background: #eff6ff;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
  }
  .card-formula-code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
    font-size: 14px;
    color: #0f172a;
  }
  .card-desc-text {
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
  }
}
</style>
