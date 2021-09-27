Parse.Cloud.define("userRegister", async (request) => {
  try {
    const { username, email, password } = request.params;

    if (!username || !email || !password)
      return "Les champs username, email et password doivent être remplis";
    let result;
    result = "L'utilisateur n'as pas pu être créer ";

    const myUser = new Parse.User();
    myUser.setUsername(`${username}`);
    myUser.setEmail(`${email}`);
    myUser.setPassword(`${password}`);
    result = await myUser
      .signUp()
      .then((rsy: any) => {
        return rsy;
      })
      .catch((err: any) => {
        console.log("💡 Cloud signUp err =|>", err);
        if (err.code === 202) return err.message;
      });
    return result;
  } catch (error) {
    console.log("💡 Cloud userRegister error =|>", error);
  }
});

Parse.Cloud.define("userTakeAppointment", async (request) => {
  try {
    const { medicLastName, startAt, userId } = request.params;
    let result;

    if (!medicLastName || !startAt)
      return "Les champs medicLastName, startAt doivent être remplis";

    const params = { medicLastName, startAt };
    const medicAvailability = await Parse.Cloud.run(
      "medicListAvailability",
      params
    ).catch((erreur) => {
      return "Pas de disponibilité trouvé vérifier le nom de médecin" + erreur;
    });

    const arrayOfAvailability = new Array();
    medicAvailability.result[0].availability.map((value: any) => {
      arrayOfAvailability.push(new Date(value).getTime());
    });

    let valide: number = 0;
    valide = arrayOfAvailability.findIndex((value: any) => {
      return new Date(value).getTime() === new Date(startAt).getTime();
    });

    if (valide !== -1) {
      const queryUser = new Parse.Query("User");
      queryUser.equalTo("objectId", userId);

      const queryResultUser = await queryUser.find();
      const queryMedic = new Parse.Query("Medic");
      queryMedic.equalTo("lastName", medicLastName);

      const queryResultmedic = await queryMedic.find();
      const Appointment = Parse.Object.extend("Appointment");
      const myAppointment = new Appointment();

      const endAt = new Date(
        new Date(startAt).setMinutes(new Date(startAt).getMinutes() + 30)
      );
      myAppointment.set("medicBy", queryResultmedic[0]);
      myAppointment.set("userBy", queryResultUser[0]);
      myAppointment.set("startAt", new Date(startAt));
      myAppointment.set("endAt", endAt);
      myAppointment.set("checked", false);

      result = await myAppointment.save().then(
        (myAppointmentSave: any) => {
          return (
            "New myAppointment created with objectId: " + myAppointmentSave.id
          );
        },
        (error: any) => {
          return (
            "Failed to create new myAppointment, with error code: " +
            error.message
          );
        }
      );
    } else {
      result = "Le médecin n'as pas de disponibilité pour le : " + startAt;
    }
    return result;
  } catch (error) {
    console.log("💡 Cloud userTakeAppointment error =|>", error);
  }
});
