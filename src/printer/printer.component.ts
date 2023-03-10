import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PrinterService } from './printer.service';
import {
  Activity,
  ActivityForm,
  Milestone,
  Phase,
  PhaseForm,
  PressFamily,
  PrinterTemplate,
  PrinterTemplateForm,
  RibbonStatus,
  State,
  StateForm,
} from '../models/printer';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-printer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatDividerModule,
  ],
  providers: [PrinterService],
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss'],
})
export class PrinterComponent implements OnInit {
  pressFamilies: PressFamily[];
  selectedPressFamily: string = '';
  milestones: Milestone[] = [];
  selectedMilestone: string = '';
  ribbonStatuses: RibbonStatus[] = [];
  selectedRibbonStatus: string = '';
  printerTemplate: PrinterTemplate;
  regions: string[] = ['LATAM', 'EMEA', 'APAC'];
  selectedRegion: string = 'LATAM';
  showTemplate: boolean = true;
  defaultExpand: boolean = true;

  printerTemplateForm: FormGroup<PrinterTemplateForm>;

  constructor(
    private printerService: PrinterService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.printerService.pressFamilies = [
      {
        id: 1,
        name: 'A22001',
        press_alias: 'DP15',
        description: 'Description for press family A2200',
        created_at: '2023-02-28T14:05:35.970Z',
        updated_at: '2023-02-28T14:05:35.970Z',
      },
    ];
    this.pressFamilies = this.printerService.pressFamilies;
    this.printerService.milestones = [
      {
        id: 1,
        name: ' Pen Calibration Complete',
        created_at: '2023-02-28T14:04:34.465Z',
        updated_at: '2023-02-28T14:04:34.465Z',
      },
      {
        id: 2,
        name: ' Hardware in Place & Aligned',
        created_at: '2023-02-28T14:04:34.478Z',
        updated_at: '2023-02-28T14:04:34.478Z',
      },
      {
        id: 3,
        name: ' Start-up Calibration Complete',
        created_at: '2023-02-28T14:04:34.487Z',
        updated_at: '2023-02-28T14:04:34.487Z',
      },
      {
        id: 4,
        name: ' Validation Test Complete',
        created_at: '2023-02-28T14:04:34.495Z',
        updated_at: '2023-02-28T14:04:34.495Z',
      },
      {
        id: 5,
        name: ' Running Paper at Speed',
        created_at: '2023-02-28T14:04:34.506Z',
        updated_at: '2023-02-28T14:04:34.506Z',
      },
      {
        id: 6,
        name: 'COI Signed',
        created_at: '2023-02-28T14:04:34.515Z',
        updated_at: '2023-02-28T14:04:34.515Z',
      },
      {
        id: 7,
        name: 'Training Completed',
        created_at: '2023-02-28T14:04:34.525Z',
        updated_at: '2023-02-28T14:04:34.525Z',
      },
      {
        id: 8,
        name: 'Compute System Integration Complete',
        created_at: '2023-02-28T14:04:34.536Z',
        updated_at: '2023-02-28T14:04:34.536Z',
      },
      {
        id: 9,
        name: ' Press Power On',
        created_at: '2023-02-28T14:04:34.544Z',
        updated_at: '2023-02-28T14:04:34.544Z',
      },
      {
        id: 10,
        name: ' Integration Complete',
        created_at: '2023-02-28T14:04:34.551Z',
        updated_at: '2023-02-28T14:04:34.551Z',
      },
    ].map((milestone) => {
      return { id: milestone.id, name: milestone.name };
    });
    this.milestones = this.printerService.milestones;
    this.printerService.ribbonStatuses = [
      {
        id: 1,
        status: 'Assembly',
        created_at: '2023-02-28T14:04:34.591Z',
        updated_at: '2023-02-28T14:04:34.591Z',
      },
      {
        id: 2,
        status: 'COI',
        created_at: '2023-02-28T14:04:34.608Z',
        updated_at: '2023-02-28T14:04:34.608Z',
      },
      {
        id: 3,
        status: 'Integration',
        created_at: '2023-02-28T14:04:34.615Z',
        updated_at: '2023-02-28T14:04:34.615Z',
      },
      {
        id: 4,
        status: 'Validation',
        created_at: '2023-02-28T14:04:34.623Z',
        updated_at: '2023-02-28T14:04:34.623Z',
      },
    ].map((ribbonStatus) => {
      return { id: ribbonStatus.id, status: ribbonStatus.status };
    });

    this.ribbonStatuses = this.printerService.ribbonStatuses;
    this.printerService.printerTemplate = {
      phases: [
        {
          id: 1,
          name: 'Installation',
          activities: [
            {
              id: 1,
              name: 'Rigging',
              states: [
                {
                  id: 1,
                  description: 'Unload & uncrate',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 2,
                  description: 'Uncrate & Set PEM Assembly',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 3,
                  description: 'Uncrate & Set Buffer/Vision',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 4,
                  description: 'Set Dryer Electrical Cabinet',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 5,
                  description: 'Set Unwinder Assembly',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 6,
                  description: 'Set Rewinder Assembly (if applicable)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 7,
                  description: 'Set Moisturizer Assembly (If Applicable)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 48,
                  description: 'New Status description',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 1,
                    name: ' Pen Calibration Complete',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 49,
                  description: 'New status description',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 1,
                    name: ' Pen Calibration Complete',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
              ],
            },
            {
              id: 2,
              name: 'RITS Ink supply system',
              states: [
                {
                  id: 8,
                  description: 'Set / Assy',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 9,
                  description: 'Pull ink lines + control lines',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 10,
                  description: 'Air hook up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 11,
                  description: 'Ink Lines + Control lines hook up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 12,
                  description: 'Test / debug',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 50,
                  description: 'New status description phase',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 2,
                    status: 'COI',
                  },
                },
              ],
            },
            {
              id: 3,
              name: 'Web Press Compute System',
              states: [
                {
                  id: 13,
                  description:
                    'Move servers into location + initial wiring hookup',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 8,
                    name: 'Compute System Integration Complete',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 14,
                  description: 'Power to connector live ',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 8,
                    name: 'Compute System Integration Complete',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
                {
                  id: 15,
                  description: 'Set up / test / debug',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 8,
                    name: 'Compute System Integration Complete',
                  },
                  ribbon_status: {
                    id: 3,
                    status: 'Integration',
                  },
                },
              ],
            },
            {
              id: 4,
              name: 'Web Press Install',
              states: [
                {
                  id: 16,
                  description: 'Layout press CL & module locations',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 17,
                  description: 'Align/Level/Tram/Anchor PEM - Vision',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 18,
                  description: 'Align/Level/Anchor Dryer',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 19,
                  description: 'Align/Level/Tram/Anchor Unwind to PEM',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 20,
                  description: 'Align/Level/Tram/Anchor Moisturizer',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 21,
                  description: 'Hardware in place and aligned (Milestone)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 2,
                    name: ' Hardware in Place & Aligned',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 22,
                  description: 'Subsystem assembly and interconnect wiring ',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 23,
                  description: 'Air hook up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 24,
                  description: 'Utility Exhaust hook up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 25,
                  description: 'Utility Power hook up ',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 26,
                  description: "Water hook up (if req'd)",
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 27,
                  description: 'Run Fiber trunk From Server to Press',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 28,
                  description: 'Setup and Calibrate Vision Systems',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
                {
                  id: 29,
                  description: 'Fiber trunk hook up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 1,
                    status: 'Assembly',
                  },
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Startup & Testing',
          activities: [
            {
              id: 5,
              name: 'Integration and Qualification',
              states: [
                {
                  id: 30,
                  description: 'Networking Integration',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 10,
                    name: ' Integration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 31,
                  description: 'IC Troubleshooting',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 10,
                    name: ' Integration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 32,
                  description:
                    'Basic Printing Setup (PS2PS, Run-Out, VS triggering)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 10,
                    name: ' Integration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 33,
                  description: 'Run Client Print Job',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 34,
                  description:
                    'Validation Testing (Complete Validation Checklist)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 4,
                    name: ' Validation Test Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 35,
                  description: 'Training (If not done previously)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 7,
                    name: 'Training Completed',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 36,
                  description: 'Certificate of Install (COI)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 6,
                    name: 'COI Signed',
                  },
                  ribbon_status: {
                    id: 2,
                    status: 'COI',
                  },
                },
              ],
            },
            {
              id: 6,
              name: 'Startup',
              states: [
                {
                  id: 37,
                  description: 'Check interconnect terminations',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 38,
                  description: 'Power up / test / debug (Milestone)',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 9,
                    name: ' Press Power On',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 39,
                  description: 'Operator Panel (HMI) verification / debug',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 5,
                    name: ' Running Paper at Speed',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 40,
                  description: 'Load Paper + Run Paper @ speed',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 5,
                    name: ' Running Paper at Speed',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 41,
                  description: 'Complete Pen to Paper calibration',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 1,
                    name: ' Pen Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 42,
                  description: 'Load Cell calibration + Nip Pressure settings',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 43,
                  description: 'Install Pens + Install WWC',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 44,
                  description: 'Complete Pen Calibration',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 45,
                  description: 'Complete Startup Calibration  ',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 3,
                    name: ' Start-up Calibration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 46,
                  description: 'Adjustments + Clean up',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 10,
                    name: ' Integration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
                {
                  id: 47,
                  description: 'Complete Install Checklist',
                  day: 0,
                  milestone_weightage: 0,
                  ribbon_status_weightage: 0,
                  milestone: {
                    id: 10,
                    name: ' Integration Complete',
                  },
                  ribbon_status: {
                    id: 4,
                    status: 'Validation',
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    this.printerTemplate = this.printerService.printerTemplate;

    this._initPrinterTemplateForm();
  }

  onShowTemplate() {
    this.showTemplate = true;
  }

  get phases() {
    return this.printerTemplateForm.controls.phases;
  }

  private _initPrinterTemplateForm() {
    this.printerTemplateForm = this.fb.group<PrinterTemplateForm>({
      phases: this._initPhaseArray(this.printerTemplate.phases),
    });
  }

  private _initPhaseArray(phases: Phase[]) {
    return this.fb.array<FormGroup<PhaseForm>>(
      phases.map((phase) => {
        return this._initPhase(phase);
      })
    );
  }

  private _initPhase(phase: Phase) {
    return this.fb.group<PhaseForm>({
      id: this.fb.control(phase.id || 0),
      name: this.fb.control(phase.name || ''),
      activities: this._initActivityArray(phase.activities),
    });
  }

  private _initActivityArray(activities: Activity[]) {
    return this.fb.array<FormGroup<ActivityForm>>(
      activities.map((activity) => {
        return this._initActivity(activity);
      })
    );
  }

  private _initActivity(activity: Activity) {
    return this.fb.group<ActivityForm>({
      id: this.fb.control(activity.id || 0),
      name: this.fb.control(activity.name || ''),
      states: this._initStateArray(activity.states),
    });
  }

  private _initStateArray(states: State[]) {
    return this.fb.array<FormGroup<StateForm>>(
      states.map((state) => {
        return this._initState(state);
      })
    );
  }

  private _initState(state?: State) {
    let stateGroup: FormGroup<StateForm> = this.fb.group<StateForm>({
      id: this.fb.control(state?.id || 0),
      description: this.fb.control(state?.description || ''),
      milestone: this.fb.control(state?.milestone),
      milestone_weightage: this.fb.control(state?.milestone_weightage || 0),
      ribbon_status: this.fb.control(state?.ribbon_status),
      ribbon_status_weightage: this.fb.control(
        state?.ribbon_status_weightage || 0
      ),
      day: this.fb.control(state?.day || 0),
    });
    stateGroup.disable();
    return stateGroup;
  }

  /*   private _initMilestone(milestone: Milestone) {
    return this.fb.group<MilestoneForm>({
      id: this.fb.control(milestone.id || 0),
      name: this.fb.control(milestone.name || ''),
    });
  } */

  /*   private _initRibbonStatus(ribbonStatus: RibbonStatus) {
    return this.fb.group<RibbonStatusForm>({
      id: this.fb.control(ribbonStatus.id || 0),
      status: this.fb.control(ribbonStatus.status || ''),
    });
  }
 */

  compareMilestones(m1: Milestone, m2: Milestone): boolean {
    return m1 && m2 ? m1.id === m2.id : m1 === m2;
  }

  compareRibbonStatuses(r1: RibbonStatus, r2: RibbonStatus): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  onMilestoneChange() {}
  resetSearchFilters() {}
  onAddNewState(activity: FormGroup<ActivityForm>) {
    activity.controls.states.push(this._initState());
  }
  enableState(isChecked: boolean, state: FormGroup<StateForm>) {
    isChecked ? state.enable() : state.disable();
  }
}
