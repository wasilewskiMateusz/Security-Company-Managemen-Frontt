import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {RoleService} from '../user/services/role.service';

@Directive({
  selector: '[appIfRole]'
})
export class IfRoleDirective implements OnInit{

  // the role the user must have

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private rolesService: RoleService
  ) {
  }

  @Input() public appIfRole: string;

  public ngOnInit(): void {
    this.rolesService.loggedUserCurrentRole.subscribe( role => {
      if (this.appIfRole === role) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
