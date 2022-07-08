import { useEffect, useState } from "react"


const GameCart = (props) =>{

    let [IsFlibed , setIsFlibed] = useState(false)

    const mathcNumber = props.mathcNumber
    let RandomNumber = props.RandomNumber
    let {FlibedCartStyle , UnFlibedCartStyle} = props.styles
    let {ClickHandler , matchedCarts , clickedCarts  , PlayAccses} = props.useMemory
    const CartImg = props.CartImg
    const Validation = matchedCarts.includes(mathcNumber) 
  

    useEffect(() =>{
      if(!Validation){
        setIsFlibed(false)
      }
    },[matchedCarts])


    return (
      <div className="Cart-parent" style={Validation || IsFlibed ?  FlibedCartStyle : UnFlibedCartStyle  } onClick={() => {
        
        if(!IsFlibed && PlayAccses && clickedCarts.current.length !== 2){
          setIsFlibed(true)
          ClickHandler(RandomNumber)
        }
      } }>
      <div className="Cart"></div>
      <div className=" Back">
        <img  src= {require(`${CartImg}`).default}/>
      </div>
        </div>
    )


}


export default GameCart