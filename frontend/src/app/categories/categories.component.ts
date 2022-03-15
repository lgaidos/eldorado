import { Component, OnInit } from '@angular/core';
import { Services } from '../services/services';
import { CategoryModel } from '../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
//import { DevicesDialogComponent } from './devices-dialog/devices-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    public _dialog: MatDialog,
    private _services: Services) { }

  displayedColumns = ['id', 'name', 'actions'];

  categoryDS = new MatTableDataSource<CategoryModel>();
  
  get(){
    this._services.getCategories().subscribe(res=>{

      this.categoryDS.data = res;
      if( this.categoryDS.data.length == 0)
        Swal.fire('Warning', 'Category Not Found!', 'warning' );

    }, (err) => {

       Swal.fire('Ops!', err.message, 'error' );
       
    });
  }

  openDialog(item?: CategoryModel): void {

    let dialogRef = this._dialog.open(CategoriesDialogComponent, {
      width: '600px',
      data: { 
        id: item == null ? 0 : item.id,
        name: item == null ? '': item.name
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
          if( res.isConfirmed )
            this._services.saveCategory(result).subscribe( res => {

              Swal.fire('Success!', 'Category was saved.', 'success' );
              this.get();

            }, (err) => {

              Swal.fire('Ops!', err.message, 'error' );
              
            });

        });

    });

  }

  delete(item: CategoryModel){

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
        this._services.deleteCategory(item.id).subscribe( res => {

          Swal.fire('Success!', 'Category was deleted.', 'success' );
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
