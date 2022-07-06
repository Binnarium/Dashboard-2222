import firebase from "firebase/compat";
export interface UserRoleDto {
  isAdmin: boolean;
}
export interface UserDto extends UserRoleDto, firebase.User {
}
