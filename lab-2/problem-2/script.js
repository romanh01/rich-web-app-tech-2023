const axios = require('axios');

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Fetching data from jsonplaceholder
async function fetchData() 
{
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Post titles with more than 6 words
async function listLongPostTitles() {
    const data = await fetchData();

    if (data) 
    {
        const longTitles = data.filter(post => post.title.split(' ').length > 6);
        console.log('Post titles with more than 6 words:');
        longTitles.forEach(post => console.log(post.title));
    }
}

// Word frequency map for post body contents
async function wordFrequencyMap() 
{
    const data = await fetchData();

    if (data) 
    {
        const words = data.flatMap(post => post.body.split(/\W+/));
        const wordFrequency = words.reduce((map, word) => {
            map[word] = (map[word] || 0) + 1;
            return map;
        }, {});

        console.log('Word Frequency Map:');
        console.log(wordFrequency);
    }
}

listLongPostTitles();
wordFrequencyMap();