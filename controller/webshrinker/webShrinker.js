const https = require('https');

module.exports = async (domain) => {
  return new Promise((resolve, reject) => {
    const url = `${process.env.WS_URL}/${Buffer.from(domain).toString('base64')}?taxonomy=webshrinker`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.WS_KEY}:${process.env.WS_SECRET}`).toString('base64')
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            if (jsonData && jsonData.data && jsonData.data.length > 0 && jsonData.data[0].categories) {
              const categoriesArray = jsonData.data.flatMap(item => item.categories.map(category => category.label));
              resolve(categoriesArray);
            } else {
              reject(new Error('Categories not found in response'));
            }
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};