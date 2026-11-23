import bejoyImage from "../assets/images/Alumini-1-bejoy.jpg";
import marioImage from "../assets/Alumni-2-Mario Royston.jpg";
import dilipImage from "../assets/images/Alumni-3-Dilip Arjun.jpeg";
import palaniappanImage from "../assets/images/Alumni-4-Vivek Desai.jpg"; 

export interface Alumni {
  name: string;
  designation: string;
  company: string;
  achievement?: string;
  program?: string;
  years?: string;
  image?: string;
  source?: string;
}

export interface AlumniTestimonial {
  name: string;
  program: string;
  quote: string;
  source: string;
}

export const featuredAlumni: Alumni[] = [
  {
    name: "Bejoy Arputharaj",
    designation: "Founder & CEO",
    company: "Phantom FX",
    achievement: "VFX Supervisor and founder of Phantom FX",
    program: "PG Diploma in Visual Effects",
    years: "2004–2005",
    image: bejoyImage,
    source: "https://www.icat.ac.in/alumni-design-media.aspx"
  },
  {
    name: "Mario Royston",
    designation: "Co-Founder & Managing Director",
    company: "Weloadin",
    program: "Bachelor's Degree in Game Development",
    years: "2012–2015",
    image: marioImage,
    source: "https://www.icat.ac.in/alumni-design-media.aspx"
  },
  {
    name: "Dilip Arjun",
    designation: "Co-Founder & Creative Director",
    company: "Weloadin",
    program: "Bachelor's Degree in Game Design",
    years: "2012–2015",
    image: dilipImage,
    source: "https://www.icat.ac.in/alumni-design-media.aspx"
  },
  {
    name: "Palaniappan Subramanyan",
    designation: "Creative Fashion Photographer",
    company: "Independent",
    program: "Bachelor's Degree in Photography",
    years: "2015–2018",
    image: palaniappanImage,
    source: "https://www.icat.ac.in/alumni-design-media.aspx"
  }
];

export const industryAlumni: Alumni[] = [
  {
    name: "Manoj Kumar",
    designation: "Senior Business Presentation Designer",
    company: "McKinsey"
  },
  {
    name: "Ganesh",
    designation: "Visualizing Associate",
    company: "Amazon"
  },
  {
    name: "Zahir",
    designation: "Technical Artist",
    company: "Symbiosis Technologies"
  },
  {
    name: "Basheer",
    designation: "Senior Game Programmer",
    company: "Gameshastra"
  },
  {
    name: "Adish",
    designation: "Senior Programmer",
    company: "TakeLeap"
  },
  {
    name: "Vignesh KS",
    designation: "Senior Programmer",
    company: "Bumo3dr"
  },
  {
    name: "Vignesh R",
    designation: "VR / AR Developer",
    company: "Simlabs Software"
  },
  {
    name: "Sakthivel",
    designation: "Production Manager",
    company: "PixStone Images"
  },
  {
    name: "Abinesh",
    designation: "Motion Graphic Designer",
    company: "Divo"
  },
  {
    name: "Peruman CS",
    designation: "Senior Prep Artist",
    company: "Double Negative"
  },
  {
    name: "Prashanth",
    designation: "Senior Graphic Designer",
    company: "RR Donnelley"
  },
  {
    name: "Sahana",
    designation: "Project Manager",
    company: "Ighna Creativz"
  },
  {
    name: "Lakshmana Kumar",
    designation: "Process Specialist",
    company: "Infosys"
  }
];

export const alumniTestimonials: AlumniTestimonial[] = [
  {
    name: "Asim Amitav Das",
    program: "Visual Effects",
    quote:
      "Because of ICAT I got to start my career at MPC.",
    source:
      "https://www.icat.ac.in/testimonial-visual-effects-4.aspx"
  },
  {
    name: "Jithin Das P",
    program: "Animation",
    quote:
      "After working for a couple of great companies, I have co-founded a Design agency now.",
    source:
      "https://www.icat.ac.in/testimonial-animation-3.aspx"
  },
  {
    name: "Swathy Sudevan",
    program: "PG Visual Effects",
    quote:
      "By getting placed in Prime Focus, I could work in the famous Bollywood and other Indian projects.",
    source:
      "https://www.icat.ac.in/testimonial-visual-effects-3.aspx"
  },
  {
    name: "Manikandan",
    program: "Bachelor's Degree VFX",
    quote:
      "They guided me to create a very good portfolio in the three years, which helped me work with some big firms.",
    source:
      "https://www.icat.ac.in/testimonial-visual-effects.aspx"
  }
];
