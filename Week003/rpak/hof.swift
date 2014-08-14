#!/usr/bin/env xcrun swift

func foldFromLeft<T>(folder: ([T], T) -> [T], let accumulator: [T], let items: [T]) -> [T] {
  if items.isEmpty {
    return accumulator
  }
  else {
    let result = folder(accumulator, items[0])
    let lastItemIndex = items.count - 1
    let rightSide = lastItemIndex == 0 ? [T]() : [T](items[1...lastItemIndex])
    return foldFromLeft(folder, result, rightSide)
  }
}

func foldFromRight<T>(folder: ([T], T) -> [T], let accumulator: [T], let items: [T]) -> [T] {
  let reversedItems = items.reverse()
  return foldFromLeft(folder, accumulator, reversedItems)
}

func mapListFromLeft<T>(operation: (T) -> T, let items: [T]) -> [T] {
  func folder(memo: [T], item: T) -> [T] {
    return memo + [operation(item)]
  }
  return foldFromLeft(folder, [T](), items)
}

func filterListFromLeft<T>(predicate: (T) -> Bool, let items: [T]) -> [T] {
  func folder(memo: [T], item: T) -> [T] {
    let filter = !predicate(item)
    return filter ? memo : memo + [item]
  }
  return foldFromLeft(folder, [T](), items)
}

func findInList<T>(predicate: (T) -> Bool, let items: [T]) -> T? {
  let matches = filterListFromLeft(predicate, items)
  return matches.isEmpty ? nil : matches[0]
}

let foldedFromLeft = foldFromLeft({(memo, item) -> [Int] in return memo + [item]}, [], [5, 4, 25])
let foldedFromRight = foldFromRight({(memo, item) -> [Int] in return memo + [item]}, [], [5, 4, 25])
let mappedListFromLeft = mapListFromLeft({(item) -> Int in return item * 2}, [10, 20, 30])
let filteredListFromLeft = filterListFromLeft({(item) -> Bool in return item == 2}, [1, 2, 3, 2])
let foundInList = findInList({(item) -> Bool in return item == 2}, [1, 2, 3, 2])

/**
 * Tests
 */

func expect(result: [Int], expectation: [Int]) {
  result == expectation ? print(".") : print("F")
}

expect(foldedFromLeft, [5, 4, 25])
expect(foldedFromRight, [25, 4, 5])
expect(mappedListFromLeft, [20, 40, 60])
expect(filteredListFromLeft, [2, 2])
foundInList == 2 ? print(".") : print("F")

println("")
