! function($) {
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;

    const $list = $('.list_content ul');
    //渲染数据
    $.ajax({
        url: 'http://10.31.152.13/project/gulptest/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
            <li>
            <a href="detail.html?sid=${value.sid}">
                    <p class="like"><i></i><span class="like_people">${value.like}</span></p>
                    <img class="lazy" data-original="${value.src}" alt="">
                    <p class="title">${value.title}</p>
                    <p class="price">￥${value.price}</p>
                </a>
            </li>
            `;
        });
        $list.html($strhtml);

        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.list_content li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //分页
    $('.page').pagination({
        pageCount: 3,
        // jump: true,
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            $.ajax({
                url: 'http://10.31.152.13/project/gulptest/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                            <p class="like"><i></i><span class="like_people">${value.like}</span></p><div>
                            <img class="lazy" data-original="${value.src}" alt=""></div>
                            <p class="title">${value.title}</p>
                            <p class="price">￥${value.price}</p>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                array_default = [];
                array = [];
                prev = null;
                next = null;

                $('.list_content li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });
    //喜好排序
    $('.xihao').on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.like_people').html().substring(0)); //当前li的喜好人数
                next = parseFloat(array[j + 1].find('.like_people').html().substring(0));
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list_content ul').empty();
        $.each(array, function(index, value) {
            $('.list_content ul').append(value);
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
        });
    });
    //价格排序
    $('.jiage').on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1)); //当前li的价格
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list_content').empty();
        $.each(array, function(index, value) {
            $('.list_content').append(value);
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
        });
    });
    //回到顶部
    $('.top').click(function() {
        $("body, html").animate({ scrollTop: 0 }, 1000);
    })
}(jQuery);