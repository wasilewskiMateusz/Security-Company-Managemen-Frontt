import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleService} from '../../../user/services/role.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {

  pickedRole: string;

  constructor(
    public dialogRef: MatDialogRef<ChangeRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { version: string, id: number },
    public roleService: RoleService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.pickedRole = this.roleService.loggedUserCurrentRole.getValue();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  changeCurrentRole(): void {
    this.dialogRef.close();
    this.router.navigate(['home']);
    this.roleService.loggedUserCurrentRole.next(this.pickedRole);
  }
}
