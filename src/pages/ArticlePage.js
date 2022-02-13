import React from 'react';
import articles from './article-content'
import ArticlesList from '../components/ArticlesList';

const ArticlePage = ( {match}) => {
    const name = match.params.name;
    const article = articles.find(article => article.name === name);

    if (!article) return <h1>Article does not exist!</h1>
    const otherArticles = articles.filter(article => article.name !== name)

    return (
        <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}

        <h3>Other articles</h3>
        <ArticlesList articles={otherArticles} />

        </>
    );
}

export default ArticlePage;