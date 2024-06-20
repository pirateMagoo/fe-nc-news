import axios from "axios";

const api = axios.create({
  baseURL: `https://nc-news-mwo0.onrender.com/api`,
});

export const fetchArticles = (topic) => {
  const query = topic ? `?topic=${topic}` : ''
    return api
    .get(`/articles${query}`)
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => console.log(err));
};

export const fetchArticleById = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => console.log(err));
};

export const fetchCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => console.log(err));
};

export const updateArticleVotes = (article_id, inc_votes) => {
    return api
    .patch(`/articles/${article_id}`, {inc_votes})
    .then(({ data }) => {
        return data.article;
    })
    .catch((err) => console.log(err))
};

export const postCommentToArticle = (article_id, comment) => {
    return api
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
        console.log(data, "inside api call")
        return data.comment
    })
    .catch((err) => {
        console.log(err)
        throw err
    });
};

export const deleteCommentById = (comment_id) => {
    return api
    .delete(`/comments/${comment_id}`)
    .then(() => {})
};

export const fetchTopics = () => {
    return api
    .get('topics')
    .then(({ data }) => {
        return data.topics
    })
}