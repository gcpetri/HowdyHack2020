navigator.mediaDevices.getUserMedia({audio:true}).then(function(localStream){
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var input = audioContext.createMediaStreamSource(localStream);
    var analyser = audioContext.createAnalyser();
    var scriptProcessor = audioContext.createScriptProcessor();
    // Some analyser setup
    analyser.smoothingTimeConstant = 0;
    analyser.fftSize = 64;
  
    input.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    var getAverageVolume  =  function( array){
        var length = array.length;
        var values = 0;
        var i = 0;
       for (; i < length; i++) {
          values += array[i];
       }
      return values / length;
    };
    var onAudio = function(){
      var tempArray = new window.Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(tempArray);
      var latestFrequency = (getAverageVolume(tempArray));
      //use latestFrequency
    };
    scriptProcessor.onaudioprocess = onAudio;
  })
  .catch(function(){
    //Handle error
  });