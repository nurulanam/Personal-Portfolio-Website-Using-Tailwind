import '../css/style.css';
import '../css/all.css';
import '../css/locomotive-scroll.min.css';

import LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const stickyElements = document.querySelectorAll('[data-scroll-sticky][data-scroll-target]');

// Check if it's a smartphone (you may need to adjust this condition)
if (window.innerWidth < 768) {
  // Loop through the elements and clear the data-scroll-target attribute
  stickyElements.forEach(element => {
    element.removeAttribute('data-scroll-target');
  });
}

const servicesDescription = document.querySelector('.services-desctiption'); // Correct the class name

if (servicesDescription) {
  const text = servicesDescription.textContent;
  servicesDescription.innerHTML = [...text].map(char => `<span>${char}</span>`).join('');
}

const aboutMeDetails = document.querySelectorAll('.about-me-details p');

aboutMeDetails.forEach(aboutMeDetails => {
  const text = aboutMeDetails.textContent;
  aboutMeDetails.innerHTML = [...text].map(char => `<span>${char}</span>`).join('');
});

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
  smartphone: {
    smooth: true,
    "data-scroll-sticky": false
  },
  tablet: {
      smooth: true
  }
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();





var timeline1 = gsap.timeline();
var timeline2 = gsap.timeline();
var timeline3 = gsap.timeline();

timeline1.to('.circle-php', {
  opacity: 1,
  delay: 0.5,
})
gsap.to('.circle-php', {
  x: -30,
  y: 20,
  repeat: -1,
  duration: 1.5,
  yoyo: true
})
timeline1.to('.circle-laravel', {
  opacity: 1,
})
gsap.to('.circle-laravel', {
  x: 30,
  repeat: -1,
  duration: 1.5,
  yoyo: true
})

timeline2.to('.banner-avater',{ 
  opacity: 1,
  delay: 1,
  duration: 1,
})
timeline2.to('.brand',{ 
  opacity: 1,
})
gsap.to('.brand',{
  rotation: 360,
  duration: 8,
  repeat: -1,
  ease: "linear",
  repeat: -1,
})
timeline1.to('.banner-h h1',{
  opacity: 1,
  stagger: 0.3,
})
timeline1.to('.banner-p',{
  opacity: 1,
})
timeline1.to('button',{
  opacity: 1,
})
timeline3.to('.hashtags li',{
  opacity: 1,
  stagger: 0.5,
})

timeline3.to('.banner-social-list li',{
  opacity: 1,
  stagger: 0.3,
})

gsap.to('.about-me-img',{
  opacity: 1,
  scrollTrigger:{
    trigger: '.about-me-img',
    scroller: 'main',
    start: 'top 60%',
    end: '+=10%',
    scrub: 2,
}
})

gsap.to('.about-me-details p span', {
    color: 'white',
    stagger: 1,
    scrollTrigger:{
        trigger: '.about-me-details p span',
        scroller: 'main',
        start: 'top 70%',
        end: '+=20%',
        scrub: 2,
    }
})

gsap.to('.services-desctiption span', {
    color: 'white',
    stagger: 1,
    scrollTrigger:{
        trigger: '.services-desctiption span',
        scroller: 'main',
        start: 'top 70%',
        end: '+=20%',
        scrub: 2,
    }
})

gsap.to('.case-study-section', {
    marginLeft: 0,
    marginRight: 0,
    stagger: 1,
    scrollTrigger: {
      trigger: '.case-study-section',
      scroller: 'main',
      start: 'top 50%',
      end: '+=10%',
      scrub: 2,
    }
  });

    
const items = gsap.utils.toArray(".my-style-item");

const loop = horizontalLoop(items, {paused: false, repeat: -1});

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }


  gsap.to('.contact-section .contact-img', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.contact-section .contact-img',
      scroller: 'main',
      start: 'top 60%',
      end: '+=10%',
      scrub: 2,
    }
  });

  gsap.to('.contact-section .contact-circle',{
    rotation: 360,
    duration: 8,
    repeat: -1,
    ease: "linear",
    repeat: -1,
  })