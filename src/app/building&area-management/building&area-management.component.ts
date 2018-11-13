import { AreaData } from './../Models/AtomicDataModels/AreaData';
import { Component, OnInit } from '@angular/core';
import { BuildingData } from '../Models/AtomicDataModels/BuildingData';
import { LutItem } from '../Models/AtomicDataModels/LutItem';
import { BuildingAreaManagementService } from './building-area-management.service';
import { BuildingAreaManagementViewModel } from '../Models/ViewModels/BuildingAreaManagementViewModel';
import { DbBuilding } from '../Models/AtomicDataModels/DbBuilding';

@Component({
  selector: 'app-building',
  templateUrl: './building&area-management.component.html',
  styleUrls: ['./building&area-management.component.css']
})
export class BuildingAreaManagementComponent implements OnInit {

  //view model members:
  buildings: Array<DbBuilding>
  areas: Array<LutItem>;


  //data binding members:
  filterBuildings : Array<DbBuilding>;  //copy of original buildings. we'll filter on it
  filteringBy : string;
  buildingsInArea : Array<DbBuilding>; //??
  buildingDetails : DbBuilding; // if an item from the list was selected, buildingDetails will bind to it
                                // if it's a new item, then buildingDetails = new BuildingData();

  buildingDetailsEdit : DbBuilding; // A replica of buildingDetails. we can edit it safely.
                                    // this is the object that we send to the server eventually...
  

  // display members:
  isShowDetails: boolean;
  isCitySelected: boolean;
  isAddNewMode: boolean; 
  errorDupl: boolean;

  constructor(private buildingAreaManagementService : BuildingAreaManagementService) {
    this.errorDupl = false;
   }

  async ngOnInit() {
    await this.getViewModel();
    
  }

  async getViewModel(){
    let viewModel : BuildingAreaManagementViewModel = await this.buildingAreaManagementService.BuildingAreaManagementViewModel();
    console.log(viewModel);

    this.areas = viewModel.areas;
    this.buildings = viewModel.buildings;

    this.filterBuildings = this.buildings;
    this.filteringBy = "Areas";

    this.isShowDetails = false;
    this.isAddNewMode = false;
    this.isCitySelected = false;
  }

  filteringBuildings(id : number){
    if(id == -1){
      this.filterBuildings = this.buildings;
      this.filteringBy = "All Buildings"
    }
    else{
      this.filterBuildings = this.buildings.filter(x => x.areaId == id);
      this.filteringBy = this.areas.find(x => x.id == id).desc;
    }
  }

  showBuildingDetails(id : number){
    this.buildingDetails = this.buildings.find(x => x.buildingId == id);
    this.buildingDetailsEdit = this.copyBuildingData(this.buildingDetails);
    this.isShowDetails = true;
    this.isAddNewMode = false;
  }

  copyBuildingData(buildingData : DbBuilding){
    var buildingrep = new DbBuilding();
    buildingrep.buildingId = buildingData.buildingId;
    buildingrep.areaId = buildingData.areaId;
    buildingrep.streetName = buildingData.streetName;
    buildingrep.streetNumber = buildingData.streetNumber;
    buildingrep.trashDisposalArea = buildingData.trashDisposalArea;
    return buildingrep;
  }
  
  GetAreaDesc(areaId : number){
    return this.areas.find(x => x.id == areaId).desc;
  }

 
  btnNewClicked(){
    this.isAddNewMode = true;
    this.isShowDetails = false;
    
    this.buildingDetailsEdit = new DbBuilding();
  }

  async deleteBuilding(id : number){ // something with cross-origin
    await this.buildingAreaManagementService.DeleteBuilding(id); // not working something with cross origin
    await this.getViewModel();
    
  }

  checkAndSave(){
    console.log("checkAndSave");
    if(this.isNewBuildingHasAllInfo(this.buildingDetailsEdit)){
        this.save();
      }
      else{
      // Need to fill all the info
      }
  }

  isNewBuildingHasAllInfo(newBuilding : DbBuilding){
    console.log("isNewBuildingHasAllInfo");
    if(!newBuilding.streetName || !newBuilding.streetNumber || newBuilding.trashDisposalArea < 0 || !newBuilding.areaId){
      console.log(newBuilding);
      console.log("false1");
      return false;
    }       
    //check for duplicates!!
    let index = this.buildings.filter(x => x.streetName == newBuilding.streetName).findIndex(x => x.streetNumber == newBuilding.streetNumber);
    if( index != -1 && this.buildings[index].areaId == newBuilding.areaId){
      this.errorDupl = true;
      console.log("false2");
      return false;
    }

    console.log("true");
    return true;
  }

  async save(){
    console.log("Save");
    if(this.isAddNewMode){
      await this.buildingAreaManagementService.AddBuilding(this.buildingDetailsEdit);
      this.isAddNewMode = false;
      this.buildings.push(this.buildingDetailsEdit);
      this.isCitySelected = false;
      this.buildingDetailsEdit = null;
      await this.getViewModel();
    }
  }

  exitNewMode(){
    this.isAddNewMode = false;
    this.isCitySelected = false;
    this.buildingDetailsEdit = null;
  }

  

  AddArea(area : LutItem){
    this.isCitySelected = true;
    this.buildingDetailsEdit.areaId = area.id;
    this.buildingDetailsEdit.streetName = null;
    this.buildingDetailsEdit.streetNumber = null;
    this.buildingsInArea = this.buildings.filter(x => x.areaId == area.id);
  }

  updateTrashDisposalArea(trashDisposalArea : number){
    this.buildingDetailsEdit.trashDisposalArea = trashDisposalArea;
  }

  updateStreetName(streetName : string){
    this.buildingDetailsEdit.streetName = streetName;
    console.log(this.buildingDetailsEdit.streetName);
    this.errorDupl = false;
  }

  updateStreetNumber(streetNumber : string){
    this.buildingDetailsEdit.streetNumber = streetNumber;
    console.log(this.buildingDetailsEdit.streetNumber);
    this.errorDupl = false;
  }

  ErrorBtnClick(){
    this.errorDupl = false;
  }

}
