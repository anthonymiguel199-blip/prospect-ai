export default async function handler(req, res) {
    const { nicho, cidade } = req.query;
    // O Vercel vai buscar esse valor lá nas "Environment Variables" que você configurou
    const API_TOKEN = process.env.APIFY_TOKEN; 

    if (!nicho || !cidade) {
        return res.status(400).json({ error: 'Nicho e Cidade são obrigatórios.' });
    }

    try {
        // CORREÇÃO: Usando a variável ${API_TOKEN} na URL em vez da chave escrita manualmente
        const response = await fetch(`https://api.apify.com/v2/acts/apify~google-maps-scraper/run-sync-get-dataset-items?token=${API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                queries: [`${nicho} em ${cidade}`],
                maxItems: 20,
                language: "pt"
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar busca no Apify' });
    }
}