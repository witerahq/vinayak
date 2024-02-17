const { Client, HttpConnection } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200', requestTimeout: 30000, Connection: HttpConnection });

async function searchSymptoms(req, res) {
  try {
    const { query } = req.params; // Get search query from request parameters

    // Perform Elasticsearch search
    const { body } = await client.search({
      index: 'symptoms', // Index name (can be customized)
      body: {
        query: {
          multi_match: {
            query,
            fields: ['Symptom', 'PrimarySpecialist', 'SecondarySpecialist', 'TertiarySpecialist', 'AnatomicalRegion'],
          },
        },
      },
    });

    // Extract relevant information from Elasticsearch response
    const results = body.hits.hits.map(hit => hit._source);

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  searchSymptoms,
};
