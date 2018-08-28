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
  filterBins : Array<BinData>;  //copy of original bins. we'll filter on it 

  binDetails : BinData;         // if an item from the list was selected, binDetails will bind to it
                                // if it's a new item, then binDetails = new BinData();

  binDetailsEdit : BinData;     // A replica of binDetails. we can edit it safely.
                                // this is the object that we send to the server eventually...

  // display members:
  isEditMode: boolean;
  isAddNewMode: boolean;      // if isEditMode && isAddNew then 'save()' will call service.addNew(), 
                              // else (only isEditMode) then save() will call service.Update();

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

  save(){
    // check if add new or edit..
    // this.binManagementService.Add(this.binDetailsEdit );
    // this.binManagementService.updateBin(this.binDetailsEdit, date....);
  }
}
