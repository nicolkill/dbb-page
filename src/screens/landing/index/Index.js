import React from "react";

import Timeline from "../../../components/ui/timeline/Timeline";
import TextTerminal from "../../../components/TextTerminal";
import Section from "../../../components/ui/landing/Section";
import Title from "../../../components/ui/landing/section/Title";
import Content from "../../../components/ui/landing/section/Content";
import FullPageSection from "../../../components/ui/landing/FullPageSection";

function Index() {
  return (
    <div>
      {/* full page */}
      <FullPageSection>
        <Title>
          Nicol Acosta
          <p className="text-primary-100">
            Software Engineer
          </p>
        </Title>
        <div className="text-4xl pt-8">
          Expert in:
          <br/>
          <TextTerminal
            extraClasses="font-bold text-primary-100"
            options={["Elixir", "Phoenix", "Ash", "Javascript/Typescript", "NextJS", "NestJS"]}/>
        </div>
      </FullPageSection>
      {/* short description */}
      <Section theme="dark">
        <Title>Who am i?</Title>
        <Content>
          Im a Software Engineer with 9+ years of experience, 7+ using <b>Elixir (Phoenix, Ash)</b> and 7+ using
          <b>Javascript (Node, React in Vanilla or Typescript)</b> and more languages like Ruby and Python, i know how
          to take a product and move from nothing to production across software development, devops and deployment to
          AWS or another cloud service ensuring good practices in code and management, ensuring product reliability and grow.
        </Content>
      </Section>
      {/* pricing */}
      <Section>
        <Title>Experience</Title>
        <Timeline data={
          [
            {
              iconName: "work",
              title: "CodePower - Software Engineer Sr",
              subtitle: "jul. 2021 - Current",
              description: <div>
                Worked on a project that requires high availability of the service, API on GraphQL, while keeping coherence and transactions coordination in the database with programmed tasks and more complex flows about data coherence between the database and multiple users.
                <br/><br/>
                Manage real-time communication between backend and frontend, and deployed multiple frontend instances communicated by the backend.
                <br/><br/>
                Developed hybrid apps combining backend and frontend in the same project and codebase, integrating external services like Paypal
                <br/><br/>
                Integrated Localstack for local development and replace the past tool using Docker, Migrated near to 4m of rows from a MongoDB database to PostgreSQL
                <br/><br/>
                Expose features as external API to external clients usage
              </div>,
              tags: ["full-time", "remote", "elixir", "phoenix", "ash", "postgresql", "mongodb", "aws", "typescript", "reactjs", "docker"],
            },
            {
              iconName: "work",
              title: "LandOnEarth - Full Stack Engineer Sr",
              subtitle: "jul. 2020 - jul. 2021",
              description: <div>
                Company based on San Antonio Texas in the world of real estate, using daily interests and lifestyle to generate options to rent/buy house/apartment
                <br/><br/>
                - Create from scratch with the team the main application<br/>
                - Improve and create new features for the product<br/>
                - Work a lot in the front using live_view<br/>
                - Implemented all the auth features using Cognito as a auth provider and DynamoDB as session storage
              </div>,
              tags: ["full-time", "remote", "elixir", "phoenix", "live_view", "postgresql", "aws", "docker"],
            },
          ]
        }/>
      </Section>
    </div>
  );
}

export default Index;
