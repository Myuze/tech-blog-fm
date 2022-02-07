import axios from 'axios';

export default async function fetchPosts() {
  try {
    const result = await axios.get('/api/blogs');
    if (result.status !== 200) console.log(result.statusText);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserPosts(userId: Number) {
  try {
    const result = await axios.get(`api/${userId}`);
    if (result.status !== 200) console.log(result.statusText);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
