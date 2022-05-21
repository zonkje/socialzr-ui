export class PostComment {
  constructor(
    public id: number,
    public createDate: string,
    public lastModifiedDate: string,
    public text: string,
    public authorId: number,
    public postId: number,
    public commentThumbUpCount: number
  ) {
  }
}
