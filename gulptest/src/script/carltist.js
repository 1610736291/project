! function($) {
    //克隆隐藏元素
    function goodlist(sid, num) {
        $.ajax({
            url: 'http://10.31.152.13/project/gulptest/php/alldata.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.good_info:hidden').clone(true, true);
                    $clonebox.find('.title img').attr('src', value.src);
                    $clonebox.find('.title img').attr('sid', value.sid);
                    $clonebox.find('.title span').html(value.title);
                    $clonebox.find('.goodnum p input').val(num);
                    $clonebox.find('.price strong').html((value.price * num).toFixed(2));
                    $clonebox.find('.price sub').html(value.price);
                    $clonebox.css('display', 'block');
                    $('tbody').append($clonebox);
                    allprice();
                }
            });
        });
    }

    //获取cookie渲染数据
    if (cookie.get('cookiesid') && cookie.get('cookienum')) {
        $('.cart_null').hide();
        $('.cart_list').show();
        let s = cookie.get('cookiesid').split(',');
        let n = cookie.get('cookienum').split(',');
        $.each(s, function(index, value) {
            goodlist(s[index], n[index]);
        });
    } else {
        $('.cart_null').show();
        $('.cart_list').hide();
    }

    //计算每种商品的总价
    function onegoodprice(obj) {
        let $danjia = parseFloat(obj.parents('.good_info').find('.price sub').html());
        let $num = parseInt(obj.parents('.good_info').find('.goodnum p input').val());
        return ($danjia * $num).toFixed(2)
    }

    //计算总价和顶部购物车的商品总数量
    function allprice() {
        let $sum = 0;
        let $allnum = 0;
        let $count = 0;
        $('.good_info:visible').each(function(index, ele) {
            if ($(ele).find('.select input').prop('checked')) {
                $sum += parseInt($(ele).find('.goodnum p input').val());
                $count += parseFloat($(ele).find('.price strong').html());
            }
        });
        $('.good_info:visible').each(function(index, ele) {
            $allnum += parseInt($(ele).find('.goodnum p input').val());
        });
        $('.allnum').find('em').html($sum);
        $('.shopcar').find('em').html($allnum)
        $('.allprice i').html('￥' + $count.toFixed(2));
    };

    //不能输入非数字和第一位不能为零
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
            $(this).parents('.good_info').find('.price strong').html(onegoodprice($(this)));
            allprice();
            setcookie($(this));
        }
    });

    //数量减一
    $('.goodnum .sub').on('click', function() {
        let $num = $(this).parents('.good_info').find('.goodnum p input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.good_info').find('.goodnum p input').val($num);
        $(this).parents('.good_info').find('.price strong').html(onegoodprice($(this)));
        allprice();
        setcookie($(this));
    });

    //数量加一
    const $add = $('.goodnum .add')
    $add.on('click', function() {
        let $num = $(this).parents('.good_info').find('.goodnum p input').val();
        $num++;
        $(this).parents('.good_info').find('.goodnum p input').val($num);
        $(this).parents('.good_info').find('.price strong').html(onegoodprice($(this)));
        console.log(onegoodprice($(this)));
        allprice();
        setcookie($(this));
    });

    //全选
    $('.allselect').on('change', function() {
        $('.good_info:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allselect').prop('checked', $(this).prop('checked'));
        allprice();
    });

    //列表的复选框添加事件
    let $inputs = $('.good_info:visible').find(':checkbox');
    $('tbody').on('change', $inputs, function() {
        if ($('.good_info:visible').find(':checkbox').length === $('.good_info:visible').find('input:checked').size()) {
            $('.allselect').prop('checked', true);
        } else {
            $('.allselect').prop('checked', false);
        }
        allprice();
    });

    //将改变后的数量存放到cookie中
    let arrsid = [];
    let arrnum = [];

    function cookietoarray() {
        if (cookie.get('cookiesid') && cookie.get('cookienum')) {
            arrsid = cookie.get('cookiesid').split(',');
            arrnum = cookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    //设置cookie
    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.good_info').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.good_info').find('.goodnum input').val();
        cookie.set('cookienum', arrnum, 10);
    }

    //删除
    function delcookie(sid, arrsid) {
        let $index = -1;
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        cookie.set('cookiesid', arrsid, 10);
        cookie.set('cookienum', arrnum, 10);
    }

    //删除单个
    $('.del a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.good_info').remove();
            delcookie($(this).parents('.good_info').find('img').attr('sid'), arrsid);
            allprice();
        }
    });
    //删除选中
    $('.alldel a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除选中的商品吗?')) {
            $('.good_info:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) {
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });
            allprice();
        }
    });
}(jQuery);