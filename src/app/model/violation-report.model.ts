export class ViolationReport {
  constructor(
    public id: number,
    public createDate: string,
    public lastModifiedDate: string,
    public text: string,
    public authorId: number,
    public reportedUserId: number
  ) {
  }
}
