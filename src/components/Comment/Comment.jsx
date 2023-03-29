import React, { useEffect, useState } from 'react';
import './comment.css';
import keycloak from '../keycloak/keycloak';
import { useParams } from 'react-router';
import { createComment, getComments, getReplies } from '../../api/comment';
import { getUser } from '../../api/user';
function Comment({ projectId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyComment, setReplyComment] = useState('');
  const [replyToComment, setReplyToComment] = useState(null);
  const [users, setUsers] = useState({});
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  let userId = null;
  if(keycloak.authenticated){
    userId = keycloak.tokenParsed.sub;

  }
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleReplyCommentChange = (event) => {
    setReplyComment(event.target.value);
  };
  const handleShowRepliesAndReply = async (comment) => {
    try {
      const data = await getReplies(comment.id);
      console.log(data);
      setReplies(data); // Wait for setReplies to finish updating
      setSelectedCommentId(comment.id);
      setReplyToComment(comment);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    console.log(selectedCommentId);
    console.log(replyToComment);
    console.log(replyComment);
    event.preventDefault();
    console.log(`Comment submitted: ${comment}`);
    // console.log(`userId: ${userId}`);
    // console.log(`user: ${user.f_name} ${user.l_name}`);
    console.log(`projectId: ${projectId}`);
    if(keycloak.authenticated){
      const user = await getUser(userId);

      const newComment = {
        message: comment,
        user: userId,
        project: projectId,
      };
      if (replyToComment) {
        newComment.repliedTo = replyToComment.id;
        newComment.message = replyComment;
        await handleShowRepliesAndReply(replyToComment); // Wait for setReplies to finish updating
      }
      setComment('');
      setReplyComment('');
      try {
        console.log(newComment);
        const response = await createComment(newComment);
        console.log("Comment updated YAY!");
        alert("Comment updated YAY!");
        const updatedComments = await getComments(projectId);
        setComments(updatedComments);
        const updatedReplies = await getReplies(selectedCommentId);
        setReplies(updatedReplies);
      } catch (error) {
        alert(error);
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(projectId);
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [projectId]);
  useEffect(() => {
  const fetchReplies = async () => {
    if (selectedCommentId !== null) {
      try {
        const data = await getReplies(selectedCommentId);
        setReplies(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  fetchReplies();
}, [selectedCommentId]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = new Set([
          ...comments.map((comment) => comment.user),
          ...replies.map((reply) => reply.user)
        ]);
        const userArray = await Promise.all(Array.from(userIds).map((id) => getUser(id)));
        const userObject = {};
        userArray.forEach((user) => {
          userObject[user.id] = user;
        });
        setUsers(userObject);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [comments, replies]);
  if(keycloak.authenticated){

    return (

      <div className="comment-box">
        <p>{comments.length} kommentarer</p>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p className='name' style={{marginTop:"15px", marginBottom:"5px"}}>
              {users[comment.user] && users[comment.user].f_name} {' '}
              {users[comment.user] && users[comment.user].l_name}
            </p>
            <div>
              {comment.message}
            </div>
            <div style={{ margin: '15px 0 70px' }}>
              <button className='invisible' onClick={() => handleShowRepliesAndReply(comment)}>
                Svar ({comment.replies.length})
              </button>
            </div>
            {selectedCommentId === comment.id && (
              <div className='replies'>
                {replies.map((reply) => (
                  <div key={reply.id}>
                    <p className='name'>
                      {users[reply.user] && users[reply.user].f_name} {' '}
                      {users[reply.user] && users[reply.user].l_name}
                    </p>
                    <div className='reply'>
                      {reply.message}
                    </div>
                  </div>
                ))}
                <form onSubmit={(event) => handleSubmit(event)}>
                  <input
                    type="text"
                    placeholder="Svar på kommentar ..."
                    value={replyComment}
                    onChange={handleReplyCommentChange}
                    style={{ width: '800px', marginRight: '10px', padding: '10px' }}
                  />
                  <button type="submit" className='replyButton' onClick={() => setReplyToComment(comment)}>Svar</button>
                </form>
              </div>
            )}
          </div>
        ))}
        <form onSubmit={
          handleSubmit}>
          <h3>Skriv en kommentar</h3>
          <input
            className='submitComment'
            type="text"
            placeholder="Hva har du på hjertet?"
            value={comment}
            onChange={handleCommentChange}
            style={{ width: '850px', marginRight: '10px', padding: '10px' }}
          />
          <button type="submit" className='commentButton' onClick={() => setReplyToComment('')}>Publiser kommentar</button>
        </form>
      </div>
    
    );
  }
  }
export default Comment;