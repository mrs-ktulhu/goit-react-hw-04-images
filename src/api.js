import axios from 'axios'

export const API_KEY = '39516513-b2de4558649c1d6b4380e040e';

export const BASE_URL = 'https://pixabay.com/api/';

export const defaultParams = {
  per_page: 12,
  page: 1,
  image_type: 'photo',
  orientation: 'horizontal',
};

export const buildPixabayURL = (searchQuery, page) => {
  const queryParams = {
    ...defaultParams,
    key: API_KEY,
    q: searchQuery,
    page
  };
  return `${BASE_URL}?${new URLSearchParams(queryParams).toString()}`;
};

export const fetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(buildPixabayURL(searchQuery, page));
    const data = response.data;
      return data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; 
  }
};