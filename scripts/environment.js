//Environment related vars
var environment;
var eltsChOpacity;
var raysOpacity;
var firstSet = true;    //true if BG has never been set

//Ray's current backgrounds 
var rays = new Array(); 
var oldRays = new Array(); 
 
var floor_Img = new Image(); 
var floor_night_Img = new Image(); 
 
floor_Img.src = "./FEZ_resources/images/floor.png"; 
floor_night_Img.src = "./FEZ_resources/images/floor_night.png"; 
 
var sets_Img = new Image(); 
var sets_night_Img = new Image(); 
 
sets_Img.src = "./FEZ_resources/images/sets.png"; 
sets_night_Img.src = "./FEZ_resources/images/sets_night.png";



//Sets the environment for the first time
function initiateEnvironment(rayColor1, rayColor2){
    firstSet = false;
    createRays(rayColor1, rayColor2);
}

function checkPNJ(pnjToCheck, seedDivisor){
	if((timeSeed + _hours * _minutes)%seedDivisor == 0) pnjToCheck.style.opacity = 1;
	else pnjToCheck.style.opacity = 0;
}

/*Prevents from updating environment at every clock update
This function changes it only when it's necessary
XChange classes are set with a large transition time
they do the smooth environment change effect*/
function updateEnvironment(){
	if(_hours >= 9 && _hours < 17)
	{
		checkPNJ(document.seagull, 20);
		raysOpacity = 1;

		if(firstSet) initiateEnvironment("whiteRay_", "yellowRay_");
		else
		{
			if(movingClouds) randomizeClouds();
			if(cycleRays) changeRays("whiteRay_", "yellowRay_");
		}

		if (environment != "midday"){
			defineEnvironment(
				"url(./FEZ_resources/images/BG_midday.png)", "0px",
				"url(./FEZ_resources/images/BG_morning_evening.png)", "-480px",
				"-95px", "-144px", "-172px",
				"-190px", "-288px", "-344px",
				true, false,
				0);
					
			environment = "midday";
			updateClockColor();
		}
	}
	else if ((_hours >= 20 || _hours < 5))
	{
		checkPNJ(document.owl, 20);
		raysOpacity = 0;

		if(firstSet) initiateEnvironment("yellowRay_", "whiteRay_");
		else if(movingClouds) randomizeClouds();
		
		if (environment != "night"){
			defineEnvironment(
				"url(./FEZ_resources/images/BG_night.png)", "0px",
				"url(./FEZ_resources/images/BG_sunset_sunrise.png)", "-490px",
				"-380px", "-576px", "-688px",
				"-285px", "-432px", "-516px",
				false, true,
				0);

			//Important in case of environment change
			//While night, randomizeRays is not called so their opacity is not updated			
			$(".rays").css("opacity", "0");
			$(".raysChange").css("opacity", "0");

			environment = "night";
			updateClockColor();
		}
	}
	else
	{
		switch(_hours)
		{
			case 5: 
				raysOpacity = _minutes / 60;

				if(firstSet) initiateEnvironment("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays("yellowRay_", "whiteRay_");
				}

				eltsChOpacity = _minutes / 180;
	
				if(environment != "sunrise")
				{
					defineEnvironment(
						"url(./FEZ_resources/images/BG_night.png)", "0px",
						"url(./FEZ_resources/images/BG_sunset_sunrise.png)", "-490px",
						"-380px", "-576px", "-688px",
						"-285px", "-432px", "-516px",
						false, true,
						eltsChOpacity);

					updateClockColor();
				}

				environment = "sunrise";
				break;
				
			case 6: 
				raysOpacity = 1;

				if(firstSet) initiateEnvironment("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays("yellowRay_", "whiteRay_");
				}
				
				if(environment != "sunrise_end"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_sunset_sunrise.png)", "-490px",
						"url(./FEZ_resources/images/BG_morning_evening.png)", "0px",
						"-285px", "-432px", "-516px",
						"0px", "0px", "0px",
						false, true,
						eltsChOpacity);

					updateClockColor();
				}

				eltsChOpacity = (_minutes + 60) / 180; 
				environment = "sunrise_end";
				break;
				
			case 7: 
				raysOpacity = 1;

				if(firstSet) initiateEnvironment("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays("yellowRay_", "whiteRay_");
				}

				eltsChOpacity = (_minutes + 120) / 180; 
				
				if(environment != "morning"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_morning_evening.png)", "0px",
						"url(./FEZ_resources/images/BG_morning_end.png)", "0px",
						"0px", "0px", "0px",
						"-190px", "-288px", "-344px",
						false, true,
						eltsChOpacity);

					updateClockColor();
				}

				environment = "morning";
				break;
				
			case 8:
				raysOpacity = 1;

				if(firstSet) initiateEnvironment2("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("yellowRay_", "whiteRay_");
				}
				
				eltsChOpacity = 1; 

				if(environment != "morning_end"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_morning_end.png)", "0px",
						"url(./FEZ_resources/images/BG_midday.png)", "0px",
						"-190px", "-288px", "-344px",
						"-95px", "-144px", "-172px",
						false, true,
						eltsChOpacity);

					updateClockColor();
				}

				environment = "morning_end";
				break;
				
			case 17:
				raysOpacity = 1;
				if(firstSet) initiateEnvironment2("whiteRay_", "yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("whiteRay_", "yellowRay_");
				}

				eltsChOpacity = _minutes / 180; 
				
				if(environment != "evening"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_midday.png)", "0px",
						"url(./FEZ_resources/images/BG_morning_evening.png)", "-480px",
						"-95px", "-144px", "-172px",
						"-190px", "-288px", "-344px",
						true, false,
						eltsChOpacity);

					updateClockColor();
				}

				environment = "evening";
				break;
				
			case 18:
				raysOpacity = 1 - (_minutes / 60 );
				if(firstSet) initiateEnvironment("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("yellowRay_", "whiteRay_");
				}

				eltsChOpacity = (_minutes + 60) / 180; 
				
				if(environment != "sunset"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_morning_evening.png)", "-480px",
						"url(./FEZ_resources/images/BG_sunset_sunrise.png)", "0px",
						"-190px", "-288px", "-344px",
						"-285px", "-432px", "-516px",
						true, false,
						eltsChOpacity);

					updateClockColor();
				}
				environment = "sunset";
				break;
				
			case 19:
				raysOpacity = 0;
				if(firstSet) initiateEnvironment("whiteRay_", "yellowRay_");
				else if(movingClouds) randomizeClouds();
				
				eltsChOpacity = (_minutes + 120) / 180; 

				if(environment != "sunset_end"){
					defineEnvironment(
						"url(./FEZ_resources/images/BG_sunset_sunrise.png)", "0px",
						"url(./FEZ_resources/images/BG_night.png)", "0px",
						"-285px", "-432px", "-516px",
						"-380px", "-576px", "-688px",
						true, false,
						eltsChOpacity);

					updateClockColor();
				}

				environment = "sunset_end";

				$(".rays").css("opacity", 0);
				$(".raysChange").css("opacity", 0);
				break;
			default:
				eltsChOpacity = 0;
		}
		
		backgroundChange.style.opacity = _minutes / 60;
		document.floorChange.style.opacity = eltsChOpacity;
		document.setsChange.style.opacity = eltsChOpacity;
	}
}

/*Defines the environment variables
Uses the following variables:
bgImg: Image that will be applied to the BG,
bgPosY: Offset to the BG image,
bgChImg: Image that will be applied to the changing BG mask,
bgChPosY: Offset to the BG mask image,
cld0PosY: Offset to the cloud0 image defining its color,
cld1PosY: Offset to the cloud1 image defining its color,
cld2PosY: Offset to the cloud2 image defining its color,
cld0PosY: Offset to the cloud0 mask image defining its color,
cld1PosY: Offset to the cloud1 mask image defining its color,
cld2PosY: Offset to the cloud2 mask image defining its color,
is_assetsDay: Defines wether or not scene assets should use their day image,
is_assetsDay: Defines wether or not scene assets masks should use their day image,
eltsChOpacity: Defines the opacity of the masks.
*/
function defineEnvironment(bgImg, bgPosY, bgChImg, bgChPosY, cld0PosY, cld1PosY, cld2PosY, cldCh0PosY, cldCh1PosY, cldCh2PosY, is_assetsDay, is_assetsChDay, eltsChOpacity) 
{
	background.style.backgroundImage = bgImg;
	background.style.backgroundPositionY = bgPosY;
	backgroundChange.style.backgroundImage = bgChImg;
	backgroundChange.style.backgroundPositionY = bgChPosY;
	backgroundChange.style.opacity = eltsChOpacity;
	clouds0.style.backgroundPositionY = cld0PosY;
	clouds1.style.backgroundPositionY = cld1PosY;
	clouds2.style.backgroundPositionY = cld2PosY;
	cloudsChange0.style.backgroundPositionY = cldCh0PosY;
	cloudsChange1.style.backgroundPositionY = cldCh1PosY;
	cloudsChange2.style.backgroundPositionY = cldCh2PosY;

	if(is_assetsDay)
	{
		document.sets.src = sets_Img.src;
		document.floor.src = floor_Img.src;
	}
	else
	{
		document.sets.src = sets_night_Img.src;
		document.floor.src = floor_night_Img.src;
	}

	if(is_assetsChDay)
	{
		document.setsChange.src = sets_Img.src;
		document.floorChange.src = floor_Img.src;
	}
	else
	{
		document.setsChange.src = sets_night_Img.src;
		document.floorChange.src = floor_night_Img.src;
	}

	document.floorChange.style.opacity = eltsChOpacity;
	document.setsChange.style.opacity = eltsChOpacity;
}

//Finds a random horizontal position for the clouds
function randomizeClouds()
{
	if(animating) setTimeout(randomizeClouds, 1000);
	else{
		var clouds = document.getElementsByClassName('clouds');
		var cloudsChange = document.getElementsByClassName('cloudsChange');

		for(i=0; i<clouds.length; i++)
		{ 
			var random = Math.floor((Math.random()*320));
			clouds[i].style.backgroundPositionX = random + "px";
			cloudsChange[i].style.backgroundPositionX = random + "px";
		}
	}
}

//by Acemond
