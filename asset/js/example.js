/*  var par = document.getElementById("par");
 var $draggable = $('#par').draggabilly({
    axis:'y',
        containment:'.container'
  })

  function listener(eve, pointer, moveVector) {
    // get Draggabilly instance
    var draggie = $(this).data('draggabilly');
    console.log(moveVector)
    console.log( 'eventName happened', draggie.position.x, draggie.position.y );
  }

  $draggable.on( 'pointerMove', listener); */

  fabric.Canvas.prototype.CreateBlurCanvas = function() {
    this.blurCanvas = fabric.document.createElement('div');  
    this.blurCanvas.addClassList = "blur";
    this.wrapperEl.appendChild(this.blurCanvas);
    this.blurCanvas.style.width = "150px";
    this.blurCanvas.style.height = "150px";  
    this.blurCanvas.style.left = "20px";
    this.blurCanvas.style.top = "20px";
    this.blurCanvas.style.position = "absolute"
    this.blurCanvas.style.backgroundImage= "url('file:///F:/subject/img/19646822_xxl.jpg')";
    this.blurCanvas.style.filter = "blur(4px)"
  };

  var canvas = new fabric.Canvas('transprentBlur');
  /* fabric.Image.fromURL("file:///F:/subject/img/19646822_xxl.jpg", function(img) {
    img.set({
      width:150,
      height:150
    })
    canvas.add(img);
    canvas.renderAll();
  }) */
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
 canvas.on('object:added',function(){
  
})
 canvas.renderAll(); 
  /* canvas.CreateBlurCanvas(); */

  setTimeout(function(){
    console.log(canvas.toDataURL())
  });
  
  $scope.prepareFile = function() {
    console.log("asd");
  }
  
  
  (function() {
    var videoTrim = function(option, pItem) {
      this.option = option;
      this.data = {};
      this.on = observe;
      function observe(eventName, handler){
        if(!this.__eventListeners) {
          this.__eventListeners = {};
        }
        if(eventName) {
          if (!this.__eventListeners[eventName]) {
            this.__eventListeners[eventName] = [];
          }
          this.__eventListeners[eventName].push(handler);   
        }
      };
    } 
    videoTrim.prototype.setDurtion = function(duration) {
      this.data.duration = duration;
    };

    videoTrim.prototype.fire = function(eventName,options) {
      if(this.__eventListeners[eventName]) {
        this.__eventListeners[eventName][0].call(this, options || {});
      }
    };

    videoTrim.prototype.getDuration = function() {
      this.fire("video:trimed",{duration: this.data.duration});
    };
    window.videoTrim = videoTrim;
  })();

  var videoTrim = new videoTrim({url: "example.mp4", duration: "00:05:00"});
  videoTrim.on("video:trimed",function(args) {
    console.log("videoTrimmer");
  });
  videoTrim.getDuration();