async function doLogin(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('http://192.168.1.10:5000/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})});
  const j = await res.json();
  if (j.ok) {
    localStorage.setItem('user', JSON.stringify(j));
    location.href='dashboard.html';
  } else {
    alert('Login failed: ' + (j.error || JSON.stringify(j)));
  }
}
document.getElementById('login').addEventListener('click', doLogin);
