//先获取本地存储，如果存在，赋值。
const inputs = document.querySelectorAll('.login input');

//先获取本地存储，如果存在，赋值。
if (localStorage.getItem('tel') && localStorage.getItem('password')) {
    inputs[0].value = localStorage.getItem('tel');
    inputs[1].value = localStorage.getItem('password');
    inputs[2].checked = true;
}
inputs[3].onclick = function() {

    let ajax = new XMLHttpRequest();
    ajax.open('post', 'http://10.31.152.13/project/gulptest/php/login.php', true);
    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    ajax.send(`tel=${inputs[0].value}&password=${hex_sha1(inputs[1].value)}`);
    console.log($('.tel').value)
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4) {
            if (!ajax.responseText) {
                inputs[1].value = '';
                alert('用户名或者密码错误');
            } else {
                if (inputs[2].checked) { //存储
                    window.localStorage.setItem('tel', inputs[0].value);
                    window.localStorage.setItem('password', inputs[1].value);
                } else { //删掉之前存储的值
                    window.localStorage.removeItem('tel');
                    window.localStorage.removeItem('password');
                }
                alert('登录成功');
                location.href = 'header.html';
            }
        }
    }
}