export class Post {
  constructor(
    public id: number,
    public createDate: string,
    public lastModifiedDate: string,
    public text: string,
    public authorId: number,
    public postLabels: string[],
    public postThumbUpCount: number
  ) {
  }
}
