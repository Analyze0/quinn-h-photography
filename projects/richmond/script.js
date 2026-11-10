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
        2: "Boilers",
        3: "Boiler Hall",
        4: "Boiler Control Room",
        5: "Boiler Control Room",
        6: "Boiler Control Room",
        7: "Main Control Room",
        8: "Main Control Room",
        9: "Switch House",
        10: "Set From 12 Monkeys in Switch House",
        11: "Switch House",
        12: "Turbine",
        13: "Turbine Hall Facing South West",
        14: "Beneath the Turbine Hall",
        15: "Beneath the Turbine Hall",
        16: "Exterior Facing West",
        17: "Coal Tower and Conveyor",
        18: "Controls",
        19: "Beneath the Turbine Hall",
        20: "Graffiti",
        21: "Control Panel",
        22: "Bathroom",
        23: "Set From 12 Monkeys in Switch House"
    };

    desc = descriptions[e] ?? desc;
    document.getElementById('imgDescription').innerHTML = desc;
};