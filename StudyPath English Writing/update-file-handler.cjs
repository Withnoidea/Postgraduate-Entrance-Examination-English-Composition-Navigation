const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 替换handleAIFileChange函数
const oldHandleAIFile = `const handleAIFileChange = (file) => {
  const fileName = file.name.toLowerCase()
  
  if (fileName.endsWith('.txt')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      aiEssayForm.value.content = e.target.result
      aiFileInfo.value = \`已加载文本文件：\${file.name}\`
      aiFileSuccess.value = true
      aiFileError.value = false
    }
    reader.readAsText(file.raw)
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    ElMessageBox.confirm(
      '图片识别功能有限，建议使用文本文件以获得更准确的批改结果。是否继续使用图片？',
      '提示',
      {
        confirmButtonText: '继续',
        cancelButtonText: '使用文本文件',
        type: 'warning'
      }
    ).then(() => {
      aiFileInfo.value = \`图片文件暂不支持自动识别，建议手动输入作文内容\`
      aiFileSuccess.value = false
      aiFileError.value = true
    }).catch(() => {
      // 用户选择使用文本文件
    })
  }
}`;

const newHandleAIFile = `const handleAIFileChange = (file) => {
  const fileName = file.name.toLowerCase()
  
  if (fileName.endsWith('.txt')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      aiEssayForm.value.content = e.target.result
      aiFileInfo.value = \`✅ 已加载文本文件：\${file.name}\`
      aiFileSuccess.value = true
      aiFileError.value = false
      ElMessage.success('文件加载成功！请填写其他信息后开始批改')
    }
    reader.readAsText(file.raw)
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    ElMessageBox.confirm(
      '图片识别功能有限，建议使用文本文件以获得更准确的批改结果。是否继续使用图片？',
      '提示',
      {
        confirmButtonText: '手动输入内容',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      // 用户选择手动输入
      aiEssayForm.value.content = ' '
      aiFileInfo.value = \`📷 图片已选择，请手动输入作文内容\`
      aiFileSuccess.value = true
      aiFileError.value = false
      ElMessage.info('请在下方文本框中输入图片中的作文内容')
    }).catch(() => {
      // 用户取消
      aiFileInfo.value = ''
    })
  }
}`;

content = content.replace(oldHandleAIFile, newHandleAIFile);

fs.writeFileSync(filePath, content, 'utf8');
console.log('已更新文件上传处理函数！');
