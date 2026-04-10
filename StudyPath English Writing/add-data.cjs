const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 在 script setup 中添加数据定义
const oldScriptSetup = `// API配置
const apiConfig = ref({
  provider: 'qwen',
  apiKey: '',
  model: 'qwen-turbo'
})
const apiTestLoading = ref(false)`;

const newScriptSetup = `// API配置
const apiConfig = ref({
  provider: 'qwen',
  apiKey: '',
  model: 'qwen-turbo'
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
])`;

content = content.replace(oldScriptSetup, newScriptSetup);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已添加数据定义！');
