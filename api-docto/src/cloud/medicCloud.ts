import moment = require("moment");
import { capitalizeFirstLetter, toMomentDate } from "../helper/date";

moment.locale("fr");

// Recuperer les Dispo d'un medecin
Parse.Cloud.define("medicFullAvailability", async (request) => {
  try {
    const { medicLastName } = request.params;
    if (!medicLastName) return "Le champ medicLastName est obligatoir";

    const query = new Parse.Query("Medic");
    query.equalTo("lastName", medicLastName);

    const results = await query.find();
    if (results.length >= 1) {
      let result = "Pas de disponibilité";

      const medic = new Parse.User();
      medic.id = results[0].id;

      const Availablity = Parse.Object.extend("Availablity");
      const AvailablityQuery = new Parse.Query(Availablity);
      AvailablityQuery.equalTo("medic", medic);
      AvailablityQuery.descending("availablity");

      await AvailablityQuery.find()
        .then((rs: any) => {
          result = rs[0].attributes.availablity;
        })
        .catch((err: any) => {
          console.log("err ", err);
        });
      return result;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("💡 medicAvailability Cloud error =|>", error);
  }
});

Parse.Cloud.define("medicUpdateAvailability", async (request) => {
  try {
    const { medicLastName, availabilityatUpdate } = request.params;

    if (!medicLastName) return "Le champ medicLastName est obligatoir";

    const query = new Parse.Query("Medic");
    query.equalTo("lastName", medicLastName);
    let results;
    results = await query.find();
    if (results.length === 0) {
      const result =
        "Pas de disponibilité trouvé pour le medic : " + medicLastName;
      return result;
    }

    const params = { medicLastName };

    const medicAvailability: [
      {
        day: string;
        amStart: number;
        amEnd: number;
        pmStart: number;
        pmEnd: number;
      }
    ] = await Parse.Cloud.run("medicFullAvailability", params).catch(
      (erreur) => {
        return (
          "Pas de disponibilité trouvé vérifier le nom de médecin" + erreur
        );
      }
    );

    const availabilityOfTheDateType: {
      day: string;
      amStart: number;
      amEnd: number;
      pmStart: number;
      pmEnd: number;
    } = availabilityatUpdate;

    if (!availabilityOfTheDateType) {
      return "Le params availabilityOfTheDateType est obligatoir il doit être construit de la façon suivante availabilityOfTheDateType \
        day: string\
        amStart: number\
        amEnd: number\
          pmStart: number\
          pmEnd: number\
         ";
    }

    medicAvailability.map((value) => {
      if (value.day === availabilityOfTheDateType.day) {
        if (availabilityOfTheDateType.amEnd)
          value.amEnd = availabilityOfTheDateType.amEnd;
        if (availabilityOfTheDateType.amStart)
          value.amStart = availabilityOfTheDateType.amStart;
        if (availabilityOfTheDateType.pmStart)
          value.pmStart = availabilityOfTheDateType.pmStart;
        if (availabilityOfTheDateType.pmEnd)
          value.pmEnd = availabilityOfTheDateType.pmEnd;
      }
    });

    const availablity = Parse.Object.extend("Availablity");
    const queryAvailability = new Parse.Query(availablity);
    queryAvailability.equalTo("medic", results[0].id);
    results = await queryAvailability
      .first()
      .then((object: any) => {
        object.set("availablity", medicAvailability);
        object.save();
        return { newAvailability: medicAvailability, status: 200 };
      })
      .catch((object: any) => {
        return object;
      });
    return results;
  } catch (error) {
    console.log("💡  error =|>", error);
  }
});

// REcuperer les appointments d'un medecin pour un J
Parse.Cloud.define("medicAppointmentOfDay", async (request) => {
  try {
    const { startAt, endAt, medicLastName } = request.params;

    const medicObject = Parse.Object.extend("Medic");
    const medicquery = new Parse.Query(medicObject);
    medicquery.equalTo("lastName", medicLastName);
    let medic;

    await medicquery
      .find()
      .then((rs) => {
        medic = rs[0];
      })
      .catch((err) => console.log("medicquery erreur ", err));

    const appointmentByMedic: any[] = new Array();
    const query = new Parse.Query("Appointment");

    const start = new Date(startAt);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endAt ? endAt : startAt);
    end.setUTCHours(23, 59, 59, 999);

    query.equalTo("medicBy", medic);
    query.greaterThanOrEqualTo("startAt", start);
    query.lessThanOrEqualTo("startAt", end);
    await query
      .find()
      .then((rs) => {
        rs.forEach((value) => {
          console.log(value);
          appointmentByMedic.push({
            startAt: value.get("startAt"),
            endAt: value.get("endAt"),
            checked: value.get("checked"),
          });
        });
      })
      .catch((err) => console.log("appointmentByMedic erreur in find", err));
    return appointmentByMedic;
  } catch (error) {
    console.log("💡 medicAppointmentOfDay error =|>", error);
  }
});

// Listes des rendez-vous possible avec le medecin pour un jour
Parse.Cloud.define("medicListAvailabilityForADay", async (request) => {
  try {
    const { availabilityOfTheDate, startAt, medicLastName } = request.params;

    if (!availabilityOfTheDate.amStart && !availabilityOfTheDate.pmStart)
      return "Pas de donée valide";

    const startAmHour = availabilityOfTheDate.amStart.toString().split(".")[0];
    const endAmHour = availabilityOfTheDate.amEnd.toString().split(".")[0];

    const startPmHour = availabilityOfTheDate.pmStart.toString().split(".")[0];
    const endPmHour = availabilityOfTheDate.pmEnd.toString().split(".")[0];

    const startAmMinute = availabilityOfTheDate.amStart
      .toString()
      .split(".")
      .pop();
    const endAmMinute = availabilityOfTheDate.amEnd
      .toString()
      .split(".")
      .pop();

    const startPmMinute = availabilityOfTheDate.pmStart
      .toString()
      .split(".")
      .pop();

    const EndPmMinute = availabilityOfTheDate.pmEnd
      .toString()
      .split(".")
      .pop();

    const params: {
      startAt: string;
      medicLastName: string;
    } = { startAt, medicLastName };

    const medicAppointmentOfDay: [
      {
        startAt: string;
        endAt: string;
        checked: boolean;
      }
    ] = await Parse.Cloud.run("medicAppointmentOfDay", params).catch(
      (erreur) => {
        return "medicAppointmentOfDay =>" + erreur;
      }
    );

    const startAmDate = new Date(
      Date.UTC(
        startAt.split("-")[0],
        startAt.split("-")[1] - 1,
        startAt.split("-")[2],
        startAmHour,
        startAmMinute ? startAmMinute * 10 : 0,
        0
      )
    );

    const endAmDate = new Date(
      startAt.split("-")[0],
      startAt.split("-")[1] - 1,
      startAt.split("-")[2],
      endAmHour,
      endAmMinute ? endAmMinute * 10 : 0,
      0
    );

    const startPmDate = new Date(
      Date.UTC(
        startAt.split("-")[0],
        startAt.split("-")[1] - 1,
        startAt.split("-")[2],
        startPmHour,
        startPmMinute ? startPmMinute * 10 : 0,
        0
      )
    );

    const endPmDate = new Date(
      startAt.split("-")[0],
      startAt.split("-")[1] - 1,
      startAt.split("-")[2],
      endPmHour,
      EndPmMinute ? EndPmMinute * 10 : 0,
      0
    );

    const availabilityOfTheDay = new Array();
    const appointmentTaking = new Array();

    medicAppointmentOfDay.map((value) => {
      if (!appointmentTaking.includes(new Date(value.startAt).getTime())) {
        appointmentTaking.push(new Date(value.startAt).getTime());
      }
    });

    if (startAmHour && endAmHour) {
      for (
        const start = startAmDate;
        start <= endAmDate;
        start.setMinutes(start.getMinutes() + 30)
      ) {
        availabilityOfTheDay.push(new Date(start).getTime());
      }
    }

    if (startPmDate && endPmDate) {
      for (
        const start = startPmDate;
        start <= endPmDate;
        start.setMinutes(start.getMinutes() + 30)
      ) {
        availabilityOfTheDay.push(new Date(start).getTime());
      }
    }

    const difference = availabilityOfTheDay.filter(
      (x) => !appointmentTaking.includes(x)
    );
    const availability = new Array();

    difference.map((value) => {
      availability.push(new Date(value));
    });

    return availability;
  } catch (error) {
    console.log("💡  medicListAvailabilityForADay error =|>", error);
  }
});

// Les dispo d'un médecin
Parse.Cloud.define("medicListAvailability", async (request) => {
  try {
    const { medicLastName, startAt, endAt } = request.params;

    if (!medicLastName)
      return "Le champ medicLastName est obligatoir si vous ne précisez pas une date ou une période la date d'aujourd'hui seras utiliser pour vous donnez les disponibiliters du médecin";

    const params = { medicLastName };
    const medicAvailability: [
      {
        day: string;
        amStart: number;
        amEnd: number;
        pmStart: number;
        pmEnd: number;
      }
    ] = await Parse.Cloud.run("medicFullAvailability", params).catch(
      (erreur) => {
        return (
          "Pas de disponibilité trouvé vérifier le nom de médecin" + erreur
        );
      }
    );

    if (medicAvailability === undefined || !medicAvailability) {
      return "Pas de disponibilité trouvé vérifier le nom de médecin";
    }

    const dateStartSelected = startAt ? startAt : new Date();

    const dateRageSelected = [];
    if (endAt) {
      for (
        const start = new Date(dateStartSelected);
        new Date(start) <= new Date(endAt);
        start.setDate(start.getDate() + 1)
      ) {
        const m = toMomentDate(new Date(start));

        dateRageSelected.push(m.format("YYYY-MM-DD"));
      }
    } else {
      dateRageSelected.push(dateStartSelected);
    }
    let promiseOfMedicListAvailability: any;

    // day = dateRageSelected "dddd" exemple day = Vendredi
    promiseOfMedicListAvailability = dateRageSelected.map(async (day) => {
      const availabilityOfTheDay = medicAvailability.filter(
        (value) =>
          value.day.valueOf().toString() ===
          capitalizeFirstLetter(moment(new Date(day)).format("dddd"))
      );

      const paramsOneday: {
        availabilityOfTheDate: {
          day: string;
          amStart: number;
          amEnd: number;
          pmStart: number;
          pmEnd: number;
        };
        startAt: any;
        medicLastName: string;
      } = {
        availabilityOfTheDate: availabilityOfTheDay[0],
        startAt: toMomentDate(new Date(day)).format("YYYY-MM-DD"),
        medicLastName,
      };

      let promise: any;
      promise = await Parse.Cloud.run(
        "medicListAvailabilityForADay",
        paramsOneday
      )
        .then((result: any) => {
          return result;
        })
        .catch((erreur) => {
          return "medicListAvailabilityForADay =>" + erreur;
        });
      return promise;
    });

    const medicListAvailability = await Promise.all(
      promiseOfMedicListAvailability
    );

    const result: any[] = new Array();
    medicListAvailability.forEach((medicListAvailabilities: any) => {
      result.push({
        availability: medicListAvailabilities,
      });
    });

    return {
      result,
    };
  } catch (error) {
    console.log("💡 medicListAvailability Cloud error =|>", error);
  }
});
