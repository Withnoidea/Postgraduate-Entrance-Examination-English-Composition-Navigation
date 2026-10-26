
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    
    # 获取所有的 menu-item 的属性
    items = page.eval_on_selector_all('.el-menu-item', 'elements => elements.map(e => ({ text: e.innerText.trim(), class: e.className }))')
    print('Menu items count:', len(items))
    for it in items[:10]:
        print('Item:', it)

    submenus = page.eval_on_selector_all('.el-sub-menu__title', 'elements => elements.map(e => e.innerText.trim())')
    print('Submenus:', submenus)
    browser.close()
