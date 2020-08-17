const tel = document.querySelector(".sjzc .tel")
const pass = document.querySelector(".sjzc .password")
const repassword = document.querySelector(".sjzc .againpass")
const truename = document.querySelector(".sjzc .truename")
const idcard = document.querySelector(".sjzc .idcard")
const aSpan = document.querySelectorAll('.sjzc span')
const form = document.querySelector('form')
let telflag = true;
let passflag = true;
let repasswordflag = true;
let truenameflag = true;
let idcardflag = true;
// 手机号码验证
tel.onfocus = function() {
        tel.onblur = function() {
            if (this.value !== '') {
                let teg = /^1[356789]\d{9}$/
                if (this.value.length === 11) {
                    if (teg.test(this.value)) {
                        let ajax = new XMLHttpRequest();
                        ajax.open('post', 'http://10.31.152.13/project/gulptest/php/reg.php', true);
                        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                        ajax.send('tel=' + this.value);
                        ajax.onreadystatechange = function() {
                            if (ajax.readyState === 4) {
                                if (!ajax.responseText) {
                                    aSpan[0].innerHTML = '此账号可用';

                                    aSpan[0].style.color = '#a4e941';
                                    tel.style.borderColor = "#dbdbdb";
                                    telflag = true;
                                } else {
                                    aSpan[0].innerHTML = '该手机号已被注册';
                                    aSpan[0].style.color = '#ff5959';
                                    tel.style.borderColor = "#ed1919";
                                    telflag = false;
                                }
                            }
                        }
                    } else {
                        aSpan[0].innerHTML = '手机号格式不正确';
                        aSpan[0].style.color = '#ff5959';
                        this.style.borderColor = "#ed1919"
                        telflag = false;
                    }
                } else {
                    aSpan[0].innerHTML = '手机号格式不正确';
                    aSpan[0].style.color = '#ff5959';
                    this.style.borderColor = "#ed1919"
                    telflag = false;
                }
            } else {
                aSpan[0].innerHTML = '不能为空';
                aSpan[0].style.color = ' #ff5959';
                this.style.borderColor = "#ed1919"
                telflag = false;
            }
        }
    }
    //密码验证
pass.onfocus = function() {
        pass.oninput = function() {
            if (this.value.length >= 8 && this.value.length <= 16) {
                var tegnum = /[0-9]/;
                var tegsomecase = /[a-z]/;
                var tegbigcase = /[A-Z]/;
                var regother = /[\W\_]/;
                var num = 0
                if (tegnum.test(this.value)) {
                    num++
                }
                if (tegsomecase.test(this.value)) {
                    num++
                }
                if (tegbigcase.test(this.value)) {
                    num++
                }
                if (regother.test(this.value)) {
                    num++
                }
                switch (num) {
                    case 1:
                    case 2:
                        aSpan[1].innerHTML = '等级：弱';
                        aSpan[1].style.color = '#ff5959';
                        passflag = false;
                        break;
                    case 3:

                        aSpan[1].innerHTML = '等级：中';
                        aSpan[1].style.color = 'yellow';
                        passflag = true;
                        break;
                    case 4:
                        aSpan[1].innerHTML = '等级：强';
                        aSpan[1].style.color = 'green';
                        passflag = true;
                        break;
                }

            } else {
                aSpan[1].innerHTML = '密码必须包含大写字母、小写字母、数字、符号至少3种';
                aSpan[1].style.color = '#ff5959';
                this.style.borderColor = "#ed1919";
                passflag = false;
            }
        }
        pass.onblur = function() {
            if (passflag) {
                aSpan[1].innerHTML = '';
                this.style.borderColor = "#dbdbdb";
                passflag = true;
            }
            if (this.value === '') {

                aSpan[1].innerHTML = '不能为空'
                aSpan[1].style.color = '#ff5959'
                this.style.borderColor = "#ed1919";
                passflag = false;
            }
        }
    }
    //确认密码验证
repassword.onfocus = function() {
        repassword.onblur = function() {
            if (this.value !== '') {
                if (this.value === pass.value) {
                    aSpan[2].innerHTML = '';
                    this.style.borderColor = "#dbdbdb"
                    repasswordflag = true;
                } else {
                    aSpan[2].innerHTML = '两次输入的密码不一致';
                    aSpan[2].style.color = 'red';
                    this.style.borderColor = "#ed1919";
                    repasswordflag = false;
                }
            } else {
                aSpan[2].innerHTML = '不能为空';
                this.style.borderColor = "#ed1919";
                aSpan[2].style.color = 'red'
                repasswordflag = false;
            }
        }
    }
    //真实姓名验证
truename.onfocus = function() {
        truename.onblur = function() {
            if (this.value !== '') {
                let reg = /^[\u4e00-\u9fa5]+$/g
                if (this.value.length >= 2 && this.value.length <= 10) {
                    if (reg.test(this.value)) {
                        aSpan[3].innerHTML = '';
                        this.style.borderColor = "#dbdbdb";
                        truenameflag = true;
                    } else {
                        aSpan[3].innerHTML = '真实姓名格式不对';
                        aSpan[3].style.color = '#ff5959';
                        this.style.borderColor = "#ed1919"
                        truenameflag = false;
                    }
                } else {
                    aSpan[3].innerHTML = '真实姓名格式不对';
                    this.style.borderColor = "#ed1919"
                    truenameflag = false;
                }
            } else {
                aSpan[3].innerHTML = '不能为空';
                aSpan[3].style.color = '#ff5959';
                this.style.borderColor = "#ed1919"
                truenameflag = false;
            }
        }
    }
    //身份证号码验证
idcard.onfocus = function() {
    idcard.onblur = function() {
        if (this.value !== '') {
            var teg = /^\d{6}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])\d{3}[\d|X|x]$/
            if (teg.test(this.value)) {
                aSpan[4].innerHTML = '';
                this.style.borderColor = "#dbdbdb";
                idcardflag = true;
            } else {
                aSpan[4].innerHTML = '身份证格式不对';
                aSpan[4].style.color = '#ff5959';
                this.style.borderColor = "#ed1919";
                idcardflag = false;
            }
        } else {
            aSpan[4].innerHTML = '不能为空';
            aSpan[4].style.color = '#ff5959';
            this.style.borderColor = "#ed1919";
            idcardflag = false;
        }
    }
}
form.onsubmit = function() {
    if (tel.value === '') {
        tel.style.borderColor = "#ed1919"
        telflag = false;
    }
    if (pass.value === '') {
        pass.style.borderColor = "#ed1919"
        passflag = false;
    }
    if (repassword.value === '') {
        repassword.style.borderColor = "#ed1919"
        repasswordflag = false;
    }
    if (truename.value === '') {
        truename.style.borderColor = "#ed1919"
        truenameflag = false;
    }

    if (idcard.value === '') {
        idcard.style.borderColor = "#ed1919"
        idcardflag = false;
    }
    if (!telflag || !passflag || !repasswordflag || !truenameflag || !idcardflag) {
        return false;
    }
};