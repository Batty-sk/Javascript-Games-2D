let count=0;
let paths=['path1','path2','path3','path4']
let noof_boxes=[]
let Interval;
let frequency=500;
let level=10;
let timeout=0;
let play_bar=document.getElementById('play')
let start_txt=document.getElementById('sr')
let start_png=document.getElementById('png')
let score=document.getElementById('score')
let hi_score=document.getElementById('hi-score')
let no=0;
let audio2=new Audio("\\Beats\\effect2.mp3")
let audio=new Audio();

let box_height='200';

const chooseAPath=()=>{
let value=Math.floor(Math.random() * 4);
return value;
}


let CreateABox=(value)=>{
    let box=document.createElement('div');
    box.style.height=`${box_height}px`;
    box.style.width='100%';
    box.className='box';
    box.style.position='absolute';
    box.style.backgroundColor="black";
    box.style.animationName='Godown';
    box.style.animationDuration='1s';
    box.style.animationTimingFunction='linear';

    box.onclick=function(){
        no+=1;
        audio2.play();
        box.style.display='none';

    }
    box.id='id_'+count++;
    document.getElementById(paths[value]).appendChild(box);
    console.log(box.id);
    noof_boxes.push(box.id);
    box.addEventListener('animationend',function()
    {  
        console.log('finished');
        box.style.display='none';
        timeout=1;
        GameOver();


    })
box.addEventListener('mouseover',function()
{
    box.className=''
    box.style.backgroundColor='white'
})
box.addEventListener('mouseleave',function()
{
    box.className='box';
})
}
function chooseAction()
{
    if(start_txt.innerHTML=='Play Again?')
    {
        
        Play_Again();
        play_bar.style.display='none';

    
    }
    else{
        start();
        play_bar.style.display='none'

    }
}
let start=()=>{
Interval=setTimeout(Start_game,frequency);
audio.src='\\Beats\\faded.mp3 ';
audio.play();
}
function Start_game()
{
    
    if (!timeout){
        CreateABox(chooseAPath());
        score.innerHTML++;
        if (score.innerHTML>=level)
        {
            console.log('its inside');
            if (!frequency<200)
            {
                frequency-=50;
            }
            level*=2;
        }
        console.log('frequency:',frequency)
        setTimeout(Start_game, frequency);
    }

}
const GameOver=()=>{
    clearTimeout(Interval)
    for(i=0;i<noof_boxes.length;i++)
    {
        document.getElementById(noof_boxes[i]).style.animationPlayState='paused';
    }
    play_bar.style.display='block'
    start_txt.innerHTML='Play Again?'
    start_png.src='https://img.icons8.com/nolan/96/restart.png'

    if (score.innerHTML>hi_score.innerHTML){
        hi_score.innerHTML=score.innerHTMLi}
    else{
        console.log("P. r. e. v. .i .o. u. s | S. c. o. r. e ")}
    audio.pause();
}
const Play_Again=()=>{
    timeout=0;

    score.innerHTML=0;
    level=10;
    frequency=500

    for(i=0;i<noof_boxes.length;i++)
    {
        document.getElementById(noof_boxes[i]).remove();
    }
    noof_boxes=[]
    start();
}


