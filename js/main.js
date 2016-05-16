window.onload=function(){
	//画地图
	function Map () {
		var w=800;
		var h=400;
		this.showMap=function(){
		 var tu=document.createElement("div");  
		 tu.style.width=w+"px";
		 tu.style.height=h+"px";
		 tu.style.backgroundImage="url(./1.png)";
		 document.body.appendChild(tu);
		}
	}
	//食物
	function Food(){
		var len=20;
		this.shi=null;
		this.xFood=0;
		this.yFood=0;
		this.showFood=function(){
			if (this.shi===null) {
			this.shi=document.createElement("div");
			this.shi.style.width=this.shi.style.height=len+"px";
			this.shi.style.backgroundColor="red";
			this.shi.style.position="absolute";
			this.shi.style.zIndex=9;
			document.body.appendChild(this.shi);
			}
			this.xFood=Math.floor(Math.random()*40);
			this.yFood=Math.floor(Math.random()*20);
			this.shi.style.left=this.xFood*len+"px";
			this.shi.style.top=this.yFood*len+"px";
		}
	}
	//绘制小蛇
	function Snake(){
		var len=20;
		this.derict="right";
		this.addr=[[0,1,"blue",null],[1,1,"blue",null],[2,1,"blue",null],[3,1,"red",null]];
		this.showSnake=function(){
			for (var i = 0; i < this.addr.length; i++) {
				if (this.addr[i][3]===null) {
				this.addr[i][3]=document.createElement("div");
				this.addr[i][3].style.width=this.addr[i][3].style.height=len+"px";
				this.addr[i][3].style.backgroundColor=this.addr[i][2];
				this.addr[i][3].style.position="absolute";
				}
				this.addr[i][3].style.left=this.addr[i][0]*len+"px";
				this.addr[i][3].style.top=this.addr[i][1]*len+"px";
				document.body.appendChild(this.addr[i][3]);
			}
		}

		this.move=function(){
			for (var i = 0; i < this.addr.length-1; i++) {
				this.addr[i][0]=this.addr[i+1][0];
				this.addr[i][1]=this.addr[i+1][1];
			}
			switch (this.derict) {
				case "right":
					this.addr[this.addr.length-1][0]+=1;
					break;
				case "left":
					this.addr[this.addr.length-1][0]-=1;
				break;
				case "up":
					this.addr[this.addr.length-1][1]-=1;
				break;
				case "down":
					this.addr[this.addr.length-1][1]+=1;
					break;
			}
			var xSnake=this.addr[this.addr.length-1][0];
			var ySnake=this.addr[this.addr.length-1][1];
			if(xSnake==food.xFood&&ySnake==food.yFood){
				var newjie=[this.addr[0][0],this.addr[0][1],"blue",null];
				this.addr.unshift(newjie);
				food.showFood();
			}
			if (xSnake<0||xSnake>39||ySnake<0||ySnake>19) {
				alert("game over!");
				clearInterval(timer);
				return false;
			}
			for (var k = 0; k < this.addr.length-1; k++) {
				if (this.addr[k][0]==xSnake&&this.addr[k][1]==ySnake) {
					alert("game over!");
					clearInterval(timer);
					return false;
				}
			}
			this.showSnake();
		}

	}

	//设置键盘事件
	document.onkeydown=function(event){
		var num=event.keyCode;
		switch(num){
			case 38:
			snake.derict="up";
			break;
			case 40:
			snake.derict="down";
			break;
			case 37:
			snake.derict="left";
			break;
			case 39:
			snake.derict="right";
		}
	}
	var map=new Map();
	map.showMap();

	var food=new Food();
	food.showFood();

	snake=new Snake();
	snake.showSnake();
	//setInterval("全局变量"，时间);
	timer=setInterval("snake.move()",200);
}