import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function About() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout>
      <main>어바웃</main>
    </Layout>
  );
}

export default About;
