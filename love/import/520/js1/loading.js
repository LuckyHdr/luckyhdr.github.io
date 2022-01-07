//分步加载
// window.onload=function() {
//   var oImage1=new Image();
//   oImage1.src="/2013/music2013/Images/upbox_bj.png";
//  }
//进度条ID
var numid = "#loginnum";
var totaljidu=0;
var time=null;
var start=0;/*晃动控制开关*/
function aa(loadingnum2,num) {
	if(totaljidu>=100)
	{
		clearInterval(time);
		return;
	}
    if (loadingnum2 < num) {
		clearInterval(time);
       time= setInterval(function () {
            loadingnum2++;
			totaljidu=loadingnum2;
            if (loadingnum2>=100)
            {
                $(numid).html("加载完毕");
				
            }
            else
            {
                $(numid).html(loadingnum2 + "%");
				
            }
			
			if(loadingnum2>=num)
		   {
				clearInterval(time);
				return;
			}
           
        }, 10)
    }
}
//图片预加载
function loadImages(sources, callback) {
	var count = 0,
	images = {},
	imgNum = 0;
	for (src in sources) {
		imgNum++;
	}
    //数组长度
	var listlength=sources.length;
    //完成数量
    var loadingnum=0;
    var nextloadingnum=0;
    //完成一个加载数量
   var unum= parseInt(100/listlength)+1;
//alert(unum);
   var timer=null;
	for (src in sources) {
		images[src] = new Image();
		images[src].onload = function () {
			
		    nextloadingnum += unum;
		    if (nextloadingnum <= 100) {
				
		        aa(loadingnum, nextloadingnum);
		    }
		    else {
		        aa(loadingnum, 100);
				  callback(images);
				return ;
		    }
		
		    if (++count >= imgNum) {
		        callback(images);
		    }

			loadingnum=nextloadingnum;
		}
		images[src].src = sources[src];
	}
}

loadImages(['images/P3-1.jpg',
			'images/P3-2.jpg',
			'images/P1.jpg',
			'images/P2.jpg',
			'images/p4-bg.jpg',
			'images/p5.jpg',
			'images/P6-img1.png',
			'images/P6-img2.png',
			'images/P6-img3.png'
			]);
	
	
