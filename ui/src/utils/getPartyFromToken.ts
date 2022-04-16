import jwt_decode from "jwt-decode";

export const partyFromToken = (token: string) => {
  try {
    const decoded = jwt_decode(token);
    const party = decoded["https://daml.com/ledger-api"].actAs.shift()
    return party
  } catch (e) {
    return undefined;
  }
}