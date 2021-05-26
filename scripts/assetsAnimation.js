//Makes the owl hoot when clicked
function owlHoot() {   
    if(owl.style.opacity != 0) { 
        $("#owl").off('click');
        $("#miniCubeCont").off('click');
        sound.setAttribute('src', './FEZ_resources/music/owlhoot.mp3');
        sound.play();
        setTimeout(function(){
            resetSoundPlayer();
            if(gomez.state != "air"){
                $("#miniCubeCont").on('click', miniCubeClick);
                sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
            }
            $("#owl").on('click', owlHoot);
        },1800);
    }   
}

//Makes the gull cry when clicked
function gullCry() {
    if(seagull.style.opacity != 0){ 
        $("#seagull").off('click');
        $("#miniCubeCont").off('click');
        sound.setAttribute('src', './FEZ_resources/music/gullcry.mp3');
        sound.play();
        setTimeout(function(){
            resetSoundPlayer();
            if(gomez.state != "air"){
                $("#miniCubeCont").on('click', miniCubeClick);
                sound.setAttribute('src', './FEZ_resources/music/shard.mp3');
            }
            $("#seagull").on('click', gullCry);
        },1800);
    }   
}
