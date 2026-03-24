import { useRef, useState } from "react";
import { Text, View, StyleSheet, Image, useWindowDimensions  } from "react-native";
import { FokusButton } from "../components/FokusButton";
import { ActionButton } from "../components/ActionButton";
import { Timer } from "../components/Timer";
import { IconPause, IconPlay } from "../components/icons"

const pomodoro = [
  {
    id: 'focus',
    initialValue: 25,
    image: require('./pomodoro.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue: 5,
    image: require('./short.png'),
    display: 'Pausa Curta'
  },
  {
    id: 'long',
    initialValue: 15,
    image: require('./long.png'),
    display: 'Pausa Longa'
  }
]

export default function Index() {

  const { width, height } = useWindowDimensions();

  const [timerType, setTimerType] = useState(pomodoro[0]);

  const timeRef = useRef(null)

  const [timerRuning, setTimerRunning] = useState(false)

  const [seconds, setSeconds] = useState(pomodoro[0].initialValue)

  const clearTimer = () => {
    if (timeRef.current != null) {
      clearInterval(timeRef.current)
      timeRef.current = null
      setTimerRunning(false)
    }
  }

  const toogleTimerType = (timerType) => {
    setTimerType(timerType)
    setSeconds(timerType.initialValue)
    clearTimer()
  }

  const toogleTimer = () => {
    if (timeRef.current) {
      clearTimer()
      return
    }
    setTimerRunning(true)
    const id = setInterval(() => {
      setSeconds((oldState) => {
        if (oldState <= 0) {
          clearTimer()
          return timerType.initialValue
        }
        return oldState - 1
      })
      console.log('Timer rolando')
    }, 1000)
    timeRef.current = id

  }

  return (
    <View style={styles.container}>
      <Image
        source={timerType.image}
        style={{
          width: width * 0.6,   
          height: height * 0.3,
          resizeMode: 'contain'
        }} />
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map((pomodoroType) => (
            <ActionButton
              Key={pomodoroType.id}
              active={timerType.id === pomodoroType.id}
              onPress={() => toogleTimerType(pomodoroType)}
              display={pomodoroType.display}
            />
          ))}
        </View>
        <Timer
          totalSeconds={seconds}
        />
        <FokusButton
          onPress={toogleTimer}
          title={timerRuning ? 'Pausar' : 'Começar'}
          icons={timerRuning ? <IconPause /> : <IconPlay />} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto criado para praticar React Native.
        </Text>
        <Text style={styles.footerText}>
          Utilizando o método Pomodoro para aumentar a produtividade.
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap: 40
  },
  actions: {
    padding: 24,
    backgroundColor: '#14448080',
    width: '80%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
    gap: 32
  },
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    width: '80%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontStyle: 12.5
  }
})