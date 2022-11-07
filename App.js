import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [value, setValue] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const [operationEquals, setOperationEquals] = useState(null);

  const handleClick = number => {
    const display = displayValue === '0' || clearDisplay;

    if (number === '.' && !display && displayValue.includes('.')) {
      return;
    }

    const currentValue = display ? '' : displayValue;
    const newDisplayValue = currentValue + number;
    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (number !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const newValueArray = [...value];
      newValueArray[current] = newValue;
      setValue(newValueArray);
    }
  };

  const clearMemory = () => {
    setDisplayValue('0');
    setOperation(null);
    setClearDisplay(false);
    setValue([0, 0]);
    setCurrent(0);
    setOperationEquals(null);
  };

  const handleResult = () => {
    if (current === 1) {
      const values = [...value];
      values[0] = eval(`${values[0]} ${operation} ${values[1]}`);

      setDisplayValue(`${values[0]}`);
    }
  };

  const handleOperation = operation => {
    if (current === 0) {
      setCurrent(1);
      setOperation(operation);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const values = [...value];

      console.debug(values, operation);
      console.debug(`${values[0]} ${operation} ${values[1]}`);
      try {
        values[0] = eval(`${values[0]} ${operation} ${values[1]}`);
      } catch (e) {
        values[0] = value[0];
      }

      values[1] = 0;
      setDisplayValue(`${values[0]}`);
      setOperation(equals ? null : operation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(true);
      setValue(values);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={handleOperation} />
        <Button label="7" onClick={handleClick} />
        <Button label="8" onClick={handleClick} />
        <Button label="9" onClick={handleClick} />
        <Button label="*" operation onClick={handleOperation} />
        <Button label="4" onClick={handleClick} />
        <Button label="5" onClick={handleClick} />
        <Button label="6" onClick={handleClick} />
        <Button label="-" operation onClick={handleOperation} />
        <Button label="1" onClick={handleClick} />
        <Button label="2" onClick={handleClick} />
        <Button label="3" onClick={handleClick} />
        <Button label="+" operation onClick={handleOperation} />
        <Button label="0" double onClick={handleClick} />
        <Button label="." onClick={handleClick} />
        <Button label="=" operation onClick={handleResult} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
