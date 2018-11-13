import { EffectiveSchedulingViewModel } from './../Models/ViewModels/EffectiveSchedulingViewModel';
import { EffectiveSchedulingService } from './effective-scheduling.service';
import { TruckData } from './../Models/AtomicDataModels/TruckData';
import { AreaData } from './../Models/AtomicDataModels/AreaData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-effective-scheduling',
  templateUrl: './effective-scheduling.component.html',
  styleUrls: ['./effective-scheduling.component.css']
})
export class EffectiveSchedulingComponent implements OnInit {

  //view model members:
  areas: Array<AreaData>;
  trucks: Array<TruckData>;

  //data binding members:
  area: AreaData;
  availableTrucks: Array<TruckData>;
  totalStats: AreaData;
  updatedArea: Array<AreaData>;

  // display members:
  editManually: boolean;
  error: number;
  areaError: boolean;

  constructor(private effectiveSchedulingService: EffectiveSchedulingService) {
    this.error = 1;
  }

  async ngOnInit() {
    let viewModel: EffectiveSchedulingViewModel = await this.effectiveSchedulingService.GetEffectiveSchedulingViewModel();

    console.log(viewModel);

    this.areas = viewModel.areas;
    this.trucks = viewModel.trucks;
    this.availableTrucks = new Array<TruckData>();
    this.updatedArea = new Array<AreaData>();
    this.editManually = false;
    this.areaError = false;

    this.InitAvailableTrucks();

    this.effectiveSchedulingService.GetTotalStats().then(totalStats => {
      this.totalStats = totalStats;
    });

  }
  GetTruckDesc(id) {
    let truck = this.trucks.find(x => x.truckId == id);

    if (truck) {
      return truck.truckTypeDesc;
    }
    else {
      return "None";
    }
  }

  copyAreaData(areaData: AreaData) {
    let arearep = new AreaData();
    arearep.area = areaData.area;
    arearep.numOfBuildings = areaData.numOfBuildings;
    arearep.capacity = areaData.capacity;
    arearep.maxCapacity = areaData.maxCapacity;
    arearep.truckId = areaData.truckId;
    arearep.numOfCleanups = areaData.numOfCleanups;
    return arearep;
  }

  copyTruckData(truckData: TruckData) {
    let truckrep = new TruckData();
    truckrep.truckId = truckData.truckId;
    truckrep.truckTypeId = truckData.truckTypeId;
    truckrep.areaId = truckData.areaId;
    truckrep.currentCapacity = truckData.currentCapacity;
    truckrep.maxCapacity = truckData.maxCapacity;
    truckrep.truckTypeDesc = truckData.truckTypeDesc;
    truckrep.areaDesc = truckData.areaDesc;
    return truckrep;
  }

  async Optimize() {
    await this.effectiveSchedulingService.WorkSchedule();
    this.UpdateAreaData();
    // this.effectiveSchedulingService.GetTotalStats().then(totalStats => {
    //   this.totalStats = totalStats;
    // });
  }

  UpdateAreaData() {
    this.effectiveSchedulingService.GetAreaData().then(areas => {
      this.areas = areas;

      this.effectiveSchedulingService.GetTotalStats().then(totalStats => {
        this.totalStats = totalStats;
      });

      this.areas.forEach(area => {
        this.effectiveSchedulingService.GetNumOfCleanups(area.truckId, area.area.id).then(numOfCleanups => {
          let displayArea = this.areas.find(x=>x.area.id == area.area.id);
          displayArea.numOfCleanups = numOfCleanups;
        });

        let index = this.availableTrucks.findIndex(x => x.truckId == area.truckId);
        if (index > -1) {
          this.availableTrucks.splice(index, 1);
        }

        this.updatedArea = new Array<AreaData>();

        this.InitAvailableTrucks();
      });

    });

    // this.trucks.forEach(truck => {
    //   this.availableTrucks.push(this.copyTruckData(truck));
    // });






  }

  ErrorBtnClick() {
    this.error = 0;
  }

  EditManuallyBtnClick() {
    this.editManually = true;

  }

  ExitBtnClick() {
    this.editManually = false;
    this.areaError = false;
    this.updatedArea.splice(0, this.updatedArea.length);
    this.InitAvailableTrucks();

  }

  SaveBtnClick() {
    this.CheckUpdatedAreas();
    if (this.areaError == false) {
      this.effectiveSchedulingService.ManuallyWorkSchedule(this.updatedArea).then(answer => {
        if (answer == 0) {
          this.error = 1;
        }
        this.effectiveSchedulingService.GetTotalStats().then(totalStats => {
          this.totalStats = totalStats;
        });
      });
      this.editManually = false;
      this.updatedArea.forEach(area => {
        let index = this.areas.findIndex(x => x.area.id == area.area.id);
        if (index != -1) {
          this.areas[index] = this.copyAreaData(area);
        }
      });


    }
  }

  CheckUpdatedAreas() {
    if (this.updatedArea.filter(x => x.truckId == -1).length > 0) {
      this.areaError = true;
    }
    else {
      this.areaError = false;
    }
  }

  updateArea(areaId: number, truckId: number) { // For Edit Manually
    if (truckId != -1) {
      this.areaError = false;
    }
    let index = this.updatedArea.findIndex(x => x.area.id == areaId);
    if (index != -1) {
      this.updatedArea[index].truckId = truckId;
      this.effectiveSchedulingService.GetNumOfCleanups(truckId, areaId).then(numOfCleanups => {
        this.updatedArea[index].numOfCleanups = numOfCleanups;
      });
    }
    else {
      index = this.areas.findIndex(x => x.area.id == areaId);
      if (index != -1) {
        let areaTemp = this.copyAreaData(this.areas[index]);
        areaTemp.truckId = truckId;
        this.updatedArea.push(areaTemp);
        let updatedAreaIndex = this.updatedArea.length - 1;

        this.effectiveSchedulingService.GetNumOfCleanups(truckId, areaId).then(numOfCleanups => {
          console.log(updatedAreaIndex);
          console.log(this.updatedArea[updatedAreaIndex]);
          this.updatedArea[updatedAreaIndex].numOfCleanups = numOfCleanups;
        });
      }
    }

    // this.effectiveSchedulingService.GetTotalStats().then(totalStats => {
    //   this.totalStats = totalStats;
    // });

    this.UpdateAvailableTrucks();


  }

  UpdateAvailableTrucks() {
    let areaList = new Array<AreaData>();

    this.availableTrucks.splice(0, this.availableTrucks.length);

    this.trucks.forEach(truck => {
      this.availableTrucks.push(this.copyTruckData(truck));
    });

    this.areas.forEach(area => {
      areaList.push(this.copyAreaData(area));
    });

    this.updatedArea.forEach(area => {
      let index = areaList.findIndex(x => x.area.id == area.area.id);
      if (index != -1) {
        areaList[index].truckId = area.truckId;
      }
    });

    areaList.forEach(area => {
      let index = this.availableTrucks.findIndex(x => x.truckId == area.truckId);
      if (index > -1) {
        this.availableTrucks.splice(index, 1);
      }
    });
  }

  InitAvailableTrucks() {
    this.availableTrucks.splice(0, this.availableTrucks.length);

    this.trucks.forEach(truck => {
      this.availableTrucks.push(this.copyTruckData(truck));
    });

    this.areas.forEach(area => {
      let index = this.availableTrucks.findIndex(x => x.truckId == area.truckId);
      if (index > -1) {
        this.availableTrucks.splice(index, 1);
      }
    });
  }

  GetTruckIdUpdatedAreas(areaId: number) { // Get truckId in updatedArea by areaId
    let index = this.updatedArea.findIndex(x => x.area.id == areaId);
    if (index != -1) {
      return this.updatedArea[index].truckId;
    }
  }

  GetTruckIdUpdatedCleanups(areaId: number) { // Get numOfCleanups in updatedArea by areaId
    let index = this.updatedArea.findIndex(x => x.area.id == areaId);
    if (index != -1) {
      return this.updatedArea[index].numOfCleanups;
    }
  }

  InUpdatedArea(areaId: number) {
    if (this.updatedArea.findIndex(x => x.area.id == areaId) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

}
