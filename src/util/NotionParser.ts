import {
  NotionPageBlock,
  NotionImageNodes,
  NotionPageText,
} from "gatsby-source-notionso/src/types/notion";

type NotionBlockTypes =
  | "meta"
  | "page"
  | "quote"
  | "image"
  | "bookmark"
  | "code"
  | "text"
  | "bulleted_list"
  | "header"
  | "sub_header"
  | "sub_sub_header";

export const blocksToHtml = (
  blocks: NotionPageBlock[],
  imageNodes: NotionImageNodes[]
): string => {
  let result = "";
  for (const block of blocks) {
    const converter = Parser[block.type as NotionBlockTypes];
    if (converter) {
      result += converter(block, imageNodes);
    }
  }
  return result;
};

const notionPageText = (propValue: NotionPageText) => {
  const span = document.createElement("span");

  let currentParent = span;
  for (const att of propValue.atts) {
    const attElm = document.createElement(att.att === "c" ? "code" : att.att);
    if (att.att === "a" && att.value) {
      attElm.setAttribute("href", att.value);
    }
    currentParent.appendChild(attElm);
    currentParent = attElm;
  }
  currentParent.textContent = propValue.text;
  return span;
};

const text = (block: NotionPageBlock) => {
  const p = document.createElement("p");
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        p.appendChild(elm);
      }
    }
  }
  console.log("p", p);
  return p.outerHTML;
};

const image = (block: NotionPageBlock, imageNodes: NotionImageNodes[]) => {
  const img = document.createElement("img");

  for (const prop of block.properties) {
    if (prop.propName === "source") {
      const [{ text }] = prop.value;

      img.src = getPublicImageURL(text, imageNodes);
    }
  }
  return img.outerHTML;
};

const bookmark = (block: NotionPageBlock) => {
  const p = document.createElement("p");
  const a = document.createElement("a");
  p.appendChild(a);
  for (const prop of block.properties) {
    const [{ text }] = prop.value;
    if (prop.propName === "link") {
      a.href = text;
    } else if (prop.propName === "title") {
      a.textContent = text;
    }
  }
  return p.outerHTML;
};

const getPublicImageURL = (src: string, imageNodes: NotionImageNodes[]) => {
  const node = imageNodes.find((n) => n.imageUrl === src);
  return node ? node.localFile.publicURL : "";
};

const code = (block: NotionPageBlock) => {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      const [{ text }] = prop.value;
      code.textContent = text;
    }
  }
  return pre.outerHTML;
};

const bulleted_list = (block: NotionPageBlock) => {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  ul.appendChild(li);
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        li.appendChild(elm);
      }
    }
  }
  return ul.outerHTML;
};

const quote = (block: NotionPageBlock) => {
  const blockquote = document.createElement("blockquote");
  const p = document.createElement("p");
  blockquote.appendChild(p);
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        p.appendChild(elm);
      }
    }
  }
  return blockquote.outerHTML;
};

const header = (block: NotionPageBlock) => {
  const h1 = document.createElement("h1");
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        h1.appendChild(elm);
      }
    }
  }
  return h1.outerHTML;
};

const sub_header = (block: NotionPageBlock) => {
  const h2 = document.createElement("h2");
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        h2.appendChild(elm);
      }
    }
  }
  return h2.outerHTML;
};

const sub_sub_header = (block: NotionPageBlock) => {
  const h3 = document.createElement("h3");
  for (const prop of block.properties) {
    if (prop.propName === "title") {
      for (const propValue of prop.value) {
        const elm = notionPageText(propValue);
        h3.appendChild(elm);
      }
    }
  }
  return h3.outerHTML;
};

const Parser = {
  meta: null,
  page: null,
  text,
  image,
  bookmark,
  quote,
  code,
  bulleted_list,
  header,
  sub_header,
  sub_sub_header,
};
