<template>
  <el-aside width="280px" class="sidebar" :class="{ 'mobile-visible': visible }">
    <div class="sidebar-header">
      <h2>📚 考研英语作文背诵</h2>
    </div>
    
    <el-scrollbar class="sidebar-content">
      <el-menu
        :default-active="activeMenu"
        :default-openeds="defaultOpeneds"
        class="chapter-menu"
        @select="handleSelect"
      >
        <el-sub-menu
          v-for="chapter in chapters"
          :key="chapter.id"
          :index="chapter.id"
        >
          <template #title>
            <el-icon><component :is="getChapterIcon(chapter.icon)" /></el-icon>
            <span>{{ chapter.title }}</span>
          </template>
          
          <el-menu-item
            v-for="section in chapter.sections"
            :key="section.id"
            :index="section.id"
          >
            <span>{{ section.title }}</span>
            <el-tag
              v-if="section.type === 'practice'"
              size="small"
              type="success"
              effect="plain"
              class="menu-tag"
            >
              练习
            </el-tag>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { 
  Document, 
  Picture, 
  DataAnalysis, 
  Edit, 
  Connection,
  Setting,
  MagicStick,
  Reading
} from '@element-plus/icons-vue'

defineProps({
  activeMenu: {
    type: String,
    default: ''
  },
  defaultOpeneds: {
    type: Array,
    default: () => []
  },
  chapters: {
    type: Array,
    default: () => []
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const handleSelect = (index) => {
  emit('select', index)
}

const getChapterIcon = (iconName) => {
  const iconMap = {
    'Reading': Reading,
    'Document': Document,
    'Picture': Picture,
    'DataAnalysis': DataAnalysis,
    'Edit': Edit,
    'Connection': Connection,
    'Setting': Setting,
    'MagicStick': MagicStick
  }
  return iconMap[iconName] || Document
}
</script>

<style scoped>
.sidebar {
  background: #fafbfc;
  border-right: 1px solid #e8eaed;
  border-radius: 16px 0 0 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1001;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px !important;
    max-width: 80vw;
    z-index: 1001;
    transform: translateX(-100%);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 0;
  }
  
  .sidebar.mobile-visible {
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 24px 20px;
  background: #4facfe;
  color: white;
  text-align: center;
  box-shadow: 0 2px 8px rgba(79, 172, 254, 0.2);
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.chapter-menu {
  border: none;
  background: transparent;
}

.menu-tag {
  margin-left: 8px;
}
</style>
