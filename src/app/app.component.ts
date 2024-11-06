import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './Services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatSnakBarService } from './Services/mat-snak-bar.service';
import { MatSort } from '@angular/material/sort';
import { UserFormComponent } from './Components/user-form/user-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterOutlet,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    MatPaginator,
    MatToolbar,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'material-practice';
  displayedColumns: string[] = ['id', 'department', 'name', 'mobile', 'email', 'doj', 'gender', 'salary', 'usercode', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnakBarService, private _dialog: MatDialog, private _userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.getUsersList();
  }
  getUsersList() {
    this._userService.getUser().subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteuser(id: number) {
    console.log(id)
    this._userService.deleteUser(id).subscribe(res => {
      this._snackBar.openSnackBar('User Deleted Successfully!', 'Done');
      this.getUsersList();
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openUserForm() {
    const dialogRef = this._dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getUsersList();
      }
    })
  }

  openEditUserForm(data: any) {
    const dialogRef = this._dialog.open(UserFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getUsersList();
      }
    })
  }
}


