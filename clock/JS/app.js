const _ = (id) => document.getElementById(id);
const _CS = (cs) => document.querySelectorAll(cs);
const _C = (cs) => document.querySelector(cs);

const days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
]

const timesOfDay = [
    "Night", "Early Morning","Morning","Mid morning", "Afternoon", "Evening",
]

let backgroundLinks = {
    night : "https://www.desktopbackground.org/p/2010/12/04/121090_1920x1080-sky-moon-night-wallpapers_1920x1080_h.jpg",
    earlyMorning : "https://i.pinimg.com/originals/16/c2/81/16c2813ab2d4a5ec3d2690bbe763729e.jpg",
    morning : "https://live.staticflickr.com/7419/8718023436_d05c771bd0_b.jpg",
    midMorning : "https://images-na.ssl-images-amazon.com/images/I/714SWuFKvbL._AC_SL1468_.jpg",
    afternoon : "https://c1.wallpaperflare.com/preview/38/264/1003/afternoon-sunny-clouds.jpg",
    evening : "https://s2.best-wallpaper.net/wallpaper/1920x1080/1712/Road-fields-sunset-houses_1920x1080.jpg"
}

let h = 12,
    hT = 0,
    m = 0,
    day = "Monday",
    trackDay = 0,
    setT = "";


const colorHours = (hour) => {
   const ele =  _CS(".number").forEach(ele => {
       if(parseInt(ele.innerHTML) === hour){
          ele.classList.add("active");
       }else {
        ele.classList.remove("active");
       }
   });
}    

const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

const setClock = () => {
    const minutesRatio = m / 60;  
    const hoursRatio = (minutesRatio + h) / 12;
    setRotation(_C('[data-minute-hand]'), minutesRatio)
    setRotation(_C('[data-hour-hand]'), hoursRatio)
}
    
const backgroundChange = (url) => {
    _("body").style.background = `rgb(19, 19, 19) url(${url}) no-repeat center / cover`
}

const timeNAmeInfo = (time) => {
   
    if (time == 0) {
        _("timeCHart").innerHTML = "midnight";
        backgroundChange("https://c4.wallpaperflare.com/wallpaper/202/500/64/night-sky-screensaver-wallpaper-preview.jpg")
    }

    if (time == 12) {
        _("timeCHart").innerHTML = "afternoon/midday";
        backgroundChange("https://i.pinimg.com/originals/75/34/7c/75347c6cd16cdd0a8116d9d06032f514.jpg")
    }
    
    if (time >= 1 && time <= 4) {// 1 - 4 = night
        _("timeCHart").innerHTML = timesOfDay[0]
        backgroundChange(backgroundLinks.night)
    }else if(time >= 5 && time < 6){// 5 - 11 = early morning
        _("timeCHart").innerHTML = timesOfDay[1]
        backgroundChange(backgroundLinks.earlyMorning)
    }else if(time >= 6 && time < 9){// 5 - 11 = morning
        _("timeCHart").innerHTML = timesOfDay[2]
        backgroundChange(backgroundLinks.morning)
    }else if(time >= 9 && time < 12){// 5 - 11 = mid-morning
        _("timeCHart").innerHTML = timesOfDay[3]
        backgroundChange(backgroundLinks.midMorning)
    }else if(time >= 12 && time <= 17){// 12 - 17 = afternoon
        _("timeCHart").innerHTML = timesOfDay[4]
        backgroundChange(backgroundLinks.afternoon)
    }else if(time >= 18 && time <= 20){// 18 - 20 = evening
        _("timeCHart").innerHTML = timesOfDay[5]
        backgroundChange(backgroundLinks.evening)
    }else if(time >= 21 && time <= 23){// 21 - 23 = night
        _("timeCHart").innerHTML = timesOfDay[0]
        backgroundChange(backgroundLinks.night)
    }

}

const updatHours = () =>{ 
        
    if (h == 0) {       
        h = 12;        
    }
        if (h == 13) {
            h = 1;
        }

    if (hT == -1) {
        hT = 23;
        trackDay--;
    }
        if (hT == 24) {
            hT = 0;
            trackDay++;
        }
    
    if (hT >= 0 && hT <= 11) {
        setT = "AM"        
    }
        if (hT >= 12 && hT < 24) {
            setT = "PM"        
        }  
    
    if (trackDay == -1) {
        trackDay = 6;
    }else if(trackDay == 7){
        trackDay = 0;
    }
    
    _("hours").innerHTML = h;
    _("AmPM").innerHTML = setT;
    _("info").innerHTML = days[trackDay];
    timeNAmeInfo(hT)
    colorHours(h)
}


const updatMinuts = () => {

    if (m == -1) {
        m = 59;
        hT--;
        h--;           
    }

    if (m == 60) {       
        m = 0;
        hT++; 
        h++;                  
    }
    
    _("minutes").innerHTML = m < 10 && m >= 0 ? "0" + m : m;

}


const saveNewTime = (hor,hour24,min,set) => {    
    h = hor;
    hT = hour24;
    m = min;
    setT = set;
    updatMinuts();
    updatHours(); 
    setClock();   
}

_CS(".btn").forEach(ele => {

    ele.addEventListener("click", (e) =>{
            switch (e.target.id) {
                case "h-up": 
                        h++;
                        hT++;             
                    saveNewTime(h,hT,m,setT);
                    break;
                        case "h-down":
                            h--;
                            hT--;
                            saveNewTime(h,hT,m,setT);
                        break;
                            case "m-up":
                                m++;
                                saveNewTime(h,hT,m,setT);
                            break;
                                case "m-down":
                                    m--;
                                    saveNewTime(h,hT,m,setT);
                                break;
            
                default:
                    alert("error")
                    break;
            }
    })

})







































































// ******************************************
console.log(`
********************************************

** CREATED BY EDGAR
** this websites is for educational purposes only
** if you want to contrivute by making the code better check it out on github/codepen
** https://github.com/ed2087/learning-clock
** https://codepen.io/edgar-alejandro/pen/ExVgoxL

********************************************
`)

// ******************************************