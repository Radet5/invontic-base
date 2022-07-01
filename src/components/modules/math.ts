//From A Kunin - https://stackoverflow.com/users/1736537/a-kunin

export const round = (num: number, places: number): number => {
  if (!("" + num).includes("e")) {
    return parseFloat(
      +Math.round(parseFloat(`${num}e+${places}`)) + `e-${places}`
    );
  } else {
    const arr = ("" + num).split("e");
    let sig = "";
    if (+arr[1] + places > 0) {
      sig = "+";
    }

    return +(
      Math.round(parseFloat(`+${arr[0]}"e"${sig}${+arr[1] + places}`)) +
      `e-${places}`
    );
  }
};
