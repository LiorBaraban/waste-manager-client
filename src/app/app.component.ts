import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    document.body.classList.remove('main-background');
  }
  ngOnInit(): void {
    document.body.classList.add('main-background');
  }
  title = 'waste-manager-client';
}
