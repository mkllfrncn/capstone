const API = 'http://192.168.1.10:5000';
let chart;
async function update() {
  try {
    const [sRes, dRes] = await Promise.all([fetch(API + '/api/status'), fetch(API + '/api/data')]);
    const st = await sRes.json();
    const d = await dRes.json();
    document.getElementById('status').innerText = `LoRa: ✅ Connected | MCU1: ${st.mcu1 ? '🟢 Online' : '🔴 Offline'} | MCU2: ${st.mcu2 ? '🟢 Online' : '🔴 Offline'}`;
    document.getElementById('moistA').innerText = d.zoneA.moisture + '%';
    document.getElementById('moistB').innerText = d.zoneB.moisture + '%';
    document.getElementById('humA').innerText = d.zoneA.humidity + '%';
    document.getElementById('humB').innerText = d.zoneB.humidity + '%';
    document.getElementById('tempA').innerText = d.zoneA.temperature + '°C';
    document.getElementById('tempB').innerText = d.zoneB.temperature + '°C';
    document.getElementById('lightA').innerText = d.zoneA.light;
    document.getElementById('lightB').innerText = d.zoneB.light;
    updateChart(d.zoneB.humidity);
  } catch(e) {
    document.getElementById('status').innerText = 'Disconnected (server unreachable)';
  }
}
function updateChart(v) {
  if (!chart) {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, { type: 'line', data:{ labels:Array(10).fill(''), datasets:[{label:'Zone B Humidity', data:Array(10).fill(0), tension:0.2}]}, options:{animation:false,scales:{y:{beginAtZero:true}}}});
  }
  const ds = chart.data.datasets[0].data;
  ds.push(v);
  if (ds.length>10) ds.shift();
  chart.update();
}
document.getElementById('settings').addEventListener('click', ()=>location.href='settings.html');
document.getElementById('profile').addEventListener('click', ()=>location.href='profile.html');
document.getElementById('alerts').addEventListener('click', ()=>location.href='alerts.html');
document.getElementById('download').addEventListener('click', ()=>location.href = API + '/api/report');
setInterval(update, 3000);
update();
