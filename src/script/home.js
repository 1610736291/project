! function($) {
    const $huandengpian = $('.banner')
    const $ul = $('.banner ul');
    const $lilist = $('.banner ul li');
    const $btnlist = $('.banner p span');
    const $left = $('.banner .wrapper .left');
    const $right = $('.banner .wrapper .right');
    let $num = 0;
    let $timer = null;

    //动态获取li的宽度计算ul的宽度
    let $liwidth = $lilist.eq(0).width();
    $ul.width($lilist.length * $liwidth);

    //点击按钮事件
    $btnlist.on('click', function() {
        console.log($num)
        $num = $(this).index() - 1;
        console.log($num)
        qiehuan();
    });

    //左箭头显示隐藏
    $left.hover(function() {
        $left.css({
            "background": "black"
        });
    }, function() {
        $left.css({
            "background": "transparent"
        });
    });

    //右箭头显示隐藏
    $right.hover(function() {
        $right.css({
            "background": "black"
        });
    }, function() {
        $right.css({
            "background": "transparent"
        });
    });

    //左右箭头事件
    $right.on('click', function() {
        qiehuan();
    });
    $left.on('click', function() {
        console.log($num)
        $num -= 2;
        qiehuan();
        console.log($num)
    });

    //幻灯片切换效果
    function qiehuan() {
        $num++;
        //判断右箭头
        if ($num > $btnlist.length - 1) {
            $ul.stop(true).animate({
                left: -$liwidth * $num
            }, 400);
            $num = 0;
        }

        //判断左箭头
        if ($num < 0) {
            $ul.stop(true).animate({
                left: -$liwidth * $num
            }, 400);
            $num = $btnlist.length - 1;
        }

        //设置按钮
        if ($num === $btnlist.length) {
            $btnlist.eq(0).addClass('active').siblings().removeClass('active');
        } else {
            $btnlist.eq($num).addClass('active').siblings().removeClass('active');
        }
        $ul.stop(true).animate({
            left: -$liwidth * $num
        }, 400);
    }
    $timer = setInterval(function() {
        $right.click();
    }, 3000);
    $huandengpian.hover(function() {
        clearInterval($timer);
    }, function() {
        $timer = setInterval(function() {
            $right.click();
        }, 3000);
    });


    //回到顶部
    $('.top').click(function() {
        $("body, html").animate({ scrollTop: 0 }, 1000);
    });

    //滑入侧边栏效果
    $('.grzx').on('mouseover', function() {
        $('.grzx p').show();
        $('.grzx p').stop(true).animate({ opacity: 1, left: -78 },
            400)
    });
    $('.grzx').on('mouseout', function() {
        // console.log(1)
        $('.grzx p').stop(true).animate({ left: -120, opacity: 0 },
            400);
    });
    $('.wdgz').on('mouseover', function() {
        $('.wdgz p').show();
        $('.wdgz p').stop(true).animate({ opacity: 1, left: -78 },
            400)
    });
    $('.wdgz').on('mouseout', function() {

        $('.wdgz p').stop(true).animate({ left: -120, opacity: 0 },
            400);
    });
    $('.zxkf').on('mouseover', function() {
        $('.zxkf p').show();
        $('.zxkf p').stop(true).animate({ opacity: 1, left: -78 },
            400)
    });
    $('.zxkf').on('mouseout', function() {

        $('.zxkf p').stop(true).animate({ left: -120, opacity: 0 },
            400);
        // timer = setTimeout(function() {
        //     $('.zxkf p').hide();
        // }, 400);
    });

    //Dota专区渲染数据
    const $dotalist = $('.dota_pic ul');
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/dotadata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml1 = `
        <li class="l1"><img src="http://img.shop.wanmei.com/upload/moduleScroll/2018-06-11/7cef96d122b64cf7976e4233ef0bbc07.jpg" alt=""></li>
        `;
        $.each(data, function(index, value) {
            $strhtml1 += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class="lazy" data-original="${value.src}" alt="">
                    <p class="title">${value.title}</p>
                    <p class="price">${value.price}</p>
                </a>
            </li>
            `;
        });
        $dotalist.html($strhtml1);

        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //完美世界专区渲染数据
    const $wmsjlist = $('.wmsj_pic ul');
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/wmsjdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml2 = `
        <li class="l1">
            <img src="http://img.shop.wanmei.com/upload/moduleScroll/2016-07-25/b24a4280-eb2a-4cc6-ba6e-97a97dde6c9c.jpg" alt="">
        </li>
        `;
        $.each(data, function(index, value) {
            $strhtml2 += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class="lazy" data-original="${value.src}" alt="">
                    <p class="title">${value.title}</p>
                    <p class="price">${value.price}</p>
                </a>
            </li>
            `;
        });
        $wmsjlist.html($strhtml2);

        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //CSGO专区渲染数据
    const $csgolist = $('.csgo_pic ul');
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/csgodata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml3 = '';
        $.each(data, function(index, value) {
            $strhtml3 += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class="lazy" data-original="${value.src}" alt="">
                    <p class="title">${value.title}</p>
                    <p class="price">${value.price}</p>
                </a>
            </li>
            `;
        });
        $csgolist.html($strhtml3);
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //姜小虎专区渲染数据
    const $jxhlist = $('.jxh_pic ul');
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/jxhdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml4 = `
        <li class="l1">
            <img src="http://img.shop.wanmei.com/upload/moduleScroll/2016-09-12/b31b587d-eb0c-4c0f-9e99-bd2185325d08.jpg" alt="">
        </li> 
        `;
        $.each(data, function(index, value) {
            $strhtml4 += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class="lazy" data-original="${value.src}" alt="">
                    <p class="title">${value.title}</p>
                    <p class="price">${value.price}</p>
                </a>
            </li>
            `;
        });
        $jxhlist.html($strhtml4);

        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });
}(jQuery);