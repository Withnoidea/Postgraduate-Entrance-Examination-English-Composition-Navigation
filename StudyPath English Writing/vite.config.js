import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 通义千问 / DashScope API代理
      '/api/qwen': {
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/qwen/, ''),
        secure: false
      },
      // OpenAI 原生 API代理
      '/api/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openai/, ''),
        secure: false
      },
      // DeepSeek 官方 API代理
      '/api/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deepseek/, ''),
        secure: false
      },
      // Kimi / Moonshot API代理
      '/api/kimi': {
        target: 'https://api.moonshot.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kimi/, ''),
        secure: false
      },
      // Claude Anthropic API代理
      '/api/claude': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/claude/, ''),
        secure: false
      },
      // 智增增 API代理
      '/api/zhizengzeng': {
        target: 'https://api.zhizengzeng.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zhizengzeng/, ''),
        secure: false
      },
      // OpenRouter 全球聚合 API代理
      '/api/openrouter': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openrouter/, ''),
        secure: false
      }
    }
  }
})
