const SquaresConfig4 = [
  ['A', 'B', 'C', 'D'],
  ['C', 'D', 'A', 'B'],
  ['B', 'A', 'D', 'C'],
  ['D', 'C', 'B', 'A']
]
module.exports = (participant) => {
  this.square = SquaresConfig4[(participant - 1) % 4];
}
