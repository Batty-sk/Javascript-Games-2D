import Header from "../Components/Header"

import './Home.css'
import card from '../card-pattern-stylish.png'
import card1 from '../card1.png'
import card2 from '../card2.png'
import card3 from '../card3.png'
import card4 from '../card4.png'
import Card from "../Components/Card"
import Footer from "../Components/Footer"
import { useEffect, useState } from "react"

function Home()
{
       
    let First_time=1;
    let Choose_card=0
    let player_choice=null;
    console.log('*****************************************************************')
    // only problem is difficulty leel
    let difficulty_level=1;
    const[playagain,GameOver]=useState(0);
    let DIFFICULTY_LEVELS_SPEED=[900,600,400,200];
    let DIFFICULTY_LEVELS_SWAPS=[5,8,10,20];
    let DIFFICULY_LEVELS_COLORS={'lvl1':'darkcyan','lvl2':'rgb(2, 95, 95)','lvl3':'rgb(0, 53, 53)','lvl4':'rgb(208, 7, 7)'}
    let countdown=document.getElementById('play-ground-heading')
    let arr=['c-1','c-2','c-3','c-4']
    
    useEffect(()=>{
        difficulty_level=pre_difficulty
        console.log(difficulty_level);
    },[playagain])

    let pre_difficulty=difficulty_level;
    function PlayAgain()
    {
        First_time=1;
        Choose_card=0;
        player_choice=null
        GameOver(0)
        countdown.innerText="Pick Up Any Card To Start"
        addHoverClass()
    }
    const setDifficulty=(difficultylevel)=>{
        let element=document.getElementById(difficultylevel.currentTarget.id);
        element.style.backgroundColor=DIFFICULY_LEVELS_COLORS[difficultylevel.currentTarget.id]
        while(element.previousSibling)
        {
            element.previousSibling.style.backgroundColor=DIFFICULY_LEVELS_COLORS[element.previousSibling.id];
            element=element.previousSibling;
            difficulty_level+=1;
        }
    }
    const addHoverClass=()=>
    {
        let ele;
        for(let i=0;i<arr.length;i++)
        {
            ele=document.getElementById(arr[i]);
            ele.classList.add('outer-parent')
            let backEle=ele.getElementsByClassName('card-back');
            backEle[0].classList.add('card-transform-back');
            ele.classList.remove('static-card-hover')
        }
    }
    const playerSelection=(whichclicked)=>{
        if(First_time)
           {
                First_time=0;
                player_choice=whichclicked.currentTarget.id;
                let parentEle=document.getElementById(whichclicked.currentTarget.id)
                let backEle=parentEle.getElementsByClassName('card-back');
                let outerCard=parentEle.getElementsByClassName('outer-parent')
                backEle[0].classList.remove('card-transform-back');
                outerCard[0].classList.remove('outer-parent');

                // countdown for 3 seconds
                let count=3;
                let countdown=document.getElementById('play-ground-heading')
                let countinterval=setInterval(function()
                {
                    if (count>=0)
                    {
                        countdown.innerText=count--;  
                    }

                    else{
                        //now we have to write down the code for uno-reverse card.
                        backEle[0].classList.add('card-transform-back')
                        outerCard=parentEle.getElementsByClassName('card-outer')
                        outerCard[0].classList.add('outer-parent')
                        console.log(parentEle.getBoundingClientRect())     
                        clearInterval(countinterval);
                        Swap();
                    }
                },1000)}
            else if(Choose_card){
                console.log('dam')
                console.log(player_choice)
                console.log(whichclicked.currentTarget.id);
                let countdown=document.getElementById('play-ground-heading')
 
                if(player_choice ==  whichclicked.currentTarget.id)
                {
                    countdown.innerText="<><><><><> YOU'VE WON <><><><>";   
                }
                else{
                    countdown.innerText="<><><><><> YOU'VE WEAK EYES <><><><>";  
                }
                Show_Cards();
                setTimeout(
                    function()
                    {
                    GameOver(1);
                    Choose_card=0;
                    Reset_Position();
                    }
                ,3000);
            }
            }
       function Show_Cards()
       {
        for(let i=0;i<arr.length;i++)
        {
            let parentEle=document.getElementById(arr[i]);
            let backEle=parentEle.getElementsByClassName('card-back');
            backEle[0].classList.remove('card-transform-back');
            parentEle.classList.remove('outer-parent')
            

        }
       }
            
        function Reset_Position()
        {
            for(let i=0;i<arr.length;i++)
            {
                document.getElementById(arr[i]).style.left='0px';
            
            }
        }
        function Swap()
        {
            let countdown=document.getElementById('play-ground-heading')
             countdown.innerText="Watch Your Choosen Card Carefully -><- ";

            let no1=Get_Random();
            let no2=Get_Random();
            let cards_current={'c-1':null,
                       'c-2':null,
                       'c-3':null,
                       'c-4':null,
        }
        let inital_positions={
            'c-1':null,
            'c-2':null,
            'c-3':null,
            'c-4':null,
        }

        //initializing the cards property with its relative left posistion relate to its parent.
            for(let i=0;i<arr.length;i++)
            {       
                cards_current[arr[i]]=document.getElementById(arr[i]).getBoundingClientRect().left;
                inital_positions[arr[i]]=document.getElementById(arr[i]).getBoundingClientRect().left;

            }       
            //configuring the difficulty level settings according to the user . 
            let count=DIFFICULTY_LEVELS_SWAPS[difficulty_level-1]
            let speed=DIFFICULTY_LEVELS_SPEED[difficulty_level-1]
            //setting up the transition speed
            for(let t=0;t<arr.length;t++)
            {
                document.getElementById(arr[t]).style.transitionDuration=`${DIFFICULTY_LEVELS_SPEED[difficulty_level-1]}ms`
            }

           let Swap_interval=setInterval(function(){
            if(no1!==no2){//3,1

                console.log(no1,no2);              
                let c1=document.getElementById(arr[no1-1]); // c-3
                let c2=document.getElementById(arr[no2-1]);//c-1
                let c1_currPosition=cards_current[arr[no1-1]];//84
                let c2_currPosition=cards_current[arr[no2-1]];//761
                cards_current[arr[no1-1]]=c2_currPosition;//c2-761 
                cards_current[arr[no2-1]]=c1_currPosition;//c1=84
                
                console.log('cards chossen',arr[no1-1],arr[no2-1])
                console.log('curr positions',c1_currPosition,c2_currPosition);
                                // c2=curr 20 -c4= curr 10
                if(c1_currPosition<c2_currPosition)
                {
                    console.log('if')
                    console.log('c2_currpos', c2_currPosition, 'c1 initial ',c1.getBoundingClientRect().left)
                    c1.style.left=c2_currPosition-inital_positions[arr[no1-1]]+'px';
                    console.log('c1 style left',c1.style.left);
                    c2.style.left=c1_currPosition-inital_positions[arr[no2-1]]+'px';
                    console.log('c1_currpos', c1_currPosition, 'c2 initial ',c2.getBoundingClientRect().left)
                    console.log('c2 style left',c2.style.left)
                }
                else{
                    console.log('else');
                    console.log('c1_currpos', c1_currPosition, 'c2 initial ',c2.getBoundingClientRect().left)
                    c2.style.left=c1_currPosition-inital_positions[arr[no2-1]]+'px';
                    console.log('c2 style left',c2.style.left);
                    c1.style.left=c2_currPosition-inital_positions[arr[no1-1]]+'px';
                    console.log('c2_currpos', c2_currPosition, 'c1 initial ',c1.getBoundingClientRect().left)

                    console.log('c1 style left',c1.style.left)

                }

                  no1=Get_Random();
                  no2=Get_Random();
                  count--;
                    }
                else{
                    no1=Get_Random();
                    no2=Get_Random()

                }
            if(!count)
            {
                let ele;
                countdown.innerText="Click On Your Card (;";    
               for(let i=0;i<arr.length;i++)
               {
                    ele=document.getElementById(arr[i])
                    ele.classList.remove('outer-parent')
                    ele.classList.add('static-card-hover')
               }
            Choose_card=1;
                clearInterval(Swap_interval);
            }
                
           },speed)
           
        }
        function Get_Random()
        {
            return Math.floor(Math.random()*(4-1 +1))+1;
        }

    
    //we have to make the card component
    return(
        <>
        <Header></Header>
        <section id='main'>

            <section id='co-name'>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <span id="game-title"><i> Memorize IT </i></span>
                    </div>
                </div>
            </div>
            </section>

            <section id='play-ground'>
                <div className="containr mt-5">
                    <div className="row">
                        <div className="col-12 text-center mt-5">
                            <h3 id='play-ground-heading'>Pick Up Any Card To Start </h3>
                            {playagain?<buttom onClick={PlayAgain}><i class="bi bi-arrow-clockwise"></i></buttom>:''}
                        </div>
                        <div className="col-12 text-center mt-3">
                                <span>Difficulty Level:</span>
                                    <span id="levels">
                                    <div id="lvl1" onClick={setDifficulty}></div>
                                    <div id="lvl2" onClick={setDifficulty}></div>
                                    <div id="lvl3" onClick={setDifficulty}></div>
                                    <div id="lvl4" onClick={setDifficulty}></div>
                                </span>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="row justify-content-evenly ">
                                    <Card pattern={card} back={card1} id={'co-1'} plrselect={playerSelection} id2={'c-1'}></Card>
                                    <Card pattern={card} back={card2} id={'co-2'} plrselect={playerSelection} id2={'c-2'}></Card>
                                    <Card pattern={card} back={card3} id={'co-3'} plrselect={playerSelection} id2={'c-3'} ></Card>
                                    <Card pattern={card} back={card4} id={'co-4'} plrselect={playerSelection} id2={'c-4'}></Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <Footer></Footer>
        </>
    )
}
export default Home