import { parse } from "../../app.js";
import faker = require("faker");
import { User } from "parse";

export const checkFirstTime = async (): Promise<boolean> => {
  const Medic = parse.Object.extend("Medic");
  const query = new parse.Query(Medic);
  query.count;
  const results = await query.find();
  return results.length > 0 ? false : true;
};

export const firstTime = async (): Promise<void> => {
  if (await checkFirstTime()) {
    try {
      const Medic = parse.Object.extend("Medic");
      const Availablity = parse.Object.extend("Availablity");

      const weekdays = [
        {
          day: "Dimanche",
        },
        {
          day: "Lundi",
          amStart: 8.3,
          amEnd: 12.0,
          pmStart: 13.3,
          pmEnd: 18.0,
        },
        {
          day: "Mardi",
          amStart: 8.3,
          amEnd: 12.0,
          pmStart: 13.3,
          pmEnd: 18.0,
        },
        {
          day: "Mercredi",
          amStart: 8.3,
          amEnd: 12.0,
          pmStart: 13.3,
          pmEnd: 18.0,
        },
        {
          day: "Jeudi",
          amStart: 8.3,
          amEnd: 12.0,
          pmStart: 13.3,
          pmEnd: 18.0,
        },
        {
          day: "Vendredi",
          amStart: 9.3,
          amEnd: 12.0,
          pmStart: 15.3,
          pmEnd: 22.0,
        },
        { day: "Samedi", amStart: 8.3, amEnd: 11.3 },
      ];

      for (let index = 0; index < 4; index++) {
        const myMedic = new Medic();
        myMedic.set("lastName", faker.name.lastName());
        myMedic.set("firstName", faker.name.firstName());

        const nameUser = faker.name.lastName();
        const myUser = new Parse.User();
        myUser.setUsername(nameUser);
        myUser.setEmail(`${nameUser}@test.com`);
        myUser.setPassword(`${nameUser}Password`);
        console.log(
          "💡 nameUser  =|> Email + `${nameUser}@test.com` + `Password : ` + `${nameUser}Password`"
        );
        const Appointment = parse.Object.extend("Appointment");
        const myAppointment = new Appointment();

        myAppointment.set("medicBy", myMedic);
        myAppointment.set("userBy", myUser);
        myAppointment.set("startAt", new Date());
        myAppointment.set("endAt", new Date());
        myAppointment.set("checked", true);

        // Create the Availablity
        const myAvailablity = new Availablity();
        myAvailablity.set("availablity", weekdays);
        myAvailablity.set("holidayStartAt", Date);
        myAvailablity.set("holidayEndAt", Date);
        myAvailablity.set("medic", myMedic);

        await myUser.signUp().then(
          (myUserSave: any) => {
            console.log(
              "New myUserSave created with objectId: " + myUserSave.id
            );
          },
          (error: any) => {
            console.log(
              "Failed to create new myUserSave, with error code: " +
                error.message
            );
          }
        );

        await myAvailablity.save().then(
          (myAvailablitySave: any) => {
            console.log(
              "New myAvailablity created with objectId: " + myAvailablitySave.id
            );
          },
          (error: any) => {
            console.log(
              "Failed to create new myAvailablity, with error code: " +
                error.message
            );
          }
        );
        await myMedic.save().then(
          (myMedicSave: any) => {
            console.log("New myMedic created with objectId: " + myMedicSave.id);
          },
          (error: any) => {
            console.log(
              "Failed to create new myMedic, with error code: " + error.message
            );
          }
        );
        await myAppointment.save().then(
          (myAppointmentSave: any) => {
            console.log(
              "New myAppointment created with objectId: " + myAppointmentSave.id
            );
          },
          (error: any) => {
            console.log(
              "Failed to create new myAppointment, with error code: " +
                error.message
            );
          }
        );
      }
      console.log("💡  Initialisation de la DB ✅");
    } catch (error) {
      console.log("🔴 Erreur lors de l'initialisation de la DB =>", error);
    }
  }
};
