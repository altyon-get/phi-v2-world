import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "MATHEMATICAL SKILLS",
          "ANALYTICAL SKILLS",
          "PROBLEM-SOLVING SKILLS",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
