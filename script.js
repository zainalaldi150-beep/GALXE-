// Basic client-side JS: Chart.js token allocation + ethers.js connect & read ERC20 totalSupply
document.getElementById('year').textContent = new Date().getFullYear();

const allocation = [
  {label: 'Public Sale', value: 40},
  {label: 'Team', value: 20},
  {label: 'Treasury', value: 20},
  {label: 'Marketing', value: 10},
  {label: 'Airdrop', value: 10},
];

const ctx = document.getElementById('tokenChart').getContext('2d');
const colors = allocation.map((_,i) => `hsl(${i*60 % 360} 70% 55%)`);

const pie = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: allocation.map(a => a.label),
    datasets: [{
      data: allocation.map(a => a.value),
      backgroundColor: colors,
      hoverOffset: 8,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// Populate allocation list
const list = document.getElementById('allocationList');
allocation.forEach(a => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${a.label}</strong> — ${a.value}%`;
  list.appendChild(li);
});

// Ethers.js: connect wallet (MetaMask) & read ERC20 totalSupply
let provider;
const connectBtn = document.getElementById('connectBtn');
const readBtn = document.getElementById('readBtn');
const contractInput = document.getElementById('contractAddress');
const output = document.getElementById('contractOutput');

async function connectWallet(){
  if (window.ethereum === undefined){
    alert('Wallet provider tidak ditemukan. Pasang MetaMask atau wallet yang kompatibel.');
    return;
  }
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    connectBtn.textContent = `${addr.slice(0,6)}…${addr.slice(-4)}`;
    connectBtn.disabled = true;
  } catch(err){
    console.error(err);
    alert('Gagal connect wallet: ' + (err.message || err));
  }
}

connectBtn.addEventListener('click', connectWallet);

// Simple ERC20 ABI (only totalSupply + decimals + symbol)
const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

async function readTotalSupply(){
  const addr = contractInput.value.trim();
  if (!ethers.utils.isAddress(addr)){
    output.textContent = 'Alamat kontrak tidak valid.';
    return;
  }
  // Use public provider if wallet not connected
  let readProvider = provider || ethers.getDefaultProvider(); // default -> network autodetect (may require API keys in prod)
  try {
    const token = new ethers.Contract(addr, ERC20_ABI, readProvider);
    const [supply, decimals, symbol] = await Promise.all([
      token.totalSupply(),
      token.decimals(),
      token.symbol()
    ]);
    // Convert to human-readable
    const human = ethers.utils.formatUnits(supply, decimals);
    output.innerHTML = `<strong>${symbol}</strong> totalSupply: ${human}`;
  } catch (err){
    console.error(err);
    output.textContent = 'Gagal membaca kontrak. Pastikan kontrak ERC-20 dan RPC tersambung.';
  }
}

readBtn.addEventListener('click', readTotalSupply);

// SECURITY NOTE (visible to user)
console.log('Keamanan: Jangan menyimpan private key di frontend. Gunakan backend/signing services untuk operasi sensitif.');
