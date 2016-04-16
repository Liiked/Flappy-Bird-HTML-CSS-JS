window.onload=series;
function series(){
	createMultiBar();
	setbarposition();
	setbarHeight();
}
//全局参数
var numBar = 15;
var flyrun = true; //控制飞行函数运行开关
var droprun = true;//控制下降函数运行开关
var gameon = false; //游戏开关;
var topbar =document.getElementById("flag-top"); //上半部
var bottombar =document.getElementById("flag-bottom");//下半部
var isReset = false; //重置开关

// -------------启动游戏

function play(){
	if(isReset == true){
		resetGame();
		isReset = false;
	}
	gameon = true;
	//清除遮罩
	var mask = document.getElementsByClassName("mask");
	var button = document.getElementsByClassName("btn");
	var start = document.getElementById("start");
	mask[0].style.display = "none";
	button[0].style.display= "none";
	start.style.display= "none";
	//运行游戏
	moveBar();
	dropDown();


}
// -------------启动游戏结束



// -------------小鸟部分
var elem=document.getElementById("box");
	elem.style.top="200px";
var ypos=parseInt(elem.style.top);
var xpos=parseInt(elem.style.left);


// 按住动画
function  fly()
{   
	if (gameon == false) {
		elem.style.top="200px";
		return false;
	};

   if(event.keyCode==32){
   	if(elem.fly){
			clearTimeout(elem.fly);
		}
	   	var jump = function(){
			var ypos = parseInt(elem.style.top);
			ypos -= 2.2;
			elem.style.top = ypos + "px";
			if (ypos<20) {				//上限限制
				clearTimeout(elem.fly);
				elem.style.top = "0px";
			};
			isOver();
		}
   		
		for (var i = 0; i < 40; i++) { //单次跳跃高度
			elem.fly=setTimeout(jump,i*3);
		};
		if (flyrun == false) {
			return false;
			clearTimeout(elem.fly);
		};
		dropDown();
		
   }
} 
// 掉落动画
function dropDown(){
	if (droprun == false) {
		return false;
		clearTimeout(elem.drop);
	};
	if(elem.drop){
		clearTimeout(elem.drop);
	};
	var ypos=parseInt(elem.style.top);
	if ( ypos <= 550) {
		ypos += 3 ;
	}
	elem.style.top = ypos + "px" ;
	elem.drop=setTimeout("dropDown()",10);
	if ( ypos >= 551) {
		return false ;
	}
	isOver();
};

// -------------小鸟部分结束

// -------------障碍物产生
function createBar(){


	var stopbar = document.createElement("div");
	stopbar.className="tbar";
	var sbottombar = document.createElement("div");
	sbottombar.className="bbar";
	topbar.appendChild(stopbar);
	bottombar.appendChild(sbottombar);

	// ttbar.insertBefore(stopbar,ttbar);
}

function createMultiBar(){
		for (var i = 0; i < numBar; i++) {
			createBar();	
		}
}
//bar长度确定
var max=240;
var min=100;
var flagheight =300;
function setbarHeight(){
	var topbar = document.getElementsByClassName("tbar");
	var bottombar = document.getElementsByClassName("bbar");
	//上半部
	for (var i = 0; i < topbar.length; i++) {
	var random_1 = Math.random() //随机数规则
		if (random_1 >= 0.5) {
			var random_t =random_1;
			}else{
			random_t = 0.5;
		}
			topbar[i].style.height = min + random_t*150 +"px";
			var toph= parseInt(topbar[i].style.height);
			var thh= toph - max -10 ;
			topbar[i].style.top =  thh +"px";
	};
	//下半部
	for (var i = 0; i < bottombar.length; i++) {
	var random_2 = Math.random(); //随机数规则
		if (random_2 >= 0.5) {
				var random_b =random_2;
		}else{
				random_b = 0.5;
		}
		bottombar[i].style.height = min + random_b*150 +"px";
		var toph= parseInt(bottombar[i].style.height);
		var thr= flagheight -toph   ;
		bottombar[i].style.top = thr+"px";
	};
}

var topbarmix = document.getElementsByClassName("tbar");
var botbarmix = document.getElementsByClassName("bbar");

//设置每个bar的位置
function setbarposition(){
	var topbarmix = document.getElementsByClassName("tbar");
	var botbarmix = document.getElementsByClassName("bbar");
	for (var i = 0; i < botbarmix.length; i++) {
		var leftposition = i*200;
		botbarmix[i].style.left=leftposition+"px";
	};
	for (var i = 0; i < topbarmix.length; i++) {
		var leftposition = i*200;
		topbarmix[i].style.left=leftposition+"px";
	};
}

// -------------障碍物产生结束

//-------------获取元素位置

function xleft(element){
	var  a = element.getBoundingClientRect().left;
	return(a);
}
function xright (element){
	var a =element.getBoundingClientRect().right;
	return(a);
}
function ytop (element){
	var a = element.getBoundingClientRect().top;
	return(a);
}
function ybottom (element){
	var  a =element.getBoundingClientRect().bottom;
	return(a);
}

//-------------获取元素位置结束

// -------------移动障碍
var flagtop=document.getElementById("flag-top");
flagtop.style.left="200px";
var flagbottom=document.getElementById("flag-bottom");
flagbottom.style.left="200px";

function moveBar(){
	var xtopbar=parseInt(flagtop.style.left);
	var xbottombar=parseInt(flagbottom.style.left);
	if (xtopbar > -5000) {
		xtopbar --;
	};
	if (xbottombar > -5000) {
		xbottombar --;
	};
	flagtop.style.left=xtopbar + "px";
	flagbottom.style.left=xbottombar + "px";
	move = setTimeout("moveBar()",10);
	hideBar();
}

// -------------移动障碍结束

// -------------游戏规则---------

function hideBar(){
	for (var i = 0; i < topbarmix.length; i++) {
		var lbar = xleft(topbarmix[i]);
		if (lbar <= -50) {
			topbarmix[i].className="thidden";
			score();
		};
	}
	for (var j = 0; j < botbarmix.length; j++) {
		var bbar = xleft(botbarmix[j]);
		if (bbar <= -50) {
			botbarmix[j].className="bhidden";
			
		};
	}
}

function isOver(){
	var lbox = xleft(elem);
	var rbox = xright(elem);
	var tbox = ytop(elem);
	var bbox = ybottom(elem);
	var latestTBar = document.getElementsByClassName("tbar")[0];
	var ltopbar = xleft(latestTBar);
	var topbarBottom = ybottom(latestTBar);
	var latestBBar = document.getElementsByClassName("bbar")[0];
	var lbottombar = xleft(latestBBar);
	var bbartop = ytop(latestBBar); 
		
		//上半部分
		if(tbox <= topbarBottom && rbox == ltopbar ){ //左右侧重叠
				stopAnimition();
		}
		if (rbox >= ltopbar && tbox <= topbarBottom ) { //上下重叠
				stopAnimition();	
		};
		//下半部分
		if (bbox >= bbartop && rbox == lbottombar) {
			stopAnimition();
		};
		if (rbox >= lbottombar && bbox >= bbartop) {
			stopAnimition();
		};
		if (tbox == 548 ) {
			stopAnimition();
		};
}

//记分
var scoretext = document.getElementById("score");

function score(){
	countmix = document.getElementsByClassName("thidden");
	var count = countmix.length;
	scoretext.innerHTML=count;	
}

// -------------游戏规则结束

// -------------重置游戏

//停止动画
function stopAnimition(){
	clearTimeout(move);
	flyrun =false;
	droprun =false;
	gameon = false; //关闭游戏
	isReset =true;
	//显示遮罩
	var mask = document.getElementsByClassName("mask");
	var button = document.getElementsByClassName("btn");
	var start = document.getElementById("start");
	mask[0].style.display = "block";
	button[0].style.display= "block";
	start.style.display= "inline";

	resetBackgroud();


}

function resetBackgroud(){
	var topbar =document.getElementById("flag-top"); //上半部
	var bottombar =document.getElementById("flag-bottom");//下半部
	topbar.style.left="200px";
	bottombar.style.left="200px";
	//取消类名

	for (var i = hideTBar.length - 1; i >= 0; i--) {
		hideTBar[i].className = "tbar";
	};
	for (var i = hideBBar.length - 1; i >= 0; i--) {
		hideBBar[i].className = "bbar";
	};
	// for语句缺陷
	// for (var i = 0; i < hideTBar.length; i++) {
	// 	console.log(hideTBar.length);
	// 	console.log("i="+i);
	// 	hideTBar[0].className = "tbar";
	// };

}
	var hideTBar = document.getElementsByClassName("thidden");
	var hideBBar = document.getElementsByClassName("bhidden");
//重置游戏
function resetGame(){

	//小鸟重置
	var elem=document.getElementById("box");
	elem.style.top="200px";

	setbarHeight();
	setbarposition();

	flyrun = true;
	droprun = true;	
	scoretext.innerHTML="0";//分数重置
	
	//关闭游戏
}

// -------------重置游戏结束


