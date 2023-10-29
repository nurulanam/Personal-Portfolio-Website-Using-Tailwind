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

timeline2.to('.banner-avater img',{ 
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

    function initMarquee() {
  
      // Kill other animations
      animations.forEach(animation => animation.progress(0).kill())
    
      // Marquee speed (pixels per second)
      let velocity = 150;
      
      let offset = 0
      let itemWidth = 0
      let rowWidth = 0
      
      let marqueeItems = gsap.utils.toArray('.my-style-item')
    
      // Calculate row width
      marqueeItems.forEach(e => {
        rowWidth += e.getBoundingClientRect().width
      })
      
      // Animation Loop
      marqueeItems.forEach((e, i) => {
    
        // Reset item positions
        gsap.set(e, {x: 0})
        
        itemWidth = e.getBoundingClientRect().width
        
        let tl = new gsap.timeline({ repeat: -1 });
        
        // Animate item to end of row
        tl.to(e, {
          ease: "none",
          duration: ((rowWidth - offset - itemWidth) / velocity),
          x: (rowWidth - offset - itemWidth),
        });
            
        // Send item to beginning
        tl.to(e, {
          ease: "none",
          duration: 0,
          x: ((offset + itemWidth) * -1)
        })
        
        // Animate to original position
        tl.to(e, {
          ease: "none",
          duration: ((offset + itemWidth) / velocity),
          x: 0
        })
        
        // Increment offset
        offset += itemWidth
        
        animations.push(tl)
      })
    }
    
    let animations = []
    
    initMarquee()
     
    var timer
    function handleResize() {
      clearTimeout(timer)
      timer = setTimeout(initMarquee, 500)
    }
    
    window.addEventListener('resize', handleResize)