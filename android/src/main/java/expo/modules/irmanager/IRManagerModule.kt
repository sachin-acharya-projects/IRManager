package expo.modules.irmanager

// ConsumerIrManager
import android.hardware.ConsumerIrManager.CarrierFrequencyRange
import android.hardware.ConsumerIrManager

// Android
import android.content.Context

// Expo Module Packages
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

private val ModuleName = "IRManager"

class IRManagerModule : Module() {
    override fun definition() = ModuleDefinition {
        Name(ModuleName)

        Function("hasIrBlaster"){
            return@Function hasIrBlaster()
        }

        Function("transmitProntoCode") {prontoHexCode: String -> 
            val result = transmitProntoCode(prontoHexCode)
            return@Function result
        }

        Function("getCarrierFrequencies"){
            return@Function getCarrierFrequencies()
        }

        Function("transmit"){carrierFrequency: Int, burstPattern: IntArray -> 
            val result = transmit(carrierFrequency, burstPattern)
            return@Function result
        }
    }

    fun transmit(carrierFrequency: Int, burstPattern: IntArray): Pair<String, Boolean> {
        val pattern: IntArray = IntArray(burstPattern.size)

        for(i in 0 until burstPattern.size) {
            pattern[i] = burstPattern[i].toInt()
        }

        try {
            irManager.transmit(carrierFrequency, pattern)
            return Pair("Transmission Successfull", true)
        } catch(e: Exception) {
            return Pair(e.toString(), false)
        }
    }

    fun getCarrierFrequencies(): Any {
        try {
            val carrierFrequencyRanges = irManager.getCarrierFrequencies()
            val frequenciesList = carrierFrequencyRanges.map {
                mapOf(
                    "minFrequency" to it.minFrequency,
                    "maxFrequency" to it.maxFrequency
                )
            }

            return Pair(frequenciesList, true)
        } catch(e: Exception) {
            return Pair(e.toString(), false)
        }
    }

    fun hasIrBlaster(): Boolean {
        return irManager.hasIrEmitter()
    }

    fun transmitProntoCode(prontoHexCode: String): Pair<String, Boolean> {
        val codeParts = prontoHexCode.split(" ")

        val prontoClockFrequency = codeParts[1].toInt(radix = 16)
        val exactCarrierFrequency = 1000000.0 / (prontoClockFrequency * 0.241246)

        val carrierFrequency = exactCarrierFrequency.toInt()
        val firstSequenceBurstPairs = codeParts[2].toInt(radix = 16)
        val secondSequenceBurstPairs = codeParts[3].toInt(radix = 16)
        val patternSize = (firstSequenceBurstPairs * 2) + (secondSequenceBurstPairs * 2)
        val pattern = IntArray(patternSize)

        var i = 0
        var firstPairIndex = 4
        var secondPairIndex = firstPairIndex + (firstSequenceBurstPairs * 2)

        for (j in firstPairIndex until secondPairIndex) {
            pattern[i] = codeParts[j].toInt(radix = 16) * (1000000 / carrierFrequency)
            i++
        }

//        secondPairIndex = secondPairIndex + (secondSequenceBurstPairs * 2)
        for (j in secondPairIndex until secondPairIndex + (secondSequenceBurstPairs * 2)) {
            pattern[i] = codeParts[j].toInt(radix = 16) * (1000000 / carrierFrequency)
            i++
        }

        try {
            irManager.transmit(carrierFrequency, pattern)
            return Pair("Transmission Successfull", true)
        } catch (e: Exception) {
            return Pair(e.toString(), false)
        }
    }

    val context: Context
        get() = requireNotNull(appContext.reactContext) {"React Application Context is null"}

    private val irManager: ConsumerIrManager
        get() = context.getSystemService(Context.CONSUMER_IR_SERVICE) as ConsumerIrManager
}
