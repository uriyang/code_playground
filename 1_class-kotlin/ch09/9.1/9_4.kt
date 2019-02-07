fun <T> ensureTrailingPeriod(seq: T)
    where T: CharSequence, T: Appendable {
        if (!seq.endsWith('.')) {
            seq.append('.')
        }
    }

fun main(args: Array<String>) {
    val helloWorld = StringBuilder("Hello World")
    ensureTrailingPeriod(helloWorld)
    println(helloWorld)
}