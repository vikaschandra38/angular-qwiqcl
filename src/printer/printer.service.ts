import { Injectable } from '@angular/core';
import {
  Milestone,
  PressFamily,
  PrinterTemplate,
  RibbonStatus,
} from '../models/printer';

@Injectable()
export class PrinterService {
  private _pressFamilies: PressFamily[] = [];
  private _milestones: Milestone[] = [];
  private _ribbonStatuses: RibbonStatus[] = [];
  private _printerTemplate: PrinterTemplate;
  constructor() {}

  get pressFamilies() {
    return this._pressFamilies;
  }
  //GET http://localhost:3000/press_families
  set pressFamilies(value: PressFamily[]) {
    this._pressFamilies = value;
  }

  get milestones() {
    return this._milestones;
  }

  // GET http://localhost:3000/milestones
  set milestones(value: Milestone[]) {
    this._milestones = value;
  }

  get ribbonStatuses() {
    return this._ribbonStatuses;
  }

  // GET http://localhost:3000/ribbon_statuses
  set ribbonStatuses(value: RibbonStatus[]) {
    this._ribbonStatuses = value;
  }

  get printerTemplate() {
    return this._printerTemplate;
  }

  set printerTemplate(value: PrinterTemplate) {
    this._printerTemplate = value;
  }
}
