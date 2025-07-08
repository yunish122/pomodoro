

let currMode = {}

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
    currMode = modes[mode];
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
        currMode.time_left--;
        currMode.elapsed_time++;
        currMode.intervalId = id;
        uiUpdate()    
    },1000)

}

function pause(){
    if(!currMode.isRunning){
        return
    }

    clearInterval(currMode.intervalId);
    currMode.isRunning = false;
}

function reset(){
    currMode.isRunning = false;
    currMode.time_left = 25 * 60;
    currMode.elapsed_time = 0;
    clearInterval(currMode.intervalId);
    document.getElementById("timer").textContent = `${currMode.actual_time/60}:00`;

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

document.getElementById('short_rest').addEventListener('click',()=>{
    switchMode('short_rest');

})
document.getElementById('long_rest').addEventListener('click',()=>{
    switchMode('long_rest');

})
document.getElementById('submit_timer').addEventListener('click',()=>{
    modes['custom_time'].time_left = parseInt(document.getElementById('custom_min').value)*60;
    modes['custom_time'].actual_time = parseInt(document.getElementById('custom_min').value)*60;
    switchMode('custom_time');
    document.getElementById('custom_min').value = '';
})

document.getElementById('start').addEventListener('click',()=>start());
document.getElementById('pause').addEventListener('click',()=>pause());
document.getElementById('reset').addEventListener('click',()=>reset());

switchMode('focus');