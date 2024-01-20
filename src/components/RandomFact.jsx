import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const RandomFact = ({ onClose }) => {
  const texts = [
    "Every 60 seconds, a minute passes in Africa",
    "You breathe air to stay alive.",
    "The Earth is round.",
    "Gravity pulls things down.",
    "Ice is cold.",
    "Humans need food to survive.",
    "The ocean is full of water.",
    "Trees have leaves.",
    "Fish live in water.",
    "Night is dark.",
    "The moon reflects sunlight.",
    "Snow is frozen water.",
    "Sound travels through the air.",
    "Plants need sunlight to grow.",
    "Mountains are tall.",
    "Birds have wings.",
    "Sand is made of tiny rocks.",
    "Stars twinkle in the night sky.",
    "Rain is wet.",
    "Insects have six legs.",
    "Clouds float in the sky.",
    "Rocks are hard.",
    "Humans have two eyes.",
    "The sun is hot.",
    "Elephants are large animals.",
    "Apples are a type of fruit.",
    "Light bulbs produce light.",
    "Cars have wheels.",
    "Volcanoes can erupt.",
    "Time moves forward.",
    "Thunder follows lightning.",
    "Water boils at 100 degrees Celsius.",
    "Birds can fly.",
    "Snakes slither on the ground.",
    "Stars are far away.",
    "Metal conducts electricity.",
    "Rainbows have multiple colors.",
    "Dogs bark.",
    "People have skin.",
    "Clouds can block the sun.",
    "Eggs can be cooked.",
    "Lions roar.",
    "Honey comes from bees.",
    "People have hair.",
    "Butterflies start as caterpillars.",
    "Mount Everest is the tallest mountain.",
    "Deserts are hot and dry.",
    "Milk comes from cows.",
    "Cheese is made from milk.",
    "Humans have ten fingers.",
    "The Earth orbits the sun.",
    "Stars are giant burning balls of gas.",
    "Sunflowers turn towards the sun.",
    "Rain helps plants grow.",
    "Trees provide shade.",
    "Water freezes at 0 degrees Celsius.",
    "Humans need sleep.",
    "Leaves fall off trees in autumn.",
    "The North Pole is cold.",
    "Snowflakes have unique shapes.",
    "Fire needs oxygen to burn.",
    "Oceans have tides.",
    "Bees collect nectar from flowers.",
    "Cats purr.",
    "Rivers flow downhill.",
    "Lightning can start fires.",
    "Clouds can form rain.",
    "People can feel pain.",
    "Dinosaurs are extinct.",
    "The sky appears blue due to Rayleigh scattering.",
    "Rocks can be heavy.",
    "Fish swim in schools.",
    "Humans have a skeleton.",
    "Watermelon is juicy.",
    "Frogs jump.",
    "Raindrops are small.",
    "The Earth has an atmosphere.",
    "Airplanes can fly.",
    "Tigers have stripes.",
    "People blink.",
    "Sunsets are colorful.",
    "Ice cream melts.",
    "Humans have a sense of taste.",
    "Stars are visible at night.",
    "Pizza is a popular food.",
    "Candles produce light.",
    "Fireworks are used for celebrations.",
    "Moonlight is reflected sunlight.",
  ];

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  useEffect(() => {
    MySwal.fire({
      title: <p>Hello World</p>,
      didOpen: () => {},
    }).then(() => {
      const randomText = getRandomText();
      return MySwal.fire({
        title: "Did you know?",
        text: randomText,
        icon: "question",
        showConfirmButton: false,
        showCloseButton: false,
        html: (
          <>
            <p>{randomText}</p>
            <button
              onClick={() => {
                MySwal.close();
                onClose();
              }}
              className="swal2-confirm swal2-styled"
            >
              I didn't know!
            </button>
          </>
        ),
      });
    });
  }, []);
};

export default RandomFact;
