exports.onCreatePage = ({ page, actions }) => {
  console.log('pages');
  if (page.path.match(/^\/search/)) {
    page.matchPath = '/search/*';
    actions.createPage(page);
  }
};
