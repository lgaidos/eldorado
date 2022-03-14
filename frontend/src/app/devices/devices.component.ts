import { Component, OnInit } from '@angular/core';
import { Services } from '../services/services';
import { DeviceModel } from '../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(
    private _services: Services) { }

  displayedColumns = ['id', 'category', 'color', 'partNumber', 'actions'];

  deviceDS = new MatTableDataSource<DeviceModel>();

  buscar(){
    this._services.getDevice().subscribe(res=>{

      this.deviceDS.data = res;
      if( this.deviceDS.data.length == 0)
        Swal.fire('Device Not Found!');

    }, (err) => {

       Swal.fire('Error: ' + err.message );
       
    });
  }

  ngOnInit() {
    this.buscar();
  }

}
