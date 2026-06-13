// 【初始化】如果浏览器本地没有当前号码计数器，初始化为 1
if (!localStorage.getItem('currentNumber')) {
    localStorage.setItem('currentNumber', '1');
}
// 【初始化】如果浏览器本地没有学生签到数组，初始化为空数组
if (!localStorage.getItem('studentList')) {
    localStorage.setItem('studentList', JSON.stringify([]));
}

// 【页面①逻辑】处理学生点击签到
function handleCheckIn() {
    const nameInput = document.getElementById('studentName').value.trim();
    
    // 验证名字是否为空
    if (nameInput === '') {
        alert('请先填写您的名字！\nPlease enter your name first!');
        return;
    }

    // 获取当前排队到的号码
    let currentNum = parseInt(localStorage.getItem('currentNumber') || '1');
    
    // 组装当前签到学生的数据对象
    let newStudent = {
        id: Date.now(), // 产生一个唯一的ID时间戳，方便后台精准查找
        name: nameInput,
        number: currentNum,
        isConfirmed: false // 初始状态为：未确认
    };

    // 从本地存储读取现有数组，把新学生放进去，再存回本地存储
    let studentList = JSON.parse(localStorage.getItem('studentList') || '[]');
    studentList.push(newStudent);
    localStorage.setItem('studentList', JSON.stringify(studentList));

    // 号码顺序递增，到 44 后重置回 1
    let nextNum = currentNum + 1;
    if (nextNum > 44) {
        nextNum = 1;
    }
    localStorage.setItem('currentNumber', nextNum.toString());

    // 将获得的号码渲染在第二页上
    document.getElementById('numberDisplay').innerText = currentNum;

    // 切换到页面②（显示号码页）
    switchPage('page1', 'page2');
}

// 【页面②逻辑】点击返回首页，清空输入框，准备让下一个同学签到
function backToSignIn() {
    document.getElementById('studentName').value = ''; // 清空上一名同学的名字
    switchPage('page2', 'page1');
}

// 【核心辅助函数】控制前端页面的隐藏与显示
function switchPage(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
}