fun main(args: Array<String>) {
    val authors = listOf("Dmitry", "Svetlana")
    val readers = mutableListOf<String>(/* ... */)
    readers.filter { it !in authors }
}

fun <T> List<T>.filter(predicate: (T) -> Boolean): List<T>