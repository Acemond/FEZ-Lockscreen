//Very first function launched
$(document).ready(function(){
	slideToUnlock.innerHTML = unlockText + "</span>";
	updateClock();

	$("#time").click(function(){ switchTimeFont(); });

	/* Applies font settings */
	if(pixel){
		slideToUnlock.style.transform = "translateY(10px)";
		slideToUnlock.style.fontFamily = 'pixel'; 
		timeDate.style.fontFamily = 'pixel';	
	} else {
		slideToUnlock.style.transform = "translateY(0px)";
		slideToUnlock.style.fontFamily = 'fezzy'; 
		timeDate.style.fontFamily = 'fezzy';
	}
	slideToUnlock.style.opacity = 1;
	
	randomizeClouds();
	
	//Checks every half second wether or not gomez needs to go to sleep.
	//If not, check if an animation should be played
	sleepSchedule = window.setInterval(function(){
		changeGomezState(checkNextGomezState());
		gomezIdle();
		}, 500);

	initGomezState(checkNextGomezState());
	miniCubeTrail.style.opacity = 1;
	
	$("#owl").on('click', owlHoot);
	$("#seagull").on('click', gullCry);
});

//Less important stuff that can be loaded after the window is
function windowLoaded(){
	////Preload soundplayer
	sound = document.getElementById('soundPlayer');
	sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
	
	//Preload the big ass cube to have fluid switch	
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
	
	setTimeout(function(){launchSignal(); signal = window.setInterval('launchSignal()', 10000);},4000);

	$("#miniCubeCont").on('click', miniCubeClick);
	if(movingClouds) {
        random = Math.floor(Math.random()*5) + 4;
		$(".clouds").css('-webkit-transition', 'background-position-x ' + random + 's ease-in-out');
		$(".cloudsChange").css('-webkit-transition', 'background-position-x ' + random + 's ease-in-out');
	}
}

//by Acemond
