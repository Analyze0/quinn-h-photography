let imageDescription;

//randomize loader image:
var i = Math.floor(Math.random() * 9) + 1;
document.getElementById("img").src = '/images/home/' + i + '.jpg';

if (i==1){
    imageDescription = "Abandoned Power Plant Turbine Hall";
} else if (i==2){
    imageDescription = "Abandoned Power Plant Control Room";
} else if (i==3){
    imageDescription = "Abandoned Power Plant Switch House";
} else if (i==4){
    imageDescription = "Psychotherapy - Abandoned Power Plant";
} else if (i==5){
    imageDescription = "Abandoned Power Plant";
} else if (i==6){
    imageDescription = "Abandoned Power Plant Coal Tower";
} else if (i==7){
    imageDescription = "French Chateau";
} else if (i==8){
    imageDescription = "Gas Blowing Engine House";
} else if (i==9){
    imageDescription = "Abandoned Train Line in Paris";
}
document.getElementById("image-description").innerHTML = imageDescription;