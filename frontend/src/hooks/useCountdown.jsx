import React, { useEffect, useState } from 'react'

export default function useCountdown() {
        const [secondsLeft,setsScondsLeft]=useState(null);
        const [minsLeft,setMinsLeft]=useState(0);
        const [ms,setMs]=useState(0)

        useEffect(()=>{
            const t=secondsLeft;
            setMs(t%60)
            setMinsLeft(Math.floor((t/60)))
            // console.log(ms,minsLeft,secondsLeft);
            
            if(secondsLeft <=0 && minsLeft<=0) return;

            const timeout =setTimeout(()=>{
                setsScondsLeft(secondsLeft-1)
            },1000)
        },[secondsLeft]);

        function start(seconds){
            seconds=Number(seconds);
            setsScondsLeft(seconds);
        }
        return {secondsLeft,start,minsLeft,ms}  
}

