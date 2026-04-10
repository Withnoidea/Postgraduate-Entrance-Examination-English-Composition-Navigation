const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 查找并替换performAICorrection函数
const startMarker = 'const performAICorrection = async () => {';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
  console.log('找不到performAICorrection函数');
  process.exit(1);
}

// 找到函数结束位置
let braceCount = 0;
let endIndex = startIndex;
let foundStart = false;

for (let i = startIndex; i < content.length; i++) {
  if (content[i] === '{') {
    braceCount++;
    foundStart = true;
  } else if (content[i] === '}') {
    braceCount--;
    if (foundStart && braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }
}

const oldFunction = content.substring(startIndex, endIndex);

const newFunction = `const performAICorrection = async () => {
  // 表单验证
  if (!aiFormRef.value) {
    ElMessage.error('表单未初始化')
    return
  }
  
  try {
    await aiFormRef.value.validate()
  } catch (error) {
    ElMessage.warning('请完整填写表单信息')
    return
  }

  if (!aiEssayForm.value.content.trim()) {
    ElMessage.warning('请输入作文内容！')
    return
  }

  if (!apiConfig.value.apiKey) {
    ElMessage.warning('请先配置API Key！')
    return
  }

  aiCorrectionLoading.value = true
  aiCorrectionResult.value = ''

  // 确定作文类型和满分
  const isEnglish1 = aiEssayForm.value.type === 'english1'
  const isSmallEssay = aiEssayForm.value.category === 'application'
  const maxScore = isSmallEssay ? 10 : (isEnglish1 ? 20 : 15)
  const wordCount = isSmallEssay ? '100词左右' : (isEnglish1 ? '160-200词' : '至少150词')
  
  // 确定题型名称
  let essayTypeName = ''
  if (isSmallEssay) {
    essayTypeName = '应用文（小作文）'
  } else {
    essayTypeName = aiEssayForm.value.essayType === 'picture' ? '图画作文（大作文）' : '图表作文（大作文）'
  }

  try {
    const prompt = "你是一位考研英语阅卷专家，请根据以下标准批改这篇作文：\n\n" +
      "## 评分标准（晶婷弟子班写作评分标准）\n\n" +
      "### 一、评分维度\n" +
      "1. **美观**：字越漂亮越好，起码不能太丑\n" +
      "2. **内容**：应符合作文考查主题，不能偏题、瞎写乱写\n" +
      "3. **结构**：符合应用文/正常文体格式要求；结构层次清晰\n" +
      "4. **语言**：词汇拼写正确、优美高级；句子无语法错误、句式多样\n\n" +
      "### 二、作文给分标准\n" +
      "**第五档（很好）**：" + (isEnglish1 ? (isSmallEssay ? '9-10分' : '17-20分') : (isSmallEssay ? '9-10分' : '13-15分')) + "\n" +
      "- 包含所有内容要点\n- 使用丰富的语法结构和词汇\n- 语言自然流畅\n\n" +
      "**第四档（较好）**：" + (isEnglish1 ? (isSmallEssay ? '7-8分' : '13-16分') : (isSmallEssay ? '7-8分' : '10-12分')) + "\n" +
      "**第三档（基本）**：" + (isEnglish1 ? (isSmallEssay ? '5-6分' : '9-12分') : (isSmallEssay ? '5-6分' : '7-9分')) + "\n" +
      "**第二档（较差）**：" + (isEnglish1 ? (isSmallEssay ? '3-4分' : '5-8分') : (isSmallEssay ? '3-4分' : '4-6分')) + "\n" +
      "**第一档（差）**：" + (isEnglish1 ? (isSmallEssay ? '1-2分' : '1-4分') : (isSmallEssay ? '1-2分' : '1-3分')) + "\n\n" +
      "## 作文信息\n" +
      "- 考试类型：" + (isEnglish1 ? '英语一' : '英语二') + "\n" +
      "- 年份：" + aiEssayForm.value.year + "年\n" +
      "- 作文类别：" + essayTypeName + "\n" +
      "- 满分：" + maxScore + "分\n" +
      "- 字数要求：" + wordCount + "\n" +
      "- 题目：" + (aiEssayForm.value.title || '未提供') + "\n\n" +
      "## 作文内容\n" + aiEssayForm.value.content + "\n\n" +
      "## 输出要求\n" +
      "请严格按照以下格式输出批改结果：\n\n" +
      "### 整体分析\n" +
      "**整体打分**：给出具体分数（满分" + maxScore + "分）\n" +
      "**写作初印象**：简要评价\n\n" +
      "### 词汇分析\n" +
      "**亮眼词**：列举3-5个\n" +
      "**拼写错误词**：列出所有错误\n\n" +
      "### 句型分析\n" +
      "**亮眼句**：列举1-3个\n" +
      "**语法错误句**：给出修改建议\n\n" +
      "### 篇章分析\n" +
      "**写作框架**：评价结构\n" +
      "**完整性**：是否回应题目\n" +
      "**连贯性**：连接词使用\n" +
      "**切题度**：是否偏题\n\n" +
      "### 改进建议\n" +
      "给出具体建议和润色示例"

    let response
    
    if (apiConfig.value.provider === 'qwen') {
      response = await fetch('/api/qwen/api/v1/services/aigc/text-generation/generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiConfig.value.apiKey
        },
        body: JSON.stringify({
          model: apiConfig.value.model || 'qwen-turbo',
          input: {
            messages: [
              { role: 'user', content: prompt }
            ]
          }
        })
      })
    } else {
      response = await fetch('/api/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiConfig.value.apiKey
        },
        body: JSON.stringify({
          model: apiConfig.value.model || 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      })
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'API请求失败: ' + response.status)
    }

    const data = await response.json()
    
    if (apiConfig.value.provider === 'qwen') {
      aiCorrectionResult.value = data.output?.text || data.output?.choices?.[0]?.message?.content || '批改结果解析失败'
    } else {
      aiCorrectionResult.value = data.choices?.[0]?.message?.content || '批改结果解析失败'
    }
    
    // 将Markdown转换为HTML
    aiCorrectionResult.value = convertMarkdownToHtml(aiCorrectionResult.value)
    
    ElMessage.success('批改完成！请查看下方结果')
    
    // 滚动到结果区域
    nextTick(() => {
      const resultElement = document.querySelector('.ai-result')
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } catch (error) {
    ElMessage.error('批改失败：' + error.message)
  } finally {
    aiCorrectionLoading.value = false
  }
}`;

content = content.replace(oldFunction, newFunction);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已更新批改函数！');