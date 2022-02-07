import axios from 'axios';

export default async function fetchComments() {
  try {
    const result = await axios.get('/api/blogs/comments');
    if (result.status !== 200) console.log(result.statusText);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
