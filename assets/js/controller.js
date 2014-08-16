'use strict';

function MainCtrl () {
  this.title;
  this.content= "Lorem ipsum dolor sit amet <span style='color:red;'>a</span><span style='color:blue;'>b</span><span style='color:brown;'>c</span>";
}

angular
  .module('Wryter', ['angular-medium-editor'])
  .controller('MainController', MainCtrl);