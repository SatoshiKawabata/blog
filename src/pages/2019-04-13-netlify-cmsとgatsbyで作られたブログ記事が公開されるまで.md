---
templateKey: blog-post
title: Netlify CMSとGatsbyで作られたブログ記事が公開されるまで
date: 2019-04-13T08:29:58.814Z
description: このブログはNetlify CMSとGatsbyJSで作られています。
---
Netlify CMSとGatsbyで作られたブログ記事が公開されるまで

このブログは[Netlify CMS](https://www.netlifycms.org/)と[GatsbyJS](https://www.gatsbyjs.org/)で作られています。

導入がかなり簡単で↓こちらの記事の通りに進めるだけですぐに公開できました。

[Gatsby + Netlify CMSで作ったブログをカスタマイズする](https://shibe97.com/blog/gatsby-netlify-cms/)

備忘録として、記事を書いてから公開されるまでのフローをまとめてみます。

## 0. 前提(Github連携、下書き機能)

前提として、[Githubリポジトリ](https://github.com/SatoshiKawabata/blog)とNetlifyを連携しているので、masterブランチにpushされる度にNetlifyでデプロイが走るようになっています。

また、Netlify CMSの下書き機能を使用しているので、Githubのプルリクエストと連動するようにしています。Githubのリポジトリを公開しているので下書きの意味は全く無いですが。。

下書き機能についても↓こちらの記事を参考にしました。

[Gatsby + Netlify CMSで作ったブログをカスタマイズする](https://shibe97.com/blog/gatsby-netlify-cms/)

## 1. 記事を書いて保存する

記事を書いてSaveボタンを押します。

![記事](/img/スクリーンショット 2019-04-13 17.43.52.jpg "記事を書く")

## 2. GithubにPRが作られる

masterブランチに向けてプルリクエストが作られます。記事のマークダウンファイルが生成されたコミットができあがります。

[Create Blog “2019-04-13-netlify-cmsとgatsbyで作られたブログ記事が公開されるまで” by SatoshiKawabata · Pull Request #15 · SatoshiKawabata/blog · GitHub](https://github.com/SatoshiKawabata/blog/pull/15)

![プルリクエスト](/img/スクリーンショット 2019-04-13 17.49.28.jpg "プルリクエスト")

[生成されたマークダウン](https://github.com/SatoshiKawabata/blog/pull/15/files)はこんな感じです。

![生成されたマークダウン](/img/スクリーンショット 2019-04-13 18.15.34.jpg "生成されたマークダウン")

## 3. 記事をPublishする

Publishボタンを押します。

## 4. PRがマージされる

プルリクエストがマージされて、masterブランチが更新されます。

![マージされたプルリクエスト](/img/スクリーンショット 2019-04-13 17.49.28.jpg "マージされたプルリクエスト")

## 5. Netlifyでデプロイが走る

デプロイが走り、サイトが更新されます。

![デプロイが走る](/img/スクリーンショット 2019-04-13 17.50.08.jpg "デプロイが走る")

## 6. Gatsbyのビルドが走る

デプロイで、Gatsbyのビルドが走ります。

## 7. 記事のhtmlファイルが生成される

Gatsbyのビルドによって、記事のhtmlファイルが生成されます。

この時に、マークダウンファイル→GraphQLでデータを取得→Reactで描画させてhtmlを吐き出しているのかなと思います。ここらへんはまだ把握していません。

ローカルでビルドしてみると`public/`配下に記事のフォルダができていて、htmlファイルが生成されいてるのがわかります。

![生成されたhtml](/img/スクリーンショット 2019-04-13 17.53.40.jpg "生成されたhtml")

## 8. 記事が公開される

デプロイが完了して記事が公開されます。

## まとめ

以上が、記事作成〜公開のフローです。GithubのPRと連携しててイメージしやすくて良い感じです。もしデータを公開したくなければ、GithubのプライベートリポジトリやGitlabを使えばOKです。これだけの機能が無料でできちゃうのがすごいです。

良くない点としては、デプロイの度に走るGatsbyのビルドに時間がかかる点です。記事の数が増えれば増えるほど時間がどんどんかかっていくのでしょうか。

まだGatsbyについてそこまで把握してないので、これからやっていきたいです。
