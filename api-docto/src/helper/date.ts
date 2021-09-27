import { Moment } from "moment";
import moment = require("moment");

export function capitalizeFirstLetter(myString: string) {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
}

export function arrayRemove(arr: any[], value: any) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}

type ValidDateInput = Moment | Date;

export function toMomentDate(
  date: ValidDateInput,
  format?: moment.MomentFormatSpecification
): Moment {
  const mo = moment(date as any, format);
  return mo;
}
