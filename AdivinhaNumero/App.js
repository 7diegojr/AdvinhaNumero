import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons"

export default function App() {
  const [preco, setPreco] = useState(null);
  const [precoInicial, setPrecoInicial] = useState(null);
  const [porcent, setPorcent] = useState(null);
  const [ValorF, setValorF] = useState(null);
  const [textButton, setTextButton] = useState("% Calcular");
  const [messageValorF, setMessageValorF] = useState(null);

  function ValorFCalculator() {
    // preço * (1-(porcentagemDesc/100))
    setValorF((preco * (1-(porcent/100))).toFixed(2))
  }

  function validateValorF() {
    if (porcent != null && preco != null)
    {
      Keyboard.dismiss();
      ValorFCalculator();
      setPrecoInicial(preco);
      setPreco(null);
      setPorcent(null);
      setTextButton("% Calcular novamente.");
      setMessageValorF("O preço do produto será:");
      return;  
    }
    setValorF(null);
    setTextButton("% Calcular");
    setMessageValorF(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleBox}>
      <Image style={styles.img} source={require('./assets/gallogo.png')}/>
        <Text style={styles.titleText}>Gallo Promo</Text>
      </SafeAreaView>

      <View style={styles.content}>
      <Text style={styles.subTitle} numberOfLines={1}>Calculadora de Promoções</Text>

      <View>
        <Text style={styles.label}>Preço do Produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPreco}
          value={preco ?? ''}
          placeholder='Digite o preço...'
          keyboardType='numeric'
        />
      </View>

      <View style={{ marginTop:25 }}>
        <Text style={styles.label}>Porcentagem do Desconto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPorcent}
          value={porcent ?? ''}
          placeholder='Digite o desconto...'
          keyboardType='numeric'
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => validateValorF()}
       >
        <Ionicons name={"calculator-sharp"} size={24} color={"#edf2f4"} />
        <Text style={styles.text}>{textButton}</Text>
      </TouchableOpacity>

      {ValorF && (
        <View style={styles.DescContainer}>
          <Text style={styles.ValorFText}>{messageValorF}</Text>
          <Text style={styles.DescValorF}>{`R$ ${ValorF}`}</Text>
          <Text style={styles.DescDesconto}>{`Valor descontado: R$ ${(precoInicial - ValorF).toFixed(2)}`}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:180,
    backgroundColor: '#162a7d',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  titleText: {
    color: '#edf2f4',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  content: {
    flex: 1,
    padding: 30,
    width: '100%',
    backgroundColor: '#ededed',
  },
  subTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: '#162a7d',
    fontWeight: 'bold',
    marginBottom: 28,
    marginTop:7,
  },
  label: {
    color: '#162a7d',
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    height: 48,
    width: '100%',
    fontSize: 18,
    borderColor: '#162a7d',
    borderWidth: 2,
    borderRadius: 18,
    marginVertical: 7,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d61b1b',
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: '#edf2f4',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  DescContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  DescValorF: {
    fontSize: 48,
    color: '#d61b1b',
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: '#162a7d',
    borderWidth: 2,
    padding: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  ValorFText: {
    fontSize: 18,
    color: '#162a7d',
    fontWeight: 'bold',
    marginTop:24,
  },
  img: {
    width: 120,
    height: 120,
    marginRight: 10,
    marginTop: 22,
  },
  DescDesconto: {
    fontSize: 17,
    color: '#d61b1b',
    fontWeight: 400,
    marginTop: 5,
  },
});