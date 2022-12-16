

export const headingVariant = {
    initial : {y : "-100vh" , opacity : 0},
    visible : {
        y : 0 ,
        opacity : 1 ,
 transition : {
    type : "spring" , 
    duration : 1.5 , 
    delay : 0.5 ,
    when : "beforeChildren" ,
    staggerChildren: 0.5
}}
}

export const subHeadingVariant = {
    initial : {opacity : 0},
    visible : {opacity : 1 , 
    }
}

export  const gameTypeSelectionVariant = {
    initial : {y : "-100vh"} ,
    visible : {
                y : 0 , 
                transition : {
                    type : "spring" , 
                    duration : 1.5 , 
                    stiffness : 50
                }
    }
}

export const selectionItems = {
    hover : {
        x : 10 ,
        originX : 0 ,
        scale : 1.1 ,
        fontSize : "20px",
        color : "#EDF2F7" , 
        transition : {
            type : "spring" ,
            stiffness : 300
        }
    }
}

export const selectionBtn = {
    initial : {
        x : "-100vw"
    } , 
    visible : {
        x : 0 , 
        transition : {
            type : "spring" , 
            duration : 0.8 , 
            stiffness : 80 ,
        }
    }
}