// JavaScript Document.

var bjwin = $(window).width();
var isopen = 1;
document.getElementById('bjk').innerHTML = bjwin;
if (window.DeviceMotionEvent) {
	window.addEventListener('deviceorientation', function(event) {
		var bjleft = $(".bj").css("left");
		var yidong = Math.abs(bjleft.replace("px", ""));
		var tuoluo = Math.round(event.gamma);
		var chufa = yidong / bjwin;
		var cy_num=$("#cy-num").text();
		document.getElementById('beta').innerHTML = Math.round(event.beta);
		document.getElementById('alpha').innerHTML = Math.round(event.alpha);
		document.getElementById('gamma').innerHTML = tuoluo;//偏移量
		document.getElementById('lefts').innerHTML = yidong;//移动
		document.getElementById('pmb').innerHTML = chufa;//速度比例
		document.getElementById('open').innerHTML = isopen;
		
		if (tuoluo > 5 && isopen == 1) {
			isopen = 0;
			var lxtime = (Math.round(chufa) + 0.5) * 800;//移动速度
			$(".bj").stop().animate({
				left: '-30%'
			}, lxtime, "linear");
			$("#cy-num").text(Number(cy_num)+Number(parseInt(Math.random()*10)));
			if(cy_num>=520){
				$("#cy-num").text(520);
				}
			document.getElementById('open').innerHTML = isopen
		} else if (tuoluo < -5 && isopen == 1) {
			isopen = 0;
			var lxtime2 = (Math.round(chufa) + 0.5) * 800;
			$(".bj").stop().animate({
				left: '0%'
			}, lxtime2, "linear");
			$("#cy-num").text(Number(cy_num)+Number(parseInt(Math.random()*10)));
			if(cy_num>=520){
				$("#cy-num").text(520);
				}
			document.getElementById('open').innerHTML = isopen
		} else if (tuoluo <= 15 && tuoluo >= -15 && isopen == 0) {
			isopen = 1;
			$(".bj").stop();
			document.getElementById('open').innerHTML = isopen
		};

	})
}