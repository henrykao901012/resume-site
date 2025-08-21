function createCollapsible(containerId, toggleText, defaultOpen = false, showBottomToggle = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 檢查是否已經被處理過
    if (container.parentElement && container.parentElement.classList.contains('collapsible-container')) {
        console.warn(`Container ${containerId} already processed, skipping...`);
        return;
    }

    // 檢查是否在另一個 collapsible 內部
    const isNested = container.closest('.collapsible-content') !== null;

    // 創建包裝容器
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-container';
    wrapper.dataset.containerId = containerId;
    wrapper.dataset.nested = isNested ? 'true' : 'false'; // 標記是否巢狀

    // 創建頂部切換按鈕
    const topToggle = document.createElement('div');
    topToggle.className = 'collapsible-toggle collapsible-toggle-top';
    if (isNested) {
        topToggle.classList.add('nested-toggle');
    }
    topToggle.innerHTML = `
        <span>${toggleText}</span>
        <span class="collapsible-toggle-icon">${defaultOpen ? '▼' : '▶'}</span>
    `;

    // 創建內容容器
    const content = document.createElement('div');
    content.className = 'collapsible-content' + (defaultOpen ? ' active' : '');

    // 創建內容包裝器
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'collapsible-content-wrapper';

    // 將原內容移到新容器中
    while (container.firstChild) {
        contentWrapper.appendChild(container.firstChild);
    }

    // 創建底部切換按鈕（無論是否巢狀都可以顯示）
    if (showBottomToggle) {
        const bottomToggle = document.createElement('div');
        bottomToggle.className = 'collapsible-toggle collapsible-toggle-bottom';
        if (isNested) {
            bottomToggle.classList.add('nested-bottom-toggle');
        }
        bottomToggle.innerHTML = `
            <span>收合 ${isNested ? '(內層)' : ''}</span>
            <span class="collapsible-toggle-icon">▲</span>
        `;
        bottomToggle.style.display = defaultOpen ? 'flex' : 'none';

        contentWrapper.appendChild(bottomToggle);

        // 底部按鈕點擊事件
        bottomToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // 防止事件冒泡
            toggleContent();
        });
    }

    content.appendChild(contentWrapper);

    // 組裝結構
    wrapper.appendChild(topToggle);
    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // 切換內容的函數
    function toggleContent() {
        const isActive = content.classList.contains('active');
        content.classList.toggle('active');

        // 更新頂部圖標
        topToggle.querySelector('.collapsible-toggle-icon').textContent = isActive ? '▶' : '▼';

        // 顯示/隱藏底部按鈕
        if (showBottomToggle) {
            const bottomToggle = wrapper.querySelector(':scope > .collapsible-content > .collapsible-content-wrapper > .collapsible-toggle-bottom');
            if (bottomToggle) {
                if (isActive) {
                    setTimeout(() => {
                        bottomToggle.style.display = 'none';
                    }, 300);
                } else {
                    bottomToggle.style.display = 'flex';
                }
            }
        }
    }

    // 頂部按鈕點擊事件
    topToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleContent();
    });
}

// 改進版的 createCollapsibleWithIcon 函數
function createCollapsibleWithIcon(containerId, iconSvg, toggleText, defaultOpen = false, showBottomToggle = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 檢查是否已經被處理過
    if (container.parentElement && container.parentElement.classList.contains('collapsible-container')) {
        console.warn(`Container ${containerId} already processed, skipping...`);
        return;
    }

    // 檢查是否在另一個 collapsible 內部
    const isNested = container.closest('.collapsible-content') !== null;

    // 創建包裝容器
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-container';
    wrapper.dataset.containerId = containerId;
    wrapper.dataset.nested = isNested ? 'true' : 'false';

    // 創建頂部切換按鈕
    const topToggle = document.createElement('div');
    topToggle.className = 'collapsible-toggle collapsible-toggle-top';
    if (isNested) {
        topToggle.classList.add('nested-toggle');
    }
    topToggle.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
            ${iconSvg}
            <span>${toggleText}</span>
        </span>
        <span class="collapsible-toggle-icon">${defaultOpen ? '▼' : '▶'}</span>
    `;

    // 創建內容容器
    const content = document.createElement('div');
    content.className = 'collapsible-content' + (defaultOpen ? ' active' : '');

    // 創建內容包裝器
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'collapsible-content-wrapper';

    // 將原內容移到新容器中（保留所有內容，包括內層的底部按鈕）
    while (container.firstChild) {
        contentWrapper.appendChild(container.firstChild);
    }

    // 創建外層的底部切換按鈕
    if (showBottomToggle) {
        const bottomToggle = document.createElement('div');
        bottomToggle.className = 'collapsible-toggle collapsible-toggle-bottom outer-bottom-toggle';
        bottomToggle.innerHTML = `
            <span style="display: flex; align-items: center; gap: 8px;">
                <span class="collapsible-toggle-icon">▲</span>
                <span>收合專案</span>
            </span>
        `;
        bottomToggle.style.display = defaultOpen ? 'flex' : 'none';

        contentWrapper.appendChild(bottomToggle);

        // 底部按鈕點擊事件
        bottomToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleContent();
        });
    }

    content.appendChild(contentWrapper);

    // 組裝結構
    wrapper.appendChild(topToggle);
    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // 切換內容的函數
    function toggleContent() {
        const isActive = content.classList.contains('active');
        content.classList.toggle('active');

        // 更新頂部圖標
        topToggle.querySelector('.collapsible-toggle-icon').textContent = isActive ? '▶' : '▼';

        // 只控制這個層級的底部按鈕，不影響內層
        if (showBottomToggle) {
            const bottomToggle = wrapper.querySelector('.outer-bottom-toggle');
            if (bottomToggle) {
                if (isActive) {
                    setTimeout(() => {
                        bottomToggle.style.display = 'none';
                    }, 300);
                } else {
                    bottomToggle.style.display = 'flex';
                }
            }
        }

        // 如果收合，滾動到頂部按鈕位置
        if (isActive) {
            topToggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // 頂部按鈕點擊事件
    topToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleContent();
    });
}