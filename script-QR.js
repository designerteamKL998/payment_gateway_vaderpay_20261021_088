function bindToggle(btnId, contentId){
  const btn=document.getElementById(btnId), content=document.getElementById(contentId);
  if(!btn||!content)return;
  btn.addEventListener("click",()=>{
    const open=content.classList.toggle("open");
    btn.classList.toggle("open",open);
  });
}
bindToggle("desktopNotes","desktopNotesContent");
bindToggle("mobileNotes","mobileNotesContent");

let seconds=60;
let timerFinished=false;

function goToUnsuccessfulPayment(){
  if(timerFinished)return;
  timerFinished=true;
  window.location.href="payment-unsuccessful.html";
}

function renderTimer(){
  const m=String(Math.floor(seconds/60)).padStart(2,"0");
  const s=String(seconds%60).padStart(2,"0");
  const value=`${m}:${s}`;
  const d=document.getElementById("desktopTimer"), mbl=document.getElementById("mobileTimer");
  if(d)d.textContent=value;
  if(mbl)mbl.textContent=value;
}

renderTimer();
const countdown=setInterval(()=>{
  seconds--;
  if(seconds<=0){
    seconds=0;
    renderTimer();
    clearInterval(countdown);
    goToUnsuccessfulPayment();
    return;
  }
  renderTimer();
},1000);

function bindConfirmPay(id){
  const btn=document.getElementById(id);
  if(!btn)return;
  btn.addEventListener("click",()=>{
    window.close();
  });
}
bindConfirmPay("desktopConfirmPay");
bindConfirmPay("mobileConfirmPay");
