import { useAppDispatch } from '../../app/hooks';

import Comment from '../comments/Comment';
import { blogsFetch } from './postSlice';

export default function Post(props: any) {
  const dispatch = useAppDispatch();

  const commentButton = (
    <button
      id='postComment'
      className='btn btn-primary'
      data-blog-id={`${props.id}`}
      data-bs-target='#commentModal'
      type='button'
    >
      Comment
    </button>
  );

  const postButton = (
    <button
      id='postUpdate'
      className='btn btn-primary'
      data-blog-id={`${props.id}`}
      data-bs-target='#updatePostModal'
      type='button'
      onClick={() => dispatch(blogsFetch())}
    >
      Update
    </button>
  );

  const deleteButton = (
    <button
      id='postDelete'
      className='btn btn-primary'
      data-blog-id={`${props.id}`}
      type='button'
    >
      Delete
    </button>
  );

  const buttonGroup = (
    <div className='button-group'>
      {commentButton}
      {postButton}
      {deleteButton}
    </div>
  );

  let style = {
    width: '90%',
  };

  let content = 'This is my Content!';

  let commentList = ['Myuze', 'Eywnn', 'Ayrlynn'];

  return (
    <div className='card my-3 mx-auto' data-blog-id={props.id} style={style}>
      <div className='card-body p-0'>
        <section>
          <h5 className='card-header bg-secondary'>{props.title}</h5>
          <p className='card-text p-3'>{props.content}</p>
        </section>
        <div className='d-sm-flex flex-row justify-content-between card-footer p-2'>
          {buttonGroup}
          <div className='d-sm-flex justify-content-between'>
            <p className='card-text px-2'>Author: {props.username}</p>
            <p className='card-text px-2'>Created: {props.updatedAt}</p>
          </div>
        </div>
        <hr className='mt-0' />
        <section>
          <h5 className='p-2'>Comments:</h5>
          <div className='d-flex flex-column-reverse mt-3 comment-container'>
            {commentList.map((username, i) => (
              <Comment key={i} username={username} content={content} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
