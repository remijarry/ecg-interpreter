import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { DecisionTreeFormComponent } from '../decision-tree-form/decision-tree-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() resetTreeEvent = new EventEmitter<void>();
  @Output() clearSideNavEvent = new EventEmitter<void>();

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onResetTree() {
    this.resetTreeEvent.emit();
    this.clearSideNavEvent.emit();
  }
}
