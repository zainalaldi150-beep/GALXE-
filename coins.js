// Simple API endpoint for coins data
// This would be your serverless function or Express route

const coins = [
    // Same dummy data as frontend
];

// GET /api/coins
export default function handler(req, res) {
    const { method, query } = req;
    
    switch (method) {
        case 'GET':
            // Handle search and pagination
            const { search, page = 1, limit = 6 } = query;
            let filteredCoins = coins;
            
            if (search) {
                filteredCoins = coins.filter(coin => 
                    coin.name.toLowerCase().includes(search.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(search.toLowerCase())
                );
            }
            
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit);
            const paginatedCoins = filteredCoins.slice(startIndex, endIndex);
            
            res.status(200).json({
                coins: paginatedCoins,
                total: filteredCoins.length,
                page: parseInt(page),
                totalPages: Math.ceil(filteredCoins.length / limit)
            });
            break;
            
        case 'POST':
            // Create new coin
            const newCoin = {
                id: coins.length + 1,
                ...req.body,
                marketCap: "0",
                price: "$0.001",
                change24h: "+0.0%",
                volume: "0",
                createdAt: new Date()
            };
            
            coins.unshift(newCoin);
            res.status(201).json(newCoin);
            break;
            
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
