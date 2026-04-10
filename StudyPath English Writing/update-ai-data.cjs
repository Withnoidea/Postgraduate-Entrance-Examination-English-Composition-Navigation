const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 替换AI批改相关数据
const oldAIData = `// AI批改相关
const aiEssayForm = ref({
  type: 'english1',
  category: 'application',
  title: '',
  content: ''
})
const aiCorrectionResult = ref('')
const aiCorrectionLoading = ref(false)
const aiFileInfo = ref('')
const aiFileSuccess = ref(false)
const aiFileError = ref(false)`;

const newAIData = `// AI批改相关
const aiEssayForm = ref({
  type: 'english1',
  year: '2024',
  category: 'application',
  essayType: '',
  title: '',
  content: ''
})
const aiCorrectionResult = ref('')
const aiCorrectionLoading = ref(false)
const aiFileInfo = ref('')
const aiFileSuccess = ref(false)
const aiFileError = ref(false)
const aiFormRef = ref(null)

// 表单验证规则
const aiFormRules = {
  type: [{ required: true, message: '请选择考试类型', trigger: 'change' }],
  year: [{ required: true, message: '请选择年份', trigger: 'change' }],
  category: [{ required: true, message: '请选择作文类别', trigger: 'change' }],
  essayType: [{ required: true, message: '请选择作文题型', trigger: 'change' }],
  content: [{ required: true, message: '请输入作文内容', trigger: 'blur' }]
}

// 可选年份
const availableYears = ref([
  '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', 
  '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009',
  '2008', '2007', '2006', '2005'
])`;

content = content.replace(oldAIData, newAIData);

// 添加 Check 图标导入
const oldIconImport = `import {
  UploadFilled,
  Reading,
  ArrowLeft,
  ArrowRight,
  RefreshLeft,
  Check,
  Upload,
  Download,
  Document,
  Picture,
  DataAnalysis,
  Edit,
  Connection,
  Menu,
  Setting,
  MagicStick
} from '@element-plus/icons-vue'`;

content = content.replace(oldIconImport, oldIconImport); // Check 已经存在

fs.writeFileSync(filePath, content, 'utf8');
console.log('已更新AI批改数据模型！');
