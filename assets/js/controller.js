'use strict';

function FileSys($scope){
  var ret = {};
  ret.openFileSystem = function(){
    console.log("opening file system start");
    if (!chrome || !chrome.syncFileSystem || !chrome.syncFileSystem.requestFileSystem) {
      console.error('Syncable FileSystem is not supported in your environment.');
      return;
    }
    console.log("Syncable File System supported");
    if (chrome.syncFileSystem.setConflictResolutionPolicy) {
      chrome.syncFileSystem.setConflictResolutionPolicy('last_write_win');
    }
    console.log("conflict resolution policy set");
    console.log('Obtaining syncable FileSystem...');
    chrome.syncFileSystem.requestFileSystem(function (fs) {
      if (chrome.runtime.lastError) {
        console.error('requestFileSystem: ' + chrome.runtime.lastError.message);
        return;
      }
      $scope.$emit("fileSystemLoaded", fs);
    });
    
  };
  
  return ret;
}

angular
  .module('Wryter', ['angular-medium-editor'])
  .controller('MainController', function($scope){
    this.title;
    this.content= "Lorem ipsum dolor sit amet <span style='color:red;'>a</span><span style='color:blue;'>b</span><span style='color:brown;'>c</span>";
    this.supportSFS = chrome && chrome.syncFileSystem;
    this.hasLoaded = false;
    this.fileSystem = null;
    FileSys($scope).openFileSystem();
    $scope.$on("fileSystemLoaded", function(e, file){
      $scope.main.hasLoaded = true;
      $scope.$apply(function(){
        $scope.main.fileSystem = file;
        console.log($scope.main.fileSystem);
      });
    });
  })
  .factory('FileSys', FileSys);