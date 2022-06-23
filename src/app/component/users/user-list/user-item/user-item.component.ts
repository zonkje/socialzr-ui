import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onShowUser() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'user', this.index]));
  }

}
