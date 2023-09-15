import React from "react";

import PROFILE from "../../../profile";
import Timeline from "../../../components/ui/timeline/Timeline";
import TextTerminal from "../../../components/TextTerminal";
import Section from "../../../components/ui/landing/Section";
import Title from "../../../components/ui/landing/section/Title";
import Content from "../../../components/ui/landing/section/Content";
import FullPageSection from "../../../components/ui/landing/FullPageSection";

import Horizontal from "../../../components/ui/components/horizontal/Horizontal";
import SectionHorizontal from "../../../components/ui/components/horizontal/Section";
import Card from "../../../components/Card";

function Index() {
  return (
    <div>
      {/* full page */}
      <FullPageSection>
        <Title>
          {PROFILE.full_name}
          <p className="text-primary-100">
            {PROFILE.work_title}
          </p>
        </Title>
        <div className="text-4xl pt-8">
          Expert in:
          <br/>
          <TextTerminal
            extraClasses="font-bold text-primary-100"
            options={PROFILE.expertise}/>
        </div>
      </FullPageSection>
      {/* short description */}
      <Section theme="dark">
        <Title>Who am i?</Title>
        <Content>
          {PROFILE.who_im_i}
        </Content>
      </Section>
      {/* pricing */}
      <Section>
        <Title>Experience</Title>
        <Timeline data={PROFILE.experience}/>
      </Section>
      {/* projects */}
      <Section theme="dark">
        <Title>OpenSource Projects</Title>
        <Horizontal>
          {PROFILE.projects.map((e, i) => (
            <SectionHorizontal key={"projects_element_" + i}>
              <Card className="transition hover:border-gray-500 hover:shadow:2xl">
                <span className="text-lg font-bold">
                  {e.name}
                </span>
                <p className="my-4 text-sm">
                  {e.description}
                </p>
                <div className="text-xs pt-4">
                  {e.tags.map((t) => (
                    <span key={"timeline_element_tag_" + t}
                          className="bg-secondary-200 text-white px-1 mr-px mb-px rounded inline-flex">
                    {t}
                  </span>
                  ))}
                </div>
                <a href={e.url} target="_blank" rel="noreferrer noopener">Go to Page</a>
              </Card>
            </SectionHorizontal>
          ))}
        </Horizontal>
      </Section>
    </div>
  );
}

export default Index;
