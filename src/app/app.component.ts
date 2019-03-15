import { Component, ElementRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import anime from 'animejs';


declare const jQuery;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  arr = [
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},
    {'name': 'aa', 'age': 11},

  ];




  title = 'app';
  constructor(
    private swUpdate: SwUpdate,
    private el: ElementRef,
  ) {
    // this.swUpdate.available.subscribe(e => console.log(e, 'e'));
    // this.swUpdate.activated.subscribe(eve => console.log(eve, 'eve'));
    // this.swUpdate.checkForUpdate();
    // console.log(this.swUpdate.isEnabled, 'enabled');
  }

  prev() {
    const container = this.el.nativeElement.querySelector('.container');
    const scrollLeft = container.scrollLeft;
    console.log(scrollLeft, 'scroll - left', container);
    if (!scrollLeft) {
      return;
    }
    if (scrollLeft < 100) {
      container.scrollLeft = 0;
      return;
    }
    console.log(anime, 'anime');
    // jQuery('.container').animate({scrollLeft: scrollLeft - 100}, 1000);
    // jQuery.Animation({scrollLeft: scrollLeft - 100}, 1000);
    // container.scrollLeft = scrollLeft - 100;
    anime({
      targets: container,
      // width: 2000,
      scrollLeft: scrollLeft - 100,
      duration: 1000,
      easing: 'linear',
    });
    // container.scrollIntoView({behavior: 'smooth'});
    console.log(container.style, container.style.scrollLeft);
  }

  next() {
    const container = this.el.nativeElement.querySelector('.container');
    const scrollLeft = container.scrollLeft;
    console.log(scrollLeft, 'scroll - left');
    if (scrollLeft >= 240 ) {
      return;
    }
    container.scrollLeft = scrollLeft + 100;
    console.log(container.style, container.style.scrollLeft);
  }
}
