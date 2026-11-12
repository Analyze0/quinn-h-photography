let imgs = 14;
let img = 1;

document.getElementById('rightButton').onclick = function(e){
    document.getElementById('leftButton').style.display = 'block';
    if(img < 14) {
        img = img+1;
        document.getElementById('imageCounter').innerHTML = img+"/14";
        document.getElementById('img').src = "images/" + img + ".JPG";
        updateTitle(img);
        if(img==14) {
            document.getElementById('rightButton').style.display = 'none';
        }
    } else {
        document.getElementById('rightButton').style.display = 'none';
    }
};

document.getElementById('leftButton').onclick = function(e){
    document.getElementById('rightButton').style.display = 'block';
    if(img > 1) {
        img = img-1;
        document.getElementById('imageCounter').innerHTML = img+"/14";
        document.getElementById('img').src = "images/" + img + ".JPG";
        updateTitle(img);
        if(img==1) {
            document.getElementById('leftButton').style.display = 'none';
        }
    } else {
        document.getElementById('leftButton').style.display = 'none';
    }
};

function updateTitle(e) {
    let desc;
    const descriptions = {
        1: "Abandoned Train Tunnel in Paris",
        2: "Subway Tunnel",
        3: "City Hall",
        4: "City Hall",
        5: "Abandoned Train Station",
        6: "Subway Tunnel",
        7: "Fallout Supplies",
        8: "Subway Tunnel",
        9: "Abandoned Train Tunnel in Paris",
        10: "Abandoned Train Tunnel in Paris",
        11: "Fallout Supplies",
        12: "Closed Car Tunnel Lane",
        13: "Race Vine",
        14: "Tunnel"
    };

    desc = descriptions[e] ?? desc;
    document.getElementById('imgDescription').innerHTML = desc;
};