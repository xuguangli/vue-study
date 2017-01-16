var BASIC_URL = "https://cnodejs.org/api/v1";
var GET_TOPICS = "/topics";
var GET_TOPIC = "/topic";
$(document).ready(function() {
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
        	getTopicUrl:function(id){
        		return BASIC_URL+GET_TOPIC+"/"+id;
        	},
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
                    	'hidden':true
                    }
                }
            },
            formatReplyTime: function(replytime) {
                var datetime = new Date(replytime);
                var nowDate = new Date();
                var ms = nowDate.getTime() - datetime.getTime();
                //相差年
                var years = Math.floor(ms / (24 * 3600 * 1000 * 30 * 12));
                //相差月
                var month = Math.floor(ms / (24 * 3600 * 1000 * 30));
                //相差天
                var days = Math.floor(ms / (24 * 3600 * 1000));
                //相差小时
                var hours = Math.floor(ms / (3600 * 1000));
                //相差分钟
                var minutes = Math.floor(ms / (60 * 1000));
                //相差秒数
                var seconds = Math.floor(ms / 1000);

                if (years != 0) {
                    return years + "年前";
                } else if (month != 0) {
                    return month + "个月前";
                } else if (days != 0) {
                    return days + "天前";
                } else if (hours != 0) {
                    return hours + "小时前";
                } else if (minutes != 0) {
                    return minutes + "分钟前";
                } else if (seconds != 0) {
                    return seconds + "秒前";
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
