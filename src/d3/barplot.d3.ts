import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleBand, scaleTime, } from "d3-scale";
import { malagaStats, TempStat, avgTemp } from "./barplot.data";
import { axisBottom, axisLeft } from "d3-axis";
import { max, min } from "d3-array";


// We import all packages, including those from the Malaga temperature data.
const d3 = {
  select, selectAll, scaleBand, scaleLinear, scaleTime, axisBottom, axisLeft, max, min,
};

//We create and initialize the variables for the card and the width of our bars.
const width = 500;
const height = 300;
const padding = 50;
const barWidth = 35;


// We create the card.
const card = select("#root")
  .append("div")
  .attr("class", "card");

// We create the panel svg.
const svg = card
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);

// We create the scales. In addition we have commented on another possible scale ".scaletime ()" for the X axis, in case it is of your liking.
const scaleYPos = d3.scaleLinear()
  .domain([d3.min(avgTemp) - 5, d3.max(avgTemp) + 5]) // I have the "- + 5" because this way we get more margin and there is no value in the X axis (empty bar) and no bar reaches the upper limit.
  .range([height, 0]);

const scaleXPos = d3.scaleBand()
  .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
  .range([0, width]); // use RangeRound to get pixel perfect layout

/*const xScaleTime = d3 // If i wanted to do with ScaleTime
.scaleTime()
.domain([new Date(2018, -1), new Date(2018, 11)]) // Range Jan to Dec 2018
.range([0, width]); // pixels*/

// Now we create the bars according to the previous scales.
const barGroup = svg
  .append('g');

barGroup
  .selectAll('rect') // 'rect' for create bars.
  .data(avgTemp)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * (width / 12) + 3) // This has been done in order to distribute the space between the number of bars that will be available. The "+3" is so that there is some separation with the Y axis.
  .attr("y", d => scaleYPos(d))
  .attr("width", barWidth)
  .attr("height", d => height - scaleYPos(d))
  .attr("fill", "url(#barGradient)"); // The colors will be selected below.


const axisGroup = svg.append("g");

// Y Axis: call axisLeft helper and pass the scale
axisGroup.append("g").call(d3.axisLeft(scaleYPos));

// X axis: call axisBottom helper and pass the scale
axisGroup
  .append("g")
  .style("font", "9px times")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(scaleXPos));

// Gradient fill for the bars.
const gradient = svg
  .append("defs")
  .append("linearGradient")
  .attr("id", "barGradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", "0")
  .attr("y1", height)
  .attr("x2", "0")
  .attr("y2", "0");
gradient
  .append("stop")
  .attr("offset", "0")
  .attr("stop-color", "#185a9d");
gradient
  .append("stop")
  .attr("offset", "60%")
  .attr("stop-color", "#fcef00");
gradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#ff0000");


