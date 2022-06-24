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
  editMode = false;
  comment: PostComment;

  constructor(private commentService: CommentService,
              private scroller: ViewportScroller,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.parent.paramMap
      .subscribe(
        (params: Params) => {
          this.postId = params.get('id');
        }
      );

    this.route.params.subscribe(
      params => {
        if (typeof params['cid'] !== 'undefined') {
          this.editMode = true;
          this.commentService.getCommentById(params['cid'])
            .subscribe(
              (comment: PostComment) => {
                this.comment = comment;
                this.commentForm.patchValue({
                  text: this.comment.text
                });
              }
            );
        }
      }
    );
    this.scroller.scrollToAnchor('targetNewComment');
  }

  onSubmit() {
    const newComment = new PostComment(
      this.editMode ? this.comment.id : null,
      null,
      null,
      this.commentForm.value['text'],
      this.editMode ? this.comment.authorId : null,
      this.postId,
      null
    );
    if (this.editMode) {
      this.commentService.updateComment(newComment);
    } else {
      this.commentService.addComment(newComment);
    }
    this.onCancel();
  }

  private initForm() {
    this.commentForm = new FormGroup({
      'text': new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/', 'post', this.postId]));
  }

}
