document.getElementById('year').textContent = new Date().getFullYear();

// FAQ toggle
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const a = btn.nextElementSibling;
    a.style.display = a.style.display === 'block' ? 'none' : 'block';
  });
});

// Allocation chart
const allocation = [
  {label:'Ecosystem Vault', pct:30},
  {label:'Launchpad Vault', pct:20},
  {label:'Staking Vault', pct:15},
  {label:'Reserve Vault', pct:12},
  {label:'Liquidity Vault', pct:8},
  {label:'Owner/Shareholders', pct:6}
];
const ctx = document.getElementById('allocationChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: allocation.map(a=>a.label),
    datasets:[{ data: allocation.map(a=>a.pct) }]
  },
  options:{
    plugins:{
      legend:{labels:{color:'#e6eef8'}}
    }
  }
});