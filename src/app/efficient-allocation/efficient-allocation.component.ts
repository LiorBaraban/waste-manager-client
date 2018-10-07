import { EfficientAllocationService } from './efficient-allocation.service';
import { Component, OnInit } from '@angular/core';
import { EfficientAllocationViewModel } from '../Models/ViewModels/EfficientAllocationViewModel';
import { BuildingData } from '../Models/AtomicDataModels/BuildingData';
import { BuildingFullData } from '../Models/AtomicDataModels/BuildingFullData';
import { Suggestion } from '../Models/AtomicDataModels/Suggestion';

@Component({
  selector: 'app-efficient-allocation',
  templateUrl: './efficient-allocation.component.html',
  styleUrls: ['./efficient-allocation.component.css']
})
export class EfficientAllocationComponent implements OnInit {

  //view model members:
  buildings : Array<BuildingData>;
  algoSuggestion : string;

  //data binding members:
  currentBuilding : BuildingFullData;
  suggestion : Suggestion;


  // display members:
  step : number;
  buildingSelected : boolean;
  showSuccess : boolean;
  showError : boolean;

  constructor(private efficientAllocationService : EfficientAllocationService) { }

  async ngOnInit() {
    let viewModel : EfficientAllocationViewModel = await this.efficientAllocationService.GetEfficientAllocationViewModel();

    console.log(viewModel);

    this.buildings = viewModel.buildings;
    this.step = 1;
    this.buildingSelected = false;
    this.algoSuggestion = "";
    this.showSuccess = false;
    this.showError = false;
  }

  async algoBtnClick(){
    if(this.currentBuilding != null){
      this.step = 2;

      await this.efficientAllocationService.HandleEfficientCapacity(this.currentBuilding.buildingId).then(sug =>{
        this.suggestion = sug;
      });
      
      this.CreateSuggestionString();
    }
  }

   CreateSuggestionString(){
    if(this.suggestion.suggestionAction == 3){
      this.algoSuggestion = "Building already optimize.";
    }
    else if(this.suggestion.suggestionAction == 0 && this.suggestion.suggestionEntity == 1){ // add day
      this.efficientAllocationService.GetDayDesc(this.suggestion.entityIds[0]).then(dayDesc => {
        this.algoSuggestion = "Add " + dayDesc + " to the cleanup days.";
      });
    }
    else if(this.suggestion.suggestionAction == 0 && this.suggestion.suggestionEntity == 0){ // add bin
      this.efficientAllocationService.GetBinDesc(this.suggestion.entityIds[0]).then(binDesc => {
        this.algoSuggestion = "Add bin with the type " + binDesc + " to the building.";
      });
    }
    else if(this.suggestion.suggestionAction == 1 && this.suggestion.suggestionEntity == 1){ // remove day
      this.efficientAllocationService.GetDayDesc(this.suggestion.entityIds[0]).then(dayDesc => {
        this.algoSuggestion = "Remove " + dayDesc + " from the cleanup days.";
      });
    }
    else if(this.suggestion.suggestionAction == 1 && this.suggestion.suggestionEntity == 0){ // remove bin
      this.efficientAllocationService.GetBinDesc(this.suggestion.entityIds[0]).then(binDesc => {
        this.algoSuggestion = "Remove bin with the type " + binDesc + " from the building.";
      });
    }
    else if(this.suggestion.suggestionAction == 2 && this.suggestion.suggestionEntity == 0){ // change bins
      this.algoSuggestion = "Change building bins to those bins: ";
       this.suggestion.entityIds.forEach(async element => {
        await this.efficientAllocationService.GetBinDesc(element).then(binDesc =>{
          this.algoSuggestion += binDesc + ", ";
        });
        this.algoSuggestion = this.algoSuggestion.substring(0, this.algoSuggestion.length-2);
      });
      
    }
  }

  denyBtnClick(){
    this.currentBuilding = null;
    this.step = 1;
    this.algoSuggestion = "";
    this.suggestion = null;
    this.showSuccess = false;
    this.showError = false;
  }

  accepctBtnClick(){
    this.step = 3;
    this.efficientAllocationService.ImplementSuggestion(this.suggestion, this.currentBuilding.buildingId)
    .then(answer => {

      if(answer == true){
        this.showSuccess = true;
      }
      else {
        this.showError = true;
      }

    });
  }

  SelectBuilding(building : BuildingData){
    this.buildingSelected = true;

    this.currentBuilding = new BuildingFullData();
    
    this.currentBuilding.streetName = building.streetName;
    this.currentBuilding.streetNumber = building.streetNumber;
    this.currentBuilding.buildingId = building.buildingId;
    this.currentBuilding.areaId = building.areaId;

    this.efficientAllocationService.GetNumberOfDays(building.buildingId).then(
      numOfDays => {
        this.currentBuilding.numOfDays = numOfDays;
    });

    this.efficientAllocationService.GetBinsAreaDisposal(building.buildingId).then(
      binsAreaDisp => {
        this.currentBuilding.binsArea = binsAreaDisp;
    });

    this.efficientAllocationService.GetAvgCapacity(building.buildingId).then(
      avgCapacity => {
        this.currentBuilding.avgCapacity = avgCapacity;
    });

    this.efficientAllocationService.GetAreaDesc(building.buildingId).then(
      areaDesc => {
        this.currentBuilding.areaDesc = areaDesc;
      });
  }

}
