import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 101));
  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState('Tente adivinhar o número entre 0 e 100');
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 101));
    setAttempts(5);
    setGuess('');
    setMessage('Tente adivinhar o número entre 0 e 100');
    setHistory([]);
    setGameOver(false);
  };

  const checkGuess = () => {
    const userGuess = parseInt(guess);
    
    if (isNaN(userGuess)) {  // Corrigido aqui
      Alert.alert('Valor inválido', 'Por favor, digite um número');
      return;
    }
  
    if (userGuess < 0 || userGuess > 100) {
      Alert.alert('Valor inválido', 'O número deve estar entre 0 e 100');
      return;
    }
  
    Keyboard.dismiss();
  
    if (userGuess === targetNumber) {
      setMessage(`Parabéns! Você acertou em ${6 - attempts} tentativas!`);
      setGameOver(true);
      return;
    }
  
    const newAttempts = attempts - 1;
    setAttempts(newAttempts);
    
    const hint = userGuess > targetNumber ? 'menor' : 'maior';
    setHistory([...history, { guess: userGuess, hint }]);
  
    if (newAttempts === 0) {
      setMessage(`Game Over! O número era ${targetNumber}.`);
      setGameOver(true);
    } else {
      setMessage(`O número é ${hint} que ${userGuess}. Tentativas restantes: ${newAttempts}`);
    }
  
    setGuess('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleBox}>
        <Text style={styles.titleText}>Jogo de Adivinhação</Text>
      </SafeAreaView>

      <View style={styles.content}>
        <Text style={styles.subTitle}>Adivinhe o número (0-100)</Text>

        <Text style={styles.messageText}>{message}</Text>
        
        {!gameOver && (
          <View>
            <Text style={styles.label}>Seu palpite:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setGuess}
              value={guess}
              placeholder='Digite um número...'
              keyboardType='numeric'
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={gameOver ? startNewGame : checkGuess}
        >
          <Ionicons 
            name={gameOver ? "refresh" : "checkmark"} 
            size={24} 
            color={"#edf2f4"} 
          />
          <Text style={styles.text}>
            {gameOver ? 'Jogar Novamente' : 'Verificar'}
          </Text>
        </TouchableOpacity>

        {history.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Tentativas anteriores:</Text>
            {history.map((item, index) => (
              <Text key={index} style={styles.historyItem}>
                {item.guess} (é {item.hint})
              </Text>
            ))}
          </View>
        )}
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#162a7d',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  titleText: {
    color: '#edf2f4',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 25,
    width: '100%',
    backgroundColor: '#ededed',
  },
  subTitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#162a7d',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#162a7d',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 18,
    borderColor: '#162a7d',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d61b1b',
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  text: {
    color: '#edf2f4',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 18,
    color: '#162a7d',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 15,
  },
  historyContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#162a7d',
  },
  historyTitle: {
    fontSize: 16,
    color: '#162a7d',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyItem: {
    fontSize: 15,
    color: '#d61b1b',
    marginVertical: 4,
  },
});