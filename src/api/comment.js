const COMMENT_API_URL = "http://localhost:8080/api/v1/comment";
const createComment = async (newComment) => {
    try {
      const response = await fetch(COMMENT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newComment,
        }),
      });
      return response;
    } catch (error) {
      throw new Error(`Error adding comment: ${error.message}`);
    }
};
const getComments = async (projectId) => {
    try {
      const response = await fetch(COMMENT_API_URL);
      const data = await response.json();
      const filteredData = data.filter(comment => comment.repliedTo === -1 && comment.project.toString() === projectId.toString());
      console.log(filteredData)
      return filteredData;
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
};
const getReplies = async (commentId) => {
  console.log(commentId);
  try {
    if (!commentId) {
      return [];
    }
    const response = await fetch(COMMENT_API_URL);
    const data = await response.json();
    const filteredData = data.filter(reply => reply.repliedTo.toString() === commentId.toString());
    console.log(filteredData)
    return filteredData;
  } catch (error) {
    throw new Error(`Error fetching replies: ${error.message}`);
  }
};
  export { createComment, getComments, getReplies, COMMENT_API_URL };