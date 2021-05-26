var gomez = new Object();
var lastBlinkCounter = 0;
var lastAnimCounter = 0;
var lastAnimation = "";
var doubleBlink = false;



//Determines Gomez state at document launch
function initGomezState(initState)
{
	switch(initState){
		case "falling":
			gomez.state = "asleep";
			gomezSleeping.src = gomezSleeping_Img.src;
			gomezSleeping.style.opacity = 1;
			$('#gomez').on('click', function(){changeGomezState('tempRaising');});
			break;
		case "raising":
			gomez.state = "up";
			gomezUp.style.opacity = 1;
			$("#gomez").on('click', function(){ changeGomezState('jump'); });
			break;
	}
}

function checkNextGomezState(){
	if(((_hours == 6  && _minutes > (timeSeed%60))|| (_hours > 6)) && ((_hours < 21 ) || (_hours == 21 && _minutes < (60 - timeSeed%60)))){
		if(!(_hours > 11 && _hours < 14)) return "raising";
		
		switch(timeSeed%8){
			case 2: if (_hours == 12 && _minutes >= 10 && _minutes <= 33 && (_minutes > 10 || currentTime.getSeconds() >= 29)) return "falling"; else return "raising"; break;
			case 3: if (_hours == 12 && _minutes >= 22 && _minutes <= 46 && (_minutes > 22 || currentTime.getSeconds() >= 56)) return "falling"; else return "raising"; break;
			case 4: if (((_hours == 12 && _minutes >= 40 && _minutes <= 59) ||
					(_hours == 13 && _minutes <= 04)) && (_hours == 13 || _minutes > 40 || currentTime.getSeconds() >= 35)) return "falling"; else return "raising"; break;
			case 5: if (_hours == 13 && _minutes >= 12 && _minutes <= 39 && (_minutes > 12 || currentTime.getSeconds() >= 38)) return "falling"; else return "raising"; break;
			case 6: if (_hours == 13 && _minutes >= 38 && _minutes <= 55 && (_minutes > 38 || currentTime.getSeconds() >= 52)) return "falling"; else return "raising"; break;
			case 7: if (_hours == 13 && _minutes >= 20 && _minutes <= 44 && (_minutes > 20 || currentTime.getSeconds() >= 47)) return "falling"; else return "raising"; break;
			default: return "raising"; break;
		}
	
	} else { return "falling"; }
}

//This function is called when Gomez isn't doing anything.
//It checks with complex random if Gomez should play an animation.
function gomezIdle()
{
	var blink = false;
	var anime = false;
	
	//If user inputs a jump, it is considered as an animation
	if(gomez.state == "jump"){
		lastAnimCounter = 0;
		lastBlinkCounter = 4;
	}
	
	if(gomez.state == "up" || gomez.state == "tempUp") {
		lastBlinkCounter = lastBlinkCounter + 1;
		lastAnimCounter = lastAnimCounter + 1;
		
		if(doubleBlink) doubleBlink = false;
		else if(lastBlinkCounter <= 1){
			if(Math.floor((Math.random() * 8)) == 0){
				blink = true;
				doubleBlink = true;
			}
		}
		else if(lastBlinkCounter < 9){
			if(Math.floor((Math.random() * Math.pow(2, 9 - lastBlinkCounter))) == 0)
				blink = true;
		}
		else if(Math.floor((Math.random() * Math.pow(2, 8 - lastBlinkCounter))) == 0) blink = true;
	}
	
	if(blink){
		changeGomezState("blink");
		lastBlinkCounter = 0;
	}
	else if(gomez.state == "up"){
		if(lastAnimCounter < 6);
		else if(lastAnimCounter < 8){
			if(Math.floor((Math.random() * Math.pow(2, 12 - lastAnimCounter))) == 0)
				anime = true;
		}
		else if(lastAnimCounter < 19){
			if(Math.floor((Math.random() * Math.pow(2, 10 - (lastAnimCounter/2.0)))) == 0)
				anime = true;
			}
		else if(Math.floor((Math.random() * Math.pow(2, 18 - lastAnimCounter))) == 0) anime = true;
	
		if(anime) {
			lastAnimCounter = 0;
			lastBlinkCounter = 4;
			
			var random = Math.random();
			if(lastAnimation == "yawn"){
				if(random <= 0.2) lastAnimation = "yawn";
				else if(random >= 0.6) lastAnimation = "play";
				else lastAnimation = "lookAround";
			}
			else if(lastAnimation == "play"){
				if(random <= 0.5) lastAnimation = "yawn";
				else if(random >= 0.9) lastAnimation = "play";
				else lastAnimation = "lookAround";
			}
			else if(lastAnimation == "lookAround"){
				if(random <= 0.5) lastAnimation = "yawn";
				else if(random >= 0.6) lastAnimation = "play";
				else lastAnimation = "lookAround";
			}
			else{ //Initial state, lastAnimation=""
				if(random <= 0.4) lastAnimation = "yawn";
				else if(random >= 0.7) lastAnimation = "play";
				else lastAnimation = "lookAround";
			}
			changeGomezState(lastAnimation);
		}
	}
}

//This function is called with the state we want to change Gomez to
//Before actually launching the corresponding functions, this function makes sure the new animation can be done and if it's not already happening
//wantedState is a state described by the switch-case below
function changeGomezState(wantedState)
{
	if(gomez.state == wantedState) return;
	
	switch(wantedState){
		case "falling": if(gomez.state == "up") {gomez.state = "falling"; gomezSleep();}
						else if(gomez.state == "blink") setTimeout("changeGomezState('falling');",100);
						else if(gomez.state == "idleAnimation") setTimeout("changeGomezState('falling');",500); break;
						
		case "raising": if(gomez.state == "asleep") {gomez.state = "raising"; wakeGomez();} break;
						
		case "air":		if(gomez.state == "asleep") {wakeGomez(); gomez.state = "air";}
						else if(gomez.state == "blink") setTimeout("changeGomezState('air');",100);
						else if(gomez.state == "up" || gomez.state == "tempUp") gomez.state = "air";
						else if(gomez.state != "air")setTimeout("changeGomezState('air');",500); break;
						
		case "tempRaising":	if(gomez.state == "asleep") {gomez.state = "tempRaising"; wakeGomez();} break;
		case "tempUp":		if(gomez.state == "tempRaising") {gomez.state = "tempUp";} break;
		case "tempFalling":	if(gomez.state == "tempUp") {gomez.state = "falling"; gomezSleep();}
							else if(gomez.state == "TUBlink") setTimeout("changeGomezState('tempFalling');",100); break;
							
		case "up":			if(gomez.state == "raising") {gomez.state = "up";}
							else if(gomez.state == "idleAnimation") {gomez.state = "up";}
							break;
							
		case "asleep":		if(gomez.state == "falling") {gomez.state = "asleep";} break;
		
		case "blink":		if(gomez.state == "up") {gomez.state = "blink"; blinkEyes();}
							else if(gomez.state == "tempUp") {gomez.state = "TUBlink"; blinkEyes();}
							break;
							
		case "doneBlinking":if(gomez.state == "blink") gomez.state = "up";
							else if(gomez.state == "TUBlink") gomez.state = "tempUp";
							break;
							
		case "lookAround":	if(gomez.state == "up") {gomez.state = "idleAnimation"; lookAround();} break;
		case "yawn":	if(gomez.state == "up") {gomez.state = "idleAnimation"; makeGomezYawn();} break;
		case "play":	if(gomez.state == "up") {gomez.state = "idleAnimation"; makeGomezPlay();} break;
		
		case "jump":		if(gomez.state == "up" || gomez.state == "idleAnimation" || gomez.state == "blink") { gomez.state = "jump"; makeGomezJump(); }
							else if(gomez.state == "tempUp" || gomez.state == "TUBlink")
							{
								clearTimeout(autoFallTO);
								autoFallTO = setTimeout("changeGomezState('tempFalling');",5000);
								gomez.state = "TUJump"; makeGomezJump();
							}
							break;
							
		case "doneJumping":	if(gomez.state == "jump") gomez.state = "up";
							else if(gomez.state == "TUJump") gomez.state = "tempUp";
							break;					
	}
}














