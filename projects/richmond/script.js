let imgs = 23;
let img = 1;

document.getElementById('rightButton').onclick = function(e){
    document.getElementById('leftButton').style.display = 'block';
    if(img < 23) {
        img = img+1;
        document.getElementById('imageCounter').innerHTML = img+"/23";
        document.getElementById('img').src = "images/" + img + ".jpg";
        updateTitle(img);
        if(img==23) {
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
        document.getElementById('imageCounter').innerHTML = img+"/23";
        document.getElementById('img').src = "images/" + img + ".jpg";
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
        1: "Turbine Hall Facing North",
        2: "Boiler Hall",
        3: "Boiler Control Room",
        4: "Boiler Control Room",
        5: "Boiler Control Room",
        6: "Boilers",
        7: "Main Control Room",
        8: "Graffiti",
        9: "Main Control Room",
        10: "Set From 12 Monkeys in Switch House",
        11: "Switch House",
        12: "Set From 12 Monkeys in Switch House",
        13: "Turbine",
        14: ""
    };

    desc = descriptions[e] ?? desc;
    document.getElementById('imgDescription').innerHTML = desc;
};