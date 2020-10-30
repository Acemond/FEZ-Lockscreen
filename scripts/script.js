//Date related variables
var currentTime = new Date();
var _hours = currentTime.getHours();
var _minutes = currentTime.getMinutes();
var _day = currentTime.getDay();
var _date = currentTime.getDate();
var _month = currentTime.getMonth();

var animating;
var changingRays = false;

setInterval('checkTime()', clockCheckInterval);

//Variables
//Defines which side will the miniCube turn for this session.
var miniCubeSpinRand = Math.floor((Math.random()*4));
var sound;

//minicube turns every 3s
var miniCubeAnimTimer = window.setInterval("switchAnimation()",3000);
var signal;

$(document).ready(function(){
	slideToUnlock.innerHTML = unlockText + "</span>";
	updateClock();

	$("#time").click(function(){ switchTimeFont(); });

	/* Applies font settings */
	if(pixel){
		$('#slideToUnlock').css("-webkit-transform", "translateY(10px)");
		$("#slideToUnlock").css('fontFamily', 'pixel'); 
		$("#timeDate").css('fontFamily', 'pixel');	
	} else {
		$('#slideToUnlock').css("-webkit-transform", "translateY(0px)");
		$("#slideToUnlock").css('fontFamily', 'fezzy'); 
		$("#timeDate").css('fontFamily', 'fezzy');
	}
	$("#slideToUnlock").css('opacity', 1);
	
	randomizeClouds();
	
	//Checks every half second wether or not gomez needs to go to sleep.
	//If not, check if an animation should be played
	sleepSchedule = window.setInterval(function(){
		changeGomezState(checkNextGomezState());
		gomezIdle();
		}, 500);

	initGomezState(checkNextGomezState());
	$("#miniCubeTrail").css("opacity", 1);
	
	//TODO
	$("#owl").on('click', owlHoot);
	$("#seagull").on('click', gullCry);
});

function owlHoot()
{ 	
	if(owl.style.opacity != 0){
		$("#owl").off('click');
		$("#miniCubeCont").off('click');
		//sound.setAttribute('src', './FEZ_resources/music/owlhoot.mp3');
		//sound.play();
		setTimeout(function(){
			resetSoundPlayer();
			if(gomez.state != "air"){
				$("#miniCubeCont").on('click', miniCubeClick);
				//sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
			}
			$("#owl").on('click', owlHoot);
		},1800);
	}
}

function gullCry()
{
	if(seagull.style.opacity != 0){
		$("#seagull").off('click');
		$("#miniCubeCont").off('click');
		//sound.setAttribute('src', './FEZ_resources/music/gullcry.mp3');
		//sound.play();
		setTimeout(function(){
			resetSoundPlayer();
			if(gomez.state != "air"){
				$("#miniCubeCont").on('click', miniCubeClick);
				//sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
			}
			$("#seagull").on('click', gullCry);
		},1800);
	}
}

function windowLoaded(){
	//sound = document.getElementById('soundPlayer');
	//sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
	
	setTimeout(function(){launchSignal(); signal = window.setInterval('launchSignal()', 10000);},4000);
	
	$("#miniSignal").before(
	"<div id='floatingSupport'>"+
		"<div id='experiment'>"+
			"<div id='cubeCont'>"+
				"<div id='noCube'>"+
					"<div id='newCube'>"+
						"<div class='newCubeFace' id='face1f'></div>"+
						"<div class='newCubeFace' id='face2f'></div>"+
						"<div class='newCubeFace' id='face3f'></div>"+
						"<div class='newCubeFace' id='face4f'></div>"+
						"<div class='newCubeFace' id='face5f'></div>"+
						"<div class='newCubeFace' id='face6f'></div>"+
					"</div>"+
					"<div id='scheme'>"+
						"<div class='noFace' id='face1'></div>"+
						"<div class='noFace' id='face2'></div>"+
						"<div class='noFace' id='face3'></div>"+
						"<div class='noFace' id='face4'></div>"+
						"<div class='noFace' id='face5'></div>"+
						"<div class='noFace' id='face6'></div>"+
						"<div class='noFace' id='face1m'></div>"+
						"<div class='noFace' id='face2m'></div>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>"+
	"</div>");

	$("#noCube").after(
		"<div id='cube'>"+
			"<div class='faceExt' id='one'></div>"+
			"<div class='faceExt' id='two'></div>"+
			"<div class='faceExt' id='three'></div>"+
			"<div class='faceExt' id='four'></div>"+
			"<div class='faceExt' id='five'></div>"+
			"<div class='faceExt' id='six'></div>"+
			
			"<img class='borderType1' id='bord1' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord2' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord3' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord4' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord5' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord6' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord7' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord8' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord9' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord10' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord11' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType1' id='bord12' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord13' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord14' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord15' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord16' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord17' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord18' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord19' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord20' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord21' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord22' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord23' src='./FEZ_resources/images/bordures.png'></img>"+
			"<img class='borderType2' id='bord24' src='./FEZ_resources/images/bordures.png'></img>"+
			
			"<img class='faceInt' id='oneInt' src='./FEZ_resources/images/facesInt.png'></img>"+
			"<img class='faceInt' id='twoInt' src='./FEZ_resources/images/facesInt.png'></img>"+
			"<img class='faceInt' id='threeInt' src='./FEZ_resources/images/facesInt.png'></img>"+
			"<img class='faceInt' id='fourInt' src='./FEZ_resources/images/facesInt.png'></img>"+
			"<img class='faceInt' id='fiveInt' src='./FEZ_resources/images/facesInt.png'></img>"+
			"<img class='faceInt' id='sixInt' src='./FEZ_resources/images/facesInt.png'></img>"+
		"</div>"
	);
	
	$("#miniCubeCont").on('click', miniCubeClick);
	if(movingClouds) {
        random = Math.floor(Math.random()*5) + 4;
		$(".clouds").css('-webkit-transition', 'background-position-x ' + random + 's ease-in-out');
		$(".cloudsChange").css('-webkit-transition', 'background-position-x ' + random + 's ease-in-out');
	}
}

//Happens when the small cube is clicked
function miniCubeClick(event){
	animating = true;

	//Stops all intervals except time check
	clearInterval(signal);
	clearInterval(miniCubeAnimTimer);
	clearInterval(sleepSchedule);
	
	$("#miniCubeCont").off('click');
	$("#gomez").off('click');
	//TODO
	$("#seagull").off('click');
	$("#owl").off('click');
	$("#miniCubeCont").css('cursor', 'auto');

	changeGomezState("air");
	
	//var link = document.getElementById("miniCubeLight");
	//link.parentNode.removeChild(link);
	
	$("#miniSignal").css("-webkit-animation-name", 'fadeSignals');
	setTimeout("$('#miniSignal').css('opacity', 0);",500); //must be launched AFTER the begining of the fade animation
	
	$("#miniCubeTrail").css("-webkit-animation-name", 'miniCubeUp');
	$("#miniCubeTrail").css("-webkit-animation-timing-function", 'ease-out');
	$("#miniCubeTrail").css("-webkit-animation-duration", '.5s');

	$("#timeDate").css("opacity", "0.2");
	$("#timeDate").css('-webkit-transform', 'translateY(-47px)');

	setTimeout(function(){
		$("#noCube").css("opacity", "1");
		$("#timeDate").css("-webkit-filter", "blur(2px)");
	},400);

	$("#cubeCont").css("-webkit-animation-name", 'noCubeLowSpin');
	$("#cubeCont").css("-webkit-animation-timing-function", 'linear');
	$("#cubeCont").css("-webkit-animation-iteration-count", 'infinite');
	$("#cubeCont").css("-webkit-animation-duration", '6s');

    //$.playSound('./FEZ_resources/music/shard.mp3');
    //sound.play();

	$("#miniCube").css("opacity","0");
	$("#miniCube").bind('webkitTransitionEnd', function(){
		var link = document.getElementById("miniCubeTrail");
		link.parentNode.removeChild(link);
		setTimeout(function(){
			$("#newCube").css("opacity", "1");
			$("#newCube").css("-webkit-transform", "translateX(1px) translateY(1px) translateZ(1px)");
			var link = document.getElementById("miniSignal");
			link.parentNode.removeChild(link);
		},450);
	});
	
	setTimeout("endSCSound()", 3350);
	$("#floatingSupport").before("<img id='light' name='light' src='./FEZ_resources/images/light_small.png'></img>");
}

function endSCSound(){
	//sound.setAttribute('src', './FEZ_resources/music/assemble.mp3');
	//sound.play();
	setTimeout(function(){
		resetSoundPlayer(); 
		$("#owl").on('click', owlHoot);
		$("#seagull").on('click', gullCry);
		animating = false;
	}, 6000);
	setTimeout(setClockBack, 4000);
	
	$("#noCube").css("-webkit-transition", 'opacity .1s');
	$("#cube").css("-webkit-transition", 'opacity .1s');
	
	setTimeout(switchCubes, 400);
	setTimeout(changeSpinnin, 900);
	
	document.light.style.opacity = 1;
}

function resetSoundPlayer(){
	//document.body.removeChild(sound);
	//sound = new Audio();
	//document.body.appendChild(sound);
}

function switchCubes(){ 
	document.gomezAir.src = gomezAir_Img.src;
	document.gomezAir.style.opacity = 1;
	document.gomezUp.style.opacity = 0;
	
	$("#cube").css("opacity", "1");
	$("#newCube").css("opacity", "0");
	$("#noCube").css("opacity", "0");
	setTimeout("deleteOldCube()", 900);
}

function deleteOldCube(){
	var link = document.getElementById("newCube");
	link.parentNode.removeChild(link);
	link = document.getElementById("scheme");
	link.parentNode.removeChild(link);
}
	
function changeSpinnin(){
	$("#cubeCont").css("-webkit-animation-name", 'cubeFastSpin');
	$("#cubeCont").css("-webkit-animation-timing-function", 'ease-out');
	$("#cubeCont").css("-webkit-animation-iteration-count", '1');
	$("#cubeCont").css("-webkit-animation-duration", '1.1s');
	
	$("#cubeCont").bind('animationend webkitAnimationEnd', function(){
		$("#cubeCont").css("-webkit-animation-name", 'cubeLowSpin');
		$("#cubeCont").css("-webkit-animation-timing-function", 'linear');
		$("#cubeCont").css("-webkit-animation-iteration-count", 'infinite');
		$("#cubeCont").css("-webkit-animation-duration", '6s');
	});
}

function launchSignal(){
	$(".miniSignal").css("-webkit-animation-name", '');
	setTimeout(function(){
		$("#miniSignal1").css("-webkit-animation-name", 'rescale1');
		$("#miniSignal2").css("-webkit-animation-name", 'rescale2');
		$("#miniSignal3").css("-webkit-animation-name", 'rescale3');
		$("#miniSignal4").css("-webkit-animation-name", 'rescale4');
		}, 0);
}

function switchAnimation(){
	$("#miniCube").css("-webkit-animation-name", 'none');
	switch(miniCubeSpinRand){
	case 0: setTimeout("$('#miniCube').css('-webkit-animation-name', 'miniCubeSpin');", 0); break;
	case 1: setTimeout("$('#miniCube').css('-webkit-animation-name', 'miniCubeSpin2');", 0); break;
	case 2: setTimeout("$('#miniCube').css('-webkit-animation-name', 'miniCubeSpin3');", 0); break;
	default: setTimeout("$('#miniCube').css('-webkit-animation-name', 'miniCubeSpin4');", 0);
	}
}

//by Acemond
