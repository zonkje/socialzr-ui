import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../model/post.model';
import {PostService} from '../../../../service/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  onSelected() {
    this.postService.postSelected.emit(this.post)
  }
}
