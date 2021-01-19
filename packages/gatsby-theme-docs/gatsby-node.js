const path = require('path');
const fs = require('fs');
const withDefaults = require('./utils/default-options');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  //path defaults
  const { contentPath } = withDefaults(options);
  // dir path
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    //  create the dir
    mkdirp.sync(dir);
  }
  // figure out content path
  // if directory doesn't exist create it
};
