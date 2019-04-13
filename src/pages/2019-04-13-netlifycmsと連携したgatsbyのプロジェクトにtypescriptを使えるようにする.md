---
templateKey: blog-post
title: NetlifyCMSと連携したGatsbyのプロジェクトにTypeScriptを使えるようにする
date: 2019-04-13T07:14:24.263Z
---
# NetlifyCMSと連携したGatsbyのプロジェクトにTypeScriptを使えるようにする

TypeScriptを導入してみた作業ログです。

手順は主にこれの通りやりました。

https://qiita.com/otanu/items/f8840e66fb5e0993086d

Gatsbyのプラグインをインストール
```
yarn add gatsby-plugin-typescript
```

### tsconfig.jsonを追加
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "*": ["types/*"] },
    "module": "commonjs",
    "target": "esnext",
    "jsx": "preserve",
    "lib": ["dom", "es2015", "es2017"],
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true
  },
  "include": ["./src/**/*"]
}

```

### コンパイルエラー除去
起動してみるとコンパイルエラーがたくさん出たので、全て修正しました。

足りないパッケージをインストール。
```
npm i -D typescript @types/react @types/react-dom @types/react-helmet @types/lodash
```

コンポーネントに対して全て型を付けていきました。

ステートレスなコンポーネントの型の付け方は↓こちらの記事を参考にしました。

[TypeScript & Stateless Component でchildrenプロパティを扱う](https://qiita.com/r-tamura/items/1bf0e72433f96a5a2f14)

`React.StatelessComponent<React.Props<{}>>`とすれば良いみたい。
[こんな感じ](https://github.com/SatoshiKawabata/blog/blob/732975c7e22c2625368c1dd897f74764e739db1a/src/templates/index-page.tsx#L6)で付けました。
```
...
const IndexPageTemplate: React.StatelessComponent<React.Props<{}>> = () => {
...
```

とりあえずこれでTypeScriptの導入はできました。

ここまでのソース
[revision 732975c](https://github.com/SatoshiKawabata/blog/tree/732975c7e22c2625368c1dd897f74764e739db1a)
