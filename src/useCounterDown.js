import {  useRef, useState } from "react"


const UseCounterDown = () =>{
    let CounterDownSecondsDefaultValue = 60
    let CounterDownMinutesDefaultValue = 0
    let CounterDownSeconds   = useRef(CounterDownSecondsDefaultValue)
    let CounterDownMinutes  = useRef(CounterDownMinutesDefaultValue)
    let [CountDown , setCountDown] = useState(`${CounterDownMinutes.current}:${CounterDownSeconds.current < 10 ? "0"+CounterDownSeconds.current : CounterDownSeconds.current }`) 
    let CountDownInterval = useRef()

    let resetCounterDown = () =>{
        CounterDownSeconds.current = CounterDownSecondsDefaultValue
        CounterDownMinutes.current = CounterDownMinutesDefaultValue
        setCountDown(`${CounterDownMinutesDefaultValue}:${CounterDownSecondsDefaultValue < 10 ? "0"+CounterDownSecondsDefaultValue : CounterDownSecondsDefaultValue }`)
    }    

    let CounterDownFunc = () =>{
        CountDownInterval.current =  setInterval(() => {
            if(CounterDownSeconds.current <= 1){
                if(CounterDownMinutes.current == 0){
                    setCountDown("TimeOut")
                    return
                }else{
                    CounterDownMinutes.current -= 1
                    CounterDownSeconds.current = 59
                }
            }else{
                CounterDownSeconds.current -= 1   
            }
            setCountDown(`${CounterDownMinutes.current}:${CounterDownSeconds.current < 10 ? "0"+CounterDownSeconds.current : CounterDownSeconds.current}`)
        }, 1000);
    }

    let StopCounterDown = () => {
        clearInterval(CountDownInterval.current)
    }




  


    return {CountDown,CounterDownFunc,StopCounterDown,resetCounterDown,CounterDownSecondsDefaultValue,CounterDownMinutesDefaultValue , CounterDownMinutes ,CounterDownSeconds }
}


export default UseCounterDown