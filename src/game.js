import { useEffect, useRef, useState } from "react";
import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

import { getAuth } from '@firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
import {doc , getDoc , getDocs , collection , setDoc} from "@firebase/firestore" 
    let array = [{
        back : "./img/—Pngtree—cartoon bee clipart_4160541.png" , 
        style : {transform:"rotateY(0)" } , 
        mathcNumber : 1 , 
        id : 1
    } , {
        back : "./img/—Pngtree—cartoon bee clipart_4160541.png" , 
        style:{transform:"rotateY(0)" } , 
        mathcNumber : 1 , 
        id : 2
    } ,
    {
        back : "./img/angular-14a0f6532f.png" , 
        style:{transform:"rotateY(0)" } , 
        mathcNumber : 2 , 
        id : 3
    }
,{
    back : "./img/angular-14a0f6532f.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 2 , 
    id : 4
},{
    back : "./img/—Pngtree—2022 poster_6681272.png" , 
    style:{transform:"rotateY(0)"} , 
    mathcNumber : 3 , 
    id : 5
},
{
    back : "./img/—Pngtree—2022 poster_6681272.png" , 
    style:{transform:"rotateY(0)"} , 
    mathcNumber : 3 , 
    id : 6
},
{
    back : "./img/2cd43b_b13c89d3859a48129a434265b3ddd1a1_mv2_d_1826_1920_s_2.png" , 
    style:{transform:"rotateY(0)"} , 
    mathcNumber : 4 , 
    id : 7
},
{
    back : "./img/2cd43b_b13c89d3859a48129a434265b3ddd1a1_mv2_d_1826_1920_s_2.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 4 , 
    id : 8
},
{
    back : "./img/1200px-Vue.js_Logo_2.svg.webp" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 5 , 
    id : 9
},
{
    back : "./img/1200px-Vue.js_Logo_2.svg.webp" , 
    style:{transform:"rotateY(0)"} , 
    mathcNumber : 5 , 
    id : 10
},
{
    back : "./img/images.jpg" , 
    style:{transform:"rotateY(0)"} , 
    mathcNumber : 6 , 
    id : 11
},
{
    back : "./img/images.jpg" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 6 , 
    id : 12
},
{
    back : "./img/images.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 7 , 
    id : 13
},
{
    back : "./img/images.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 7 , 
    id : 14
},
{
    back : "./img/download.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 8 , 
    id : 15
},
{
    back : "./img/download.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 8 , 
    id : 16
},
{
    back : "./img/shining-circle-purple-lighting-isolated-dark-background_1441-2396.webp" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 9 , 
    id : 17
},
{
    back : "./img/shining-circle-purple-lighting-isolated-dark-background_1441-2396.webp" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 9 , 
    id : 18
},
{
    back : "./img/—Pngtree—cartoon tree_230886.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 10 , 
    id : 19
},
{
    back : "./img/—Pngtree—cartoon tree_230886.png" , 
    style:{transform:"rotateY(0)" } , 
    mathcNumber : 10 , 
    id : 20
}]


let randomPatternArray =[[5, 14, 2, 19, 11, 10, 8, 1, 13, 18, 12, 6, 16, 9, 3, 4, 17, 7, 0, 15]
[18, 0, 12, 13, 5, 6, 4, 14, 11, 2, 8, 19, 9, 1, 15, 7, 10, 16, 3, 17],
[0, 5, 15, 11, 10, 9, 18, 1, 16, 14, 12, 7, 13, 6, 3, 8, 17, 19, 4, 2],
[14, 1, 10, 15, 0, 5, 2, 9, 8, 12, 11, 3, 6, 16, 4, 13, 7, 17, 18, 19],
[7, 17, 8, 4, 19, 11, 6, 3, 5, 15, 10, 12, 13, 9, 1, 18, 0, 14, 16, 2],
[8, 13, 7, 17, 14, 0, 16, 6, 11, 9, 4, 1, 5, 18, 10, 2, 12, 15, 3, 19],
[3, 13, 11, 7, 19, 12, 8, 10, 15, 2, 14, 0, 9, 18, 17, 16, 1, 6, 5, 4],
[9, 18, 12, 4, 19, 2, 1, 0, 14, 3, 10, 7, 16, 13, 15, 6, 8, 17, 5, 11],
[9, 12, 7, 8, 3, 0, 13, 16, 10, 18, 2, 5, 6, 15, 4, 19, 14, 11, 1, 17],
[17, 7, 6, 12, 8, 11, 18, 10, 16, 4, 1, 5, 19, 9, 14, 0, 2, 3, 13, 15],
[4, 9, 6, 5, 17, 19, 1, 8, 11, 13, 12, 3, 0, 7, 18, 16, 10, 15, 14, 2],
[12, 3, 14, 9, 16, 18, 17, 15, 6, 13, 0, 10, 11, 2, 5, 8, 19, 7, 4, 1],
[5, 4, 8, 7, 17, 2, 15, 13, 12, 16, 10, 1, 11, 19, 14, 9, 3, 6, 0, 18],
[13, 10, 14, 15, 3, 11, 2, 16, 19, 0, 4, 7, 9, 8, 12, 17, 18, 5, 6, 1],
[14, 7, 2, 10, 17, 13, 18, 8, 19, 12, 11, 6, 9, 1, 4, 3, 16, 5, 15, 0],
[7, 13, 0, 16, 18, 1, 15, 8, 17, 4, 9, 2, 5, 11, 12, 6, 10, 3, 19, 14],
[17, 16, 14, 11, 12, 19, 7, 8, 18, 5, 2, 6, 4, 3, 9, 13, 15, 0, 1, 10],
[18, 16, 17, 0, 2, 3, 5, 13, 4, 15, 12, 11, 7, 6, 10, 9, 14, 1, 19, 8],
[0, 4, 1, 6, 5, 17, 8, 19, 2, 18, 10, 7, 9, 12, 11, 14, 3, 13, 16, 15],
[17, 3, 9, 18, 8, 12, 13, 0, 6, 16, 15, 4, 11, 5, 19, 10, 7, 1, 14, 2],
[13, 8, 17, 6, 2, 18, 11, 5, 19, 0, 12, 4, 10, 15, 1, 14, 16, 3, 7, 9],
[5, 18, 0, 4, 8, 12, 9, 16, 2, 17, 7, 6, 19, 13, 3, 10, 14, 15, 11, 1],
[6, 11, 19, 17, 12, 0, 1, 18, 7, 16, 15, 9, 8, 2, 3, 13, 14, 5, 4, 10],
[15, 14, 17, 9, 2, 18, 10, 8, 3, 4, 13, 16, 11, 19, 7, 1, 12, 0, 5, 6],
[0, 1, 12, 6, 2, 10, 17, 8, 5, 7, 11, 16, 3, 4, 9, 19, 18, 15, 13, 14],
[2, 4, 18, 6, 5, 3, 16, 1, 11, 0, 9, 14, 13, 15, 12, 8, 17, 10, 19, 7],
[19, 17, 13, 1, 8, 9, 14, 10, 18, 15, 2, 12, 0, 6, 16, 7, 11, 3, 4, 5],
[12, 17, 3, 1, 8, 9, 13, 10, 18, 15, 5, 0, 14, 11, 4, 19, 16, 2, 6, 7],
[13, 5, 12, 3, 15, 4, 2, 19, 17, 9, 10, 0, 8, 16, 7, 14, 1, 18, 6, 11],
[15, 2, 6, 1, 0, 3, 5, 9, 18, 8, 17, 12, 16, 13, 11, 7, 14, 10, 19, 4],
[8, 12, 14, 3, 5, 11, 17, 1, 9, 6, 18, 10, 15, 4, 0, 2, 16, 13, 19, 7],
[5, 14, 9, 6, 3, 8, 17, 13, 16, 15, 1, 12, 0, 4, 11, 7, 19, 18, 2, 10],
[9, 0, 12, 6, 8, 18, 1, 19, 3, 13, 10, 17, 11, 7, 15, 5, 14, 2, 16, 4],
[9, 8, 17, 0, 1, 4, 19, 5, 3, 12, 13, 15, 6, 14, 18, 10, 11, 2, 16, 7],
[5, 1, 0, 18, 17, 16, 10, 3, 8, 6, 12, 11, 19, 2, 13, 15, 7, 14, 4, 9],
[12, 13, 3, 6, 1, 2, 15, 4, 5, 9, 17, 11, 16, 8, 18, 19, 0, 14, 10, 7],
[19, 18, 2, 16, 5, 13, 10, 0, 8, 12, 7, 6, 1, 9, 15, 4, 11, 3, 14, 17],
[9, 19, 18, 17, 15, 6, 10, 4, 7, 14, 5, 11, 0, 3, 2, 16, 1, 13, 8, 12],
[1, 15, 3, 0, 10, 4, 11, 2, 16, 9, 12, 5, 17, 19, 7, 18, 13, 6, 8, 14],
[1, 10, 7, 16, 5, 4, 9, 2, 13, 11, 6, 17, 14, 8, 18, 3, 12, 19, 15, 0],
[3, 14, 1, 2, 9, 0, 18, 10, 16, 6, 15, 11, 8, 19, 17, 13, 12, 5, 7, 4],
[1, 7, 5, 13, 2, 9, 12, 18, 6, 3, 14, 10, 17, 0, 16, 11, 15, 4, 19, 8],
[10, 7, 3, 9, 4, 18, 2, 5, 1, 16, 8, 12, 14, 6, 19, 17, 0, 13, 15, 11],
[9, 10, 12, 4, 7, 16, 5, 8, 13, 6, 0, 18, 15, 17, 3, 11, 1, 2, 19, 14],
[2, 1, 13, 7, 15, 4, 6, 16, 12, 9, 3, 0, 11, 5, 17, 14, 19, 18, 10, 8],
[19, 5, 7, 18, 17, 16, 6, 10, 3, 4, 2, 15, 9, 14, 11, 8, 12, 0, 13, 1],
[5, 14, 13, 3, 17, 1, 16, 18, 9, 15, 6, 7, 2, 0, 10, 19, 4, 11, 12, 8],
[8, 4, 16, 19, 14, 7, 13, 12, 0, 18, 2, 17, 10, 6, 9, 11, 5, 3, 15, 1],
[9, 15, 18, 7, 14, 10, 1, 2, 11, 6, 17, 3, 4, 5, 16, 8, 19, 12, 0, 13],
[3, 14, 9, 6, 13, 1, 8, 4, 18, 12, 0, 5, 17, 7, 11, 15, 10, 19, 16, 2],
[19, 16, 1, 15, 10, 0, 9, 11, 4, 7, 14, 2, 13, 17, 8, 6, 18, 12, 5, 3],
[12, 5, 9, 19, 8, 16, 7, 18, 11, 2, 17, 14, 3, 15, 0, 6, 13, 1, 10, 4],
[10, 18, 0, 2, 6, 4, 16, 5, 19, 11, 1, 13, 17, 8, 14, 3, 15, 12, 9, 7],
[19, 17, 10, 9, 8, 15, 12, 16, 0, 2, 18, 11, 4, 1, 7, 13, 3, 14, 6, 5],
[10, 19, 7, 13, 0, 1, 18, 9, 3, 17, 2, 6, 4, 14, 8, 12, 16, 5, 11, 15],
[11, 15, 9, 7, 10, 2, 3, 6, 17, 13, 5, 16, 0, 8, 14, 18, 19, 1, 12, 4],
[6, 8, 3, 18, 9, 13, 17, 15, 16, 19, 10, 1, 12, 7, 0, 11, 4, 14, 2, 5],
[9, 1, 8, 3, 0, 15, 12, 16, 18, 19, 11, 5, 6, 13, 10, 7, 14, 17, 4, 2],
[0, 8, 5, 15, 1, 3, 16, 14, 19, 18, 7, 4, 12, 6, 11, 9, 17, 10, 13, 2],
[11, 4, 8, 1, 19, 15, 6, 7, 9, 12, 0, 10, 5, 2, 14, 3, 17, 16, 13, 18],
[2, 14, 3, 5, 6, 0, 18, 1, 15, 7, 16, 19, 10, 11, 4, 12, 13, 9, 8, 17],
[19, 14, 5, 8, 4, 15, 11, 6, 13, 16, 7, 10, 12, 1, 3, 9, 0, 17, 18, 2],
[6, 12, 2, 3, 8, 5, 4, 18, 10, 13, 19, 0, 17, 11, 1, 9, 15, 16, 7, 14],
[7, 15, 5, 10, 2, 19, 16, 0, 11, 12, 3, 17, 13, 8, 1, 14, 4, 18, 6, 9],
[8, 13, 12, 1, 16, 7, 10, 3, 2, 19, 6, 0, 9, 5, 18, 14, 4, 15, 17, 11],
[18, 5, 1, 13, 9, 12, 0, 11, 2, 17, 15, 7, 3, 6, 16, 14, 19, 8, 4, 10],
[4, 0, 7, 9, 15, 16, 5, 17, 11, 1, 6, 14, 13, 18, 2, 19, 8, 3, 10, 12],
[4, 19, 8, 11, 5, 13, 10, 14, 3, 15, 12, 17, 1, 7, 16, 6, 18, 2, 9, 0],
[5, 12, 7, 1, 15, 0, 3, 13, 19, 16, 2, 14, 4, 9, 18, 6, 8, 11, 17, 10],
[3, 0, 15, 8, 19, 7, 6, 4, 13, 16, 12, 5, 17, 1, 10, 9, 11, 18, 14, 2],
[15, 8, 19, 1, 11, 16, 4, 13, 5, 0, 14, 7, 12, 9, 17, 18, 10, 2, 3, 6],
[1, 10, 6, 15, 2, 0, 18, 8, 12, 7, 11, 14, 9, 16, 4, 3, 5, 19, 13, 17],
[15, 5, 14, 8, 9, 12, 3, 6, 0, 2, 19, 18, 7, 1, 4, 13, 10, 11, 17, 16],
[17, 14, 2, 12, 18, 9, 7, 3, 16, 8, 11, 19, 0, 5, 6, 10, 1, 4, 15, 13],
[11, 8, 16, 17, 4, 9, 7, 0, 15, 1, 13, 10, 5, 19, 3, 2, 18, 6, 14, 12],
[3, 7, 1, 16, 9, 17, 18, 6, 4, 14, 12, 10, 19, 13, 15, 8, 11, 5, 2, 0],
[5, 9, 18, 1, 19, 0, 6, 13, 17, 15, 12, 3, 16, 7, 4, 2, 10, 8, 14, 11],
[17, 15, 4, 0, 12, 6, 3, 1, 7, 19, 13, 11, 10, 16, 5, 18, 14, 9, 8, 2],
[8, 6, 2, 18, 16, 15, 0, 1, 3, 11, 12, 14, 13, 10, 7, 5, 9, 4, 19, 17],
[8, 11, 18, 1, 16, 13, 0, 2, 12, 9, 5, 4, 7, 3, 15, 6, 17, 14, 10, 19],
[9, 17, 10, 6, 19, 1, 12, 11, 4, 3, 5, 8, 2, 13, 18, 14, 0, 15, 16, 7],
[15, 10, 17, 7, 9, 6, 5, 13, 8, 11, 4, 2, 3, 0, 14, 19, 12, 16, 1, 18],
[18, 5, 14, 8, 12, 4, 9, 2, 3, 15, 7, 13, 0, 6, 19, 17, 16, 11, 1, 10],
[17, 16, 10, 19, 8, 15, 3, 11, 9, 18, 0, 6, 5, 2, 13, 14, 1, 4, 12, 7],
[6, 4, 1, 0, 18, 3, 12, 10, 14, 16, 9, 17, 19, 2, 15, 8, 11, 7, 13, 5],
[2, 8, 12, 19, 1, 6, 9, 13, 14, 15, 0, 16, 5, 10, 11, 3, 7, 17, 18, 4],
[3, 6, 11, 8, 2, 13, 16, 1, 15, 5, 9, 18, 14, 17, 4, 19, 7, 12, 0, 10],
[1, 0, 18, 19, 3, 11, 12, 4, 2, 5, 8, 6, 13, 15, 10, 9, 7, 16, 14, 17],
[3, 10, 6, 18, 0, 19, 2, 1, 14, 11, 15, 5, 17, 8, 16, 12, 4, 9, 13, 7],
[14, 10, 5, 0, 3, 15, 17, 1, 19, 11, 4, 18, 7, 13, 16, 6, 12, 8, 2, 9],
[0, 19, 3, 4, 10, 11, 8, 2, 12, 13, 9, 17, 6, 18, 1, 5, 14, 16, 7, 15],
[9, 16, 5, 0, 3, 19, 8, 12, 17, 18, 7, 14, 13, 10, 6, 15, 11, 1, 4, 2],
[9, 5, 4, 19, 0, 16, 7, 1, 11, 6, 14, 2, 13, 15, 18, 3, 8, 17, 10, 12],
[19, 13, 2, 4, 6, 5, 18, 10, 11, 3, 9, 16, 8, 12, 1, 14, 17, 15, 7, 0],
[2, 14, 6, 0, 12, 18, 7, 19, 4, 10, 11, 15, 5, 17, 3, 16, 13, 1, 9, 8],
[9, 15, 14, 18, 3, 17, 6, 2, 12, 13, 16, 0, 19, 5, 11, 4, 7, 8, 10, 1],
[9, 18, 10, 13, 15, 17, 8, 5, 4, 6, 1, 14, 0, 11, 3, 12, 7, 2, 16, 19],
[1, 16, 8, 7, 14, 13, 19, 15, 5, 6, 2, 11, 10, 3, 12, 4, 18, 9, 0, 17],
[14, 3, 17, 15, 8, 0, 12, 2, 7, 19, 4, 11, 6, 9, 16, 18, 5, 1, 10, 13],
[3, 2, 6, 16, 17, 11, 18, 7, 5, 0, 1, 9, 13, 14, 4, 10, 19, 15, 8, 12],
[15, 6, 5, 13, 0, 12, 1, 9, 3, 4, 16, 2, 7, 19, 8, 14, 17, 11, 18, 10],
[6, 9, 15, 1, 13, 11, 0, 2, 7, 18, 10, 3, 5, 16, 4, 17, 19, 14, 12, 8],
[16, 14, 2, 17, 11, 15, 12, 10, 3, 13, 0, 9, 18, 19, 6, 7, 8, 4, 5, 1],
[16, 7, 14, 8, 11, 9, 12, 1, 15, 6, 10, 19, 2, 13, 18, 3, 0, 17, 4, 5],
[19, 18, 9, 14, 12, 2, 15, 10, 6, 16, 13, 17, 8, 5, 4, 1, 7, 0, 3, 11],
[14, 17, 16, 0, 11, 10, 12, 1, 5, 8, 19, 3, 13, 7, 6, 18, 2, 9, 15, 4],
[16, 17, 4, 14, 6, 19, 12, 0, 15, 10, 5, 2, 7, 13, 11, 3, 9, 18, 1, 8]]





let frontImg = require("./img/Download Abstract Background for free.jfif").default

let  itemsarr = array.map(item =>{
    return { back : item.back , 
    style: {transform : item.style.transform} , 
    mathcNumber : item.mathcNumber , 
    id : item.id 
}
})  

const Game = (props) => {
    let randomNumberIndex = Math.floor(Math.random() * randomPatternArray.length)
    let matchedItemStyle = "rotateY(180deg)"
    let unmatchedItemStyle = "rotateY(0)"
    let [RandomPattern , setRandomPattern] = useState(randomPatternArray[randomNumberIndex])
    let [itemsArray , setitemsArray] = useState([...itemsarr])
    let [clickedBlock , setclickedBlock] = useState([])
    let [clickaccses , setaccses] = useState(true)
    let userinfoRef = useRef()
    let navigate = useNavigate();
    let [pageaccses , setpageaccses] = useState(false)
    let [time , settime] = useState(`01:00`)
    let [passedGameTime , setpassedGameTime] = useState(0)
    let [gameaccses , setgameaccses] = useState(true)
    let [wrongtries , setwrongtries] = useState(0)
    let [startingGame , setstartingGame] = useState(false)
    let [matchedItemsNumber  ,setmatchedItemsNumber] = useState(0)
    let [counterdownintervalID , setcounterdownintervalID] = useState(0) // setinterval return ID
    let [displayUserLastResultBar , setdisplayUserLastResultBar] = useState(false)
    let [userData , setuserData] = useState({})
    let [userLastResultsaccses , setuserLastResultsaccses ] = useState(false)
    let [passegGame , setpassegGame] = useState(false)
    let [Users , setUsers] = useState([])
    let [RetryBtnAccses , setRetryBtnAccses] = useState(false)
   
  
    const Auth = getAuth()
    const db = props.props
    const databaseRef = collection(db , "users")



    

    useEffect(() =>{
        getDocs(databaseRef).then(
            (items) => {
               setUsers([...items.docs])
            }
        )
    },[])

  
    useEffect(() =>{
        onAuthStateChanged(Auth , (user) =>{
            if(user){
                setpageaccses(false)
            }else{
                setpageaccses(true)
            }
        })
    },[Auth])

 
     
  

    useEffect(() =>{
        onAuthStateChanged(Auth , (user) =>{
           if(user){
            getDocs(databaseRef).then(
                (res) =>{
                    res.docs.map((item) =>{
                        if(user.email == item.data().Email){
                            setuserData({...item.data()}) 
                        }
                    })
                }
            )
            }

        })

    }, [])

  
    useEffect(() =>{
        if(userData.history && userData.history.length > 0){
            setuserLastResultsaccses(true)
        }
    }, [userData])




    useEffect(() =>{
        if(time == "finished"){
            setstartingGame(false)
           onAuthStateChanged(Auth , (user) =>{
            let userDataObject = doc(db , "users" , user.uid)   
            let date = new Date()
            let year = date.getFullYear()
            let day = date.getUTCDate()
            let month = date.getMonth()
            let hours =  date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
            let minutes = date.getMinutes()
            minutes = minutes < 10 ? "0" + minutes : minutes
            let EndedGameResults = {
                passedGameTime : passedGameTime + "seconds" , 
                wrongtries : wrongtries , 
                date : `${day}/${month}/${year}   ${hours.split(" ")[0]}:${minutes} ${hours.split(" ")[1]}`
            }

            if(passegGame){
                if(!userData.history || userData.history.length == 0){
                    console.log("sdf")
                    userData.history = []
                    userData.history.push({...EndedGameResults})
                }else{
                    userData.history.push({...EndedGameResults})
                }  
            }else{
                return false
            }

            setuserData({...userData})
            setDoc(userDataObject, {...userData})
            setwrongtries(0)
           })
           setRetryBtnAccses(true)
        }
    }, [time])


  


    useEffect(() =>{ 
       
        if(startingGame){
        let counter = 60
        setTimeout(() => {
            settime(counter)
        }, 1000);
    
       let interval =  setInterval(() => {
            counter--
            if(counter < 10){
                settime("00" + ":" + "0" + `${counter}`)
            }else{
                settime("00" + ":" + `${counter}`) 
            }
            
           if(counter < 1){
                alert("game end")
                setpassedGameTime(60 - time.split(":")[1])
                settime("finished")
                setaccses(true)
                clearInterval(interval)
            }
        }, 1000);
        setcounterdownintervalID(interval)
        return () => clearInterval(interval)
    }
    },[startingGame])


    useEffect(() =>{
        onAuthStateChanged(Auth , (user) =>{
            if(user){
                setpageaccses(false)
            
            }else{
                setpageaccses(true)
            }
        })
    } , [Auth])

   
 
 
    useEffect(() =>{
       onAuthStateChanged(Auth , (user) =>{
           if(user && userinfoRef.current){
        let userId = user.uid
        let userObject = doc(db , "users" , userId)
        getDoc(userObject).then(
            (res) => {
                userinfoRef.current.innerHTML   = res.data().Name
            })
        }
       })    
     
    },[userinfoRef])
    

    let flipFunc = (e)=>{
   itemsArray.find((item) =>{
            if(e.target.closest(".block").id == item.id){
                item.style.transform = matchedItemStyle
            } 
        })
        
        setitemsArray([...itemsArray])
    }  


  

    let clickedItems = (e)=>{
     

     let item = itemsArray.find((item) =>{
          return  e.target.closest(".block").id == item.id
        })
        clickedBlock.push({
            ItemElement : e.target.closest(".block") ,
            mathcNumber : item.mathcNumber , 
            id : item.id
        })
        let firstClickedElem = clickedBlock[0]

        firstClickedElem.ItemElement.style.pointerEvents = "none"   

        let secondClickedElem = clickedBlock[1]
        



        if(clickedBlock.length == 2){
            if(firstClickedElem.mathcNumber == secondClickedElem.mathcNumber){
                firstClickedElem.ItemElement.style.pointerEvents = "none"    
                secondClickedElem.ItemElement.style.pointerEvents = "none"   
                clickedBlock.length = 0
                setmatchedItemsNumber((prev) => prev + 2)
                if(matchedItemsNumber == array.length - 2){
                    alert(`you passed the game at ${60 - time.split(":")[1]} seconds and your wrong tries is ${wrongtries}`)
                    clearInterval(counterdownintervalID)
                    setpassedGameTime(60 - time.split(":")[1])
                    setpassegGame(true)
                    settime("finished")
                    setaccses(true)
                }
            }else{
                firstClickedElem.ItemElement.style.pointerEvents = "all"    
                secondClickedElem.ItemElement.style.pointerEvents = "all"   
                clickedBlock.length = 0
                setaccses(true)
                setTimeout(() => {
                  let items = itemsArray.map((item) =>{
                    if(item.id == firstClickedElem.id)  {item.style.transform = unmatchedItemStyle}
                    if(item.id == secondClickedElem.id)  {item.style.transform = unmatchedItemStyle}
                     return item
                })
                setwrongtries((prev) => prev + 1)
                setitemsArray([...items])
                setaccses(false)
              }, 500);  
            }
        }
   }



 

   let startPlay = () =>{
    setgameaccses(false)
    setTimeout(() => {
     let arr = itemsArray.map((item) =>{
            item.style.transform = matchedItemStyle
            return item
        })
        setitemsArray([...arr])
    }, 200);

setTimeout(() => {
  let arr = itemsArray.map((item) =>{
        item.style.transform = unmatchedItemStyle
        return item
    })
    setitemsArray([...arr])
    setaccses(false)
}, 1500);

setstartingGame(true) // start counter down
    
   }

   let wrapperRef = useRef()
  

   let openLastResultUserBar = () =>{
    setdisplayUserLastResultBar(true)
   }
   let closeLastResultUserBar = () =>{
    setdisplayUserLastResultBar(false)
   }

   let RetryGame = () =>{
    let randomNumberIndex = Math.floor(Math.random() * randomPatternArray.length)
    setRandomPattern(randomPatternArray[randomNumberIndex])
    wrapperRef.current.childNodes.forEach(item =>{
        item.style.pointerEvents = "all"
      
    })
    setitemsArray([...array])
    setTimeout(() => {
        setTimeout(() => {
            setstartingGame(true)
        }, 1500);
        startPlay()
        setwrongtries(0)
    }, 500);
   }


    return ( 
        <>
  {!pageaccses && <div  className = "container-wrapper">
 
  <div className = "img">
          <img src = {require("./img/2488356.jpg").default}></img>
      </div>


  { gameaccses &&  <div className = "bg-wrapper">
            <button onClick = {startPlay} className = "btn btn-danger">Start</button>
        </div>}
     

      {displayUserLastResultBar &&  <div  className = "user-history-data">
            <div   className = "wrapp">
            {!userLastResultsaccses && <div style={{position : "absolute" , left : "50%" , top : "50%" ,transform : "translateX(-50%) translateY(-50%)"}}> 
                <h3>there is no last time result </h3>
                </div>}    
        {userLastResultsaccses &&  <div className="user-info-data" >
                   <div>
                       <h5>{userData.Name}</h5>
                   </div>

                   <div>
                     <h5>{userData.Email}</h5>
                   </div>
                   </div>}

            {userLastResultsaccses && 
          <div className="data-wrapper">
            {userData.history.map(item =>{
              return  <div className="data">
                     <div className="user-last-result">
                        <h6>passed game time</h6>
                        <div>{item.passedGameTime}</div>
                        </div>
     
                        <div className="user-last-result">
                        <h6>wrong tries</h6>
                         <div>{item.wrongtries}</div>
                        </div>
     
                        <div className="user-last-result">
                        <h6>Date</h6>
                        <div>{item.date}</div>
                        </div>
                        </div>
            })}
            </div>
            }
      
                <div onClick = {closeLastResultUserBar} className = "close">
                <button className = "btn">
                    <img src={require("./img/cross.png").default}></img>
                </button>
                </div>
            </div>
        </div>
}

  
   <div className="ui-wrapper">
      
    <div className = "sidebar ">
        <div className="wrapp">
        <div  className = "user-info">
        <div className = "userimg">
                <img src = {require("./img/user.png").default}></img>
            </div>
            <div ref={userinfoRef} className = "username"></div>
        </div>

        <div className = "users-history-btn-control">
            <button onClick={() => openLastResultUserBar()} className = "btn history-btn-control">my last result</button>
        </div>

        <div className = "signout">
        <button onClick = {() => {
            signOut(Auth)
            navigate("/")
            }} className=" btn btn-primary sinOut">SignOut</button>
        </div>
        </div>
            </div>

    

       <div className="game-data-wrapper ">

     

    <div className="wrapp">
   
    {RetryBtnAccses && <div className="Retry-btn">
          <button  onClick={() =>{
              setRetryBtnAccses(false)
              RetryGame()
          }} className="btn btn-danger retry">Retry</button>
      </div>
}

       <div className = "game-data">
            <div className = "counter-down">time : {time} </div>
            <div className = "wrong-tries">wrong tries : {wrongtries} </div>
        </div>


        <div ref={wrapperRef} className="wrapper">

        {RandomPattern.map((item) =>{
            return <div   style={{transform : itemsArray[item].style.transform}} id = {itemsArray[item].id} key={itemsArray[item].id} className = "block" mathcnumber={itemsArray[item].mathcNumber} onClick = {(e) => { 
                if(clickaccses){
                    e.preventDefault()
                }else{
                    flipFunc(e)
                    setTimeout(() => {
                        clickedItems(e)
                    }, 200);
                }
               
            }} >
                <div className = "face back">
                    <img  src={require(`${itemsArray[item].back}`).default}></img>
                </div>
                <div className = "face front">
                    <img  src={`${frontImg}`}></img>
                </div>
            </div>
        })}
        </div>
        </div>
       </div>

 
</div>


     </div>} 
     
     {pageaccses && <div className = "not-found">
         
        <p>please login to start playing the game </p>
        <button onClick = {() => navigate("/")} className = "btn btn-primary">Return to home page</button>
         
         </div>} 
       
        </>
     );
}

export default Game;