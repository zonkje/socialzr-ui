export class Group {
  constructor(
    public id: number,
    public createDate: string,
    public lastModifiedDate: string,
    public name: string,
    public description: string,
    public avatarUrl: string,
    public creatorId: number,
    public accessLevel: string
  ) {
  }
}
