import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useEffect } from "react"

import transmitProntoCode from "ir-manager"
import * as IRManager from "ir-manager"

const SAMSUNG_TURN_ON_PRONTO_CODE =
    "0000 006d 0022 0003 00a9 00a8 0015 003f 0015 003f 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 003f 0015 003f 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0015 0015 003f 0015 003f 0015 003f 0015 003f 0015 003f 0015 003f 0015 0702 00a9 00a8 0015 0015 0015 0e6e"

export default function App() {
    function sendIRSignal() {
        const result = transmitProntoCode(SAMSUNG_TURN_ON_PRONTO_CODE)
        console.log("Did signal transmitted correctly?", result)
    }

    useEffect(() => {
        console.log(
            "What are my Carrier Frequencies?",
            IRManager.getCarrierFrequencies()
        )
    })

    return (
        <View style={styles.container}>
            <Text numberOfLines={2} style={styles.text}>
                {IRManager.hasIrBlaster()
                    ? "Your Device Support IR Transmission"
                    : "Your Device Doesn't Support IR Transmission"}
            </Text>

            <TouchableOpacity onPress={sendIRSignal}>
                <Text style={styles.button}>Send IR Signal</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        padding: 15,
        backgroundColor: IRManager.hasIrBlaster() ? "#ECFDF3" : "#FFF0F0",
        color: IRManager.hasIrBlaster() ? "#008A2E" : "#E60000",
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        // width: 100,
        // height: 50,
        backgroundColor: "dodgerblue",
        color: "white",
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000000",
        elevation: 10,
    },
})
