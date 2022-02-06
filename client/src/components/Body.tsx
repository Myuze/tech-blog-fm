import { useState, useEffect } from 'react';

import Post from '../components/Post';
import axios from 'axios';

export default function Body() {
  let loggedIn = true;

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const result = await axios.get('/api/blogs');
      console.log('Results:', result.data);
      if (!ignore) setBlogs(result.data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const motd = <p className='card-text'>Login to post a blog.</p>;
  const loginButton = (
    <div className='d-grid gap-2 col-6 mt-5 mx-auto'>
      <button
        id='homeLoginBtn'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#loginModal'
        type='button'
      >
        Login
      </button>
    </div>
  );

  const postButton = (
    <button
      id='homeNewPostBtn'
      className='btn btn-primary d-grid gap-2 col-6 mt-3 mx-auto'
      data-bs-toggle='modal'
      data-bs-target='#postModal'
    >
      New Post
    </button>
  );

  let content = 'This is my Post!';

  // let postList = ['Florian', 'Ayrlynn', 'Eywnn'];

  return (
    <main>
      <section>
        <div className='card text-center'>
          <div className='card-header'>
            <img
              src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5a4f1717-428c-47e7-b94f-673135d73112/dbj2mik-50a094f5-9bb6-47c5-9a78-20622c65bf29.png/v1/fill/w_1024,h_265,strp/header___nier__automata___2b___collab___may_by_oonadileeoo_dbj2mik-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjY1IiwicGF0aCI6IlwvZlwvNWE0ZjE3MTctNDI4Yy00N2U3LWI5NGYtNjczMTM1ZDczMTEyXC9kYmoybWlrLTUwYTA5NGY1LTliYjYtNDdjNS05YTc4LTIwNjIyYzY1YmYyOS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.pCDIT4h5c3MR_ScAj7vGQTv61w-76TXPLAKEJwI6MIM'
              className='img-fluid'
              alt='Nier Header'
            />
          </div>
          <div className='card-body mb-3'>
            <h1 className='card-title'>Welcome to Tech Blog FM</h1>
            {loggedIn ? motd : null}
          </div>
        </div>
        {loggedIn ? loginButton : null}
      </section>
      <section>
        <div className='d-grid col12'>
          <h2 className='mt-3 p-3'>Latest Posts</h2>
          {loggedIn ? postButton : null}
        </div>
        <div className='d-flex flex-column-reverse mt-3 post-container'>
          {blogs.map((blog: any, i) => (
            <Post
              key={i}
              loggedIn={true}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              updatedAt={blog.updatedAt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
