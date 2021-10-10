// Copyright (c) 1999 by R. E. Mathis, III
// All rights reserved.
// Unauthorized use or duplication is prohibited.
function calcPV(inPMT, inFV, inNR, inNP, inC) {
 var outPV = inFV*Math.pow((1 + inNR/(100*inC)),(-inNP));
  if (inNR == 0) {
   outPV = outPV + inPMT*inNP;
  } else {
   outPV = outPV + inPMT*((1-(Math.pow((1 + inNR/(100*inC)),(-inNP))))/(inNR/(100*inC)));
  }
  return outPV;
}

function calcFV(inPMT, inPV, inNR, inNP, inC) {
 var outFV = inPV*Math.pow((1 + inNR/(100*inC)),(inNP));
  if (inNR == 0) {
   outFV = outFV + inPMT*inNP;
  } else {
   outFV = outFV + inPMT*((Math.pow((1 + inNR/(100*inC)),(inNP)) - 1)/(inNR/(100*inC)));
  }
  return outFV;
}

function calcPMT(inPV, inFV, inNR, inNP, inC) {
 var outPMT = 0;
  if (inPV != 0 && inFV != 0) {
   inPV *= -1;
  }
 if ((inNR > 0) && (inNP > 0)) {
  outPMT = (inPV - inFV*Math.pow(1+(inNR/(100*inC)),-inNP))/((1 - Math.pow(1+(inNR/(100*inC)),-inNP))/(inNR/(100*inC)));
  if (inFV != 0) {
   outPMT *= -1;
  }   
 } else if ((inNR == 0) && (inNP > 0)) {
  outPMT = (inPV - inFV)/inNP;
  if (inFV != 0) {
   outPMT *= -1;
  }   
 } else {
  alert("The number of periods must be greater than 0.");
  outPMT = "";
 }
 return outPMT;
}

function calcNR(inPMT, inPV, inFV, inNP, inC) {
 var outNR = 0.1; // initial guess
 var thePV1, thePV2, theDeriv;
 var theH = 0.00001;
 var i = 1;
 var theZeros = 0;
 var lastNR = outNR;
 //alert("PV " + inPV + " PMT " + inPMT + " FV " + inFV + " NP " + inNP);
 if (inNP <= 0) { // should throw an exception
  alert("The Nominal Rate cannot be computed.");
  return outNR = "";
 }
 if (inFV == 0) {
  theZeros++;
 } 
 if (inPMT == 0) {
  theZeros++;
 } 
 if (inPV == 0) {
  theZeros++;
  // inFV *= -1;
 }
 if (theZeros >= 2) { // should throw an exception
  alert("The Nominal Rate cannot be computed.");
  return outNR = "";
 }
 if ((inPV > 0) && (inPMT >= 0) && (inFV >= 0)) {
  alert("The Nominal Rate cannot be computed.");
  return outNR = "";
 }
 if ((inPV == 0) && (inPMT >= 0) && (inFV >= 0)) {
  alert("The Nominal Rate cannot be computed.");
  return outNR = "";
 }
 inPV *= -1;
 //thePV1 = calcPV(inPMT,inFV,outNR*100,inNP,inC);
 //alert("thePV1 " + thePV1 + " " + inPV);
 do {
  thePV1 = calcPV(inPMT,inFV,(outNR*100),inNP,inC) - inPV;
  theDeriv = ((calcPV(inPMT,inFV,((outNR+theH)*100),inNP,inC) - inPV) - thePV1)/theH;
  thePV2 = thePV1;
  //if ((theDeriv == 0) && (Math.abs(thePV2) > 0)) { // should throw an exception
  // alert("The Nominal Rate cannot be computed. 5");
  // return outNR = "";
  //}
  lastNR = outNR;
  outNR = outNR - thePV1/theDeriv;
  if (i > 200) { // should throw an exception
   alert("The Nominal Rate cannot be computed.");
   return outNR = "";
  }
  i++;
  if (thePV2 < 0) thePV2 *= -1;
 } while (thePV2 > 0.0001);
 return (lastNR*100); // maybe should change to give the previous rate 
}

function calcNP(inPMT, inPV, inFV, inNR, inC) {
 var outNP = 5; // initial guess
 var lastNP = outNP;
 var thePV1, thePV2, theDeriv;
 var theH = 0.001;
 var i = 1;
 var theZeros = 0;
 
 if (inNR <= 0) { // should throw an exception
  alert("The Number of Periods cannot be computed.");
  return outNP = "";
 }
 if (inFV == 0) {
  theZeros++;
 } 
 if (inPMT == 0) {
  theZeros++;
 } 
 if (inPV == 0) {
  theZeros++;
 }
 if (theZeros >= 2) { // should throw an exception
  alert("The Number of Periods cannot be computed.");
  return outNP = "";
 }
 if ((inPV > 0) && (inPMT >= 0) && (inFV >= 0)) {
  alert("The Number of Periodscannot be computed.");
  return outNP = "";
 }
 if ((inPV == 0) && (inPMT >= 0) && (inFV >= 0)) {
  alert("The Number of Periods cannot be computed.");
  return outNP = "";
 }
 inPV *= -1;
 if ((inPV == inFV) && ((inNR/(100*inC))*inFV == inPMT)) { // should throw an exception
  alert("The Number of Periods is not unique.");
  return outNP = "";// outNP can be any number
 }
 do {
  thePV1 = calcPV(inPMT,inFV,inNR,outNP,inC) - inPV;
  theDeriv = ((calcPV(inPMT,inFV,inNR,outNP+theH,inC) - inPV) - thePV1)/theH;
  thePV2 = thePV1;
  //if (theDeriv == 0) { // should throw an exception
  // return outN;
  //}
  lastNP = outNP;
  outNP = outNP - thePV1/theDeriv;
  if (i > 200) { // should throw an exception
   alert("The Number of Periods cannot be computed.");
   return outNP = "";
  }
  i++;
 } while (Math.abs(thePV2) > 0.0001);
 return lastNP; 
}

function findPV(form) {
  form.PmtxPer.value = "";
  var theFV = form.FVInput.value;
  if (!isNumber(theFV)) {
   return false;
  }
  if (theFV == "") theFV = 0;
  var thePMT = form.PMTInput.value;
  if (!isNumber(thePMT)) {
   return false;
  }
  if (thePMT == "") thePMT = 0;
  var theNP = form.NPInput.value;
  if (!isPositiveNumber(theNP)) {
   return false;
  }
  if (theNP == "") theNP = 0;
  var theNR = form.NRInput.value;
  if (!isPositiveNumber(theNR)) {
   return false;
  }
  if (theNR == "") theNR = 0;
  var theC;
  var theCompounding = form.CInput.selectedIndex;
  if (theCompounding == 0) {
   theC = 1;
  } else if (theCompounding == 1) {
   theC = 2;
  } else if (theCompounding == 2) {
   theC = 4;
  } else if (theCompounding == 3) {
   theC = 12;
  } else if (theCompounding == 4) {
   theC = 52;
  } else if (theCompounding == 5) {
   theC = 365;
  }
  var thePV = calcPV(thePMT, theFV, theNR, theNP, theC);
  form.PVInput.value = "" + Math.round(-thePV*100)/100;
  return true;
}
 
function findPMT(form) {
  form.PmtxPer.value = "";
  var thePV = form.PVInput.value;
  if (!isNumber(thePV)) {
   return false;
  }
  if (thePV == "") thePV = 0;
  var theFV = form.FVInput.value;
  if (!isNumber(theFV)) {
   return false;
  }
  if (theFV == "") theFV = 0; 
  var theNP = form.NPInput.value;
  if (!isPositiveNumber(theNP)) {
   return false;
  }
  if (theNP == "") theNP = 0;
  var theNR = form.NRInput.value;
  if (!isPositiveNumber(theNR)) {
   return false;
  }
  if (theNR == "") theNR = 0;
  var theC;
  var theCompounding = form.CInput.selectedIndex;
  if (theCompounding == 0) {
   theC = 1;
  } else if (theCompounding == 1) {
   theC = 2;
  } else if (theCompounding == 2) {
   theC = 4;
  } else if (theCompounding == 3) {
   theC = 12;
  } else if (theCompounding == 4) {
   theC = 52;
  } else if (theCompounding == 5) {
   theC = 365;
  }
  var thePMT = calcPMT(thePV, theFV, theNR, theNP, theC);
 if (thePMT == "") {
  form.PMTInput.value = "";
 } else {
  form.PMTInput.value = "" + Math.round(-thePMT*100)/100;
 }
 return true;
}

function findFV(form) {
  form.PmtxPer.value = "";
  var thePV = form.PVInput.value;
  if (!isNumber(thePV)) {
   return false;
  }
  if (thePV == "") thePV = 0;
  var thePMT = form.PMTInput.value;
  if (!isNumber(thePMT)) {
   return false;
  }
  if (thePMT == "") thePMT = 0;
  var theNP = form.NPInput.value;
  if (!isPositiveNumber(theNP)) {
   return false;
  }
  if (theNP == "") theNP = 0;
  var theNR = form.NRInput.value;
  if (!isPositiveNumber(theNR)) {
   return false;
  }
  if (theNR == "") theNR = 0;
  var theC;
  var theCompounding = form.CInput.selectedIndex;
  if (theCompounding == 0) {
   theC = 1;
  } else if (theCompounding == 1) {
   theC = 2;
  } else if (theCompounding == 2) {
   theC = 4;
  } else if (theCompounding == 3) {
   theC = 12;
  } else if (theCompounding == 4) {
   theC = 52;
  } else if (theCompounding == 5) {
   theC = 365;
  }
  var theFV = calcFV(thePMT, thePV, theNR, theNP, theC);
  form.FVInput.value = "" + Math.round(-theFV*100)/100;
  return true;
 }
 
 function findNR(form) {
  form.PmtxPer.value = "";
  var theFV = form.FVInput.value;
  if (!isNumber(theFV)) {
   return false;
  }
  if (theFV == "") theFV = 0;
  var thePMT = form.PMTInput.value;
  if (!isNumber(thePMT)) {
   return false;
  }
  if (thePMT == "") thePMT = 0;
  var theNP = form.NPInput.value;
  if (!isPositiveNumber(theNP)) {
   return false;
  }
  if (theNP == "") theNP = 0;
  var thePV = form.PVInput.value;
  if (!isNumber(thePV)) {
   return false;
  }
  if (thePV == "") thePV = 0;
  var theC;
  var theCompounding = form.CInput.selectedIndex;
  if (theCompounding == 0) {
   theC = 1;
  } else if (theCompounding == 1) {
   theC = 2;
  } else if (theCompounding == 2) {
   theC = 4;
  } else if (theCompounding == 3) {
   theC = 12;
  } else if (theCompounding == 4) {
   theC = 52;
  } else if (theCompounding == 5) {
   theC = 365;
  }
  var theNR = calcNR(thePMT, thePV, theFV, theNP, theC);
  if (theNR == "") {
  form.NRInput.value = "";
 } else {
  form.NRInput.value = "" + Math.round(theNR*100)/100;
 }
  return true;
}

function findNP(form) {
  var theFV = form.FVInput.value;
  if (!isNumber(theFV)) {
   return false;
  }
  if (theFV == "") theFV = 0;
  var thePMT = form.PMTInput.value;
  if (!isNumber(thePMT)) {
   return false;
  }
  if (thePMT == "") thePMT = 0;
  var theNR = form.NRInput.value;
  if (!isPositiveNumber(theNR)) {
   return false;
  }
  if (theNR == "") theNR = 0;
  var thePV = form.PVInput.value;
  if (!isNumber(thePV)) {
   return false;
  }
  if (thePV == "") thePV = 0;
  var theC;
  var theCompounding = form.CInput.selectedIndex;
  if (theCompounding == 0) {
   theC = 1;
  } else if (theCompounding == 1) {
   theC = 2;
  } else if (theCompounding == 2) {
   theC = 4;
  } else if (theCompounding == 3) {
   theC = 12;
  } else if (theCompounding == 4) {
   theC = 52;
  } else if (theCompounding == 5) {
   theC = 365;
  }
  var theNP = calcNP(thePMT, thePV, theFV, theNR, theC);
  if (theNP == "") {
  form.NPInput.value = "";
 } else {
  form.NPInput.value = "" + Math.round(theNP*100)/100;
  form.PmtxPer.value = Math.round( form.NPInput.value * form.PMTInput.value );
 }
  return true;
}
 
 function isPositiveNumber(inputStr) {
  var decFlag = false;
  if (inputStr == ".") {
   alert("Please make sure that only numbers are input.");
   return false;
  }
  for (var i = 0; i < inputStr.length; i++) {
   var oneChar = inputStr.substring(i,i+1);
   if (((oneChar >= "0") && (oneChar <= "9")) || ((oneChar == ".") && (decFlag == false))) {
   
   } else {
    alert("Please make sure that only numbers are input.");
    return false;
   }
   if (oneChar == ".") {
    decFlag = true;
   }
  }
 return true;
 }
 
 function isNumber(inputStr) {
  var decFlag = false;
  if (inputStr == ".") {
   alert("Please make sure that only numbers are input.");
   return false;
  }
  for (var i = 0; i < inputStr.length; i++) {
   var oneChar = inputStr.substring(i,i+1);
   if ((i == 0) && (inputStr.length > 1)) {
    if (((oneChar >= "0") && (oneChar <= "9")) || ((oneChar == ".") && (decFlag == false)) || (oneChar == "-")) {
    
    } else {
     alert("Please make sure that only numbers are input.");
     return false;
    }
   } else {
    if (((oneChar >= "0") && (oneChar <= "9")) || ((oneChar == ".") && (decFlag == false))) {
    
    } else {
     alert("Please make sure that only numbers are input.");
     return false;
    }
   }
   if (oneChar == ".") {
    decFlag = true;
   } 
  }
 return true;
 }
 
function launchTVMCalc() {
    window.open("TVMCalcWindow.html","Win2","menubar,resizable,height=205,width=315");
}
