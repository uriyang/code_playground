fun main(args: Array<String>) {
  var letters = ('a'..'z').toList()
  println(letters.slice<Char>(0..2))
  println(letters.slice<Char>(10..13))
}