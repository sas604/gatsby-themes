import React from 'react';
import Form from '../components/form';
import Result from '../components/results';

const Search = ({ location }) => {
  console.log(location);
  const query =
    (location.state && location.state.query) ||
    location.pathname.replace(/^\/search\/?/, '') ||
    '';
  const name = query.replace(/-+/g, ' ');
  return (
    <>
      <h1>
        {name
          ? `Showing results for ${name}`
          : 'Search for Rick and Morty characters'}
      </h1>
      <p>
        Trying to remember which Rick you're talking about? Try out this handy
        search interface!
      </p>
      <Form />
      {name && <Result name={name} />}
    </>
  );
};
export default Search;
