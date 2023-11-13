import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IComment, IComments, IRole } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  @Input() taskId!: string;
  @Output() commentCountChanged: EventEmitter<number> =
    new EventEmitter<number>();
  isLoading: boolean = false;
  IRole!: IRole;
  imageUrl = '../../../assets/noavatar.jpg';
  comment!: IComment;
  employeeName!: string;
  employeeId!: string;
  comments!: IComments[];
  editting: boolean = false;
  editedCommentText: string = '';
  commentId: string = '';
  edittingCommentId: string | null = null;
  text: string = '';

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.loadEmployeePhoto();
    this.getTaskComments();
  }

  loadEmployeePhoto() {
    this.employeeService.getEmployeeData().subscribe({
      next: (res) => {
        this.employeeName = res.employee.employeeName;
        this.employeeId = res.employee._id;

        if (
          res.employee.profile_photo &&
          res.employee.profile_photo.secure_url
        ) {
          this.imageUrl = res.employee.profile_photo.secure_url;
        } else {
          this.imageUrl = '../../../assets/noavatar.jpg';
        }
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
  addCommentForm = this.formBuilder.group({
    comment: ['', [Validators.required]],
  });

  addComment() {
    this.isLoading = true;
    const comment = this.addCommentForm.get('comment')?.value;
    this.commentService.addTaskComment(this.taskId, comment!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.getTaskComments();
        this.addCommentForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getTaskComments() {
    this.commentService.getComments(this.taskId).subscribe({
      next: (res) => {
        this.comments = res.comments;
        this.reverseComments();
        this.commentCountChanged.emit(this.comments.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEditting(commentId: string) {
    if (commentId === this.edittingCommentId) {
      this.edittingCommentId = null;
      this.editedCommentText = '';
    } else {
      this.edittingCommentId = commentId;
      const commentToEdit = this.comments.find(
        (comment) => comment._id === commentId
      );
      if (commentToEdit) {
        this.editedCommentText = commentToEdit.text;
        this.commentId = commentId;
      }
    }
  }

  editCommentForm = this.formBuilder.group({
    textEditted: [this.editedCommentText, [Validators.required]],
  });
  editComment() {
    this.isLoading = true;
    const textEditted = this.editCommentForm.get('textEditted')?.value;
    this.commentService
      .editTaskComment(this.commentId, textEditted!)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          const updatedComment = this.comments.find(
            (comment) => comment._id === this.commentId
          );

          if (updatedComment) {
            updatedComment.text = res.comment.text;
          }
          this.edittingCommentId = null;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  reverseComments() {
    this.comments = this.comments.slice().reverse();
  }
}
