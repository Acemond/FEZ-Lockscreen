/* Script */
var currentTime = new Date(); 	//Value of Date when checkTime() is called
var lastCheckedTime = new Date(); //Value of Date when checkTime() was last time called

//Syntax simplification vars
var _minutes = currentTime.getMinutes();
var _hours = currentTime.getHours();
var _day = currentTime.getDay();
var _date = currentTime.getDate();
var _month = currentTime.getMonth();

//Strings to be desplayed in clock HTML
var _dispHours;
var _dispMinutes;
var _dispDay;
var _dispMonth;

//Environment related vars
var environment;
var opacity;
var raysOpacity;
var firstSet = true;	//true if BG has never been set
var ampmValue;

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

/*All animations over.*/
function setClockBack(){
	$("#timeDate").css("opacity", "1");
	$("#timeDate").css('-webkit-transform', 'translateY(0px)');
	$("#timeDate").css("-webkit-filter", '');
}

/*Changes all texts font when clock is clicked*/
function switchTimeFont(){
	if(pixel){
		$("#timeDate").css('fontFamily', 'fezzy');
		$("#slideToUnlock").css('fontFamily', 'fezzy'); 
		pixel = false;
	}
	else {
		$("#timeDate").css('fontFamily', 'pixel');
		$("#slideToUnlock").css('fontFamily', 'pixel'); 
		pixel = true;
	}
}

//Sets the environment for the first time
function initiateEnvironment(rayColor){
	firstSet = false;
	updateClockColor();
	var floorOpacity;
	createRays(rayColor);
	$(".clouds").css("opacity", 1);
	$(".cloudsChange").css("opacity", 1);
	document.sets.style.opacity = 1;
	document.floor.style.opacity = 1;
}

//Sets the environment for the first time
function initiateEnvironment2(rayColor1, rayColor2){
	firstSet = false;
	updateClockColor();
	var floorOpacity;
	createRays2(rayColor1, rayColor2);
	$(".clouds").css("opacity", 1);
	$(".cloudsChange").css("opacity", 1);
	document.sets.style.opacity = 1;
	document.floor.style.opacity = 1;
}

/*Prevents from updating environment at every clock update
This function changes it only when it's necessary
XChange classes are set with a large transition time
they do the smooth environment change effect*/
function updateEnvironment(){
	if(_hours >= 9 && _hours < 17)
	{
		//if((timeSeed + _hours * _minutes)%20 == 0) document.seagull.style.opacity = 1;
		//else document.seagull.style.opacity = 0;

		raysOpacity = 1;
		if(firstSet) initiateEnvironment("whiteRay_");
		else
		{
			if(movingClouds) randomizeClouds();
			if(cycleRays) changeRays("whiteRay_");
		}

		if (environment != "midday"){
			$("#background").css("background-image", "url(./FEZ_resources/images/BG_midday.png)");
			$("#background").css("background-position-y", "0px");
			$("#clouds0").css("background-position-y", "-95px");
			$("#clouds1").css("background-position-y", "-144px");
			$("#clouds2").css("background-position-y", "-172px");
			document.sets.src = sets_Img.src
			document.floor.src = floor_Img.src
			$("#background").css("opacity", 1);
			$("#backgroundChange").css("opacity", 0);
			$("#setsChange").css("opacity", 0);
			$("#floorChange").css("opacity", 0);
					
			for(i = 0; i < rays.length; i++)
				setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					
			environment = "midday";
			updateClockColor();
		}
	}
	else if ((_hours >= 20 || _hours < 5))
	{
		//if((timeSeed + _hours * _minutes)%20 == 0) document.owl.style.opacity = 1;
		//else document.owl.style.opacity = 0;
		
		raysOpacity = 0;
		if(firstSet) initiateEnvironment("");
		else if(movingClouds) randomizeClouds();
		
		if (environment != "night"){
			$("#background").css("background-image", "url(./FEZ_resources/images/BG_night.png)");
			$("#background").css("background-position-y", "0px");
			$("#clouds0").css("background-position-y", "-380px");
			$("#clouds1").css("background-position-y", "-576px");
			$("#clouds2").css("background-position-y", "-688px");
			document.sets.src = sets_night_Img.src
			document.floor.src = floor_night_Img.src
			
			$("#background").css("opacity", 1);
			$(".rays").css("opacity", 0);
			$(".raysChange").css("opacity", 0);
			$("#backgroundChange").css("opacity", 0);
			$("#setsChange").css("opacity", 0);
			$("#floorChange").css("opacity", 0);
			
			environment = "night";
			updateClockColor();
		}
	}
	else
	{
		opacity = _minutes/60;
		switch(_hours)
		{
			case 5: 
				raysOpacity = _minutes / 60;
				if(firstSet) initiateEnvironment("yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) {
						changeRays("yellowRay_");
					}
				}
	
				if(environment != "sunrise"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_night.png)");
					$("#background").css("background-position-y", "0px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_sunset_sunrise.png)");
					$("#backgroundChange").css("background-position-y", "-490px");
					$("#clouds0").css("background-position-y", "-380px");
					$("#clouds1").css("background-position-y", "-576px");
					$("#clouds2").css("background-position-y", "-688px");
					$("#cloudsChange0").css("background-position-y", "-285px");
					$("#cloudsChange1").css("background-position-y", "-432px");
					$("#cloudsChange2").css("background-position-y", "-516px");
					document.sets.src = sets_night_Img.src
					document.setsChange.src = sets_Img.src
					document.floor.src = floor_night_Img.src
					document.floorChange.src = floor_Img.src
					updateClockColor();
				}
				
				for(i = 0; i < rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = ( _minutes / 60 ) * rays["+i+"].opacity;", 0);
				}
				floorOpacity = _minutes / 180;
				environment = "sunrise";
				break;
				
			case 6: 
				raysOpacity = 1;
				if(firstSet) initiateEnvironment("yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays("yellowRay_");
				}
				
				if(environment != "sunrise_end"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_sunset_sunrise.png)");
					$("#background").css("background-position-y", "-490px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_morning_evening.png)");
					$("#backgroundChange").css("background-position-y", "0px");
					$("#clouds0").css("background-position-y", "-285px");
					$("#clouds1").css("background-position-y", "-432px");
					$("#clouds2").css("background-position-y", "-516px");
					$("#cloudsChange0").css("background-position-y", "0px");
					$("#cloudsChange1").css("background-position-y", "0px");
					$("#cloudsChange2").css("background-position-y", "0px");
					document.sets.src = sets_night_Img.src
					document.setsChange.src = sets_Img.src
					document.floor.src = floor_night_Img.src
					document.floorChange.src = floor_Img.src
					updateClockColor();
				}
				floorOpacity = (_minutes + 60) / 180; 
				environment = "sunrise_end";
				for(i=0; i<rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = rays["+i+"].opacity;", 0);
				}
				break;
				
			case 7: 
				raysOpacity = 1;
				if(firstSet) initiateEnvironment("yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays("yellowRay_");
				}
				
				if(environment != "morning"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_morning_evening.png)");
					$("#background").css("background-position-y", "0px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_morning_end.png)");
					$("#backgroundChange").css("background-position-y", "0px");
					$("#clouds0").css("background-position-y", "0px");
					$("#clouds1").css("background-position-y", "0px");
					$("#clouds2").css("background-position-y", "0px");
					$("#cloudsChange0").css("background-position-y", "-190px");
					$("#cloudsChange1").css("background-position-y", "-288px");
					$("#cloudsChange2").css("background-position-y", "-344px");
					document.sets.src = sets_night_Img.src
					document.setsChange.src = sets_Img.src
					document.floor.src = floor_night_Img.src
					document.floorChange.src = floor_Img.src
					updateClockColor();
				}
				floorOpacity = (_minutes + 120) / 180; 
				environment = "morning";
				for(i=0; i<rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = rays["+i+"].opacity;", 0);
				}
				break;
				
			case 8:
				raysOpacity = 1;
				if(firstSet) initiateEnvironment2("yellowRay_", "whiteRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("yellowRay_", "whiteRay_");
				}
				
				if(environment != "morning_end"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_morning_end.png)");
					$("#background").css("background-position-y", "0px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_midday.png)");
					$("#backgroundChange").css("background-position-y", "0px");
					$("#clouds0").css("background-position-y", "-190px");
					$("#clouds1").css("background-position-y", "-288px");
					$("#clouds2").css("background-position-y", "-344px");
					$("#cloudsChange0").css("background-position-y", "-95px");
					$("#cloudsChange1").css("background-position-y", "-144px");
					$("#cloudsChange2").css("background-position-y", "-172px");
					document.sets.src = sets_night_Img.src
					document.setsChange.src = sets_Img.src
					document.floor.src = floor_Img.src
					document.floorChange.src = floor_Img.src
					updateClockColor();
				}
				floorOpacity = 1; 
				environment = "morning_end";
				for(i=0; i<rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = rays["+i+"].opacity;", 0);
				}
				break;
				
			case 17:
				raysOpacity = 1;
				if(firstSet) initiateEnvironment2("whiteRay_", "yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("whiteRay_", "yellowRay_");
				}
				
				if(environment != "evening"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_midday.png)");
					$("#background").css("background-position-y", "0px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_morning_evening.png)");
					$("#backgroundChange").css("background-position-y", "-480px");
					$("#clouds0").css("background-position-y", "-95px");
					$("#clouds1").css("background-position-y", "-144px");
					$("#clouds2").css("background-position-y", "-172px");
					$("#cloudsChange0").css("background-position-y", "-190px");
					$("#cloudsChange1").css("background-position-y", "-288px");
					$("#cloudsChange2").css("background-position-y", "-344px");
					document.sets.src = sets_Img.src
					document.setsChange.src = sets_night_Img.src
					document.floor.src = floor_Img.src
					document.floorChange.src = floor_night_Img.src
					updateClockColor();
				}
				floorOpacity = _minutes / 180; 
				environment = "evening";
				for(i=0; i<rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = rays["+i+"].opacity;", 0);
				}
				break;
				
			case 18:
				raysOpacity = 1 - (_minutes / 60 );
				if(firstSet) initiateEnvironment("yellowRay_");
				else
				{
					if(movingClouds) randomizeClouds();
					if(cycleRays) changeRays2("yellowRay_");
				}
				
				if(environment != "sunset"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_morning_evening.png)");
					$("#background").css("background-position-y", "-480px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_sunset_sunrise.png)");
					$("#backgroundChange").css("background-position-y", "0px");
					$("#clouds0").css("background-position-y", "-190px");
					$("#clouds1").css("background-position-y", "-288px");
					$("#clouds2").css("background-position-y", "-344px");
					$("#cloudsChange0").css("background-position-y", "-285px");
					$("#cloudsChange1").css("background-position-y", "-432px");
					$("#cloudsChange2").css("background-position-y", "-516px");
					document.sets.src = sets_Img.src
					document.setsChange.src = sets_night_Img.src
					document.floor.src = floor_Img.src
					document.floorChange.src = floor_night_Img.src
					updateClockColor();
				}
				floorOpacity = (_minutes + 60) / 180; 
				environment = "sunset";
				for(i=0; i < rays.length; i++)
				{
					setTimeout("rays["+i+"].htmlElt.style.opacity = (1 - _minutes / 60) * rays["+i+"].opacity;", 0);
					setTimeout("rays["+i+"].htmlEltChange.style.opacity = (1 - _minutes / 60) * rays["+i+"].opacity;", 0);
				}
				break;
				
			case 19:
				raysOpacity = 0;
				if(firstSet) initiateEnvironment("");
				else if(movingClouds) randomizeClouds();
				
				if(environment != "sunset_end"){
					$("#background").css("background-image", "url(./FEZ_resources/images/BG_sunset_sunrise.png)");
					$("#background").css("background-position-y", "0px");
					$("#backgroundChange").css("background-image", "url(./FEZ_resources/images/BG_night.png)");
					$("#backgroundChange").css("background-position-y", "0px");
					$("#clouds0").css("background-position-y", "-285px");
					$("#clouds1").css("background-position-y", "-432px");
					$("#clouds2").css("background-position-y", "-516px");
					$("#cloudsChange0").css("background-position-y", "-380px");
					$("#cloudsChange1").css("background-position-y", "-576px");
					$("#cloudsChange2").css("background-position-y", "-688px");
					document.sets.src = sets_Img.src
					document.setsChange.src = sets_night_Img.src
					document.floor.src = floor_Img.src
					document.floorChange.src = floor_night_Img.src
					updateClockColor();
				}
				floorOpacity = (_minutes + 120) / 180; 
				environment = "sunset_end";
				$(".rays").css("opacity", 0);
				$(".raysChange").css("opacity", 0);
				break;
			default:
				opacity = 0;
				floorOpacity = 0;
		}
		
		$("#backgroundChange").css("opacity", opacity);
		document.floorChange.style.opacity = floorOpacity;
		document.setsChange.style.opacity = floorOpacity;
	}
}

//Not working properly: clouds color issue
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

function updateClockColor(){
	if(_hours >= 6 && _hours <= 18)
	{
		$("#timeDate").css("color", "white");
		$("#timeDate").css("text-shadow", "-1px -1px 0px black, -1px 1px 0px black, 1px -1px 0px black, 1px 1px 0px black");
		$(".counterDisplay").css('color', 'black');
	}
	else
	{
		$("#timeDate").css("color", "black");
		$("#timeDate").css("text-shadow", "-1px -1px 0px white, -1px 1px 0px white, 1px -1px 0px white, 1px 1px 0px white");
		$(".counterDisplay").css('color', 'white');
	}
}


/*periodcally checks if clock needs an update*/
function checkTime(){
	currentTime = new Date();
	if(currentTime.getMinutes() != lastCheckedTime.getMinutes() || currentTime.getHours() != lastCheckedTime.getHours() || currentTime.getDate() != lastCheckedTime.getDate()){
		lastCheckedTime = currentTime;
		updateClock();
	}
}

/*actually updates inner HTML corresponding to the clock*/
/*Called every time that the time change (by the hours of the minutes)*/
function updateClock(){
	_minutes = currentTime.getMinutes();
	_hours = currentTime.getHours();
	_day = currentTime.getDay();
	_date = currentTime.getDate();
	_month = currentTime.getMonth();
		
	updateEnvironment();

	if (_minutes < 10)	_dispMinutes = "0" + _minutes;
	else _dispMinutes = String(_minutes);

	_dispHours = _hours;	
	if(mode12h){
		ampmValue = (_hours >= 12)? "pm" : "am";
		if(_hours > 12) _dispHours -= 12;
	}
	
	//Here and here only, _hours becomes a String.
	if (_dispHours < 10)	_dispHours = "0" + _dispHours;
	else _dispHours = String(_dispHours);
	

	switch(_day){
		case 0: _dispDay = "Sunday"; break;
		case 1: _dispDay = "Monday"; break;
		case 2: _dispDay = "Thusday"; break;
		case 3: _dispDay = "Wednesday"; break;
		case 4: _dispDay = "Thursday"; break;
		case 5: _dispDay = "Friday"; break;
		case 6: _dispDay = "Saturday";
	}
	
	switch(_month){
		case 0: _dispMonth = "January"; break;
		case 1: _dispMonth = "February"; break;
		case 2: _dispMonth = "March"; break;
		case 3: _dispMonth = "April"; break;
		case 4: _dispMonth = "May"; break;
		case 5: _dispMonth = "June"; break;
		case 6: _dispMonth = "July"; break;
		case 7: _dispMonth = "August"; break
		case 8: _dispMonth = "September"; break;
		case 9: _dispMonth = "October"; break;
		case 10: _dispMonth = "November"; break;
		case 11: _dispMonth = "December";
	}
	
	if(mode12h) hours.innerHTML = _dispHours + ":" + _dispMinutes + "<span id='ampm'>" + ampmValue + "</span>";
	else hours.innerHTML = _dispHours + ":" + _dispMinutes;

	date.innerHTML = _dispDay + ", " + _dispMonth + " " + String(_date);
}

//by Acemond
