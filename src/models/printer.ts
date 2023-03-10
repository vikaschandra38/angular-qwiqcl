import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface PressFamily {
  id: number;
  name: string;
  press_alias: string;
  description: String;
  created_at?: string;
  updated_at?: string;
}

export interface Milestone {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface RibbonStatus {
  id: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface PrinterTemplate {
  phases: Phase[];
}

export interface Phase {
  id: number;
  name: string;
  activities: Activity[];
}

export interface Activity {
  id: number;
  name: string;
  states: State[];
}

export interface State {
  id: number;
  description: string;
  day: number;
  milestone_weightage: number;
  ribbon_status_weightage: number;
  milestone: Milestone;
  ribbon_status: RibbonStatus;
}

export interface PrinterTemplateForm {
  phases: FormArray<FormGroup<PhaseForm>>;
}

export interface PhaseForm {
  id: FormControl;
  name: FormControl;
  activities: FormArray<FormGroup<ActivityForm>>;
}

export interface ActivityForm {
  id: FormControl;
  name: FormControl;
  states: FormArray<FormGroup<StateForm>>;
}

export interface StateForm {
  id: FormControl;
  description: FormControl;
  day: FormControl;
  milestone_weightage: FormControl;
  ribbon_status_weightage: FormControl;
  milestone: FormControl;
  ribbon_status: FormControl;
}

export interface MilestoneForm {
  id: FormControl;
  name: FormControl;
}

export interface RibbonStatusForm {
  id: FormControl;
  status: FormControl;
}
