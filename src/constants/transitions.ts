export const transition = {
    duration: 1,
    ease: [0.6, .01, -0.05, 0.9]
  }
  
export const enteringFormTransition = {
    initial: {
        opacity:0,
        x: -10
    },
    animate: {
        opacity:1,
        x: 0,
        transition: {
        delayChildren: .6,
        staggerChildren: .1,
        staggerDirection: 1,
        }
    }
}
  
export const inputTransition = {
    initial: {
      opacity:0,
      x: -10,
    },
    animate: {
      opacity:1,
      x: 0,
      transition: {...transition}
    }
  }