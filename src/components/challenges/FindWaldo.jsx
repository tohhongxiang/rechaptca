import ImageMapper from "react-img-mapper";
import Waldo from "../../assets/waldo.jpeg";

export default function FindWaldo({ onCorrectAnswer, onIncorrectAnswer }) {
  const handleZoneClick = (area, index, event) => {
    console.log(
      `Clicked on area "${area.title}" at (${event.clientX}, ${event.clientY})`
    );
    if (area.title === "Waldo") {
      onCorrectAnswer();
    }
  };
  const handleNonZoneClick = () => {
    alert("Do you even know how Waldo looks like?");
    onIncorrectAnswer();
  };
  const MAP = {
    name: "my-map",
    areas: [
      {
        active: false, // don't show the zone
        title: "Waldo",
        shape: "poly",
        coords: [1721, 1122, 2057, 1119, 2068, 1430, 1706, 1386],
      },
    ],
  };

  return (
    <div className="App">
      <div className="p-2 bg-yellow-300">
        <h1>Find Waldo!</h1>
        <ImageMapper
          src={Waldo}
          map={MAP}
          onImageClick={handleNonZoneClick}
          onClick={handleZoneClick}
        />
      </div>
    </div>
  );
}
