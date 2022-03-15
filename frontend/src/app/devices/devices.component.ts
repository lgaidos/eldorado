import { Component, OnInit } from '@angular/core';
import { Services } from '../services/services';
import { DeviceModel } from '../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DevicesDialogComponent } from './devices-dialog/devices-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(
    public _dialog: MatDialog,
    private _services: Services) { }

  displayedColumns = ['id', 'category', 'color', 'partNumber', 'actions'];

  deviceDS = new MatTableDataSource<DeviceModel>();

  get() {
    this._services.getDevices().subscribe(res => {

      this.deviceDS.data = res;
      if (this.deviceDS.data.length == 0)
        Swal.fire('Device Not Found!');

    }, (err) => {

      Swal.fire('Error: ' + err.message);

    });
  }

  getCategoriesCount(): number {
    return this.deviceDS.data.length;
  }

  openDialog(item?: DeviceModel): void {

    if (this.getCategoriesCount() > 0) {

      let dialogRef = this._dialog.open(DevicesDialogComponent, {
        width: '600px',
        data: {
          id: item == null ? 0 : item.id,
          categoryId: item == null ? 0 : item.categoryId,
          color: item == null ? '' : item.color,
          partNumber: item == null ? 0 : item.partNumber
        },
      });
      dialogRef.componentInstance.event.subscribe((result) => {

        Swal.fire({
          title: 'Attention',
          text: 'Do you confirm?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: 'red',
          confirmButtonText: 'Yes, save!',
          cancelButtonText: 'No, do not save!'

        }).then((res) => {
          if (res.isConfirmed)
            this._services.saveDevice(result).subscribe(res => {

              Swal.fire('Success!', 'Device was saved.', 'success');
              this.get();

            }, (err) => {

              Swal.fire('Ops!', err.message, 'error');

            });

        });

      });

    }
    else
      Swal.fire('Category Not Found!');

  }

  delete(item: DeviceModel){

    Swal.fire({
      title: 'Warning',
      text: 'Do you confirm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, do not delete!'

    }).then((res) => {
      if( res.isConfirmed )
        this._services.deleteDevice(item.id).subscribe( res => {

          Swal.fire('Success!', 'Device was deleted.', 'success' );
          this.get();

        }, (err) => {

          Swal.fire('Ops!', err.message, 'error' );
          
        });

    });
  }

  ngOnInit() {
    this.get();
  }

}
