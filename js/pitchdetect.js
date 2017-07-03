/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

PitchDetect = function(game, player) {
	this.game = game;
	var initialized = false;
	player = player;
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	var audioContext = null;
	var isPlaying = false;
	var sourceNode = null;
	var analyser = null;
	var theBuffer = null;
	var DEBUGCANVAS = null;
	var mediaStreamSource = null;


	this.onCreate = function() {
		console.log("onload");
		audioContext = new AudioContext();
		MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000)); // corresponds to a 5kHz signal

		detectorElem = document.getElementById("detector");
		// canvasElem = document.getElementById( "output" );
		// DEBUGCANVAS = document.getElementById( "waveform" );
		// if (DEBUGCANVAS) {
		// 	waveCanvas = DEBUGCANVAS.getContext("2d");
		// 	waveCanvas.strokeStyle = "black";
		// 	waveCanvas.lineWidth = 1;
		// }
		// pitchElem = document.getElementById( "pitch" );
		// noteElem = document.getElementById( "note" );
		// detuneElem = document.getElementById( "detune" );
		// detuneAmount = document.getElementById( "detune_amt" );

		detectorElem.ondragenter = function() {
			this.classList.add("droptarget");
			return false;
		};
		detectorElem.ondragleave = function() {
			this.classList.remove("droptarget");
			return false;
		};
		detectorElem.ondrop = function(e) {
			console.log("ondrop");
			this.classList.remove("droptarget");
			e.preventDefault();
			theBuffer = null;

			var reader = new FileReader();
			reader.onload = function(event) {
				audioContext.decodeAudioData(event.target.result, function(buffer) {
					theBuffer = buffer;
				}, function() {
					alert("error loading!");
				});

			};
			reader.onerror = function(event) {
				alert("Error: " + reader.error);
			};
			reader.readAsArrayBuffer(e.dataTransfer.files[0]);
			return false;
		};
	};

	this.error = function() {
		alert('Stream generation failed.');
	};

	this.getUserMedia = function(dictionary, callback) {
		console.log("getUserMedia");
		try {
			navigator.getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia;
			navigator.getUserMedia(dictionary, callback, this.error);
		} catch (e) {
			alert('getUserMedia threw exception :' + e);
		}
	};

	this.updatePitch = function(time) {
		if (!initialized) {
			return;
		}
		var cycles = new Array;
		analyser.getFloatTimeDomainData(buf);
		var ac = autoCorrelate(buf, audioContext.sampleRate);

		if (ac == -1) {
			// detectorElem.className = "vague";
			// pitchElem.innerText = "--";
			// noteElem.innerText = "-";
			// detuneElem.className = "";
			// detuneAmount.innerText = "--";
		} else {
			player.pitch = columnFromPitch(ac);
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	};

	this.gotStream = function(stream) {
		console.log("gotStream");
		console.dir(stream);
		// Create an AudioNode from the stream.
		mediaStreamSource = audioContext.createMediaStreamSource(stream);

		// Connect it to the destination.
		analyser = audioContext.createAnalyser();
		analyser.fftSize = 1024;
		mediaStreamSource.connect(analyser);
		initialized = true;
		console.log("initialized " + initialized);
		// this.updatePitch();
	};

	this.toggleLiveInput = function() {
		if (isPlaying) {
			//stop playing and return
			sourceNode.stop(0);
			sourceNode = null;
			analyser = null;
			isPlaying = false;
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
			window.cancelAnimationFrame(rafID);
		}
		this.getUserMedia({
			"audio": {
				"mandatory": {
					"googEchoCancellation": "false",
					"googAutoGainControl": "false",
					"googNoiseSuppression": "false",
					"googHighpassFilter": "false"
				},
				"optional": []
			},
		}, this.gotStream);
	};

	var rafID = null;
	var tracks = null;
	var buflen = 1024;
	var buf = new Float32Array(buflen);

	var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

	function columnFromPitch(frequency) {
		var adjustedFrequency = Math.max(0, frequency - 100);
		adjustedFrequency = Math.min(adjustedFrequency, 200);
		var range = 200;
		// console.log("column: " + adjustedFrequency * 10 / range);
		return adjustedFrequency * 10 / range;
	};

	function noteFromPitch(frequency) {
		var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
		return Math.round(noteNum) + 69;
	};

	function frequencyFromNoteNumber(note) {
		return 440 * Math.pow(2, (note - 69) / 12);
	};

	function centsOffFromPitch(frequency, note) {
		return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
	};

	// this is a float version of the algorithm below - but it's not currently used.

	// function autoCorrelateFloat(buf, sampleRate) {
	// 	var MIN_SAMPLES = 4; // corresponds to an 11kHz signal
	// 	var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
	// 	var SIZE = 1000;
	// 	var best_offset = -1;
	// 	var best_correlation = 0;
	// 	var rms = 0;

	// 	if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
	// 		return -1; // Not enough data

	// 	for (var i = 0; i < SIZE; i++)
	// 		rms += buf[i] * buf[i];
	// 	rms = Math.sqrt(rms / SIZE);

	// 	for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
	// 		var correlation = 0;

	// 		for (var i = 0; i < SIZE; i++) {
	// 			correlation += Math.abs(buf[i] - buf[i + offset]);
	// 		}
	// 		correlation = 1 - (correlation / SIZE);
	// 		if (correlation > best_correlation) {
	// 			best_correlation = correlation;
	// 			best_offset = offset;
	// 		}
	// 	}
	// 	if ((rms > 0.1) && (best_correlation > 0.1)) {
	// 		console.log("f = " + sampleRate / best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")");
	// 	}
	// 	//	var best_frequency = sampleRate/best_offset;
	// };


	var MIN_SAMPLES = 0; // will be initialized when AudioContext is created.
	var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

	function autoCorrelate(buf, sampleRate) {
		var SIZE = buf.length;
		var MAX_SAMPLES = Math.floor(SIZE / 2);
		var best_offset = -1;
		var best_correlation = 0;
		var rms = 0;
		var foundGoodCorrelation = false;
		var correlations = new Array(MAX_SAMPLES);
		var pitch = 0;

		for (var i = 0; i < SIZE; i++) {
			var val = buf[i];
			rms += val * val;
		}

		rms = Math.sqrt(rms / SIZE);
		if (rms < 0.01) // not enough signal should be 0.01
			return -1;

		var lastCorrelation = 1;
		for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
			var correlation = 0;

			for (var i = 0; i < MAX_SAMPLES; i++) {
				correlation += Math.abs((buf[i]) - (buf[i + offset]));
			}
			correlation = 1 - (correlation / MAX_SAMPLES);
			correlations[offset] = correlation; // store it, for the tweaking we need to do below.
			if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
				foundGoodCorrelation = true;
				if (correlation > best_correlation) {
					best_correlation = correlation;
					best_offset = offset;
				}
			} else if (foundGoodCorrelation) {
				foundGoodCorrelation = false;
				// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
				// Now we need to tweak the offset - by interpolating between the values to the left and right of the
				// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
				// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
				// (anti-aliased) offset.

				// we know best_offset >=1, 
				// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
				// we can't drop into this clause until the following pass (else if).
				var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
				// console.log("best_offset: " + best_offset);
				pitch = sampleRate / (best_offset + (8 * shift));
				if (pitch < 700) {
					return pitch;
				} else {
					return -1;
				}
			}
			lastCorrelation = correlation;
		}
		if (best_correlation > 0.01) {
			console.log("f = " + sampleRate / best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
			pitch = sampleRate / best_offset;
			if (pitch < 700) {
				return pitch;
			} else {
				return -1;
			}
		}
		return -1;
		//	var best_frequency = sampleRate/best_offset;
	};



	return this;
}
PitchDetect.prototype = {

}
PitchDetect.prototype.constructor = PitchDetect;
