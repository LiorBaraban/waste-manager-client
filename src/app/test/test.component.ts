import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { BinData } from '../Models/AtomicDataModels/BinData';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  bins: Array<BinData>;

  constructor(private testService: TestService) { }

  async ngOnInit() {
    this.bins = await this.testService.getAllBins();
  }

}
