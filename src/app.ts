//our root app component
import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2'

@Component({
  selector: 'my-app'
  templateUrl: 'src/main.html',
  directives: [CORE_DIRECTIVES]
})
export class App {
  enterText($event, newText) {
    if (newText) {
      this.textToRead = newText.value;
    }
  }

  enterRate($event, newRate) {
    if (newRate) {
      this.rate = newRate.value;
    }
  }

  public textToRead;
  rate = 1.0;

  startRead() {
    this.speek2();
  };

  speek1() {
    var u = new SpeechSynthesisUtterance();
    u.text = this.textToRead;
    u.lang = 'en-US';
    u.rate = this.rate;
    speechSynthesis.speak(u);
  };

  speek2() {
    var speech = new SpeechSynthesisUtterance(this.textToRead);
    var voices = window.speechSynthesis.getVoices();
    speech.default = false;
    speech.rate = this.rate;
    speech.voice = voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
    speech.lang = 'en-GB'; //Also added as for some reason android devices used for testing loaded spanish language
    var that = this;
    speech.onend = function(event) {
      //that.textToRead = '';
    }
    window.speechSynthesis.speak(speech);
  }
}
