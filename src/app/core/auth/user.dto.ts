import firebase from "firebase";
export interface UserRoleDto {
  isAdmin: boolean;
}
export interface UserDto extends UserRoleDto, firebase.User {
}
