import {Group} from '../model/group.model';

export class GroupService {

  private groups: Group[] = [
    new Group(1, new Date(Date.now() - 259200000).toDateString(),
      new Date(Date.now()).toDateString(), 'Pioneers',
      'First group created on this page',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:A' +
      'Nd9GcSqy0HRIWeom9LxYBWpYIazrY8RHZyaviyK6Q&usqp=CAU', 1, 'PRIVATE'),
    new Group(2, new Date(Date.now() - (259200000 * 4)).toDateString(),
      new Date(Date.now()).toDateString(), '2nd Group',
      'Another created group',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR74z009L' +
      'Ohgc8y5mbz9wRn_6BEfegY8EC5-Q&usqp=CAU', 1, 'PUBLIC')
  ];

  getGroups(){
    return this.groups.slice();
  }

  getGroup(index: number){
    return this.groups[index];
  }

}
