module.exports = {
  email: 'jeffersonquiguantar@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/jefersonqui',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/jeffersonquiguantar/',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/Jefferson_Qui_',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/jeffersonquiguantar/',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/Quiguarth',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Data',
      url: '/#jobs',
    },
    {
      name: 'Art',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
