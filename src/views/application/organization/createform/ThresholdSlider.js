// https://codesandbox.io/s/metrics-color-threshold-slider-reversed-o58nu6?file=/demo.js:0-3681
import React, { useState } from "react";
import { Box, Typography, Slider } from "@mui/material";

function DiscreteSlider(props) {
  const {
    entityName,
    reverse,
    values,
    min,
    max,
    thresholdMarks,
    thresholdMarksTitles,
    style,
    ...rest
  } = props;

  const [value, setValue] = useState(
    reverse ? values.map((val) => -val) : values
  );
  const [marks, setMarks] = useState(
    reverse ? thresholdMarks.map((val) => -val) : thresholdMarks
  );
  const [perc, setPerc] = useState(
    reverse
      ? values.map((val) => parseInt((1 - Math.abs(val / max)) * 100))
      : values.map((val) => (val / max) * 100)
  );

  const onChange = (e, tValues) => {
    const [minVal, maxVal] = tValues;
    if (maxVal > minVal && maxVal !== minVal) {
      setValue(tValues);
      if (!reverse) {
        setMarks([
          parseInt((min + minVal) / 2, 10),
          parseInt((minVal + maxVal) / 2, 10),
          parseInt((maxVal + max) / 2, 10)
        ]);
        setPerc(tValues.map((val) => (val / max) * 100));
      } else {
        setMarks([
          parseInt((-max + minVal) / 2, 10),
          parseInt((minVal + maxVal) / 2, 10),
          parseInt((maxVal + -min) / 2, 10)
        ]);
        setPerc(
          tValues.map((val) => parseInt((1 - Math.abs(val / max)) * 100))
        );
      }
    }
  };

  console.log(value, perc, marks);
  return (
    <Box
      sx={{
        width: "80%",
        margin: "16px"
      }}
    >
      <Typography
        id="discrete-slider"
        gutterBottom
        sx={{
          marginBottom: "40px"
        }}
      >
        {entityName}
      </Typography>
      <Slider
        sx={{
          "& .MuiSlider-track": {
            background: "green",
            borderColor: "white"
          },
          "& .MuiSlider-thumb": {
            [`&:nth-of-type(${1}n)`]: {
              background: "blue",
              "& span": {
                background: "blue"
              }
            },
            [`&:nth-of-type(${2}n)`]: {
              background: "red",
              "& span": {
                background: "red"
              }
            }
          },
          "& .MuiSlider-mark": {
            background: "none"
          },
          "& .MuiSlider-rail": {
            background: `linear-gradient(to right, blue 0% ${perc[0]}%, green ${perc[0]}% ${perc[1]}%, red ${perc[1]}% 100%)`
          },
          "& .MuiSlider-valueLabel": {},
          ...style
        }}
        valueLabelDisplay="on"
        valueLabelFormat={(x) => `$ ${x}`}
        value={value}
        min={reverse ? -max : min}
        max={reverse ? -min : max}
        scale={(x) => (reverse ? -x : x)}
        marks={[
          { value: reverse ? -max : min, label: reverse ? max : min },
          ...marks.map((val, idx) => ({
            value: val,
            label: thresholdMarksTitles[idx]
          })),
          { value: reverse ? -min : max, label: reverse ? min : max }
        ]}
        onChange={onChange}
        // disabled
        {...rest}
      />
    </Box>
  );
}

export default function ThresholdSlider() {
  return (
    <Box>
      <DiscreteSlider
        reverse={false}
        step={100000}
        values={[45, 59]}
        min={0}
        max={10000000}
        thresholdMarks={[30, 52, 80]}
        thresholdMarksTitles={["R", "Y", "G"]}
      />
    </Box>
  );
}