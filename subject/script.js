/*
  Nom : Marion Chatard
*/


// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE

// ===============

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculatrice</title>
  <style>
    input[type="button"] {
      width: 60px;
      height: 60px;
      font-size: 23px;
      margin: 5px;
    }
  </style>
</head>

<body>

  <div>
    <input type="button" value="7" onclick="appendToDisplay('7')">
    <input type="button" value="8" onclick="appendToDisplay('8')">
    <input type="button" value="9" onclick="appendToDisplay('9')">
    <input type="button" value="/" onclick="appendToDisplay('/')">
  </div>
  <div>
    <input type="button" value="4" onclick="appendToDisplay('4')">
    <input type="button" value="5" onclick="appendToDisplay('5')">
    <input type="button" value="6" onclick="appendToDisplay('6')">
    <input type="button" value="*" onclick="appendToDisplay('*')">
  </div>
  <div>
    <input type="button" value="1" onclick="appendToDisplay('1')">
    <input type="button" value="2" onclick="appendToDisplay('2')">
    <input type="button" value="3" onclick="appendToDisplay('3')">
    <input type="button" value="-" onclick="appendToDisplay('-')">
  </div>
  <div>
    <input type="button" value="0" onclick="appendToDisplay('0')">
    <input type="button" value="." onclick="appendToDisplay('.')">
    <input type="button" value="=" onclick="calculate()">
    <input type="button" value="+" onclick="appendToDisplay('+')">
  </div>