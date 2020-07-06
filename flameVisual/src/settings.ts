"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class FlameSettings {
  public emptyFlameColor: string = "grey";

  public flameThickness: number = 1;
  public flameBorder: string = "red";
  public flameScale: number = 2;
  public axisFontSize: number = 12;
  public axisFontFamily : string ="Arial";
  public flameColor1: string = "#F5FD02";
  public flameColor2: string = "#FF5733";
  
}
export class VisualSettings extends DataViewObjectsParser {
  public flame: FlameSettings = new FlameSettings();
}

