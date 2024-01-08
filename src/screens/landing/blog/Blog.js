import React from "react";
import {marked} from "marked";

import POSTS from "./posts";
import Section from "../../../components/ui/landing/Section";
import Title from "../../../components/ui/landing/section/Title";
import Content from "../../../components/ui/landing/section/Content";
import Button from "../../../components/Button";

function Blog() {
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
            <div dangerouslySetInnerHTML={{__html: marked.parse(p.preview)}} />
          </Content>
          <div className="mt-6">
            <Button type="secondary" buttonType="path" link={`/blog/${p.slug}`}>Read more</Button>
          </div>
        </Section>
      ))}
    </div>
  );
}

export default Blog;
