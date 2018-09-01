import { BinData } from 'src/app/Models/AtomicDataModels/BinData';
import { BuildingData } from './../Models/AtomicDataModels/BuildingData';
import { Component, OnInit } from '@angular/core';
import { BinManagementService } from 'src/app/bin-management/bin-management.service';
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
  buildings: Array<BuildingData>

  //data binding members:
  filterBins : Array<BinData>;  //copy of original bins. we'll filter on it 
  filteringBy : string;
  buildingsInArea : Array<BuildingData>;

  binDetails : BinData;         // if an item from the list was selected, binDetails will bind to it
                                // if it's a new item, then binDetails = new BinData();

  binDetailsEdit : BinData;     // A replica of binDetails. we can edit it safely.
                                // this is the object that we send to the server eventually...

  // display members:
  isShowDetails: boolean;
  isCitySelected: boolean;
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
    this.buildings = viewModel.buildings;

    this.filterBins = this.bins;
    this.filteringBy = "Bin Types";
    this.buildingsInArea = this.buildings;

    this.isShowDetails = false;
    this.isEditMode = false;
    this.isAddNewMode = false;
    this.isCitySelected = false;
  }

  filteringBin(id : number){
    if(id == -1){
      this.filterBins = this.bins;
      this.filteringBy = "All Bins"
    }
    else{
      this.filterBins = this.bins.filter(x => x.binTypeId == id);
      this.filteringBy = this.binTypes.find(x => x.binTypeId == id).binTypeDesc;
    }
  }

  showBinDetails(id : number){
    this.binDetails = this.bins.find(x => x.binId == id);
    this.binDetailsEdit = this.copyBinData(this.binDetails);
    this.isShowDetails = true;
    this.isAddNewMode = false;
    this.isEditMode = false;
  }

  copyBinData(binData : BinData){
    var binrep = new BinData();
    binrep.binId = binData.binId;
    binrep.binTypeId = binData.binTypeId;
    binrep.buildingId = binData.buildingId;
    binrep.binTypeDesc = binData.binTypeDesc;
    binrep.cityAddress = binData.cityAddress;
    binrep.streetAddress = binData.streetAddress;
    binrep.currentCapacity = binData.currentCapacity;
    binrep.maxCapacity = binData.maxCapacity;
    binrep.binTrashDisposalArea = binData.binTrashDisposalArea;
    return binrep;
  }

  btnEditClicked(){
    if(this.binDetails){
      this.isEditMode = true;
      this.isShowDetails = false;
      this.isAddNewMode = false;
    }
  }

  btnNewClicked(){
    this.isAddNewMode = true;
    this.isEditMode = false;
    this.isShowDetails = false;
    
    this.binDetailsEdit = new BinData();
  }

  addBinType(binType : BinType){

    this.binDetailsEdit.binTypeDesc = binType.binTypeDesc;
    this.binDetailsEdit.binTypeId = binType.binTypeId;
    this.binDetailsEdit.maxCapacity = binType.capacity;
    this.binDetailsEdit.currentCapacity = 0;
    this.binDetailsEdit.binTrashDisposalArea = binType.binTrashDisposalArea;
  }

   
  addStreetAddress(buildingData : BuildingData){
    this.binDetailsEdit.streetAddress = buildingData.streetName + " " + buildingData.streetNumber;
    this.binDetailsEdit.buildingId = buildingData.buildingId;
  }

  addCity(area : LutItem){
    this.isCitySelected = true;
    this.binDetailsEdit.cityAddress = area.desc;
    this.buildingsInArea = this.buildings.filter(x => x.areaId == area.id);
  }

  save(){
    if(this.isAddNewMode){
      this.binManagementService.addBin(this.binDetailsEdit);
      this.isAddNewMode = false;
      this.isCitySelected = false;
      this.bins.push(this.binDetailsEdit);
      this.binDetailsEdit = null;
    }
    else if(this.isEditMode){
      this.binManagementService.updateBin(this.binDetailsEdit);
      this.isEditMode = false;
      this.isCitySelected = false;
      let indx = this.bins.findIndex(x => x.binId == this.binDetailsEdit.binId);
      this.bins.splice(indx, 1);
      this.bins.push(this.binDetailsEdit); 
      this.binDetailsEdit = null;
    }

  }

  checkAndSave(){
    if(this.isNewBinHasAllInfo(this.binDetailsEdit)){
        this.save();
    } else{
      // Need to fill all the info
    }
  }

  isNewBinHasAllInfo(newBin : BinData){
    if(!newBin.binTypeId || !newBin.cityAddress || !newBin.streetAddress){
      return false;
    }
    return true;
  }

  exitNewMode(){
    this.isAddNewMode = false;
    this.isCitySelected = false;
    this.binDetailsEdit = null;
  }
  exitEditMode(){
    this.isEditMode = false;
    this.isCitySelected = false;
    this.binDetailsEdit = null;
  }

  deleteBin(id : number){
    this.binManagementService.deleteBin(id); // not working
    let indx = this.bins.findIndex(x => x.binId == id);
    this.bins.splice(indx, 1);  }
}
