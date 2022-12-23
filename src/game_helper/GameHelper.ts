

export const gameImages = [
    "2cd43b_b13c89d3859a48129a434265b3ddd1a1_mv2_d_1826_1920_s_2.png" ,
    "16a3a2d2-7a8d-417a-b683-8987170357b8.png" ,
    "1200px-Vue.js_Logo_2.svg.webp" ,
    "angular-14a0f6532f.png" ,
    "b7ffa7fc9c4ceafa0013dfa3f803bcc8.jpg" ,
    "cross.png" ,
    "download.png" ,
    "e035e610-b4b6-4870-9c26-9c488fb844b2.jfif" ,
    "google-logo-png-open-2000.png" ,
    "images.jpg" ,
    "images.png" ,
    "Minecraft Fox.png" ,
    "Mr_Mitukeru _ Game Icon app.png" ,
    "omori matching icon 6_6 ٩( ᐛ )و.jfif" ,
    "—Pngtree—2022 poster_6681272.png",
    "—Pngtree—cartoon bee clipart_4160541.png" ,
    "—Pngtree—cartoon tree_230886.png" ,
    "—Pngtree—vector left arrow icon_4184717.png" ,
    "shining-circle-purple-lighting-isolated-dark-background_1441-2396.webp",
    "Super Mario Bros_ Characters Who Deserve Their Own Game.png",
    "Super Mario Bros__ The Koopa Kingdom _ Characters - TV Tropes.png" ,
    "Designer Clothes, Shoes & Bags for Women _ SSENSE.jfif",
    "Mario Characters Photo_ 3DS Mario games.jfif",
    "New Super Mario Bros_ Omega_List of Items.png",
    "Wings PNG - Free Download.jfif",
    "@darlingpngss.jfif"
]

export const difficultyMatchedImgsNumber : {[p : string] : number} = {
    easy : 2 ,
    hard : 3 ,
    pro : 4
}

export const difficultyCardsNumber : {[p : string] : number[]} = {
    easy : [12 , 24 , 36 ], 
    hard : [15 , 24 , 36] ,
    pro : [40]
}


export const cardsColsNumber : {[p : string] : (number | null)[]} = {
    12 : [4] ,
    15 : [3,5] ,
    24 : [4,6] ,
    36 : [6,9,9] ,
    40 : [5,8]
}


export const cardsDims : {[p : number] : string[]} = {
    12 : ["70px", "90px" ,"100px" , "120px"] ,
    15 : ["70px", "90px" ,"100px" , "120px"] ,
    24 : ["65px", "70px" ,"100px" , "115px"] ,
    36 : ["55px", "60px" ,"72px" , "100px"] ,
    40 : ["55px", "62px" ,"75px" , "92px"]
}

export const difficultyGameMins : {[p : string] : number} = {
    easy : 2 , 
    hard : 4 ,
    pro : 6
}


export const gameStartDelay : {[p : string] : number} = {
    easy : 2500 , 
    hard : 4000 , 
    pro : 8000
}

export const gameTips : {[p : string] : string} = {
    easy : "you need to pick 2 similiar blocks to be matched " , 
    hard : "you need to pick 3 similiar blocks to be matched " , 
    pro : "you need to pick 4 similiar blocks to be matched "
}
