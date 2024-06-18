import axios from "axios";



export const fetchArticles = () => {
    return axios
    .get('https://nc-news-mwo0.onrender.com/api/articles')
    .then(({ data }) => {
        
        return data.articles;
    })
    .catch((err) => console.log(err)); 
}

export const fetchArticleById = (article_id) => {
    return axios
    .get(`https://nc-news-mwo0.onrender.com/api/articles/${article_id}`)
    .then(({ data}) => {
        // console.log(data, "fetch article by id");
        return data.article;
    })
    .catch((err) => console.log(err));
}