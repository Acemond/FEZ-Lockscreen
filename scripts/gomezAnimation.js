var idleAnimTimer;
var autoFallTO;

var gomezUp_Img = new Image;
var gomezJump_Img = new Image;
var gomezPlay_Img = new Image;
var gomezLook_Img = new Image;
var gomezYawn_Img = new Image;
var gomezBlink_Img = new Image;
var gomezGoSleep_Img = new Image;
var gomezWake_Img = new Image;
var gomezSleeping_Img = new Image;
var gomezAir_Img = new Image;

gomezUp_Img.src = "./FEZ_resources/images/gomezUp.png";
gomezJump_Img.src = "./FEZ_resources/images/gomezJump.gif";
gomezPlay_Img.src = "./FEZ_resources/images/gomezPlay.gif";
gomezLook_Img.src = "./FEZ_resources/images/gomezLook.gif";
gomezYawn_Img.src = "./FEZ_resources/images/gomezYawn.gif";
gomezBlink_Img.src = "./FEZ_resources/images/gomezBlink.gif";
gomezGoSleep_Img.src = "./FEZ_resources/images/gomezGoSleep.gif";
gomezWake_Img.src = "./FEZ_resources/images/gomezWake.gif";
gomezSleeping_Img.src = "./FEZ_resources/images/gomezSleeping.gif";
gomezAir_Img.src = "./FEZ_resources/images/gomezAir.gif";

function gomezSleep() {
	document.gomezGoSleep.src = gomezGoSleep_Img.src;
	document.gomezUp.style.opacity = 0;
	document.gomezGoSleep.style.opacity = 1;
	
	setTimeout(function(){
		document.gomezGoSleep.style.opacity = 0;
		document.gomezGoSleep.src = '';
		document.gomezSleeping.src = gomezSleeping_Img.src;
		document.gomezSleeping.style.opacity = 1;

		changeGomezState("asleep");
		
		if(gomez.state == "air"){
			wakeGomez();
		}
		else{
			gomez.state = "asleep";
			$('#gomez').on('click', function(){ changeGomezState("tempRaising"); });
		}
	}, 1900);
}

function wakeGomez(event){
	$('#gomez').off('click');
	
	document.gomezWake.src = gomezWake_Img.src;
	document.gomezSleeping.style.opacity = 0;
	document.gomezSleeping.src = '';
	document.gomezWake.style.opacity = 1;
	
	setTimeout(function(){
		document.gomezUp.style.opacity = 1;
		document.gomezWake.style.opacity = 0;
		document.gomezWake.src = '';
		
		$("#gomez").on('click', function(){ changeGomezState('jump'); });
		
		if(gomez.state == "tempRaising"){
			changeGomezState("tempUp");
			autoFallTO = setTimeout("changeGomezState('tempFalling');",5000);
		}
		else changeGomezState("up");
	},1400); //1300ms animation duration for gomezUp + 100ms margin freeze
}

function blinkEyes(){
	document.gomezBlink.src = gomezBlink_Img.src;
	document.gomezBlink.style.opacity = 1;
	idleAnimTimer = setTimeout(function(){
		document.gomezBlink.src = '';
		document.gomezBlink.style.opacity = 0;
		changeGomezState("doneBlinking");
	}, 500);
}

function lookAround(){
	document.gomezLook.src = gomezLook_Img.src;
	document.gomezUp.style.opacity = 0;
	document.gomezLook.style.opacity = 1;
	
	idleAnimTimer = setTimeout(function(){
		document.gomezLook.src = '';
		document.gomezLook.style.opacity = 0;
		document.gomezUp.style.opacity = 1;
		changeGomezState("up");
	}, 3300);
}

function makeGomezYawn(){
	document.gomezYawn.src = gomezYawn_Img.src;
	document.gomezUp.style.opacity = 0;
	document.gomezYawn.style.opacity = 1;
	
	idleAnimTimer = setTimeout(function(){
		document.gomezYawn.src = '';
		document.gomezYawn.style.opacity = 0;
		document.gomezUp.style.opacity = 1;
		changeGomezState("up");
	}, 1300);
}

function makeGomezPlay(){
	document.gomezPlay.src = gomezPlay_Img.src;
	document.gomezUp.style.opacity = 0;
	document.gomezPlay.style.opacity = 1;
	
	idleAnimTimer = setTimeout(function(){
		document.gomezUp.style.opacity = 1;
		document.gomezPlay.style.opacity = 0;
		document.gomezPlay.src = '';
		changeGomezState("up");
	}, 3200);
}

function makeGomezJump(){
	clearTimeout(idleAnimTimer);
	
	playJumpSound();
	
	document.gomezJump.src = gomezJump_Img.src;
	document.gomezUp.style.opacity = 0;
	document.gomezBlink.style.opacity = 0;
	document.gomezLook.style.opacity = 0;
	document.gomezPlay.style.opacity = 0;
	document.gomezYawn.style.opacity = 0;
	document.gomezBlink.src = '';
	document.gomezLook.src = '';
	document.gomezPlay.src = '';
	document.gomezYawn.src = '';
	document.gomezJump.style.opacity = 1;
	
	setTimeout(function(){
		document.gomezUp.style.opacity = 1;
		document.gomezJump.style.opacity = 0;
		document.gomezJump.src = '';
		changeGomezState("doneJumping");
	}, 1380); //1380ms animation duration
}

function playJumpSound(){
	$("#miniCubeCont").off('click');
	$("#seagull").off('click');
	$("#owl").off('click');
	
	sound.setAttribute('src', './FEZ_resources/music/jump.mp3');
	sound.play();
	
	setTimeout(playLandSound, 1100);
}

function playLandSound(){
	sound.setAttribute('src', './FEZ_resources/music/land.mp3');
	sound.play();
	
	setTimeout(function(){
		if(gomez.state != "air"){
			$("#miniCubeCont").on('click', miniCubeClick);
			sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
		}
		$("#owl").on('click', owlHoot);
		$("#seagull").on('click', gullCry);
	},300);
}

//by Acemond
