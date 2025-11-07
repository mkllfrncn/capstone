document.getElementById('back').addEventListener('click', ()=>location.href='dashboard.html');
document.getElementById('save').addEventListener('click', async ()=>{
  const payload = {
    'threshold_zoneA_min': document.getElementById('zoneA_min').value,
    'threshold_zoneA_max': document.getElementById('zoneA_max').value,
    'threshold_zoneB_min': document.getElementById('zoneB_min').value,
    'threshold_zoneB_max': document.getElementById('zoneB_max').value
  };
  const res = await fetch('http://192.168.1.10:5000/api/settings', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  const j = await res.json();
  alert(j.ok ? 'Saved' : 'Error');
});
