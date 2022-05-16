import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GroupService} from './group.service';
import {Group} from '../model/group.model';

@Injectable({providedIn: 'root'})
export class GroupsResolverService implements Resolve<Group[]>{

  constructor(private groupService: GroupService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group[]> | Promise<Group[]> | Group[] {
    return this.groupService.getGroups();
  }

}
