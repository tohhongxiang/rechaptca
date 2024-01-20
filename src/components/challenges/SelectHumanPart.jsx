import ImageMapper from "react-img-mapper";
import bodyPart from "../../assets/body.jpeg";

export default function HumanBody({ onCorrectAnswer, onIncorrectAnswer }) {
  const handleZoneClick = (area, index, event) => {
    console.log(
      `Clicked on area "${area.title}" at (${event.clientX}, ${event.clientY})`
    );
    if (area.title === "trapezius") {
      onCorrectAnswer();
    }
  };
  const handleNonZoneClick = () => {
    alert("Are you sure you're a human?");
    onIncorrectAnswer();
  };
  const MAP = {
    name: "my-map",
    areas: [
      {
        active: false, // don't show the zone
        title: "trapezius",
        shape: "poly",
        coords: [
          232, 278, 192, 185, 135, 154, 205, 126, 266, 128, 334, 158, 285, 177,
        ],
      },
    ],
  };

  return (
    <div className="App">
      <div className="p-2 bg-yellow-300">
        <ImageMapper
          src={bodyPart}
          map={MAP}
          onImageClick={handleNonZoneClick}
          onClick={handleZoneClick}
        />
      </div>
    </div>
  );
}
