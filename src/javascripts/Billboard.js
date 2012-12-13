/*global $*/
(function (window, undefined) {
    var document = window.document;

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
        $('.wrap').width(Math.floor($(this).width() / 220) * 220 + 2);
        $('.wrap').height(Math.floor($(this).height() / 220) * 220 + 25);
    });

    $('.wrap').width(Math.floor($(this).width() / 220) * 220 + 2);
    $('.wrap').height(Math.floor($(this).height() / 220) * 220 + 25);

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
            openExtension(extensionId);
            break;
        case 'wandoujia':
            openExtension(18, url);
            break;
        case 'download':
            download(url, name, icon);
            break;
        }
    });
}(this));