const EXPERIENCE = [
  {
    iconName: "work",
    title: "PepsiCo eCommerce - Elixir Developer Sr",
    subtitle: "nov. 2023 - current",
    description: <div>
      Working on internal software only related to business intelligence and reports about PepsiCo Products and all the 
      inner brands
    </div>,
    tags: ["full-time", "remote", "elixir", "phoenix", "postgresql", "aws", "docker", "snowflake", "oban"],
  },
  {
    iconName: "work",
    title: "CodePower - Software Engineer Sr",
    subtitle: "jul. 2021 - sep. 2023",
    description: <div>
      Worked on a project that requires high availability of the service, API on GraphQL, while keeping coherence and
      transactions coordination in the database with programmed tasks and more complex flows about data coherence
      between the database and multiple users.
      <br/><br/>
      Manage real-time communication between backend and frontend, and deployed multiple frontend instances communicated
      by the backend.
      <br/><br/>
      Developed hybrid apps combining backend and frontend in the same project and codebase, integrating external
      services like Paypal
      <br/><br/>
      Integrated Localstack for local development and replace the past tool using Docker, Migrated near to 4m of rows
      from a MongoDB database to PostgreSQL
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
  {
    iconName: "work",
    title: "Grupo Estrella Blanca - Backend Developer Sr",
    subtitle: "jun. 2019 - jul. 2020",
    description: <div>
      Attend the DevOps part maintaining all the services instance, load balancers and elastic configs to ensure
      availability on holiday seasons, worked on internal software to complete security requirements from external
      audits
      <br/><br/>
      Also created new platform for employees to get advices, coordinate teams and share important content between
      members of areas
    </div>,
    tags: ["full-time", "remote", "elixir", "phoenix", "aws", "ruby", "ruby-on-rails"],
  },
  {
    iconName: "work",
    title: "Busolinea - Backend Developer Sr",
    subtitle: "oct. 2018 - jun. 2019",
    description: <div>
      Work on internal platforms and products on startup process
      <br/><br/>
      Worked on Pailot that was a Uber-like application with the advantage that has access to bus-stations like CDMX
      North Bus Station (and more) as Backend
    </div>,
    tags: ["full-time", "office", "javascript", "node", "ruby", "ruby-on-rails", "jenkins", "jquery"],
  },
  {
    iconName: "work",
    title: "Credijusto.com - Software Engineer Sr",
    subtitle: "jul. 2018 - oct. 2018",
    description: <div>
      Attend internal platforms like Lease system creating small features, bixing bugs and discuss technical decisions
    </div>,
    tags: ["full-time", "office", "python", "django", "php", "symfony", "react", "javascript", "aws", "docker",
      "jenkins"],
  },
  {
    iconName: "work",
    title: "YetCargo - CTO",
    subtitle: "oct. 2017 - jul. 2018",
    description: <div>
      Added to my current tasks as FullStack now i coordinated the team (3 people) in scrum plannings on 2 weeks
      sprints, feature discussions with product people, clients issues support and fix and technical interviews with
      candidates, even more stuff that im skipping
    </div>,
    tags: ["full-time", "office", "elixir", "phoenix", "postgresql", "digital-ocean", "docker", "jekyll", "react",
      "gitlab-cd-ci", "firebase", "web-sockets", "gps-location", "iot-integrations"],
  },
  {
    iconName: "work",
    title: "YetCargo - Full Stack Engineer",
    subtitle: "jul. 2017 - sep. 2017",
    description: <div>
      FullStack Engineer/Octopus/Wizard of Engineering during my stay
      <br/><br/>
      I remaked the platform (build again in another language) and build even more features to create a complete
      solution for the company and solve the transport requests using Elixir/Phoenix on Backend and React.js in Frontend
      and another for another stuff not related to the main platform i used some pre-build solutions like image servers,
      blog to add tutorials to some transport-partners
      <br/><br/>
      Also integrated realtime locations using the classic uber-like with a native android application and also i found
      the way to use dedicated GPS devices like integrated to transport-partners vehicles and another Generic Devices
      from chinese pages (gearbest, aliexpress)
    </div>,
    tags: ["full-time", "office", "elixir", "phoenix", "postgresql", "digital-ocean", "react", "firebase",
      "web-sockets", "gps-location"],
  },
  {
    iconName: "work",
    title: "Parkiller - Android Developer",
    subtitle: "jun. 2016 - jul. 2017",
    description: <div>
      Android Developer for the different apps for the project, based on location services and focused in Car Services
      like Parking and Car Maintenance
    </div>,
    tags: ["full-time", "office", "java", "android", "retrofit", "dagger-2", "idle-testing"],
  },
  {
    iconName: "school",
    title: "UAGro - Student",
    subtitle: "ago. 2015 - jun. 2016",
    description: <div>
      Last 2 semesters of university
    </div>,
    tags: ["full-time", "php", "java", "c++", "python", "ruby"],
  },
  {
    iconName: "work",
    title: "3eMexico3eMexico - Android/iOS Dev Jr",
    subtitle: "mar. 2014 - ago. 2015",
    description: <div>
      Android/iOS Developer for basic applications for different clients, a little bit of REST API's on PHP
    </div>,
    tags: ["middle-time", "java", "android", "swift", "test-flight", "php", "mysql", "jquery"],
  },
];

const PROJECTS = [
  {
    name: "dbb",
    url: "https://github.com/nicolkill/dbb",
    description: "API prototypes made easy",
    tags: ["elixir", "phoenix", "api-generator"],
  },
  {
    name: "ex_crawlzy",
    url: "https://github.com/nicolkill/ex_crawlzy",
    description: "Crawl sites easily and inspired by Tesla Client",
    tags: ["elixir", "crawler"],
  },
  {
    name: "map_schema_validator",
    url: "https://github.com/nicolkill/map_schema_validator",
    description: "JSON Schema verifier in Elixir",
    tags: ["elixir"],
  },
  {
    name: "fl_ex",
    url: "https://github.com/nicolkill/fl_ex",
    description: "Elixir http micro framework inspired in Flask",
    tags: ["elixir", "api"],
  },
]

const PROFILE = {
  full_name: "Nicol Acosta",
  work_title: "Software Engineer",
  expertise: ["Elixir", "Phoenix", "Ash", "Javascript/Typescript", "NextJS", "NestJS"],
  who_im_i: <>
    Im a Software Engineer with 9+ years of experience, 7+ using <b>Elixir (Phoenix, Ash)</b> and 7+ usin <b>
    Javascript/Typescript (Node, React, NextJS, NestJS, )</b> and more languages like Ruby and Python, i know how to take a product and
    move from nothing to production across software development, devops and deployment to AWS or another cloud service
    ensuring good practices in code and management, ensuring product reliability and grow.
    </>,
  experience: EXPERIENCE,
  projects: PROJECTS,
}

export default PROFILE;
