/** UserMVC model definitions **/

export interface UserModel {
  id: number;
  text: string;
  completed: boolean;
}

export namespace UserModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
