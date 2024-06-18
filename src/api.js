import axios from "axios";

const api = axios.create({
  baseURL: `https://nc-news-mwo0.onrender.com/api`,
});

export const fetchArticles = () => {
  return api
    .get(`/articles`)
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
}