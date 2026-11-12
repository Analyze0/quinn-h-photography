let imgs = 10;
let img = 1;

document.getElementById('rightButton').onclick = function(e){
    document.getElementById('leftButton').style.display = 'block';
    if(img < 10) {
        img = img+1;
        document.getElementById('imageCounter').innerHTML = img+"/10";
        document.getElementById('img').src = "images/" + img + ".JPG";
        updateTitle(img);
        if(img==10) {
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
        document.getElementById('imageCounter').innerHTML = img+"/10";
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
        1: "Entrance",
        2: "Main Staircase",
        3: "Chapel",
        4: "Dining Room",
        5: "Bedroom",
        6: "Bedroom",
        7: "Bedroom",
        8: "Exterior",
        9: "Top of Main Staircase",
        10: "Tower Bedroom"
    };

    desc = descriptions[e] ?? desc;
    document.getElementById('imgDescription').innerHTML = desc;
};