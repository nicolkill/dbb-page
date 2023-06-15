import React from "react";
import {Link} from "react-router-dom";

import uListApi from "../../../services/uListApi";

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
          Any page as a Service
          <p className="text-primary-100">
            Check sites and get notified in the moment
          </p>
        </Title>
        <p className="text-xl mt-10">
          We offer a services that helps to check another page periodically and get notified, any site, in any time.
        </p>
        <div className="text-4xl pt-8">
          We can:
          <br/>
          {/* must automatically change to the next site */}
          <TextTerminal
            extraClasses="font-bold text-primary-100"
            options={["Check products", "Store lists", "Site monitoring", "Site to API"]}/>
        </div>
      </FullPageSection>
      {/* short description */}
      <Section theme="dark">
        <Title>Why i need this?</Title>
        <Content>
          Let us help to improve your shopper life, you can check a product directly or check if an search in some site
          changed, an item it's removed or added, you can act in the moment
        </Content>
      </Section>
      {/* descriptions */}
      <Section>
        <Title>
          We can
        </Title>
        <Horizontal>
          <SectionHorizontal>
            <Card className="transition hover:border-gray-500 hover:shadow:2xl">
              <span className="text-lg font-bold">
                Check products
              </span>
              <p className="mt-4 text-sm px-1">
                F5 to refresh it's old school, save your product with the link and get notified in the moment
              </p>
              <ul className="list-disc list-inside mt-4 text-sm text-gray-500 text-left">
                <li>Unlimited products</li>
                <li>Up to 5min check</li>
                <li>Easy check configuration</li>
                <li>Email notifications</li>
                <li>Push notifications</li>
              </ul>
              <div className="block mb-4 mt-4">
              <span className="block">
                Compatibility with:
              </span>
                <TextTerminal
                  extraClasses="font-bold"
                  options={uListApi.availableProductPages()}/>
              </div>
              <Link to="/products"
                    className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Check now
              </Link>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card className="transition hover:border-gray-500 hover:shadow:2xl">
              <span className="text-lg font-bold">
                Store lists
              </span>
              <p className="mt-4 text-sm px-1">
                When you search you see results, we notify when this results change, all new stuff in your cart
              </p>
              <ul className="list-disc list-inside mt-4 text-sm text-gray-500 text-left">
                <li>Unlimited search links</li>
                <li>Up to 5min check</li>
                <li>Easy check configuration</li>
                <li>Email notifications</li>
                <li>Push notifications</li>
              </ul>
              <div className="block mb-4 mt-4">
              <span className="block">
                Compatibility with:
              </span>
                <TextTerminal
                  extraClasses="font-bold"
                  options={uListApi.availableSearchPages()}/>
              </div>
              <Link to="/products"
                    className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Check now
              </Link>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card className="transition hover:border-gray-500 hover:shadow:2xl">
              <span className="text-lg font-bold">
                Site monitoring
              </span>
              <p className="mt-4 text-sm px-1">
                You want know if some tickets are available, or if some government enabled a button for a formal procedure
              </p>
              <ul className="list-disc list-inside my-4 text-sm text-gray-500 text-left">
                <li>Unlimited pages</li>
                <li>Up to 5min check</li>
                <li>Easy check configuration</li>
                <li>Email notifications</li>
                <li>Push notifications</li>
                <li><b>Any site compatible</b></li>
              </ul>
              <Link to="/products"
                    className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Check now
              </Link>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card className="transition hover:border-gray-500 hover:shadow:2xl">
              <span className="text-lg font-bold">
                Site to API
              </span>
              <p className="mt-4 text-sm px-1">
                Use sites as your data source, we can send sites transformed to data (in JSON) when something changed in the page
              </p>
              <ul className="list-disc list-inside my-4 text-sm text-gray-500 text-left">
                <li>Unlimited sites</li>
                <li>Unlimited fields by CSS selector</li>
                <li>Up to 5min check</li>
                <li>Easy check configuration</li>
                <li>Webhook notifications</li>
              </ul>
              <Link to="/products"
                    className="items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Check now
              </Link>
            </Card>
          </SectionHorizontal>
        </Horizontal>
      </Section>
      {/* pricing */}
      <Section theme="dark">
      </Section>
      {/* pricing */}
      <Section>
        <Title>
          Pricing
        </Title>
        <Horizontal>
          <SectionHorizontal>
            <Card>
              <p className="text-lg font-bold">
                Basic
              </p>
              <p className="mb-5 mt-2 font-bold text-primary-100 text-xl">
                Free Forever!
              </p>
              <Link to="/register"
                    className="items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Go on Basic!
              </Link>
              <div className="border-b w-full pt-6 border-gray-200"/>
              <ul className="list-disc list-none mt-4 text-sm text-gray-500">
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Up to 20 records
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Only 12hrs checks
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Products:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    Check products
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    Store lists
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    Site monitoring
                  </li>
                </ul>
              </ul>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card>
              <span className="text-lg font-bold">
                Medium
              </span>
              <p className="mb-5 mt-2 text-gray-400 text-sm">
                <span className="mt-4 font-bold text-black text-xl">
                  $5
                </span> per month
              </p>
              <Link to="/register"
                    className="items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Go on Medium!
              </Link>
              <div className="border-b w-full pt-6 border-gray-200"/>
              <ul className="list-disc list-none mt-4 text-sm text-gray-500 text-left">
                <li>
                  <span className="material-icons text-2xs pr-1">keyboard_double_arrow_left</span>
                  <i>All from <b>Basic</b></i>
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Upgrade to:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    5 records with 2hrs check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    10 records with 6hrs check
                  </li>
                </ul>
              </ul>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card>
              <span className="text-lg font-bold">
                Advanced
              </span>
              <p className="mb-5 mt-2 text-gray-400 text-sm">
                <span className="mt-4 font-bold text-black text-xl">
                  $10
                </span> per month
              </p>
              <Link to="/register"
                    className="items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Go on Advanced!
              </Link>
              <div className="border-b w-full pt-6 border-gray-200"/>
              <ul className="list-disc list-none mt-4 text-sm text-gray-500 text-left">
                <li>
                  <span className="material-icons text-2xs pr-1">keyboard_double_arrow_left</span>
                  <i>All from <b>Medium</b></i>
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Upgrade to:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    5 records with 30min check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    10 records with 2hrs check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    20 records with 6hrs check
                  </li>
                </ul>
              </ul>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card>
              <span className="text-lg font-bold">
                Enthusiast
              </span>
              <p className="mb-5 mt-2 text-gray-400 text-sm">
                <span className="mt-4 font-bold text-black text-xl">
                  $15
                </span> per month
              </p>
              <Link to="/register"
                    className="items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Go on Enthusiast!
              </Link>
              <div className="border-b w-full pt-6 border-gray-200"/>
              <ul className="list-disc list-none mt-4 text-sm text-gray-500 text-left">
                <li>
                  <span className="material-icons text-2xs pr-1">keyboard_double_arrow_left</span>
                  <i>All from <b>Advanced</b></i>
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Upgrade to:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    5 records with 5min check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    10 records with 30min check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    20 records with 2hrs check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    40 records with 6hrs check
                  </li>
                </ul>
              </ul>
            </Card>
          </SectionHorizontal>
          <SectionHorizontal>
            <Card>
              <span className="text-lg font-bold">
                Extreme
              </span>
              <p className="mb-5 mt-2 text-gray-400 text-sm">
                <span className="mt-4 font-bold text-black text-xl">
                  $30
                </span> per month
              </p>
              <Link to="/register"
                    className="items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 sm:text-sm">
                Go on Extreme!
              </Link>
              <div className="border-b w-full pt-6 border-gray-200"/>
              <ul className="list-disc list-none mt-4 text-sm text-gray-500 text-left">
                <li>
                  <span className="material-icons text-2xs pr-1">keyboard_double_arrow_left</span>
                  <i>All from <b>Enthusiast</b></i>
                </li>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Products:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    Site to API
                  </li>
                </ul>
                <li>
                  <span className="material-icons text-2xs pr-1">arrow_right</span>
                  Upgrade to:
                </li>
                <ul className="list-disc list-none pl-4 text-xs text-gray-400">
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    20 records with 5min check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    40 records with 30min check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    60 records with 2hrs check
                  </li>
                  <li>
                    <span className="material-icons text-2xs pr-1">check</span>
                    80 records with 6hrs check
                  </li>
                </ul>
              </ul>
            </Card>
          </SectionHorizontal>
        </Horizontal>
      </Section>
    </div>
  );
}

export default Index;
