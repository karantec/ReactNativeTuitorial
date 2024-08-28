import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import axios from 'axios';

const App = () => {
  const [latitude, setLatitude] = useState('23.3441');
  const [longitude, setLongitude] = useState('85.3096');
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: 'https://img.freepik.com/free-psd/3d-icon-weather-conditions-with-rain-sun_23-2150108737.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724630400&semt=ais_hybrid' }} // Replace with your logo URL
          style={styles.logo}
        />
        <Text style={styles.title}>Weather App</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter latitude"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter longitude"
          value={longitude}
          onChangeText={setLongitude}
        />
      </View>
      <Button title="Get Weather" onPress={fetchWeather} />

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherHeader}>Current Weather</Text>
          <Text style={styles.weatherText}>Temperature: {weather.current_weather.temperature}°C</Text>
          <Text style={styles.weatherText}>Condition: {weather.current_weather.weathercode}</Text>
          <Text style={styles.weatherText}>Wind Speed: {weather.current_weather.windspeed_10m} km/h</Text>
          <Text style={styles.weatherText}>Humidity: {weather.current_weather.relative_humidity_2m} %</Text>

          <Text style={styles.weatherHeader}>Hourly Forecast</Text>
          {weather.hourly.temperature_2m && weather.hourly.temperature_2m.map((temp, index) => (
            <Text key={index} style={styles.weatherText}>
              Hour {index + 1}: {temp}°C
            </Text>
          ))}

          <Text style={styles.weatherHeader}>Daily Forecast</Text>
          <Text style={styles.weatherText}>Max Temp: {weather.daily.temperature_2m_max[0]}°C</Text>
          <Text style={styles.weatherText}>Min Temp: {weather.daily.temperature_2m_min[0]}°C</Text>
          <Text style={styles.weatherText}>Precipitation: {weather.daily.precipitation_sum[0]} mm</Text>
          <Text style={styles.weatherText}>Sunrise: {weather.daily.sunrise[0]}</Text>
          <Text style={styles.weatherText}>Sunset: {weather.daily.sunset[0]}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.5, // Adjust the width as needed
    height: width * 0.3, // Adjust the height as needed
    resizeMode: 'contain',
    marginTop: 40,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: width * 0.9,
  },
  weatherContainer: {
    marginTop: 20,
  },
  weatherHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
