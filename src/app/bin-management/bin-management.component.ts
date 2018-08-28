import { Component, OnInit } from '@angular/core';
import { BinManagementService } from 'src/app/bin-management/bin-management.service';
import { BinData } from 'src/app/Models/AtomicDataModels/BinData';
import { BinType } from 'src/app/Models/AtomicDataModels/BinType';
import { LutItem } from 'src/app/Models/AtomicDataModels/LutItem';
import { BinManagementViewModel } from 'src/app/Models/ViewModels/BinManagementViewModel';

@Component({
  selector: 'app-bin-management',
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {

  //view model members:
  bins: Array<BinData>;
  binTypes: Array<BinType>;
  areas: Array<LutItem>;
  
  //data binding members:


  // display members:
  isEditMode: boolean;

  constructor(private binManagementService : BinManagementService) { }

  async ngOnInit() {
    let viewModel : BinManagementViewModel = await this.binManagementService.getBinManagementViewModel();

    console.log(viewModel);

    this.bins = viewModel.bins;
    this.areas = viewModel.areas;
    this.binTypes = viewModel.binTypes;

    this.isEditMode = false;
  }


  btnEditClicked(){
    this.isEditMode = !this.isEditMode;
  }
}
