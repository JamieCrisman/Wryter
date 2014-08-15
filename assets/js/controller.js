'use strict';

function MainCtrl () {
  this.title;
  this.content= "Lorem ipsum dolor sit amet";
}

angular
  .module('Wryter', ['angular-medium-editor'])
  .controller('MainController', MainCtrl);