'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var UraniaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Urania generator!'));

    var prompts = [{
      name: 'sitename',
      message: 'What do you want to call your website?',
      default: 'Super Awesome Site'
    }];

    this.prompt(prompts, function (props) {
      this.sitename = props.sitename

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/jade');
    this.mkdir('app/jade/mixins');
    this.mkdir('app/stylus');
    this.mkdir('app/coffee');
    this.mkdir('app/images');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('index.jade', 'app/jade/index.jade');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('google.jade', 'app/jade/mixins/google.jade');
    this.copy('404.jade', 'app/jade/404.jade');
    this.copy('main.styl', 'app/stylus/main.styl');
    this.copy('main.coffee', 'app/coffee/main.coffee');
    this.copy('htaccess', 'app/.htaccess');
    this.copy('gitignore', '.gitignore');
    this.copy('favicon.ico', 'app/favicon.ico');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = UraniaGenerator;
