import { UserAddress } from "./user-address.model";

export class UserContactInformation {
    constructor(
        public id: number,
        public createDate: string,
        public lastModifiedDate: string,
        public email: string,
        public phoneNumber: string,
        public websitesURLs: string[],
        public address: UserAddress 
      ) {
      }
}