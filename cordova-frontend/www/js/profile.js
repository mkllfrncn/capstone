document.getElementById('signout').addEventListener('click', ()=>{ localStorage.removeItem('user'); location.href='index.html';});
document.getElementById('save').addEventListener('click', async ()=>{
  const payload = { fullname: document.getElementById('fullname').value, email: document.getElementById('email').value};
  const res = await fetch('http://192.168.1.10:5000/api/profile', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  const j = await res.json();
  alert(j.ok ? 'Saved' : 'Error');
});
// load profile
(async ()=>{
  const res = await fetch('http://192.168.1.10:5000/api/profile');
  const j = await res.json();
  if (j.email) {
    document.getElementById('fullname').value = j.fullname || '';
    document.getElementById('email').value = j.email || '';
  }
})();
