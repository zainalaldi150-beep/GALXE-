class WiFiManager {
    constructor() {
        this.wifiNetworks = this.loadFromStorage();
        this.init();
    }

    init() {
        this.displayWiFiList();
        this.setupEventListeners();
        
        // Load sample data if empty
        if (this.wifiNetworks.length === 0) {
            this.loadSampleData();
        }
    }

    setupEventListeners() {
        // Add WiFi form submission
        document.getElementById('addWiFiForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addWiFiNetwork();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchWiFi(e.target.value);
        });

        // File input for import
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileImport(e);
        });
    }

    loadSampleData() {
        const sampleNetworks = [
            {
                name: "Home_WiFi_2.4G",
                password: "mypassword123",
                security: "WPA2",
                dateAdded: new Date().toISOString()
            },
            {
                name: "Office_Network",
                password: "office2023!",
                security: "WPA2",
                dateAdded: new Date().toISOString()
            },
            {
                name: "Guest_Network",
                password: "guest123",
                security: "WPA2",
                dateAdded: new Date().toISOString()
            }
        ];
        
        this.wifiNetworks = sampleNetworks;
        this.saveToStorage();
        this.displayWiFiList();
    }

    addWiFiNetwork() {
        const name = document.getElementById('networkName').value.trim();
        const password = document.getElementById('networkPassword').value;
        const security = document.getElementById('networkSecurity').value.trim() || 'WPA2';

        if (!name || !password) {
            alert('Nama WiFi dan password harus diisi!');
            return;
        }

        // Check if network already exists
        if (this.wifiNetworks.some(network => network.name === name)) {
            alert('Network dengan nama tersebut sudah ada!');
            return;
        }

        const newNetwork = {
            name,
            password,
            security,
            dateAdded: new Date().toISOString()
        };

        this.wifiNetworks.push(newNetwork);
        this.saveToStorage();
        this.displayWiFiList();
        
        // Clear form
        document.getElementById('addWiFiForm').reset();
        
        alert('Network berhasil ditambahkan!');
    }

    displayWiFiList(networks = null) {
        const wifiList = document.getElementById('wifiList');
        const networksToShow = networks || this.wifiNetworks;

        if (networksToShow.length === 0) {
            wifiList.innerHTML = '<p style="text-align: center; color: #666;">Tidak ada network yang ditemukan.</p>';
            return;
        }

        wifiList.innerHTML = networksToShow.map((network, index) => `
            <div class="wifi-item">
                <div class="wifi-name">${this.escapeHtml(network.name)}</div>
                <div class="wifi-password" id="password-${index}">
                    <span class="password-text hidden">${this.escapeHtml(network.password)}</span>
                    <span class="password-hidden">••••••••</span>
                    <span class="password-toggle" onclick="wifiManager.togglePassword(${index})">Tampilkan</span>
                </div>
                <div class="wifi-security">Keamanan: ${this.escapeHtml(network.security)}</div>
                <div style="margin-top: 10px;">
                    <button onclick="wifiManager.copyPassword('${this.escapeHtml(network.password)}')" 
                            style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                        Copy Password
                    </button>
                    <button onclick="wifiManager.deleteNetwork('${this.escapeHtml(network.name)}')" 
                            style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                        Hapus
                    </button>
                </div>
            </div>
        `).join('');
    }

    togglePassword(index) {
        const passwordElement = document.getElementById(`password-${index}`);
        const passwordText = passwordElement.querySelector('.password-text');
        const passwordHidden = passwordElement.querySelector('.password-hidden');
        const toggleButton = passwordElement.querySelector('.password-toggle');

        if (passwordText.classList.contains('hidden')) {
            passwordText.classList.remove('hidden');
            passwordHidden.classList.add('hidden');
            toggleButton.textContent = 'Sembunyikan';
        } else {
            passwordText.classList.add('hidden');
            passwordHidden.classList.remove('hidden');
            toggleButton.textContent = 'Tampilkan';
        }
    }

    copyPassword(password) {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password berhasil disalin!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = password;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Password berhasil disalin!');
        });
    }

    deleteNetwork(networkName) {
        if (confirm(`Apakah Anda yakin ingin menghapus network "${networkName}"?`)) {
            this.wifiNetworks = this.wifiNetworks.filter(network => network.name !== networkName);
            this.saveToStorage();
            this.displayWiFiList();
            alert('Network berhasil dihapus!');
        }
    }

    searchWiFi(query = null) {
        const searchTerm = query || document.getElementById('searchInput').value.toLowerCase();
        
        if (!searchTerm) {
            this.displayWiFiList();
            return;
        }

        const filteredNetworks = this.wifiNetworks.filter(network =>
            network.name.toLowerCase().includes(searchTerm)
        );

        this.displayWiFiList(filteredNetworks);
    }

    exportData() {
        const dataStr = JSON.stringify(this.wifiNetworks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'wifi_passwords.json';
        link.click();
    }

    importData() {
        document.getElementById('fileInput').click();
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    this.wifiNetworks = importedData;
                    this.saveToStorage();
                    this.displayWiFiList();
                    alert('Data berhasil diimpor!');
                } else {
                    alert('Format file tidak valid!');
                }
            } catch (error) {
                alert('Error membaca file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    saveToStorage() {
        localStorage.setItem('wifiNetworks', JSON.stringify(this.wifiNetworks));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('wifiNetworks');
        return stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the WiFi Manager when page loads
let wifiManager;
document.addEventListener('DOMContentLoaded', () => {
    wifiManager = new WiFiManager();
});

// Global functions for button clicks
window.searchWiFi = () => wifiManager.searchWiFi();
window.exportData = () => wifiManager.exportData();
window.importData = () => wifiManager.importData();
