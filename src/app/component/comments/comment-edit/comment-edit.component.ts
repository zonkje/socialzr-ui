import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../../service/comment.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostComment} from '../../../model/post-comment.model';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  commentForm: FormGroup;
  postId: number;
  editMode = false; // tu
  comment: PostComment;

  constructor(private commentService: CommentService,
              private scroller: ViewportScroller,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.parent.paramMap
      .subscribe(
        (params: Params) => {
          this.postId = params.get('id');
        }
      );

    this.scroller.scrollToAnchor('targetNewComment');
    this.initForm();
  }

  onSubmit() {
    const newComment = new PostComment(
      null,
      null,
      null,
      this.commentForm.value['text'],
      null,
      this.postId,
      null
    );
    this.commentService.addComment(newComment);
    this.onCancel();
  }

  private initForm() {
    console.log(this.editMode);
    let commentText = '';

    if (this.editMode) {
      commentText = this.comment.text;
    }

    this.commentForm = new FormGroup({
      'text': new FormControl(commentText, Validators.required)
    });
  }

  onCancel() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'post', this.postId]));
  }

}
