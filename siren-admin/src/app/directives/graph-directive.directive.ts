import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Directive, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataPoint } from '../models/DataPoint';
import * as d3 from 'd3';
import { drag } from 'd3';

@Directive({
  selector: '[myGraph]'
})
export class GraphDirectiveDirective implements OnDestroy {

  constructor(private ref:ElementRef) { }

  graphPoints:number[][] = []
  drawn:boolean = false

  ngAfterViewChecked(){
    if(!this.drawn){
      var children = this.ref.nativeElement.children
      if(children.length !== 0){
        this.graphPoints = [];
        for(let i = 0; i < children.length; i++){//pushing to array: (timestamp, index of post)
          this.graphPoints.push([Number(children[i].innerText), i+1])
        }
        this.ref.nativeElement.innerHTML = ''
        this.initializeChart()
        this.drawn = true
        console.log(this.graphPoints)
      }
    }
  }

  ngOnDestroy(){
    console.log(document.querySelectorAll('svg').forEach(svg=>svg.remove()))
  }

  private initializeChart(){
    //WORKS
       
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  var parseDate = d3.time.format("%Y-%m-%d").parse;
  
  
  var x = d3.time.scale()
      .range([0, width])
  
  var y = d3.scale.linear()
      .range([height, 0]);
  
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  var line = d3.svg.line()
      .x((d:any) => { return x(d.date); })
      .y((d:any) => { return y(d.close); });
  
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "none")
      .attr("stroke", "#000");
  
    var data = this.graphPoints.map(function(d) {
        return {
           date: new Date(d[0]),
           close: d[1]
        };
        
    });
  
    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain(d3.extent(data, (d):any => { return d.close; }));
  
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of total posts");
  
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);  
  }
}
