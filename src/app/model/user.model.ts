export class User {
    constructor(
        public id: number,
        public createDate: string,
        public lastModifiedDate: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public avatarUrl: string,
        public contactInformationId?: number,
      ) {
      }
}
