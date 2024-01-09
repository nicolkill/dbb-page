import React from "react";
import {marked} from "marked";

import POSTS from "./posts";
import Section from "../../../components/ui/landing/Section";
import Title from "../../../components/ui/landing/section/Title";
import Content from "../../../components/ui/landing/section/Content";
import Button from "../../../components/Button";
import firebase from "../../../services/firebase";

const PREVIEW_LENGTH = 500;

function Blog() {
  firebase.registerScreen("blog");

  const getPostPreview = (content) => {
    const preview = content.substr(0, PREVIEW_LENGTH);

    return preview + (preview.length === PREVIEW_LENGTH ? "..." : "")
  };

  return (
    <div>
      <Section className="mt-16">
        <Title>Blog</Title>
        <Content>
          All post contain external links to other blogs were it's published
        </Content>
      </Section>
      {POSTS.map((p, i) => (
        <Section key={`blog_post_${i}`} theme={i % 2 === 0 ? "dark" : "light"} className="blog-post">
          <Content>
            <div dangerouslySetInnerHTML={{__html: marked.parse(getPostPreview(p.content))}} />
          </Content>
          {p.content.length >= PREVIEW_LENGTH && <div className="mt-6">
            <Button type="secondary" buttonType="path" link={`/blog/${p.slug}`}>Read more</Button>
          </div>}
        </Section>
      ))}
    </div>
  );
}

export default Blog;
