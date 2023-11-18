const inputslider=document.querySelector("[datalengthslider]");
const lengthdisplay=document.querySelector("[datalenghtnumber]");

const passworddisplay=document.querySelector("[datapassworddisplay]");
const copybtn=document.querySelector("[datacopy]");
const copymsg=document.querySelector("[datacopymessage]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numberscheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbols");
const indicator=document.querySelector("[dataindicator]");
const generatebtn=document.querySelector(".generatebutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordlength=10;
let chechcoumt=0;
handleslider();
setindicator("#ccc");

// function for handle slider
// set password length 
function handleslider(){
    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%"
};

// to set color of strength of password
function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
};
// function to generate random integer 
function getRndIntger(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
};
// funciotn to generate random number 
function generaterandomnumber(){
    return getRndIntger(0,9);
};
// function to generate lowercase alphabets
function generatelowercase(){
    return String.fromCharCode(getRndIntger(97,123));
};
function generateuppercase(){
    return String.fromCharCode(getRndIntger(65,91));
};
function generatesymbol(){
    const rndnumber=getRndIntger(0,symbols.length)
    return symbols.charAt(rndnumber);
};

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercasecheck.checked) hasUpper = true;
    if(lowercasecheck.checked) hasLower = true;
    if(numberscheck.checked) hasNumber = true;
    if(symbolscheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8){
        setindicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordlength >= 6){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
};

async function copycontent(){
   try{
    await navigator.clipboard.writeText(password);
    copymsg.innerText="copied";
   }
   catch(e){
    copymsg.innerText="Failed";
   }

//    to make copied vala text visible
   copymsg.classList.add("active");

   setTimeout(() => {
    copymsg.classList.remove("active");
   }, 2000);
};


inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
});

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value){
        copycontent();
    }
    else{
        alert('Please Generate Password First');
    }
});

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', countCheckedCb);
});

function countCheckedCb(){
    chechcoumt = 0;

    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked) chechcoumt++;
    });

    if(passwordlength < chechcoumt){
        passwordlength = chechcoumt;
        handleslider();
    }
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
};
generatebtn.addEventListener('click',()=>{
    if(chechcoumt==0) {alert('Select at least one checkbox!!'); return;}
    if(passwordlength<chechcoumt){
        passwordlength=chechcoumt;
        handleslider();
    }

        password="";

        // if(uppercasecheck.checked){
        //     password+=generateuppercase();
        // }
        // if(lowercasecheckcasecheck.checked){
        //     password+=generatelowercase();
        // }
        // if(numberscheck.checked){
        //     password+=generaterandomnumber();
        // }
        // if(symbolscheck.checked){
        //     password+=generatesymbol();
        // }

        let funarr=[];
        if(uppercasecheck.checked){
            funarr.push(generateuppercase);
        }
        if(lowercasecheck.checked){
            funarr.push(generatelowercase);
        }
        if(numberscheck.checked){
            funarr.push(generaterandomnumber);
        }
        if(symbolscheck.checked){
            funarr.push(generatesymbol);
        }


        for(let i=0;i<funarr.length;i++){
            password+=funarr[i]();
        }
        for(let i=0;i<(passwordlength-funarr.length);i++){
            let randomindex=getRndIntger(0,funarr.length);
            password+=funarr[randomindex]();
        }

        password=shuffleArray(Array.from(password));
        passworddisplay.value=password;
        calcStrength();

});