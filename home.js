let imageDescription;

//randomize loader image:
var i = Math.floor(Math.random() * 7) + 1;
document.getElementById("img").src = '/images/home/' + i + '.jpg';

if (i==1){
    imageDescription = "Richmond Generating Station Turbine Hall";
} else if (i==2){
    imageDescription = "Richmond Generating Station Control Room";
} else if (i==3){
    imageDescription = "Richmond Generating Station";
} else if (i==4){
    imageDescription = "Set from 12 Monkeys in Richmond Generating Station";
} else if (i==5){
    imageDescription = "Richmond Generating Station";
} else if (i==6){
    imageDescription = "Richmond Generating Station Coal Tower";
} else if (i==7){
    imageDescription = "French Chateau";
}
document.getElementById("image-description").innerHTML = imageDescription;