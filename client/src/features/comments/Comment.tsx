export default function Comment(props: any) {
  const buttonGroup = (
    <div className='button-group'>
      <button
        id='commentUpdate'
        className='btn btn-primary'
        data-comment-id={props.id}
        data-bs-target='#updateCommentModal'
        type='button'
      >
        Update
      </button>
      <button
        id='commentDelete'
        className='btn btn-primary'
        data-comment-id={props.id}
        type='button'
      >
        Delete
      </button>
    </div>
  );

  let style = {
    width: '90%',
  };

  return (
    <div className='card my-3 mx-auto' style={style}>
      <div className='card-body p-0'>
        <section>
          <h5 className='card-header bg-info'>{props.username}</h5>
          <div className='card-text p-3'>{props.content}</div>
          <div className='card-text mb-0 p-0 card-footer'>
            <div className='d-sm-flex p-2 justify-content-between'>
              {buttonGroup}
              Comment Date: {props.updatedAt}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
