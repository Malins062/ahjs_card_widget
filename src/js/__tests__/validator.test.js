import { isValidCard } from '../validators';

test.each([
  ['true for valid card number', '2200240768512994', true],
  ['true for valid card number', '5346028387436812', true],
  ['true for valid card number', '3529992726838059', true],
  ['true for valid card number', '4556737586899855', true],
  ['true for valid card number', '36471414338070', true],
  ['false for invalid card number', '2200240768512991', false],
  ['false for invalid card number', ' ', false],
  ['false for invalid card number', ' assa', false],
  ['false for invalid card number', '36471414338070 ', false],
])(('it should be %s'), (_, input, expected) => {
  expect(isValidCard(input)).toBe(expected);
});
