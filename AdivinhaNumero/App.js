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
    
    if (isNaN(userGuess)) {
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
      <View style={styles.content}>
        <View style={styles.centeredContent}>
          <Text style={styles.titleText}>Jogo de Adivinhação</Text>
          <Text style={styles.subTitle}>Adivinhe o número (0-100)</Text>

          <Text style={styles.messageText}>{message}</Text>
          
          {!gameOver && (
            <View style={styles.inputContainer}>
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
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    width: '100%',
    backgroundColor: '#212121',
  },
  centeredContent: {
    width: '100%',
    maxWidth: 400, // Define uma largura máxima para melhor visualização
    alignItems: 'center',
  },
  titleText: {
    color: '#f5f2f2',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#f5f2f2',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#f5f2f2',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: '100%',
    maxWidth: 300,
    fontSize: 18,
    borderColor: '#0477db',
    borderWidth: 3,
    borderRadius: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0477db',
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  text: {
    color: '#f5f2f2',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 17,
    color: '#0477db',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 15,
  },
  historyContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#0477db',
    width: '100%',
    maxWidth: 300,
  },
  historyTitle: {
    fontSize: 16,
    color: '#0477db',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyItem: {
    fontSize: 15,
    color: '#030303',
    marginVertical: 4,
  },
});