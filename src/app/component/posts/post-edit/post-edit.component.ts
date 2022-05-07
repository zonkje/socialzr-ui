import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../service/post.service';
import {Post} from '../../../model/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  editMode = false;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      let updatedPost: Post = this.postService.getPost(this.id);
      updatedPost['text'] = this.postForm.value['text'];
      updatedPost['postLabels'] = this.postForm.value['labels'].split(',');
      this.postService.updatePost(this.id, updatedPost);
    } else {
      const newPost = new Post(
        Math.ceil(Math.random() * 11),
        new Date(Date.now()).toDateString(),
        new Date(Date.now()).toDateString(),
        this.postForm.value['text'],
        Math.ceil(Math.random() * 11),
        this.postForm.value['labels'].split(','),
        Math.ceil(Math.random() * 11),
      );
      this.postService.addPost(newPost);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let postText = '';
    let postLabels = [];

    if (this.editMode) {
      const post = this.postService.getPost(this.id);
      postText = post.text;
      postLabels = post.postLabels;
    }

    this.postForm = new FormGroup({
      'text': new FormControl(postText, Validators.required),
      'labels': new FormControl(postLabels, Validators.required)
    });
  }
}
