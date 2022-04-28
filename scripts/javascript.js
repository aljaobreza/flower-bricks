function drawIt(){
	var x = 250;
	var y = 260;
	var dx = 2;
	var dy = 6;
	var r = 10;
	var width;
	var height;
	var ctx;
	
	var paddley;
	var paddlex;
	var paddleh;
	var paddlew;	
	
	var rightDown = false;
	var leftDown = false;
	
	var canvasMinX;
	var canvasMaxX;
	
	var bricks;
	var nrows;
	var ncols;
	var brickwidth;
	var brickheight;
	var padding;
	var rng;
	
	var st=0;
	let fail = document.getElementById("failScreen");
	let victory = document.getElementById("victoryScreen");
	let mainCanvas = document.getElementById("main");
	let sideCanvas = document.getElementById("side");
	
	var grass = new Image();
	grass.src = "photos/grass1.png";
	
	var pinkFlower = new Image();
	pinkFlower.src = "photos/flowers/flower1.png";
	
	var whiteFlower = new Image();
	whiteFlower.src = "photos/flowers/flower2.png";
	
	var peachFlower = new Image();
	peachFlower.src = "photos/flowers/flower3.png";
	
	var orangeFlower = new Image();
	orangeFlower.src = "photos/flowers/flower4.png";
	
	var minute = document.getElementById("minute");
	var sekunde = document.getElementById("sekunde");
	var vs = 0;
	setInterval(setTime, 1000);
	
	function setTime(){
		if(start==true){
			++vs;
			sekunde.innerHTML = pad(vs % 60);
			minute.innerHTML = pad(parseInt(vs / 60));
		}
		else{
			sekunde=0;
		}
	}
	
	function pad(val){
		var valString = val + "";
		if(valString.length < 2){
			return "0" + valString;
		}
		else{
			return valString;
		}
	}
	
	function init() {

		ctx = $('#main')[0].getContext("2d");
		width = $("#main").width();
		height = $("#main").height();
		return setInterval(draw, 15);
	}
	
	/*za risanje zogice*/
	function circle(x, y, r) {		
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = "#9b8ece";
		ctx.fill();
	}
	
	/*za risanje ploscka*/
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fillStyle = "#9b8ece";
		ctx.fill();
	}
	
	/*brise sled zogice/canvas*/
	function clear() {
		ctx.clearRect(0, 0, height, width);
	}
	
	/*nastavi parametre za ploscek*/
	function initPaddle(){
		paddlex = width/2;
		paddley = 450;
		paddleh = 10;
		paddlew = 100;
	}
	
	function draw() {
		/*risanje zogice*/
		clear();
		circle(x, y, 15);
		
		/*risanje ploscka*/
		rect(paddlex, paddley, paddlew, paddleh);
		
		/*risanje opek*/
		for(var i=0; i<nrows; i++){
			for(var j=0; j<ncols; j++){
				if(bricks[i][j] == 1){
					ctx.drawImage(pinkFlower, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 2){
					ctx.drawImage(whiteFlower, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 3){
					ctx.drawImage(peachFlower, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 4){
					ctx.drawImage(orangeFlower, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
			}			
		}
		
		rowheight = brickheight + padding;
		colwidth = brickwidth + padding;
		row = Math.floor(y/rowheight);
		col = Math.floor(x/colwidth);
		
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
				dy = -dy;
				bricks[row][col] = 0;				
				st--;
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2){
				dy = -dy;
				bricks[row][col] = 1;
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3){
				dy = -dy;
				bricks[row][col] = 2;
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 4){
				dy = -dy;
				bricks[row][col] = 3;
		}
		if(st==0){
			mainCanvas.setAttribute("hidden", "hidden");
			sideCanvas.setAttribute("hidden", "hidden");
			victory.removeAttribute("hidden");
		}
			
		
		/*premikanje ploscice*/
		if(rightDown){
			if((paddlex+paddlew) < width){
				paddlex += 5;
			}
			else{
				paddlex = width-paddlew;
			}
		}
		else if(leftDown){
			if(paddlex>0){
				paddlex -=5;
			}
			else{
				paddlex=0;
			}
		}
		
		/*odbijanje zogice*/		
		if(x+dx > width-r || x+dx < r)
			dx = -dx;
		
		if(y+dy < r)
			dy = -dy;
		else if(y+dy > paddley-r){
			start=false;
			if(x > paddlex && x < paddlex+paddlew){
				dy = -dy;
				start=true;
			}
			else{		
				mainCanvas.setAttribute("hidden", "hidden");
				sideCanvas.setAttribute("hidden", "hidden");
				fail.removeAttribute("hidden");
							
			}
		}

		/*za premikanje zogice*/
		x += dx;
		y += dy;

	}
	
	/*nastavljanje leve in desne tipke*/
	function onKeyDown(evt){
		if(evt.keyCode == 39)
			rightDown = true;
		else if(evt.keyCode == 37)
			leftDown = true;
	}
	
	function onKeyUp(evt){
		if(evt.keyCode == 39)
			rightDown = false;
		else if(evt.keyCode == 37)
			leftDown = false;
	}
	
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	
	/*inicializacija opek v tabelo*/
	function initBricksEasy(){
		nrows = 3;
		ncols = 6;
		st=18;
		brickwidth = (width/ncols) - 1;
		brickheight = 80;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*3+1);
				bricks[i][j] = rng;
			}
		}
	}
	function initBricksMedium(){
		nrows = 4;
		ncols = 7;
		st=28;
		brickwidth = (width/ncols) - 1;
		brickheight = 60;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*4+1);
				bricks[i][j] = rng;
			}
		}
	}
	function initBricksHard(){
		nrows = 5;
		ncols = 9;
		st=45;
		brickwidth = (width/ncols) - 1;
		brickheight = 50;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*4+1);
				bricks[i][j] = rng;
			}
		}
	}
	
	init();	
	
	initPaddle();
	
	if(diff == 1)
		initBricksEasy();
	if(diff == 2)
		initBricksMedium();
	if(diff == 3)
		initBricksHard();
	
	

}

var diff;

easy.addEventListener('click', function() {
	diff = 1;
});

medium.addEventListener('click', function() {
	diff = 2;
});

hard.addEventListener('click', function() {
	diff = 3;
});

start.addEventListener('click', function() {
	if(diff==1 || diff==2 || diff==3){
		let menu = document.getElementById("menu");
		let mainCanvas = document.getElementById("main");
		let sideCanvas = document.getElementById("side");
		let hidden = mainCanvas.getAttribute("hidden");

		if(!hidden) {
		   mainCanvas.removeAttribute("hidden");
		   sideCanvas.removeAttribute("hidden");
		   menu.setAttribute("hidden", "hidden");
		   drawIt();
		} 
		else {
		   mainCanvas.setAttribute("hidden", "hidden");
		   sideCanvas.setAttribute("hidden", "hidden");
		}
	}
});

question.addEventListener('click', function() {
	let menu = document.getElementById("menu");
	let tutorial = document.getElementById("tutorialScreen");
	let hidden = tutorial.getAttribute("hidden");
	
	if(!hidden){
		tutorial.removeAttribute("hidden");
		menu.setAttribute("hidden","hidden");
	}
	else{
		tutorial.setAttribute("hidden", "hidden");
	}
	
});

menu1.addEventListener('click', function() {
		location.reload();
});

menu2.addEventListener('click', function() {
		location.reload();
});

menu3.addEventListener('click', function() {
		location.reload();
});

