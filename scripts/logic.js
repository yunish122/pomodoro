
let audio = new Audio('./audio/wall-clock-ticks-quartz-clock-25480.mp3')

audio.volume = 0.7;
audio.loop = true;

let currMode = {}

let session = 0

const modes = {


    focus : {
        mode: 'focus',
        intervalId: null,
        isRunning: false,
        time_left: 25*60,
        actual_time: 25*60,
        elapsed_time:0
    },
    thirty_min:{
        mode: "30min",
        intervalId: null,
        isRunning: false,
        time_left: 30*60,
        actual_time: 30*60,

        elapsed_time:0
    },
    fifty_min:{
        mode: "50min",
        intervalId: null,
        isRunning: false,
        time_left: 50*60,
        actual_time: 50*60,

        elapsed_time:0
    },
    short_rest: {
        mode: "shortRest",
        intervalId: null,
        isRunning: false,
        time_left: 5*60,
        actual_time: 5*60,

        elapsed_time:0
    },
    long_rest:{
        mode: "longRest",
        intervalId: null,
        isRunning: false,
        time_left: 15*60,
        actual_time: 15*60,

        elapsed_time:0
    },
    custom_time:{
        mode: "custom time",
        intervalId: null,
        isRunning:false,
        time_left: null, 
        actual_time: null,
        elapsed_time:0
    }
}


// document.getElementById('25').addEventListener("click", (e)=>{
//     if(state_mgt.isRunning === true){
//         return;
//     }
//     state_mgt.intervalId = setInterval(()=>{
//         start();
//         if(state_mgt.elapsed_time >= 1500){
//             return
//         }
//     },1000)

// })

// switch garxa mode
function switchMode(mode){
    pause()
    pauseAudio()
    currMode = modes[mode];
    currMode.isRunning = false;
    uiUpdate()
}

function uiUpdate(){

    let minutes =  Math.floor( currMode.time_left / 60);

    let seconds = currMode.time_left%60;

    let mm = String(minutes).padStart(2,"0");
    let ss = String(seconds).padStart(2,"0")
    document.getElementById("timer").textContent = `${mm}:${ss}`

}

function start(){
    if(currMode.isRunning){
        return;
    }

    currMode.isRunning = true;
    let id = setInterval(()=>{
        playAudio()
        currMode.time_left--;
        currMode.elapsed_time++;
        currMode.intervalId = id;
        if(currMode.time_left<=0){
            session++;
            document.getElementById('session_counter').textContent = `${session}`
            reset()
        }
        uiUpdate()    
    },1000)

}

function pause(){
    if(!currMode.isRunning){
        return
    }
    pauseAudio()
    clearInterval(currMode.intervalId);
    currMode.isRunning = false;
}

function reset(){
    pauseAudio()
    currMode.isRunning = false;
    currMode.time_left = currMode.actual_time;
    currMode.elapsed_time = 0;
    clearInterval(currMode.intervalId);
    document.getElementById("timer").textContent = `${currMode.actual_time/60}:00`;

}

function playAudio(){

   audio.play();

}

function pauseAudio(){
    audio.pause()
}
//event listeners 

document.getElementById('30min').addEventListener('click',()=>{
    switchMode('thirty_min');
})
document.getElementById('50min').addEventListener('click',()=>{
    switchMode('fifty_min');
})
document.getElementById('25min').addEventListener('click',()=>{
    switchMode('focus');
})

document.getElementById('short_rest').addEventListener('click',(e)=>{
    switchMode('short_rest');
    remove(e);
})
document.getElementById('long_rest').addEventListener('click',(e)=>{
    switchMode('long_rest');
    remove(e);

})
document.getElementById('focus').addEventListener('click',(e)=>{
    switchMode('focus');
    remove(e);

})


//passed e as arg, first removed all classes, and then added the class to the targetted element
function remove(e){
    let arr = document.querySelectorAll('#rest_div button');
    arr.forEach(element => {

       if( element.classList.contains('actives')){
            element.classList.remove('actives');
       }
       e.target.classList.add('actives')

    } )
}

document.getElementById('submit_timer').addEventListener('click',()=>{
    if(document.getElementById('custom_min').value){
        modes['custom_time'].time_left = parseInt(document.getElementById('custom_min').value)*60;
        modes['custom_time'].actual_time = parseInt(document.getElementById('custom_min').value)*60;
        switchMode('custom_time');
        document.getElementById('custom_min').value = '';    
    }

})

document.getElementById('start').addEventListener('click',()=>start());
document.getElementById('pause').addEventListener('click',()=>pause());
document.getElementById('reset').addEventListener('click',()=>reset());

switchMode('focus');