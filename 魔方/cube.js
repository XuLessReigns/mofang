$(document).ready(function(){
	var mX;
	var mY;
	var trZ=0;
	var roX=330;
	var roY=30;
	var b_up=1;
	var roxn=0;
	var subface=new Array();
	var cube_html="";
	var sfID="";
	var mouseSwitch=0;
	var r_switch=0;
	var ran_switch=1;
	rotateCUBE();
	$("#container").css("left",$(document).width()/2-400+"px");
	for(i=1;i<=6;i++){
		//6个面，1前2后3右4左5上6下
		subface[i]=new Array();
		for(j=1;j<=9;j++){
			//每面9个小块，1左上2上3右上4左5中6右7左下8下9右下
			subface[i][j]=new Array();
			for(k=1;k<=2;k++)
			//k=1设置背景颜色，k=2设置位置
				subface[i][j][k]="";
		}
	}
	
	//初始化大面颜色和位置
	for(j=1;j<=9;j++){
		subface[1][j][1]="#FD2429";
		subface[1][j][2]+="rotateY(0deg)";
	}
	for(j=1;j<=9;j++){
		subface[2][j][1]="#F60";
		subface[2][j][2]+="rotateY(180deg)";
	}
	for(j=1;j<=9;j++){
		subface[3][j][1]="#0BBB1D";
		subface[3][j][2]+="rotateY(90deg)";
	}
	for(j=1;j<=9;j++){
		subface[4][j][1]="#06C";
		subface[4][j][2]+="rotateY(-90deg)";
	}
	for(j=1;j<=9;j++){
		subface[5][j][1]="#FF0";
		subface[5][j][2]+="rotateX(90deg)";
	}
	for(j=1;j<=9;j++){
		subface[6][j][1]="#FFF";
		subface[6][j][2]+="rotateX(-90deg)";
	}
	
	//初始化子面位置
	for(i=1;i<=6;i++){
		subface[i][1][2]+=" translateX(-100px) translateY(-100px)";
		subface[i][2][2]+=" translateY(-100px)";
		subface[i][3][2]+=" translateX(100px) translateY(-100px)";
		subface[i][4][2]+=" translateX(-100px)";
		subface[i][5][2]+="";
		subface[i][6][2]+=" translateX(100px)";
		subface[i][7][2]+=" translateX(-100px) translateY(100px)";
		subface[i][8][2]+=" translateY(100px)";
		subface[i][9][2]+=" translateX(100px) translateY(100px)";
	}
	
	addsf();
	
	//拖动转向
	var md=2;
	$(document).mousemove(function(e){
		if(md==1){
 		    mX=e.pageX;
			mY=e.pageY;
			md=2;
		}else if(!md){
			mX=e.pageX-mX;
			mY=e.pageY-mY;
			md=2;
			if(Math.abs(mX)>50||Math.abs(mY)>50){
				if(sfID!=""){
					//转动一层
					switch(parseInt(sfID.charAt(2))){
						case 1:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								bu(-mY*b_up);
							break;
						case 2:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								bu2(mY*b_up);
							break;
						case 3:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								buff4(mY*b_up);
							break;
						case 4:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								buff3(-mY*b_up);
							break;
						case 5:
							switch(roxn%2){
								case 0:
									if(Math.abs(mX)>Math.abs(2*mY))
										buff((1-roxn)*mX);
									else
										bu((roxn-1)*mY);
									break;
								case 1:
									if(Math.abs(mX)>Math.abs(2*mY))
										bu((roxn-2)*mX);
									else
										buff((roxn-2)*mY);
									break;
							}
							break;
						case 6:
							switch(roxn%2){
								case 0:
									if(Math.abs(mX)>Math.abs(2*mY))
										bu((1-roxn)*mX);
									else
										buff2((roxn-1)*mY);
									break;
								case 1:
									if(Math.abs(mX)>Math.abs(2*mY))										
										buff2((2-roxn)*mX);
									else
										bu((2-roxn)*mY);
									break;
							}
							break;
					}
				}else{
					//转动整体
					if(Math.abs(mX)>Math.abs(mY)){
						if(mX>0){
							if(b_up==1){
								roY+=90;
								roxn++;
								roxn%=4;
							}
							else{
								roxn--;
								if(roxn<0)
									roxn+=4;
								roY-=90;
							}
							rotateCUBE();
						}else {
							if(b_up==-1){
								roY+=90;
								roxn++;
								roxn%=4;
							}
							else{
								roxn--;
								if(roxn<0)
									roxn+=4;
								roY-=90;
							}
							rotateCUBE();
						}						
					}else{
						b_up=-b_up;
						if(mY>0){
							roX-=180;
							roY-=b_up*30;
							rotateCUBE();
						}else {
							roX+=180;
							roY-=b_up*30;
							rotateCUBE();
						}					
					}
				}
			}
			mX=e.pageX;
			mY=e.pageY;
			sfID="";
		}
	});
	$(document).mousedown(function(){
		md=1;
		if(!mouseSwitch){
			mouseSwitch=1;
		}
	});
	$(document).mouseup(function(){
		md=0;
		if(mouseSwitch==1){
			mouseSwitch=2;
			var timer_=setTimeout(function(){mouseSwitch=0},500);
		}
	});
	
	//向页面中添加各面
	function addsf(){
		cube_html="";
		for(i=1;i<=6;i++)
			for(j=1;j<=9;j++){
				if(j==1)
					switch(i){
						case 1:
							cube_html+='<div id="frontF">';
							break;
						case 2:
							cube_html+='<div id="backF">';
							break;
						case 3:
							cube_html+='<div id="rightF">';
							break;
						case 4:
							cube_html+='<div id="leftF">';
							break;
						case 5:
							cube_html+='<div id="topF">';
							break;
						case 6:
							cube_html+='<div id="bottomF">';
					}
				cube_html+='<li id="sf'+i+'_'+j+'" style="background-color:'+subface[i][j][1]+'; -webkit-transform:'+subface[i][j][2]+' translateZ(150px); -moz-transform:'+subface[i][j][2]+' translateZ(150px);"></li>'
				if(j==9)cube_html+='</div>';
			};
		$("#cube").html(cube_html);
		$("li").bind("mousedown",function(){
			sfID=$(this).attr("id");
		});
	}
	
	//转动整体
	function rotateCUBE(){
		$("#cube").css("-webkit-transform","rotateX("+roX+"deg) rotateY("+roY+"deg) translateX("+trZ*Math.sin(-roX*0.0174)+"px) translateY("+trZ*Math.sin(roY*0.0174)+"px) translateZ(-"+trZ+"px)");
		$("#cube").css("-moz-transform","rotateX("+roX+"deg) rotateY("+roY+"deg) translateX("+trZ*Math.sin(-roX*0.0174)+"px) translateY("+trZ*Math.sin(roY*0.0174)+"px) translateZ(-"+trZ+"px)");
	}
	
	//转动一层
	//左右上
	function lru(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#topF").css("-webkit-transform","rotateY(-90deg)");
			$("#topF").css("-moz-transform","rotateY(-90deg)");
			col_c2(5);
			for(j=1;j<=3;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		}
		else{
			$("#topF").css("-webkit-transform","rotateY(90deg)");
			$("#topF").css("-moz-transform","rotateY(90deg)");
			col_c(5);
			for(j=1;j<=3;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//左右中
	function lrm(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0)
			for(j=4;j<=6;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		else
			for(j=4;j<=6;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//左右下
	function lrb(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#bottomF").css("-webkit-transform","rotateY(-90deg)");
			$("#bottomF").css("-moz-transform","rotateY(-90deg)");
			col_c(6);
			for(j=7;j<=9;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		}
		else{
			$("#bottomF").css("-webkit-transform","rotateY(90deg)");
			$("#bottomF").css("-moz-transform","rotateY(90deg)");
			col_c2(6);
			for(j=7;j<=9;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上左
	function bul(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#leftF").css("-webkit-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			$("#leftF").css("-moz-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			col_c(4);
			for(j=1;j<=7;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		}
		else{
			$("#leftF").css("-webkit-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			$("#leftF").css("-moz-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			col_c2(4);
			for(j=1;j<=7;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上中
	function bum(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0)
			for(j=2;j<=8;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		else
			for(j=2;j<=8;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上右
	function bur(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#rightF").css("-webkit-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			$("#rightF").css("-moz-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			col_c2(3);
			for(j=3;j<=9;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		}
		else{
			$("#rightF").css("-webkit-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			$("#rightF").css("-moz-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			col_c(3);
			for(j=3;j<=9;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上前
	function buf(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#frontF").css("-webkit-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			$("#frontF").css("-moz-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			col_c2(1);
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+6)).css("-webkit-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-webkit-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-webkit-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+6)).css("-moz-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-moz-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-moz-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				col=subface[5][10-j][1];
				subface[5][10-j][1]=subface[4][j*3][1];
				subface[4][j*3][1]=subface[6][j][1];
				subface[6][j][1]=subface[3][10-j*3][1];
				subface[3][10-j*3][1]=col;
			}
		}
		else{
			$("#frontF").css("-webkit-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			$("#frontF").css("-moz-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			col_c(1);
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+6)).css("-webkit-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-webkit-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-webkit-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				$("#sf5_"+(j+6)).css("-moz-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-moz-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-moz-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				col=subface[5][10-j][1];
				subface[5][10-j][1]=subface[3][10-j*3][1];
				subface[3][10-j*3][1]=subface[6][j][1];
				subface[6][j][1]=subface[4][j*3][1];
				subface[4][j*3][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上中
	function bufm(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0)
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+3)).css("-webkit-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-webkit-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-webkit-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-webkit-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+3)).css("-moz-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-moz-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-moz-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-moz-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				col=subface[5][7-j][1];
				subface[5][7-j][1]=subface[4][j*3-1][1];
				subface[4][j*3-1][1]=subface[6][j+3][1];
				subface[6][j+3][1]=subface[3][11-j*3][1];
				subface[3][11-j*3][1]=col;
			}
		else
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+3)).css("-webkit-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-webkit-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-webkit-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-webkit-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+3)).css("-moz-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-moz-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-moz-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-moz-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				col=subface[5][7-j][1];
				subface[5][7-j][1]=subface[3][11-j*3][1];
				subface[3][11-j*3][1]=subface[6][j+3][1];
				subface[6][j+3][1]=subface[4][j*3-1][1];
				subface[4][j*3-1][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上后
	function bub(x){
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			$("#backF").css("-webkit-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			$("#backF").css("-moz-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			col_c(2);
			for(j=1;j<=3;j++){
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-webkit-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-webkit-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-webkit-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-moz-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-moz-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-moz-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
								
				col=subface[5][4-j][1];
				subface[5][4-j][1]=subface[4][j*3-2][1];
				subface[4][j*3-2][1]=subface[6][j+6][1];
				subface[6][j+6][1]=subface[3][12-j*3][1];
				subface[3][12-j*3][1]=col;
			}
		}
		else{
			$("#backF").css("-webkit-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			$("#backF").css("-moz-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			col_c2(2);
			for(j=1;j<=3;j++){
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-webkit-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-webkit-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-webkit-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-moz-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-moz-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-moz-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
								
				col=subface[5][4-j][1];
				subface[5][4-j][1]=subface[3][12-j*3][1];
				subface[3][12-j*3][1]=subface[6][j+6][1];
				subface[6][j+6][1]=subface[4][j*3-2][1];
				subface[4][j*3-2][1]=col;
			}
		}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//一面转动改变颜色
	function col_c(x){
			col=subface[x][7][1];
			subface[x][7][1]=subface[x][1][1];
			subface[x][1][1]=subface[x][3][1];
			subface[x][3][1]=subface[x][9][1];
			subface[x][9][1]=col;
			col=subface[x][2][1];
			subface[x][2][1]=subface[x][6][1];
			subface[x][6][1]=subface[x][8][1];
			subface[x][8][1]=subface[x][4][1];
			subface[x][4][1]=col;
	}
	function col_c2(x){
			col=subface[x][7][1];
			subface[x][7][1]=subface[x][9][1];
			subface[x][9][1]=subface[x][3][1];
			subface[x][3][1]=subface[x][1][1];
			subface[x][1][1]=col;
			col=subface[x][2][1];
			subface[x][2][1]=subface[x][4][1];
			subface[x][4][1]=subface[x][8][1];
			subface[x][8][1]=subface[x][6][1];
			subface[x][6][1]=col;
	}
	function lr(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				lru(xx);
				break;
			case 4:
			case 5:
			case 6:
				lrm(xx);
				break;
			case 7:
			case 8:
			case 9:
				lrb(xx);
				break;
			}
	}
	function bu(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 4:
			case 7:
				bul(xx);
				break;
			case 2:
			case 5:
			case 8:
				bum(xx);
				break;
			case 3:
			case 6:
			case 9:
				bur(xx);
				break;
			}
	}
	function bu2(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 4:
			case 7:
				bur(xx);
				break;
			case 2:
			case 5:
			case 8:
				bum(xx);
				break;
			case 3:
			case 6:
			case 9:
				bul(xx);
				break;
			}
	}
	function buff(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				bub(xx);
				break;
			case 4:
			case 5:
			case 6:
				bufm(xx);
				break;
			case 7:
			case 8:
			case 9:
				buf(xx);
				break;
		}
	}
	function buff2(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				buf(xx);
				break;
			case 4:
			case 5:
			case 6:
				bufm(xx);
				break;
			case 7:
			case 8:
			case 9:
				bub(xx);
				break;
		}
	}
	function buff3(xx){
		switch(parseInt(sfID.charAt(4))){
			case 3:
			case 6:
			case 9:
				buf(xx);
				break;
			case 2:
			case 5:
			case 8:
				bufm(xx);
				break;
			case 1:
			case 4:
			case 7:
				bub(xx);
				break;
		}
	}
	function buff4(xx){
		switch(parseInt(sfID.charAt(4))){
			case 3:
			case 6:
			case 9:
				bub(xx);
				break;
			case 2:
			case 5:
			case 8:
				bufm(xx);
				break;
			case 1:
			case 4:
			case 7:
				buf(xx);
				break;
		}
	}
	$("#cube_ran").click(function(){
		if(ran_switch){
			ran_switch=0;
			cube_random(15);
		}
	});
	function cube_random(rn){
		if(rn){
			rn--;
			act=Math.floor(Math.random()*9);
			act2=Math.floor(Math.random()*2);
			r_switch=0;
			switch(act){
				case 0:		
					lru(act2);
					break;	
				case 1:	
					lrm(act2);	
					break;
				case 2:		
					lrb(act2);
					break;
				case 3:	
					bul(act2);	
					break;
				case 4:		
					bum(act2);
					break;
				case 5:		
					bur(act2);
					break;
				case 6:		
					buf(act2);
					break;
				case 7:	
					bufm(act2);	
					break;
				case 8:	
					bub(act2);	
					break;
			}
			var ran_timer=setTimeout(function(){cube_random(rn);},600);
		}
		else{
			clearTimeout(ran_timer);
			ran_switch=1;
		}
	}
});
