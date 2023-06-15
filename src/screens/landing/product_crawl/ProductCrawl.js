import React from "react";
import {Link} from "react-router-dom";

import firebase from "../../../services/firebase";
import uListApi from "../../../services/uListApi";

import TextTerminal from "../../../components/TextTerminal";
import FullPageSection from "../../../components/ui/landing/FullPageSection";
import Title from "../../../components/ui/landing/section/Title";
import Section from "../../../components/ui/landing/Section";
import Content from "../../../components/ui/landing/section/Content";
import Horizontal from "../../../components/ui/components/horizontal/Horizontal";
import SectionHorizontal from "../../../components/ui/components/horizontal/Section";

function ProductCrawl() {
  firebase.registerScreen("landing");

  return (
    <div>
      <FullPageSection>
        <Title>
          Any page as a Service
          <p className="text-primary-100">
            We can check for you
          </p>
        </Title>
        <p className="text-xl mt-10">
          When you want something the luck can play against to you, be strategic and <b>check all the products with us</b>.
        </p>
        <div className="text-4xl pt-8">
          Compatible with:
          <br/>
          {/* must automatically change to the next site */}
          <TextTerminal
            extraClasses="font-bold text-primary-100"
            options={uListApi.availableProductPages()}/>
        </div>
      </FullPageSection>
      <Section theme="dark">
        <Title>
          Function?
        </Title>
        <Content>
          You give us the link and we check for you, no matter what you want, we stay in touch to you when it's available.
          <br/>
          <br/>
          You can have the number of products in check that you want.
          <br/>
          <br/>
          You can be notified when an <b>presale its available</b> or when some <b>sold out product its available again</b> or even
          when a <b>product has a discount or new options</b> to buy
        </Content>
      </Section>
      <Section>
        <Title>
          Why?
        </Title>
        <Content>
          Imagine that tomorrow starts a presale of a super limited edition of some game
        </Content>
        <Horizontal>
          <SectionHorizontal>
            <span className="text-lg font-bold">
              Use uList to automatic check when its available
            </span>
            <ul className="list-disc list-inside mt-8 mb-4">
              <li>Save time</li>
              <li>Instant notifications</li>
              <li>Easy configuration</li>
            </ul>
            <Link to="/register"
                  className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
              Register now!
            </Link>
          </SectionHorizontal>
          <SectionHorizontal>
            <span className="text-lg font-bold">
              Check the product by yourself
            </span>
            <ul className="list-disc list-inside mt-8 mb-4">
              <li>Lose time</li>
              <li>Concerns</li>
              <li className="font-bold">YOU CAN LOSE YOUR GAME</li>
            </ul>
            <Link to="/register"
                  className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
              I dont want lose my time
            </Link>
          </SectionHorizontal>
        </Horizontal>
      </Section>
    </div>
);
}
export default ProductCrawl;
