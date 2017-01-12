$(document).ready(function() {
    var BASIC_URL = "https://cnodejs.org/api/v1";
    var GET_TOPICS = "/topics";
    var vm = new Vue({
        el: '#main',
        data: {
            title: 'CNode-Demo',
            topics: [],
            item: null
        },
        computed: {
            // both get and set
        },
        methods: {
            getTopicStatus: function(one) {
                // console.log(one);
                if (one.top) {
                    return "置顶";
                } else if (one.good) {
                    return "精华";
                } else {
                    if (one.tab === 'share') {
                        return "分享";
                    } else if (one.tab === 'job') {
                        return "招聘";
                    } else if (one.tab === 'ask') {
                        return "问答";
                    }
                }
            },
            iconClass: function(one) {
                if (one.top || one.good) {
                    return {
                        'top': true
                    };
                } else if (one.tab) {
                    return {
                        'tab': true
                    };
                } else {
                    return {
                        display: 'none',
                        width: '0px'
                    }
                }
            }
        }
    });
    $.ajax({
        url: BASIC_URL + GET_TOPICS,
        // page Number 页数
        // tab String 主题分类。目前有 ask share job good
        // limit Number 每一页的主题数量
        // mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
        data: {
            page: 1,
            // tab: 'ask',
            limit: 100
        },
        success: function(data) {
            console.log(data);
            vm.topics = data.data;
        },
        error: function() {

        }
    });
    return vm;
})
