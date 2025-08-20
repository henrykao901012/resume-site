// 創建收合功能 - 定義在全域作用域
function createCollapsible(containerId, toggleText, defaultOpen = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 創建包裝容器
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-container';

    // 創建切換按鈕
    const toggle = document.createElement('div');
    toggle.className = 'collapsible-toggle';
    toggle.innerHTML = `
        <span>${toggleText}</span>
        <span class="collapsible-toggle-icon">${defaultOpen ? '▼' : '▶'}</span>
    `;

    // 創建內容容器
    const content = document.createElement('div');
    content.className = 'collapsible-content' + (defaultOpen ? ' active' : '');

    // 將原內容移到新容器中
    while (container.firstChild) {
        content.appendChild(container.firstChild);
    }

    // 組裝結構
    wrapper.appendChild(toggle);
    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // 添加點擊事件
    toggle.addEventListener('click', function () {
        const isActive = content.classList.contains('active');
        content.classList.toggle('active');
        toggle.querySelector('.collapsible-toggle-icon').textContent = isActive ? '▶' : '▼';
    });
}

function createCollapsibleWithIcon(containerId, iconSvg, toggleText, defaultOpen = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 創建包裝容器
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-container';

    // 創建切換按鈕
    const toggle = document.createElement('div');
    toggle.className = 'collapsible-toggle';
    toggle.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
            ${iconSvg}
            <span>${toggleText}</span>
        </span>
        <span class="collapsible-toggle-icon">${defaultOpen ? '▼' : '▶'}</span>
    `;

    // 創建內容容器
    const content = document.createElement('div');
    content.className = 'collapsible-content' + (defaultOpen ? ' active' : '');

    // 將原內容移到新容器中
    while (container.firstChild) {
        content.appendChild(container.firstChild);
    }

    // 組裝結構
    wrapper.appendChild(toggle);
    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // 添加點擊事件
    toggle.addEventListener('click', function () {
        const isActive = content.classList.contains('active');
        content.classList.toggle('active');
        toggle.querySelector('.collapsible-toggle-icon').textContent = isActive ? '▶' : '▼';
    });
}