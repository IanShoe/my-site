angular.module('my.site.services').
constant('$resume', {
  name: 'Ian Shintaro Shoemaker',
  email: 'iss90g@gmail.com',
  occupation: 'Software Engineer',
  address: {
    street: '100 Robin Ln',
    state: 'PA',
    city: 'Hummelstown',
    zip: 17036
  },
  objective: 'A software engineer with 2 years of experience building dynamic and scalable systems using Spring, J2EE and NodeJS backend technologies as well as web clients to facilitate data capture and analysis. Proficient in HTML5/CSS3, AngularJS and Bootstrap cutting edge web technologies to build both desktop and mobile ready web applications. Has experience and passion in creating clear, concise, and reusable modules to architect elegant solutions.',
  education: {
    colleges: [{
      name: 'University of Pittsburgh',
      degree: 'Bachelor of Science',
      graduation: '2012-05-01',
      courses: [{
        name: 'Artificial Intelligence'
      }, {
        name: 'Embedded Systems'
      }, {
        name: 'Database Management Systems'
      }, {
        name: 'Knowledge Discovery in Databases (Data Mining)'
      }, {
        name: 'Mobile Applications (iOS)'
      }, {
        name: 'Web Programming'
      }],
      logo: {
        name: 'Pitt-Logo',
        url: 'images/Pitt-Logo.png',
        height: '75px',
        linkUrl: 'http://www.pitt.edu'
      }
    }]
  },
  jobs: [{
    company: 'Versatile Systems, Inc.',
    start: '2013-04-01',
    end: '2013-09-10',
    title: 'Software Engineer',
    details: [{
      description: 'Developed and maintained URL shortening and redirection service for both customer and internal use'
    }, {
      description: 'Architected and implemented web app (Mobile Engagements) allowing users to build, customize and deploy mobile web apps with ease'
    }, {
      description: 'Built live preview web component reflecting instantaneous feedback for user interaction'
    }, {
      description: 'Architected and implemented back end system for Mobile Engagements to facilitate dynamic persistence and deployment requirements for scaling mobile web apps'
    }, {
      description: 'Created theme management system to improve designing experience across multiple web apps'
    }, {
      description: 'Developed social media modules for integration to Facebook, Twitter and Twilio'
    }],
    logo: {
      name: 'Versatile-Logo',
      url: 'images/Versatile-Logo.png',
      height: '50px',
      linkUrl: 'http://www.versatile.com'
    }
  }, {
    company: 'Concurrent Technologies Corporation (CTC)',
    start: '2013-05-01',
    end: '2013-03-15',
    title: 'Software Engineer',
    details: [{
      description: 'Backend Java development for RESTful and SOAP web services to facilitate communication to RDF stores and SQL databases'
    }, {
      description: 'Developed custom ORM to handle dynamic data and ease persistence integration'
    }, {
      description: 'Built frontend thick web client to visualize data and provide user interface to handle system tasks'
    }, {
      description: 'Maintained virtual machine running AllegroGraph Triple Store and for communication with Glassfish server'
    }, {
      description: 'Experience with setting up, maintaining, and running data queries on Postgres SQL Databases'
    }, {
      description: 'Developed frontend and backend capabilities inventory system to help manage CTC’s workforce'
    }, {
      description: 'Used Git and SVN version control to maintain code base and progress between team members'
    }, {
      description: 'Limited experience with ontology development to help define RDF structure for Allegrograph'
    }],
    logo: {
      name: 'CTC-Logo',
      url: 'images/CTC-Logo.png',
      height: '75px',
      linkUrl: 'http://www.ctc.com'
    }
  }, {
    company: 'Concurrent Technologies Corporation (CTC)',
    start: '2011-09-11',
    end: '2012-05-01',
    title: 'Intern',
    details: [{
      description: 'Java Development Covering: abstraction, dependency injection, generics, inheritance, persistence, recursion, security, design patterns and strategies '
    }, {
      description: 'Code documentation using Java-Docs'
    }, {
      description: 'Code testing and integration using Junit framework '
    }, {
      description: 'Developed web interface and backend system for scheduling Java system tasks'
    }, {
      description: 'Developed iOS mobile app prototype to visualize geographic data using CoreData, Mapkit and Augmented Reality'
    }],
    logo: {
      name: 'CTC-Logo',
      url: 'images/CTC-Logo.png',
      height: '75px',
      linkUrl: 'http://www.ctc.com'
    }
  }],
  skills: [{
    name: 'HTML5',
    xp: 1100
  }, {
    name: 'JavaScript',
    xp: 1050
  }, {
    name: 'AngularJS',
    xp: 1025
  }, {
    name: 'Bootstrap CSS',
    xp: 1000
  }, {
    name: 'NodeJS',
    xp: 900
  }, {
    name: 'Java',
    xp: 840
  }, {
    name: 'CSS3',
    xp: 820
  }, {
    name: 'Jquery',
    xp: 800
  }, {
    name: 'MongoDB',
    xp: 750
  }, {
    name: 'Linux',
    xp: 700
  }, {
    name: 'ExpressJS',
    xp: 680
  }, {
    name: 'Spring',
    xp: 650
  }, {
    name: 'J2EE (Glassfish)',
    xp: 600
  }, {
    name: 'JUnit Testing',
    xp: 400
  }, {
    name: 'GruntJS',
    xp: 180
  }, {
    name: 'JavaDocs',
    xp: 170
  }, {
    name: 'iOS',
    xp: 150
  }, {
    name: 'Karma Testing',
    xp: 120
  }, {
    name: 'Ubuntu',
    xp: 60
  }, {
    name: 'LevelDB',
    xp: 50
  }]
});
