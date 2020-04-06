const Volunteer = require('../mongo-models/users-volunteer');

const volunteerResolvers = {
  createVolunteer: ({ volunteerInput }) => {
    const newVolunteer = new Volunteer({
      email: volunteerInput.email,
      name: volunteerInput.name,
      password: volunteerInput.password,
      location: volunteerInput.location,
      distanceToTravel: volunteerInput.distanceToTravel,
      profilePhoto: volunteerInput.profilePhoto,
    });
    return newVolunteer.save().then(({ _doc }) => {
      return { ..._doc };
    });
  },
  volunteers: () => {
    return Volunteer.find().then((result) => {
      const output = result.map((user) => {
        return { ...user._doc, password: 'null' };
      });
      return output;
    });
  },
};

module.exports = { volunteerResolvers };
