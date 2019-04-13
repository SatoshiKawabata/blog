---
templateKey: blog-post
title: Netlify CMSとGatsbyで作られたブログ記事が公開されるまで
date: 2019-04-13T08:29:58.814Z
---
このブログは[Netlify CMS](https://www.netlifycms.org/)と[GatsbyJS](https://www.gatsbyjs.org/)で作られています。

導入がかなり簡単で↓こちらの記事の通りに進めるだけですぐに公開できました。

[Gatsby + Netlify CMSで作ったブログをカスタマイズする](https://shibe97.com/blog/gatsby-netlify-cms/)

備忘録として、記事を書いてから公開されるまでのフローをまとめてみます。

## GithubとNetlifyの連携

前提として、[Githubリポジトリ](https://github.com/SatoshiKawabata/blog)とNetlifyを連携しているので、masterブランチにpushされる度にNetlifyでデプロイが走るようになっています。

## 1. 記事を書いて保存する

記事を書いてSaveボタンを押します。

## 2. GithubにPRが作られる

masterブランチに向けてプルリクエストが作られます。
記事のマークダウンファイルが生成されたコミットができあがります。

## 3. 記事をPublishする

Publishボタンを押します。

## 4. PRがマージされる

プルリクエストがマージされて、masterブランチが更新されます。

## 5. Netlifyでデプロイが走る

デプロイが走り、サイトが更新されます。

## 6. Gatsbyのビルドが走る

デプロイで、Gatsbyのビルドが走ります。

## 7. 記事のhtmlファイルが生成される

Gatsbyのビルドによって、記事のhtmlファイルが生成されます。

## 8. 記事が公開される

デプロイが完了して記事が公開されます。
