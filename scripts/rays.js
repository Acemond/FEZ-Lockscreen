function createRays(rayColor)
{
	var j = 0;
	for(i = nbRaysMin; i < nbRaysMax; i++)
	{
		if(Math.floor(Math.random()*3) != 1){
			var ray = new Object();
			ray.rayPos = Math.floor(Math.random()*4);
			if(ray.rayPos < 3){
				$("#clouds" + ray.rayPos ).after( "<div class='rays' id='ray"+ i +"'></div>" );
				$("#cloudsChange" + ray.rayPos ).after( "<div class='raysChange' id='rayChange"+ i +"'></div>" );
			}
			else //if 3
			{
				$("#clouds" + (ray.rayPos - 1)).before( "<div class='rays' id='ray"+ i +"'></div>" );
				$("#cloudsChange" + (ray.rayPos - 1)).before( "<div class='raysChange' id='rayChange"+ i +"'></div>" );
			}
		
			ray.htmlElt = document.getElementById("ray" + i);
			ray.htmlEltChange = document.getElementById("rayChange" + i);
			
			rays[j] = ray; j += 1;
		}

	}
	randomizeRays();
	if(rayColor!="") {
		for(i = 0; i < rays.length; i++)
		{
			rays[i].htmlElt.style.backgroundImage = "url(./FEZ_resources/images/" + rayColor + rays[i].BG + ".png)";
			rays[i].htmlEltChange.style.backgroundImage = "url(./FEZ_resources/images/" + rayColor + rays[i].BG + ".png)";
		}
	}
}

function randomizeRays()
{
	for(i = 0; i < rays.length; i++)
	{
		if(cycleRays) {
			random = Math.floor(Math.random()*8) + 1;
			rays[i].htmlElt.style.transitionDuration = random + "s";
		}

		rays[i].BG = Math.floor(Math.random()*3);
			
		switch(rays[i].rayPos){
			case 0:
				random = Math.floor(Math.random() * 80) - 80;
				rays[i].htmlElt.style.top = random + "px";
				rays[i].htmlEltChange.style.top = random + "px";
				break;
				
			case 1:
				random = Math.floor(Math.random() * 100) - 70;
				rays[i].htmlElt.style.top = random + "px";
				rays[i].htmlEltChange.style.top = random + "px";
				break;
				
			case 2:
				random = Math.floor(Math.random() * 70) - 40;
				rays[i].htmlElt.style.top = random + "px";
				rays[i].htmlEltChange.style.top = random + "px";
				break;
				
			case 3:
				random = Math.floor(Math.random() * 50) - 20;
				rays[i].htmlElt.style.top = random + "px";
				rays[i].htmlEltChange.style.top = random + "px";
				break;
		}
		
		random = Math.floor(Math.random()*320) - 160;
		rays[i].htmlElt.style.left = random + "px";
		rays[i].htmlEltChange.style.left = random + "px";
		
		random = (Math.floor(Math.random()*30) + 30) / 100;
		random = random * raysOpacity;	
		setTimeout("rays[" + i + "].htmlElt.style.opacity = " + random + ";",100);
		setTimeout("rays[" + i + "].htmlEltChange.style.opacity = " + random + ";",100);
		rays[i].opacity = random;
	}
}

function changeRays(rayColor)
{
	changingRays = true;
	removeOldRays();
	createRays(rayColor);
}

////////////////////////////////
// Rays color transition case //
////////////////////////////////
function createRays2(rayColor1, rayColor2)
{
	var j = 0;
	for(i = nbRaysMin; i < nbRaysMax; i++)
	{
		if(Math.floor(Math.random()*3) != 1){
			var ray = new Object();
			ray.rayPos = Math.floor(Math.random()*3);
			if(ray.rayPos <= 2){
				$("#clouds" + ray.rayPos ).after( "<div class='rays' id='ray"+ i +"'></div>" );
				$("#cloudsChange" + ray.rayPos ).after( "<div class='raysChange' id='rayChange"+ i +"'></div>" );
			}
			else
			{
				$("#clouds" + (ray.rayPos - 1)).before( "<div class='rays' id='ray"+ i +"'></div>" );
				$("#cloudsChange" + (ray.rayPos - 1)).before( "<div class='raysChange' id='rayChange"+ i +"'></div>" );
			}
		
			ray.htmlElt = document.getElementById("ray" + i);
			ray.htmlEltChange = document.getElementById("rayChange" + i);
			
			rays[j] = ray; j += 1;
		}

	}
	
	randomizeRays();
	for(i = 0; i < rays.length; i++)
	{
		rays[i].htmlElt.style.backgroundImage = "url(./FEZ_resources/images/" + rayColor1 + rays[i].BG + ".png)";
		rays[i].htmlEltChange.style.backgroundImage = "url(./FEZ_resources/images/" + rayColor2 + rays[i].BG + ".png)";
	}
}

function changeRays2(rayColor1, rayColor2)
{
	changingRays = true;
	removeOldRays();
	createRays2(rayColor1, rayColor2);
}

function removeOldRays()
{
	for(i = 0; i < rays.length; i++)
    {
        rays[i].htmlElt.id = rays[i].htmlElt.id + "old";
        rays[i].htmlEltChange.id = rays[i].htmlElt.id + "old";
		oldRays[i] = rays[i];
    }	

	$(".rays").css('opacity', '0');
	$(".raysChange").css('opacity', '0');
	
	rays = new Array();
	
	setTimeout(function(){
		for(i = 0; i < oldRays.length; i++)
		{
			oldRays[i].htmlElt.parentNode.removeChild(oldRays[i].htmlElt);
			oldRays[i].htmlEltChange.parentNode.removeChild(oldRays[i].htmlEltChange);
		}
		oldRays = new Array();
        changingRays = false;
	}, 3500);
}
