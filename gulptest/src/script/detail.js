! function($) {
    //获取sid渲染给详情页
    let $sid = location.search.substring(1).split('=')[1];
    const $pic = $('.pic img');
    const $title = $('.title');
    const $price = $('.price');
    if (!$sid) {
        $sid = 1;
    };
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(dataobj) {
        $pic.attr('src', dataobj.src);
        $pic.attr('sid', dataobj.sid);
        $title.html(dataobj.title);
        $price.html('￥' + dataobj.price);

        let listpic = dataobj.piclisturl.split(',');
        let $strhtml = '';
        $.each(listpic, function(index, value) {
            $strhtml += '<span><img src="' + value + '"/></span>';
        });
        $('.xiaotu').html($strhtml);
        //小图切换
        $('.xiaotu span').on('click', function() {
            let $imgurl = $(this).find('img').attr('src');
            $pic.attr('src', $imgurl);
        });
    });

    //只能输入数字
    $('.goodnum input').on('input', function() {
        if ($(this).val() != '') {
            let $reg = /^\d+$/g;
            let $value = $(this).val();
            if (!$reg.test($value)) {
                $(this).val(1);
            }
            if ($(this).val() == 0) {
                $(this).val(1);
            }
        }

    });
    //数量减一
    let $num = Number($('.goodnum .num').val());
    $('.goodnum .sub').on('click', function() {
        $num -= 1;
        if ($num < 1) {
            $num = 1;
        }
        $('.goodnum .num').val($num)
    });
    //数量加一
    const $add = $('.goodnum .add')
    $add.on('click', function() {
        $num += 1;
        $('.goodnum .num').val($num)
    });
    //加入购物车
    let arrsid = [];
    let arrnum = [];

    function cookiearr() {
        if (cookie.get('cookiesid') && cookie.get('cookienum')) {
            arrsid = cookie.get('cookiesid').split(',');
            arrnum = cookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    };

    $('.addcar').on('click', function() {
        let $sid = $(this).parents('.wrapper').find('.spic').attr('sid');
        cookiearr();
        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.num').val());
            arrnum[$.inArray($sid, arrsid)] = $num;
            cookie.set('cookienum', arrnum, 10);
        } else {

            arrsid.push($sid);
            cookie.set('cookiesid', arrsid, 10);
            arrnum.push($('.num').val());
            cookie.set('cookienum', arrnum, 10);
        }
        $('.shade').show()
    });
    $('.hide').on('click', function() {
        $('.shade').hide()
    });
    $('.goon').on('click', function() {
        $('.shade').hide()
    });
}(jQuery);