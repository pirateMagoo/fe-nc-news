import axios from "axios";

export const fetchArticles = () => {
    return axios
    .get('https://nc-news-mwo0.onrender.com/api/articles')
    .then(({ data }) => {
        console.log(data, "API data");
        return data.articles;
    })
    .catch((err) => console.log(err)); 
}