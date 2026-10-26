const detailsToggle=document.getElementById('detailsToggle');
const detailsContent=document.getElementById('detailsContent');
const notesToggle=document.getElementById('notesToggle');
const notesContent=document.getElementById('notesContent');
const form=document.getElementById('loginForm');

detailsToggle.addEventListener('click',()=>detailsContent.classList.toggle('open'));
notesToggle.addEventListener('click',()=>{notesContent.classList.toggle('open');notesToggle.classList.toggle('open')});
document.querySelector('.copy-btn').addEventListener('click',async()=>{const ref='BP15Q53UC9WOEI3';try{await navigator.clipboard.writeText(ref)}catch{} });
// Prototype only: never transmit or store the entered values.
form.addEventListener('submit',e=>{
  e.preventDefault();
  alert('Demo prototype only. No login credentials were sent or saved.');
});

// Apply the bank selected on the previous screen.
const bankThemes = {
  'Public Bank': { color:'#D71920', accent:'#D71920', logo:'assets/bank/login-bank/bank_publicbank.svg' },
  'Maybank': { color:'#FFCC00', accent:'#E4B500', logo:'assets/bank/login-bank/bank_maybank.svg' },
  'CIMB Bank': { color:'#E31E2F', accent:'#E31E2F', logo:'assets/bank/login-bank/bank_cimb.svg' },
  'Affin Bank': { color:'#0067A5', accent:'#00AEEF', logo:'assets/bank/login-bank/bank_affinbank.svg' },
  'Hong Leong Bank': { color:'#003DA5', accent:'#E3185D', logo:'assets/bank/login-bank/bank_Hongleong.svg' },
  'RHB Bank': { color:'#0072BC', accent:'#00A6D6', logo:'assets/bank/login-bank/bank_RHB.svg' },
  'Alliance Bank': { color:'#173B8F', accent:'#E31B54', logo:'assets/bank/login-bank/bank_alliancebank.svg' },
  'AM Bank': { color:'#E31B36', accent:'#FFCC00', logo:'assets/bank/login-bank/bank_ambank.svg' },
  'BSN Bank': { color:'#009BAA', accent:'#009BAA', logo:'assets/bank/login-bank/bank_bsn.svg' },
  'Bank Islam': { color:'#B20D43', accent:'#B20D43', logo:'assets/bank/login-bank/bank_bankislam.svg' },
  'OCBC Bank': { color:'#E21E26', accent:'#E21E26', logo:'assets/bank/login-bank/bank_ocbc.svg' },
  'UOB Bank': { color:'#003478', accent:'#E31837', logo:'assets/bank/login-bank/bank_uob.svg' }
};
const params = new URLSearchParams(window.location.search);
const selectedBankName = params.get('bank') || 'Public Bank';
const theme = bankThemes[selectedBankName] || bankThemes['Public Bank'];
document.documentElement.style.setProperty('--bank-primary', theme.color);
document.documentElement.style.setProperty('--bank-accent', theme.accent);
// Maybank's yellow (#FFCC00) needs dark foreground text for contrast.
document.documentElement.style.setProperty('--bank-on-primary', selectedBankName === 'Maybank' ? '#111111' : '#FFFFFF');
document.getElementById('bankLogo').src = theme.logo;
document.getElementById('bankLogo').alt = selectedBankName + ' logo';
document.title = selectedBankName + ' Login | Payment Gateway';
