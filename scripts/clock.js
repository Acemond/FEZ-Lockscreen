/* Script */
var currentTime = new Date(); 	//Value of Date when checkTime() is called
var lastCheckedTime = new Date(); //Value of Date when checkTime() was last time called

//Syntax simplification vars
var _minutes = currentTime.getMinutes();
var _hours = currentTime.getHours();
var _day = currentTime.getDay();
var _date = currentTime.getDate();
var _month = currentTime.getMonth();

//Pseudo-random seed used by several assets
var timeSeed = (_day + _month) * (_date + currentTime.getYear());

//Strings to be desplayed in clock HTML
var _dispHours;
var _dispMinutes;
var _dispDay;
var _dispMonth;

setInterval('checkTime()', clockCheckInterval);



//Puts the clock back at its normal state after the cube animation
function setClockBack(){
	timeDate.style.opacity = 1;
	timeDate.style.transform = 'translateY(0px)';
	$("#timeDate").css("-webkit-filter", '');
}

/*Changes all texts font when clock is clicked*/
function switchTimeFont(){
	if(pixel){
		timeDate.style.fontFamily = 'fezzy';
		slideToUnlock.style.fontFamily = 'fezzy'; 
		pixel = false;
	}
	else {
		timeDate.style.fontFamily = 'pixel';
		slideToUnlock.style.fontFamily = 'pixel'; 
		pixel = true;
	}
}

//Sets the right color for the clock digits and its outline
function updateClockColor(){
	if(_hours >= 6 && _hours <= 18)
	{
		timeDate.style.color = "white";
		timeDate.style.textShadow = "-1px -1px 0px black, -1px 1px 0px black, 1px -1px 0px black, 1px 1px 0px black";
	}
	else
	{
		timeDate.style.color = "black";
		timeDate.style.textShadow = "-1px -1px 0px white, -1px 1px 0px white, 1px -1px 0px white, 1px 1px 0px white";
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
	
	if(mode12h) hours.innerHTML = _dispHours + ":" + _dispMinutes + "<sup id='ampm'>" + ampmValue + "</sup>";
	else hours.innerHTML = _dispHours + ":" + _dispMinutes;

	date.innerHTML = _dispDay + ", " + _dispMonth + " " + String(_date);
}

//by Acemond
