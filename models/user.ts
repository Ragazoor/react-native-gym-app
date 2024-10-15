type BaseUser = {
  id: number;
  firstName: string;
  lastName: String;
};

export type Staff = BaseUser;

export function parseStaff(data: any): Staff {
  try {
    return {
      id: data.id,
      firstName: data.firstname,
      lastName: data.lastname,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing user");
  }
}

export type User = BaseUser & {
  email: string;
  gender: string;
};

export function parseUser(data: any): User {
  try {
    return {
      id: data.id,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.mail,
      gender: data.gender,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing user");
  }
}
