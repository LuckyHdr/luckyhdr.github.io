var charIndex = -1;
var stringLength = 0;
var inputText;
function writeContent(init){
	if(init){
		inputText = document.getElementById('contentToWrite').innerHTML;
	}
	if(charIndex==-1){
		charIndex = 0;
		stringLength = inputText.length;
	}
	var initString = document.getElementById('myContent').innerHTML;
	initString = initString.replace(/<span.*$ gi,"");="" var="" thechar="inputText.charAt(charIndex);" nextfourchars="inputText.substr(charIndex,4);" if(nextfourchars="='<BR">' || nextFourChars=='<br>'){
		theChar  = '<br>';
		charIndex+=3;
	}
	initString = initString + theChar + "<span id="blink">_</span>";
	document.getElementById('myContent').innerHTML = initString;

	charIndex = charIndex/1 +1;
	if(charIndex%2==1){
		document.getElementById('blink').style.display='none';
	}else{
		document.getElementById('blink').style.display='inline';
	}

	if(charIndex&lt;=stringLength){
		setTimeout('writeContent(false)',140);
	}else{
		blinkSpan();
	}  
}

var currentStyle = 'inline';
function blinkSpan(){
	if(currentStyle=='inline'){
		currentStyle='none';
	}else{
		currentStyle='inline';
	}
	document.getElementById('blink').style.display = currentStyle;
	setTimeout('blinkSpan()',100);
}
</span.*$>