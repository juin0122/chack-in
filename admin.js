// 【初始化】页面加载时更新数据并生成二维码
window.onload = function() {
    renderAdminPage();
    generateCheckInQRCode(); // 调用生成二维码的函数
    
    // 每隔 2 秒自动刷新一次后台列表
    setInterval(renderAdminPage, 2000);
};

// 【新增】动态生成学生端二维码的函数
function generateCheckInQRCode() {
    const qrcodeDiv = document.getElementById('qrcode');
    if (!qrcodeDiv) return;

    /* 利用 window.location 自动获取当前后台的网址，
       并把尾部的 admin.html 替换成 index.html，得到学生端的绝对路径
    */
    const currentUrl = window.location.href;
    const checkInUrl = currentUrl.replace('admin.html', 'index.html');

    /*
       这里使用了一个免费开源的二维码生成 API (qrserver)
       把学生端网址作为参数传进去，它会自动返回一张二维码图片
    */
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(checkInUrl)}`;
    
    // 将图片标签插入到页面中
    qrcodeDiv.innerHTML = `<img src="${qrApiUrl}" alt="Check-in QR Code"><br><small style="color:#7f8c8d; font-size:11px;">${checkInUrl}</small>`;
}

// —— 下面保持你原本的 admin.js 代码逻辑（renderAdminPage, confirmStudent, resetSystem）——
function renderAdminPage() {
    // ... 原本的代码保持不变 ...
}
function confirmStudent(studentId) {
    // ... 原本的代码保持不变 ...
}
function resetSystem() {
    // ... 原本的代码保持不变 ...
}