import { graphql } from 'gatsby';
import React from 'react';
import DocsPage from '../components/docs-page';
export const query = graphql`
  query($pageID: String!) {
    docsPage(id: { eq: $pageID }) {
      title
      updated(fromNow: true)
      body
      id
    }
  }
`;
const DocsPageTemplate = ({ data }) => <DocsPage page={data.docsPage} />;

export default DocsPageTemplate;
