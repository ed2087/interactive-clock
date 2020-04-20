
const _ = (id) => document.getElementById(id)
const _CS = (cs) => document.querySelectorAll(cs)

const days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
]

const timesOfDay = [
    "night","morning","afternoon", "evening",
]

let h = 12,
    hT = 0,
    m = 0,
    day = "Monday",
    trackDay = 0,
    setT = "";

const backgroundChange = (time) => {
   
    if (time == 0) {
        _("timeCHart").innerHTML = "midnight";
    }

    if (time == 12) {
        _("timeCHart").innerHTML = "afternoon/midday";
    }
    
    if (time >= 1 && time <= 4) {// 1 - 4 = night
        _("timeCHart").innerHTML = timesOfDay[0]
    }else if(time >= 5 && time <= 11){// 5 - 11 = morning
        _("timeCHart").innerHTML = timesOfDay[1]
    }else if(time >= 12 && time <= 17){// 12 - 17 = afternoon
        _("timeCHart").innerHTML = timesOfDay[2]
    }else if(time >= 18 && time <= 20){// 18 - 20 = evening
        _("timeCHart").innerHTML = timesOfDay[3]
    }else if(time >= 21 && time <= 23){// 21 - 23 = night
        _("timeCHart").innerHTML = timesOfDay[0]
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
    backgroundChange(hT)
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



