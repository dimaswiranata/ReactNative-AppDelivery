import React from 'react'
import { StyleSheet, Text, View, YellowBox } from 'react-native'
import Navigation from "./src/navigation";

const App = () => {
  YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead']);
  return <Navigation/>;
}

export default App

const styles = StyleSheet.create({})
