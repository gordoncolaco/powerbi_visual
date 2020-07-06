"use strict";
import "core-js/stable";
import "../style/visual.less";
import powerbi from "powerbi-visuals-api";
import { VisualSettings } from "./settings";
import IVisual = powerbi.extensibility.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import DataView = powerbi.DataView;


import * as d3 from "d3";
import { range } from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;


export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private flame1: Selection<SVGElement>;
    private flame2: Selection<SVGElement>;
    private flameDefs: Selection<SVGElement>;
    private gradientDefs: Selection<SVGElement>;
    private bgGradient: Selection<SVGElement>;
    private axis: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;

    private visualSettings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('flame', true);
        this.container = this.svg.append("g")
            .classed('container', true);
        this.axis = this.svg.append('g');
        this.textValue = this.container.append("text")
            .classed("textValue", true);
        this.flame1 = this.container.append("g")
        this.flame2 = this.container.append("g");
      //  this.axess = this.container.append("g");
        this.flameDefs = this.container.append("defs");
        this.gradientDefs = this.container.append("defs")
        this.bgGradient = this.gradientDefs.append("linearGradient")

            

  //this.container.call(y_axis);
        // this.flame1 = this.container
        //     .append("path")
        //     .attr(
        //     "d",
        //     "M 73.9 49.3 C 75.7 56.6 68.2 63.8 60.8 60.8 C 54.6 58.6 52.2 51.4 56.5 45.2 C 66.2 32.3 59.1 12 43 5 C 50.3 18.8 39.1 31.5 32.7 36.8 C 26.3 42.1 22 47.6 20.7 50.8 C 14.2 66.6 23.9 81.7 30.5 85.3 C 27.5 78.5 24.7 65.5 36.5 53.3 C 36.5 53.3 33.1 66.3 40.5 75.3 C 47.9 84.3 47.8 91 47.8 91 C 59.3 91 70.2 84.1 74.8 72.8 C 78.3 66.1 78.6 55.5 73.9 49.3"
        //     )
        //     .style("height","150vh")
        //     .style("width","150vw")
        //     .style("fill", "grey");
        // this.flame2 = this.container
        //     .append("path")
        //     .attr(
        //     "d",
        //     "M 73.9 49.3 C 75.7 56.6 68.2 63.8 60.8 60.8 C 54.6 58.6 52.2 51.4 56.5 45.2 C 66.2 32.3 59.1 12 43 5 C 50.3 18.8 39.1 31.5 32.7 36.8 C 26.3 42.1 22 47.6 20.7 50.8 C 14.2 66.6 23.9 81.7 30.5 85.3 C 27.5 78.5 24.7 65.5 36.5 53.3 C 36.5 53.3 33.1 66.3 40.5 75.3 C 47.9 84.3 47.8 91 47.8 91 C 59.3 91 70.2 84.1 74.8 72.8 C 78.3 66.1 78.6 55.5 73.9 49.3"
        //     )
        //     .style("fill", "red");
       
    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        return VisualSettings.enumerateObjectInstances(settings, options);
    }

    public update(options: VisualUpdateOptions) {
        let dataView: DataView = options.dataViews[0];
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        let radius = 5;
        let className = "redflame";

        

        this.visualSettings = VisualSettings.parse<VisualSettings>(dataView);

       // let clip_height = <number>dataView.single.value * 90 //if value is between 0 to 1
       let clip_height = <number>dataView.single.value
        let clip_y = 96 - clip_height
         this.flameDefs = this.container.append("defs")
        .append("clipPath")
        .attr("id", "vodafoneClip" + className);

        // this.flameDefs
        // .append("clipPath")
        // .attr("id", "flameClip" + className);
        let scale = "scale("+this.visualSettings.flame.flameScale+" "+this.visualSettings.flame.flameScale+")";
        let ranged = "range([90*"+this.visualSettings.flame.flameScale+","+"5*"+this.visualSettings.flame.flameScale+"])";
        let flameColor1 = this.visualSettings.flame.flameColor1;
        let flameColor2 = this.visualSettings.flame.flameColor2;

        this.flameDefs.append("rect")
            .attr("x",0)
            .attr("y",clip_y)
            .attr("width",100)
            .attr("height",clip_height);
           

        //this.bgGradient = this.container.append('defs');
            
       this.gradientDefs = this.container.append("defs");

       this.bgGradient = this.gradientDefs.append("linearGradient")
           .attr("id", "svgGradient")
           .attr("x1", "0%")
           .attr("x2", "100%")
           .attr("y1", "0%")
           .attr("y2", "100%");
           //.attr("gradientTransform", "rotate(100)");

        this.bgGradient.append("stop")
           .attr('class', 'start')
           .attr("offset", "0%")
           .attr("stop-color", flameColor1 )
           .attr("stop-opacity", 1);
        
        this.bgGradient.append("stop")
           .attr('class', 'end')
           .attr("offset", "100%")
           .attr("stop-color",flameColor2)
           .attr("stop-opacity", 1);
           
    //     .append('stop')
    //     .attr('stop-color', '#F2C66B')
    //     .attr('offset', '30%');
    //   this.bgGradient
    //     .append('stop')
    //     .attr('stop-color', '#D13D73')
    //     .attr('offset', '100%');



        // var wg = flameFill.append("circle")
        //     .attr("cx", radius)
        //     .attr("cy", radius)
        //     .attr("r", 10)
        //     .style("fill", "white");
        // defs
        // var waveGroup = gaugeGroup.append("defs")
        //     .append("clipPath")
        //     .attr("id", "clipWave" + className);
        // var wave = waveGroup.append("path")
        //     .datum(data)
        //     .attr("d", clipArea)
        //     .attr("T", 0);

        // // The inner circle with the clipping wave attached.
        // var fillCircleGroup = gaugeGroup.append("g")
        //     .attr("clip-path", "url(" + location.href + "#clipWave" + className + ")");
        // fillCircleGroup.append("circle")
        //     .attr("cx", radius)
        //     .attr("cy", radius)
        //     .attr("r", fillCircleRadius)
        //     .style("fill", config.waveColor);
    // var defs = "<defs><clipPath id='flameClip'>
    //                 <rect x='0' y='" & clip_y & "' width='100' height='" & clip_height & "' />
    //             </clipPath></defs>"

    //var defs = svg.append("defs");
		//var linearGradient = defs.append("rect").attr("x",50).attr("y",20).attr("width",150).attr("height",150).style("fill","blue") 

        //let scale = "scale("+this.visualSettings.flame.flameScale+" "+this.visualSettings.flame.flameScale+")";

        // var y_scale = d3.scaleLinear()
        //           .domain([0, 100])
        //           .range([300, 0]);
        let percent90: number = 90* this.visualSettings.flame.flameScale;
        let percent5: number = 5* this.visualSettings.flame.flameScale;
        const y_scale = d3.scaleLinear()
        .domain([0,100])
        .range([percent90,percent5]);
       // .range([90, 5]);

         var y_axis = d3.axisRight((y_scale));

         this.axis
         .style("font", this.visualSettings.flame.axisFontSize+"px times")
         .style("font-family",this.visualSettings.flame.axisFontFamily)
         .call(y_axis);


         this.flame1
         .append("path")
         .attr(
         "d",
         "M 73.9 49.3 C 75.7 56.6 68.2 63.8 60.8 60.8 C 54.6 58.6 52.2 51.4 56.5 45.2 C 66.2 32.3 59.1 12 43 5 C 50.3 18.8 39.1 31.5 32.7 36.8 C 26.3 42.1 22 47.6 20.7 50.8 C 14.2 66.6 23.9 81.7 30.5 85.3 C 27.5 78.5 24.7 65.5 36.5 53.3 C 36.5 53.3 33.1 66.3 40.5 75.3 C 47.9 84.3 47.8 91 47.8 91 C 59.3 91 70.2 84.1 74.8 72.8 C 78.3 66.1 78.6 55.5 73.9 49.3"
         )
          //.style("height","100vh")
         // .style("width","100vw")
         .style("fill", this.visualSettings.flame.emptyFlameColor)
        //  .style("stroke", this.visualSettings.flame.flameBorder)
        //  .style("stroke-width", this.visualSettings.flame.flameThickness);
        

            
            this.flame1.attr("transform", scale);
            this.flame1.style("stroke", this.visualSettings.flame.flameBorder)
            .style("stroke-width", this.visualSettings.flame.flameThickness)
            
        this.flame2
            .append("path")
            .attr(
            "d",
            "M 73.9 49.3 C 75.7 56.6 68.2 63.8 60.8 60.8 C 54.6 58.6 52.2 51.4 56.5 45.2 C 66.2 32.3 59.1 12 43 5 C 50.3 18.8 39.1 31.5 32.7 36.8 C 26.3 42.1 22 47.6 20.7 50.8 C 14.2 66.6 23.9 81.7 30.5 85.3 C 27.5 78.5 24.7 65.5 36.5 53.3 C 36.5 53.3 33.1 66.3 40.5 75.3 C 47.9 84.3 47.8 91 47.8 91 C 59.3 91 70.2 84.1 74.8 72.8 C 78.3 66.1 78.6 55.5 73.9 49.3"
            )
            // .style("height","150vh")
            // .style("width","150vw")
            .attr("clip-path", "url(" + location.href + "#flameClip" + className + ")");
            //.style("fill", this.visualSettings.flame.flameColor)
            //.style("fill", "url(#bg-gradient)");
            // .style("stroke", this.visualSettings.flame.flameBorder)
            // .style("stroke-width", this.visualSettings.flame.flameThickness)
           // .attr("transform", scale)
            //.text(<string>dataView.single.value);
            
            this.flame2.attr("transform", scale);
            this.flame2.style("stroke", this.visualSettings.flame.flameBorder)
            .style("stroke-width", this.visualSettings.flame.flameThickness);


           

            this.flame2.style("fill", "url(#svgGradient)");
          
            // this.textValue
            // .text(<string>dataView.single.value)
            // .attr("x", "25")
            // .attr("y", "500")
            // .attr("dy", "0.35em")
            // .attr("text-anchor", "middle")
            // .style("font-size", 20)
            // .style("fill","red");
       
    }
}