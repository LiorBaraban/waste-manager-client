import { Component, OnInit } from '@angular/core';
import { TruckData } from '../Models/AtomicDataModels/TruckData';
import { LutItem } from '../Models/AtomicDataModels/LutItem';
import { TruckType } from '../Models/AtomicDataModels/TruckType';
import { TruckManagementService } from './truck-management.service';
import { TruckManagementViewModel } from '../Models/ViewModels/TruckManagementViewModel';

@Component({
  selector: 'app-truck-management',
  templateUrl: './truck-management.component.html',
  styleUrls: ['./truck-management.component.css']
})
export class TruckManagementComponent implements OnInit {

  //view model members:
  trucks : Array<TruckData>;
  areas : Array<LutItem>;
  truckTypes : Array<TruckType>;

  //data binding members:
  filterTrucks : Array<TruckData>;
  filteringBy : string
  updatedCapacity : number;
  truckDetails : TruckData;
  truckDetailsEdit : TruckData;

  // display members:
  isShowDetails: boolean;
  isCitySelected: boolean; //??
  isEditMode: boolean;
  isAddNewMode: boolean;

  constructor(private truckManagementService : TruckManagementService) { }

  async ngOnInit() {
   await this.getViewModel();
  }

  async getViewModel(){
    let viewModel : TruckManagementViewModel = await this.truckManagementService.getTruckManagementViewModel();

    console.log(viewModel);

    this.trucks = viewModel.trucks;
    this.areas = viewModel.areas;
    this.truckTypes = viewModel.truckTypes;

    this.filterTrucks = this.trucks;
    this.filteringBy = "Truck Types";

    this.isShowDetails = false;
    this.isEditMode = false;
    this.isAddNewMode = false;
    this.isCitySelected = false; //??
    this.updatedCapacity = 0;
  }

  filteringTruck(id : number){
    if(id == -1){
      this.filterTrucks = this.trucks;
      this.filteringBy = "All Trucks"
    }
    else{
      this.filterTrucks = this.trucks.filter(x => x.truckTypeId == id);
      this.filteringBy = this.truckTypes.find(x => x.truckTypeId == id).truckTypeDesc;
    }
  }

  showTruckDetails(id : number){
    this.truckDetails = this.trucks.find(x => x.truckId == id);
    this.truckDetailsEdit = this.copyTruckData(this.truckDetails);
    this.updatedCapacity = this.truckDetailsEdit.currentCapacity;
    this.isShowDetails = true;
    this.isAddNewMode = false;
    this.isEditMode = false;
  }

  copyTruckData(truckData : TruckData){
    var truckrep = new TruckData();
    truckrep.truckId = truckData.truckId;
    truckrep.truckTypeId = truckData.truckTypeId;
    truckrep.areaId = truckData.areaId;
    truckrep.currentCapacity = truckData.currentCapacity;
    truckrep.maxCapacity = truckData.maxCapacity;
    truckrep.truckTypeDesc = truckData.truckTypeDesc;
    truckrep.areaDesc = truckData.areaDesc;
    return truckrep;
  }

  btnEditClicked(){
    if(this.truckDetails){
      this.isEditMode = true;
      this.isShowDetails = false;
      this.isAddNewMode = false;
    }
  }

  btnNewClicked(){
    this.isAddNewMode = true;
    this.isEditMode = false;
    this.isShowDetails = false;
    
    this.truckDetailsEdit = new TruckData();
  }

  addTruckType(truckType : TruckType){

    this.truckDetailsEdit.truckTypeDesc = truckType.truckTypeDesc;
    this.truckDetailsEdit.truckTypeId = truckType.truckTypeId;
    this.truckDetailsEdit.maxCapacity = truckType.capacity;
    this.truckDetailsEdit.currentCapacity = 0;
  }

  addCity(area : LutItem){
    this.isCitySelected = true;
    this.truckDetailsEdit.areaId = area.id;
    this.truckDetailsEdit.areaDesc = area.desc;
  }

  async save(){
    if(this.isAddNewMode){
      await this.truckManagementService.addTruck(this.truckDetailsEdit);
      this.isAddNewMode = false;
      this.isCitySelected = false;
      this.trucks.push(this.truckDetailsEdit);
      this.truckDetailsEdit = null;
    }
    else if(this.isEditMode){
      this.truckDetailsEdit.currentCapacity = this.updatedCapacity;
      await this.truckManagementService.updateTruck(this.truckDetailsEdit);
      this.isEditMode = false;
      this.isCitySelected = false;
      // let indx = this.trucks.findIndex(x => x.truckId == this.truckDetailsEdit.truckId);
      // this.trucks.splice(indx, 1, this.truckDetailsEdit);
      this.truckDetailsEdit = null;
    }
    await this.getViewModel();
  }

  checkAndSave(){
    if(this.isNewTruckHasAllInfo(this.truckDetailsEdit)){
        this.save();
    } else{
      // Need to fill all the info
    }
  }

  isNewTruckHasAllInfo(newTruck : TruckData){
    console.log(newTruck);
    if(!newTruck.truckTypeId || this.updatedCapacity > newTruck.maxCapacity || (newTruck.areaId != null && this.trucks.findIndex(x=>x.areaId == newTruck.areaId) != -1 )){
      return false;
    }
    return true;
  }

  exitNewMode(){
    this.isAddNewMode = false;
    this.isCitySelected = false;
    this.truckDetailsEdit = null;
  }
  exitEditMode(){
    this.isEditMode = false;
    this.isCitySelected = false;
    this.truckDetailsEdit = null;
  }

  async deleteTruck(id : number){
    await this.truckManagementService.deleteTruck(id); // not working something with cross origin
    // let indx = this.trucks.findIndex(x => x.truckId == id);
    // this.trucks.splice(indx, 1);  
    await this.getViewModel();
  }

  updateCurrentCapacity(currCapacity : number){
    this.updatedCapacity = currCapacity;
  }

}
