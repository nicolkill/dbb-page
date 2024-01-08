import React from "react";
import {marked} from "marked";
import {useParams} from "react-router-dom";

import POSTS from "./posts";
import Section from "../../../components/ui/landing/Section";
import Content from "../../../components/ui/landing/section/Content";
import Button from "../../../components/Button";

function Post() {
  const {slug} = useParams();

  const p = POSTS.find((p) => p.slug === slug);

  return (
    <div>
      <div className="blog-post">
        <Section>
          <Content>
            <div className="pb-4">
              <Button buttonType="path" link="/blog" type="link">{"<"} Back</Button>
            </div>
            <div dangerouslySetInnerHTML={{__html: marked.parse(p.content)}} />
          </Content>
        </Section>
      </div>
    </div>
  );
}

export default Post;
