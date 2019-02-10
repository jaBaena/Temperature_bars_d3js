import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleBand, scaleTime, } from "d3-scale";
import { malagaStats, TempStat, avgTemp } from "./barplot.data";
import { axisBottom, axisLeft } from "d3-axis";
import { max, min } from "d3-array";



const d3 = {
  select, selectAll, scaleBand, scaleLinear, scaleTime, axisBottom, axisLeft, max, min,
};

const width = 500;
const height = 300;
const padding = 50;
const barWidth = 35;


// Creamos la tarjeta.
const card = select("#root")
  .append("div")
  .attr("class", "card");

// Creamos el 'lienzo' svg.
const svg = card
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);

const scaleYPos = d3.scaleLinear()
  .domain([d3.min(avgTemp) - 5, d3.max(avgTemp) + 5])
  .range([height, 0]);

const scaleXPos = d3.scaleBand()
  .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
  .range([0, width]); // use RangeRound to get pixel perfect layout

/*const xScaleTime = d3 // If i wanted to do with ScaleTime
.scaleTime()
.domain([new Date(2018, -1), new Date(2018, 11)]) // Range Jan to Dec 2019
.range([0, width]); // pixels*/

const barGroup = svg
  .append('g');

barGroup
  .selectAll('rect')
  .data(avgTemp)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * (width / 12) + 3)
  .attr("y", d => scaleYPos(d))
  .attr("width", barWidth)
  .attr("height", d => height - scaleYPos(d))
  .attr("fill", "url(#barGradient)");


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


