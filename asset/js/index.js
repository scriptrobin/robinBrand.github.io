var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $q) {

  window.canvas = new fabric.Canvas('transprentBlur');
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    width: 50,
    height: 50,
    fill: 'rgba(255,127,39,1)',
    stroke: 'rgba(34,177,76,1)',
    strokeWidth: 5
  });
 canvas.add(rect);

 function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  $scope.prepareFile = function() {
    var dataURL = canvas.toDataURL();
    var a = window.document.createElement('a');
    var myBlob = dataURLtoFile(dataURL, 'image.png');
    a.href = URL.createObjectURL(myBlob);
    a.download = "test.png";
    a.click();
  }

  $scope.prepareZip = function() {
    var dataURL = canvas.toDataURL();
    var myBlob = dataURLtoFile(dataURL, 'image.jpeg');
    var zip = new JSZip();
    zip.file("Hello.jpeg", myBlob);
    zip.generateAsync({type:"blob"}).then(function (blob) {
      saveAs(blob, "hello.zip");
    });
  }
  var mainZip = new JSZip();
  $scope.prepareMultipleFiles = function() {
    var prepareFile = function() {
      var deffered = $q.defer();
      function __loadZip() {
        if(i == 5) {
          deffered.resolve(true);
          return deffered.promise
        } 
        var singleZip = new JSZip();
        var dataURL = canvas.toDataURL();
        var myBlob = dataURLtoFile(dataURL, 'image.jpeg');
        singleZip.file("hello'"+i+"'.png", myBlob);
        singleZip.generateAsync({type: "blob"}).then(function(content) {
          mainZip.file("hello_'"+i+"'.zip", content)
          // saveAs(content, 'main.zip'); 
          i++;
          __loadZip();
        });
      }
      __loadZip();
      return deffered.promise;
    }
    var i = 0;
    prepareFile().then(function() {
      mainZip.generateAsync({type: 'blob'}).then(function(content) {
        saveAs(content, 'main.zip');
     });
    });
  };
});