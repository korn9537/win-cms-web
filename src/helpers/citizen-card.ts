export function isValidCitizenCard(card_number: string) {
  if (card_number == null || card_number.length != 13) {
    return false;
  }

  let b = 0;
  let check = 0;
  let checksum = parseInt(card_number.substring(12, 13));
  for (let i = 0; i < 12; i++) {
    b = b + parseInt(card_number.substring(i, i + 1)) * (13 - i);
  }
  let tmp = 11 - (b % 11);
  switch (tmp) {
    case 11:
      check = 1;
      break;
    case 10:
      check = 0;
      break;
    default:
      check = tmp;
  }
  return check == checksum;
}
