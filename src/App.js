import React, { useEffect, useRef, useState } from 'react';



function App() {

  let array = [{name : "ziad"} ,{name : "ziad"}]
  let [arr , setarr] = useState([...array])


  let click = () =>{
    let items = arr.map(item =>{
       item.name = "hosam"
       return item
    })
    console.log(arr)
    console.log(array)
    setarr([...items])
    console.log(array)
  }

  return (
    <>
  <button  onClick={click}>click</button>
    {arr.map((item) =>{
     return <h1>{item.name}</h1>
    })}
</>
 
  );
}

export default App;
