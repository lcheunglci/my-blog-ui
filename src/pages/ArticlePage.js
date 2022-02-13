import 'whatwg-fetch';
import React, {useState, useEffect} from 'react';
import articles from './article-content'
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import NotFoundPage from './NotFoundPage';


const ArticlePage = ( {match}) => {
    const name = match.params.name;
    const article = articles.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []});
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />
    const otherArticles = articles.filter(article => article.name !== name)

    return (
        <>
        <h1>{article.title}</h1>
        <UpvotesSection upvotes={articleInfo.upvotes} articleName={name} setArticleInfo={setArticleInfo} />
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments}/>
        <h3>Other articles</h3>
        <ArticlesList articles={otherArticles} />

        </>
    );
}

export default ArticlePage;