export class User {
  //TODO: -add role/isAdmin field
    constructor(
        public id: number,
        public createDate: string,
        public lastModifiedDate: string,
        public firstName: string,
        public lastName: string,
        public avatarUrl: string,
        public contactInformationId?: number,
      ) {
      }
}
