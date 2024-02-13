import dayjs from "dayjs";

export interface IRegisterForm {
  fullName?: string;
  email?: string;
  dob?: dayjs.Dayjs;
  address?: string;
  city?: number;
  state?: number;
  zip?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
