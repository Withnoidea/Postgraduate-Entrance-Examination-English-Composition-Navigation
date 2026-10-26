
import os
import time
from playwright.sync_api import sync_playwright

output_dir = os.path.abspath("docs/assets")
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={'width': 1480, 'height': 920},
        device_scale_factor=1.5  # 高清Retina截图
    )
    page = context.new_page()
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    time.sleep(1)

    # 1. 欢迎页与概览
    page.screenshot(path=os.path.join(output_dir, '01_overview.png'))
    print("Captured 01_overview.png")

    # 点击左侧菜单工具函数
    def click_menu(section_id):
        # 很多二级菜单需要展开对应的 el-sub-menu
        # 可以通过页面内的点击或者执行Vue/DOM操作
        # 直接点击带 index 属性的 el-menu-item
        item = page.locator(f'.el-menu-item[data-index="{section_id}"], [index="{section_id}"]')
        if item.count() > 0:
            # 确保父级 submenu 展开
            parent = item.locator('xpath=ancestor::li[contains(@class, "el-sub-menu")]')
            if parent.count() > 0 and not 'is-opened' in (parent.get_attribute('class') or ''):
                title = parent.locator('.el-sub-menu__title').first
                title.click()
                time.sleep(0.3)
            item.first.click()
            time.sleep(0.8)
        else:
            print(f"Item not found: {section_id}")

    # 2. 背诵与默写练习 (ch1-1)
    click_menu('ch1-1')
    # 输入几个词体验实时比对效果
    try:
        textarea = page.locator('.practice-card textarea, .dictation-area textarea, .el-textarea__inner')
        if textarea.count() > 0:
            textarea.first.fill('The picture vividly depicts that two people are')
            time.sleep(0.5)
    except Exception as e:
        print("Fill textarea err:", e)
    page.screenshot(path=os.path.join(output_dir, '02_recite_practice.png'))
    print("Captured 02_recite_practice.png")

    # 3. 应用文写作框架构建 (ch2-0)
    click_menu('ch2-0')
    time.sleep(0.5)
    page.screenshot(path=os.path.join(output_dir, '03_practical_framework.png'))
    print("Captured 03_practical_framework.png")

    # 4. 图画作文写作框架 (ch3-0)
    click_menu('ch3-0')
    time.sleep(0.5)
    page.screenshot(path=os.path.join(output_dir, '04_picture_framework.png'))
    print("Captured 04_picture_framework.png")

    # 5. 图表作文写作框架 (ch4-0)
    click_menu('ch4-0')
    time.sleep(0.5)
    page.screenshot(path=os.path.join(output_dir, '05_chart_framework.png'))
    print("Captured 05_chart_framework.png")

    # 6. AI 智能批改界面 (corr2-1)
    click_menu('corr2-1')
    time.sleep(0.6)
    page.screenshot(path=os.path.join(output_dir, '06_ai_correction.png'))
    print("Captured 06_ai_correction.png")

    # 7. AI 大模型配置中心 (corr2-2)
    click_menu('corr2-2')
    time.sleep(0.6)
    page.screenshot(path=os.path.join(output_dir, '07_ai_config.png'))
    print("Captured 07_ai_config.png")

    browser.close()
    print("All captures completed!")
