import { Injectable } from '@angular/core';
import { winnerCombinations } from '../constants';
import { IPlayerCeils } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckChanceToWinService {
  checkChanceToWin = ({ X, O }: IPlayerCeils) => {
    const numberOfOccupiedCells = X.length + O.length;
    if (numberOfOccupiedCells < 6) return true;
    if (numberOfOccupiedCells === 9) return false;

    const array = new Array(9).fill(null).map((_, index) => index);
    const lastVariants = array.filter((item) => ![...X, ...O].includes(item));

    let isXHaveVariants = winnerCombinations.some((combination) =>
      combination.every((index) => [...X, ...lastVariants].includes(index))
    );

    if (numberOfOccupiedCells % 2) {
      const possibleRemainingOptions = lastVariants.reduce<number[][]>(
        (acc, _, index, arr) => {
          const newArr = [...arr];
          newArr.splice(index, 1);
          acc.push([...X, ...newArr]);

          return acc;
        },
        []
      );

      isXHaveVariants = possibleRemainingOptions.some(possibleOption => {
        return winnerCombinations.some((combination) =>
          combination.every((index) => possibleOption.includes(index))
        )
      })
    }

    const isOHaveVariants = winnerCombinations.some((combination) =>
      combination.every((index) => [...O, ...lastVariants].includes(index))
    );

    return isXHaveVariants || isOHaveVariants;
  };
}
