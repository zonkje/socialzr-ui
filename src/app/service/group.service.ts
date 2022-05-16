import {Group} from '../model/group.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class GroupService {
  groupsChanged = new Subject<Group[]>();

  private groups: Group[] = [];

  constructor(private http: HttpClient) {
  }

  private bearer: string = 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c2VybmFtZTEiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5Ij' +
    'oiVVNFUiJ9XSwiaWF0IjoxNjUyNzMyMjQyLCJleHAiOjE2NTYxMDgwMDB9.8WfSXP-necut9wem95awCN-NSOoAdYFQIcg8PQNxPXavDAZeeYUYdICxKNwQNr54';


  getGroups() {
    return this.http.get<Group[]>('http://localhost:8080/api/v1/social_group?size=7',
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      }
    ).pipe(
      tap(
        groups => {
          this.groups = groups;
          this.groupsChanged.next(this.groups);
        })
    );
  }

  getGroup(index: number) {
    return this.getGroupById(index);
  }

  addGroup(group: Group) {
    this.http.post<Group>('http://localhost:8080/api/v1/social_group', group,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getGroups().subscribe();
          this.groupsChanged.next(this.groups);
        }
      );
  }

  updateGroup(index: number, newGroup: Group) {
    this.http.patch<Group>('http://localhost:8080/api/v1/social_group', newGroup,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getGroups().subscribe();
          this.groupsChanged.next(this.groups);
        }
      );
  }

  deleteGroup(index: number) {
    this.http.delete('http://localhost:8080/api/v1/social_group/' + index,
      {
        headers: new HttpHeaders()
          .set('Authorization', this.bearer)
      })
      .subscribe(
        response => {
          this.getGroups().subscribe();
          this.groupsChanged.next(this.groups);
        }
      );
  }

  private getGroupById(groupId: number): Group {
    for (let group of this.groups) {
      if (group.id === groupId) {
        return group;
      }
    }
    return null;
  }

}
