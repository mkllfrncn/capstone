async function loadAlerts(){
  const res = await fetch('http://192.168.1.10:5000/api/alerts');
  const arr = await res.json();
  const container = document.getElementById('alertslist');
  container.innerHTML = '';
  for (const a of arr) {
    const el = document.createElement('div');
    el.className = 'alert';
    const d = new Date(a.ts*1000);
    el.innerHTML = `<strong>${a.title}</strong><div>Timestamp: ${d.toLocaleString()}</div><div>${a.message}</div>`;
    container.appendChild(el);
  }
}
document.getElementById('refresh').addEventListener('click', loadAlerts);
document.getElementById('clear').addEventListener('click', async ()=>{
  await fetch('http://192.168.1.10:5000/api/alerts/clear', {method:'POST'});
  loadAlerts();
});
document.getElementById('back').addEventListener('click', ()=>location.href='dashboard.html');
loadAlerts();
