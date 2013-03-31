/*global $*/
(function (window, document, undefined) {
    var log = function (data) {
        var logSwitch = true;
        if (logSwitch) {
            data = data || {};

            var url = 'wdj://window/log.json';
            var datas = [];
            var d;
            for (d in data) {
                if (data.hasOwnProperty(d)) {
                    datas.push(d + '=' + window.encodeURIComponent(data[d]));
                }
            }
            url += '?' + datas.join('&');

            window.OneRingRequest('get', url, '', function (resp) {
                resp = JSON.parse(resp);
                if (resp.state_code === 200) {
                    console.log('Log: ', url);
                }
            });
        }
    };

    var requestAsync = function (options) {
        var deferred = $.Deferred();
        var url = options.url;
        options.data = options.data || {};

        var done = function (resp) {
            deferred.resolve(resp);
        };

        var datas = [];
        var d;
        for (d in options.data) {
            if (options.data.hasOwnProperty(d)) {
                datas.push(d + '=' + window.encodeURIComponent(options.data[d]));
            }
        }

        if (datas.length > 0) {
            url = url + '?' + datas.join('&');
        }

        window.OneRingRequest('get', url, null, done);
        return deferred.promise();
    };

    $('.list-ctn').masonry({
        itemSelector: 'li'
    });

    $(window).on('resize', function () {
        $('.wrap').width(Math.floor($(this).width() / 220) * 220 + 2)
                    .height(Math.floor($(this).height() / 220) * 220 + 25);
    });

    $('.wrap').width(Math.floor($(this).width() / 220) * 220 + 2)
                .height(Math.floor($(this).height() / 220) * 220 + 25);

    var openExtension = function (extensionId, url) {
        requestAsync({
            url : 'wdj://window/publish.json',
            data : {
                value : JSON.stringify({
                    type : 'ext',
                    id : extensionId,
                    url : url || ''
                }),
                channel : 'billborad.navigate'
            }
        });
    };

    var download = function (url, name, icon) {
        requestAsync({
            url : 'wdj://window/publish.json',
            data : {
                value : JSON.stringify({
                    type : 'download',
                    url : url,
                    name : name,
                    icon : icon
                }),
                channel : 'billborad.navigate'
            }
        });
    };

    $(document).on('click', '.list-ctn li > span', function () {
        var $this = $(this);
        var type = $this.attr('data-type');
        var extensionId = $this.attr('data-extension-id');
        var url = $this.attr('data-url') || '';
        var name = $this.attr('data-name') || '';
        var icon = $this.attr('data-icon') || '';
        var packageName = $this.attr('data-package') || '';
        switch (type) {
        case 'extension':
            openExtension(extensionId, url);
            break;
        case 'wandoujia':
            openExtension(18, url);
            break;
        case 'download':
            download(url, name, icon);
            break;
        case 'foolsday':
            var ua = window.navigator.userAgent.split(' ');
            var version = ua[ua.length - 1];
            if (version.localeCompare('2.52') > 0) {
                requestAsync({
                    url : 'wdj://window/publish.json',
                    data : {
                        channel : 'web.navigate',
                        value : JSON.stringify({
                            type : 'wash'
                        })
                    }
                });
            } else {
                $('<a>').attr({
                    href : 'http://www.wandoujia.com/xibaibai/air?utm_source=windows&utm_medium=banner&utm_campaign=2013Fools',
                    target : '_default'
                })[0].click();
            }

            log({
                'event' : 'ui.click.welcome_billboard_xibaibai',
                'version' : version
            });
            break;
        }

        log({
            'event' : 'ui.click.welcome.billborad.item',
            'action' : type,
            'content' : extensionId || name
        });
    });
}(this, this.document));
