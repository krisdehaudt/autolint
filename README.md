Autolint
========
Autolint watches your files for jslint-errors.

Installation
------------
Right now, installation is rather clunky.

Start by installing [node.js](http://nodejs.org/) and [npm](http://npmjs.org/), then:

    git clone https://github.com/magnars/autolint.git
    cd autolint/
    chmod a+x bin/autolint
    npm install buster -g
    npm link buster
    git submodule init && git submodule update
    cd node_modules/glob/ && make
    
And for ease of use:

    ln -s [full path to autolint/bin/autolint] ~/bin/autolint
    
or someplace else on your path.

Basic usage
-----------
Scan all `.js`-files in this directory and sub-directories with:

    autolint

You can also specify paths:

    autolint src/*.js test/*.js

Once running, you can see all errors in all files by pressing ctrl-c in
the terminal window. To see errors in a single file, update its mtime by
saving or touching it.

Configuration
-------------
Look at the default configuration
[`lib/default-configuration.js`](autolint/blob/master/lib/default-configuration.js)
then override specific items in a file `autolint.json` with valid JSON. `autolint`
looks for this file in the current directory, so I usually place it at the root of
the project.

Example:

    {
      "paths": [
        "lib/**/*.js",
        "test/**/*.js"
      ],
      "linterOptions": {
        "node": true
      }
    }

When you specify `paths` in the config-file, you can start linting with:

    autolint
    
which is rather nice.

Excluding files
---------------
You can also tell autolint to skip linting some files, like so:

    {
      "excludes": [
        "jquery",
        "underscore",
        "sinon",
        "raphael"
      ]
    }

Any files (or paths) containing those words will not be linted, or counted towards your error total.

Growl
-----
If you want autolint to notify you when new lint errors are introduced,
you can [download Growl here](http://growl.info/).
    
Make sure you also install the `growlnotify` in the `Extras`-folder.

Using JSHint
------------
If JSLint is hurting your feelings, you can easily switch to
[JSHint](http://jshint.com) by adding this to your configuration:

    {
      "linter": "jshint"
    }

Contribute
----------
If you want to help out with features or bug fixes, that's awesome.
Check out [`todo.md`](autolint/blob/master/todo.md) for inspiration.

* Fork the project.
* Make your feature addition or bug fix.
* Don't forget tests. This is important so I don't break it in a
  future version unintentionally.
* Commit and send me a merge request.
