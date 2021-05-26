var animating = false;
var miniCubeSpinRand = Math.floor((Math.random()*4));

//minicube turns every 3s
var miniCubeAnimTimer = window.setInterval("switchAnimation()",3000);
var signal;



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
        $("#experiment").css("opacity", "1");
        $("#timeDate").css("-webkit-filter", "blur(2px)");
    },400);

    $("#cubeCont").css("-webkit-animation-name", 'noCubeLowSpin');
    $("#cubeCont").css("-webkit-animation-timing-function", 'linear');
    $("#cubeCont").css("-webkit-animation-iteration-count", 'infinite');
    $("#cubeCont").css("-webkit-animation-duration", '6s');

    sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
    sound.play();

    $("#miniCubeCont").css("opacity","0");
    $("#miniCubeCont").bind('webkitTransitionEnd', function(){
        var link = document.getElementById("miniCubeTrail");
        link.parentNode.removeChild(link);
        setTimeout(function(){
            $("#newCubeCont").css("opacity", "1");
            $("#newCube").css("-webkit-transform", "translateX(1px) translateY(1px) translateZ(1px)");
            var link = document.getElementById("miniSignal");
            link.parentNode.removeChild(link);
        },450);
    });

    setTimeout("endSCSound()", 3350);
    $("#floatingSupport").before("<img id='light' name='light' src='./FEZ_resources/images/light_small.png'></img>");
}

function endSCSound(){
    sound.setAttribute('src', './FEZ_resources/music/assemble.mp3');
    sound.play();
    setTimeout(function(){
        $("#owl").on('click', owlHoot);
        $("#seagull").on('click', gullCry);
        animating = false;
    }, 6000);
    setTimeout(setClockBack, 4000);
    
    //$("#noCube").css("-webkit-transition", 'opacity .1s');
    //$("#cube").css("-webkit-transition", 'opacity .1s');
    
    setTimeout(switchCubes, 400);
    setTimeout(changeSpinnin, 900);
    
    document.light.style.opacity = 1;
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
