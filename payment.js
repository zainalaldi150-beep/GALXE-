// Solana Payment Integration
class SolanaPayment {
    constructor() {
        this.connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        this.paymentAddress = '3khUUsRd8ihbpSL2ph3BhQfRhJMYtQYhRTzaqU9Uhkay';
    }

    async generatePaymentRequest(amount, plan) {
        const recipient = new solanaWeb3.PublicKey(this.paymentAddress);
        const amountBN = new BigNumber(amount);
        const reference = new solanaWeb3.Keypair().publicKey;
        
        const url = solanaPay.encodeURL({
            recipient: recipient,
            amount: amountBN,
            reference: reference,
            label: 'Vetro Labs',
            message: `${plan} plan subscription`,
            memo: `VetroLabs-${plan}-${Date.now()}`
        });
        
        return { url, reference };
    }

    async verifyPayment(reference) {
        try {
            const signatures = await this.connection.getSignaturesForAddress(reference, { limit: 1 });
            return signatures.length > 0;
        } catch (error) {
            console.error('Payment verification error:', error);
            return false;
        }
    }

    createQRCode(url) {
        return solanaPay.createQR(url, {
            size: 256,
            background: 'white',
            color: 'black'
        });
    }
}

// DeepSeek AI Integration
class DeepSeekAI {
    constructor() {
        this.apiKey = 'sk-7ee9420f157d413487d9cff41c432082';
        this.apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    }

    async generateCode(prompt, language = 'javascript') {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-coder',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert ${language} developer. Generate clean, well-commented code following best practices.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                    stream: false
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API error:', error);
            throw error;
        }
    }

    async generateCodeStream(prompt, onChunk, language = 'javascript') {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-coder',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert ${language} developer. Generate clean, well-commented code following best practices.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                    stream: true
                })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            const content = data.choices[0].delta.content;
                            if (content) {
                                onChunk(content);
                            }
                        } catch (e) {
                            // Ignore parsing errors for stream data
                        }
                    }
                }
            }
        } catch (error) {
            console.error('DeepSeek streaming error:', error);
            throw error;
        }
    }
}

// Initialize services
const solanaPayment = new SolanaPayment();
const deepSeekAI = new DeepSeekAI();

// Export for use in other files
window.SolanaPayment = SolanaPayment;
window.DeepSeekAI = DeepSeekAI;
window.solanaPayment = solanaPayment;
window.deepSeekAI = deepSeekAI;
