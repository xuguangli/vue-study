var vm;
$(document).ready(function() {
    vm = new Vue({
        el: "#app",
        data: {
            msg: 'hello vue',
            length: 20,
            sortArray:[],
            randomFinish:false
        },
        methods: {
            randomFun: function() {
                if (!isNaN(this.length)) {
                	this.sortArray = [] //每次都将数组清空
                    for (var i = 0; i < this.length; i++) {
                    	this.sortArray.push(Math.round(Math.random() * this.length * 10));
                    }
                    //console.log(this.sortArray);
                    this.randomFinish = true;
                } else {
                    alert("请输入数字。");
                }
            },
            bubbleSort:function(){
            	for(var i=0;i<this.sortArray.length-1;i++){
                    var flag = true;//冒泡排序优化
            		for(var j=0;j<this.sortArray.length-i;j++){
            			if (this.sortArray[j]>this.sortArray[j+1]) {
            				var tmp = this.sortArray[j];
            				this.sortArray[j] = this.sortArray[j+1];
            				this.sortArray[j+1] = tmp;
                            flag = false;
            			}
            		}
                    if(flag){
                        console.log('break'+i);
                        break;
                    }
            	}
                this.sortArray.push(0);
                this.sortArray.pop();//通过array[i]=x这种方式赋值无法触发视图更新，最后两句纯粹为了通知视图刷新
                //console.log(this.sortArray);
            }
        }
    })
});
