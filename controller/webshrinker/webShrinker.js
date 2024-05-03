module.exports = async (domain) => {
  try {
    const url = `${process.env.WS_URL}/${Buffer.from(domain).toString('base64')}?taxonomy=webshrinker`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.WS_KEY}:${process.env.WS_SECRET}`).toString('base64')
      },
    });
    
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData && jsonData.data && jsonData.data.length > 0 && jsonData.data[0].categories) {
        const categoriesArray = jsonData.data.flatMap(item => item.categories.map(category => category.label));
        return categoriesArray;
      } else {
        throw new Error('Categories not found in response');
      }
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}