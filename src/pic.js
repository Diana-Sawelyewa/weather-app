const setPic = (isNight, clouds, snow, rain) => {
    if (snow && (clouds>=80)) {
        return './pics/cloud-snow.png'
    } else if (rain && (clouds>=85)) {
        return './pics/cloud-rain.png'
    } else if (clouds>=85) {
        return './pics/cloud.png'
    } else if (clouds<85 && snow && clouds >=15 && isNight) {
        return './pics/cloud-snow-night.png'
    } else if (clouds<85 && rain && clouds >=15 && isNight) {
        return './pics/cloud-rain-night.png'
    } else if (clouds<85 && snow && clouds >=15 && !isNight) {
        return './pics/cloud-snow-day.png'
    } else if (clouds<85 && rain && clouds >=15 && !isNight) {
        return './pics/cloud-rain-day.png'
    } else if (clouds<85 && clouds >=15 && isNight) {
        return './pics/cloud-night.png'
    } else if (clouds<85 && clouds >=15 && !isNight) {
        return './pics/cloud-day.png'
    } else if (clouds < 15 && isNight) {
        return './pics/night.png'
    } else if (clouds < 15 && !isNight) {
        return './pics/day.png'
    }

}

export default setPic;


/* (snow && (clouds>80)) //Облако со снегом
(rain && (clouds>80)) //облако с дождем
(clouds > 80) //облако

(clouds<80 && snow && clouds >=15 && isNight) облако с луной и снегом
(clouds<80 && rain && clouds >=15 && isNight) облако с луной и дождем
(clouds<80 && snow && clouds >=15 && !isNight) облако с солнцем и снегом
(clouds<80 && rain && clouds >=15 && !isNight) облако с солнцем и дождем


(clouds<80 && clouds >=15 && isNight) //Облако с луной
(clouds<80 && clouds >=15 && !isNight) //облако с солнцем
(clouds < 15 && isNight) //луна
(clouds < 15 && !isNight) //солнце */


