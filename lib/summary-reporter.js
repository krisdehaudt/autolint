var sys = require('sys');
var ansi = require('ansi');
var _ = require('underscore');
var pluralize = require('pluralize');

function listenTo(repository) {
  this.repository = repository;
  var print = this.print.bind(this);
  repository.on('change', function () {
    process.nextTick(print);
  });
}

function countFilesWith(filter) {
  var files = _(this.repository.files).values();
  return _(files).select(filter).length;
}

function numCleanFiles() {
  return this.countFilesWith(function (errors) {
    return errors.length === 0;
  });
}

function numDirtyFiles() {
  return this.countFilesWith(function (errors) {
    return errors.length > 0;
  });
}

function numErrors() {
  var files = _(this.repository.files).values();
  return _.reduce(files, function(memo, errors){ return memo + errors.length; }, 0);
}

function cleanFiles() {
  return pluralize(this.numCleanFiles(), "clean file");
}

function dirtyFiles() {
  return pluralize(this.numDirtyFiles(), "dirty file");
}

function errors() {
  return pluralize(this.numErrors(), "error");
}

function getSummary() {
  return this.cleanFiles() + ", " + this.errors() + " in " + this.dirtyFiles();
}

function print() {
  var text = this.getSummary();
  var colorized = this.numDirtyFiles() > 0 ? ansi.RED(text) : ansi.GREEN(text);
  sys.puts("\n" + colorized);
}

module.exports = {
  numCleanFiles: numCleanFiles,
  numDirtyFiles: numDirtyFiles,
  numErrors: numErrors,
  cleanFiles: cleanFiles,
  dirtyFiles: dirtyFiles,
  errors: errors,
  countFilesWith: countFilesWith,
  listenTo: listenTo,
  getSummary: getSummary,
  print: print
};
