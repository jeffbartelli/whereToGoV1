import * as Data from './data.js';

// SCRIPT FOR SORTING AND RANKING EACH METRIC ACROSS ALL THE CITIES AND ADDING THE RANK TO EACH CITY'S KEYS.
const dataKeys = Object.keys(Data.data[0]);
let temp = [];
let testSort = [];
let ranks = [];

for(let j=0;j<dataKeys.length;j++){
  if(!isNaN(Data.data[0][dataKeys[j]])){
    Data.data.forEach((item,i)=>{
      temp.push(Data.data[i][dataKeys[j]][0]);
    })
    testSort = temp.slice().sort(function(a,b){
      if(Data.rankOrder[j]===0){
        return (a===null)-(b===null) || -(a>b)||+(a<b);
      } else if (Data.rankOrder[j]===1) {
        return (a===null)-(b===null) || +(a>b)||-(a<b)
      }
    });
    ranks = temp.slice().map(function(v){return testSort.indexOf(v)+1});
    ranks.forEach((item,i)=>{
      Data.data[i][dataKeys[j]].push(ranks[i]);
    });
  temp = [];
  testSort = [];
  ranks = [];
  } 
}

// function weightedCalc() {
//   for(let j=0; j<Data.data.length; j++){
//     for(let i=4; i<dataKeys.length;i++){
//       let count = 0;
//       Data.data.forEach((item,k)=>{
//         if(Data.data[k][dataKeys[i]][0] !== null){count++};
//       });
//       let rank = Data.data[j][dataKeys[i]][1];
//       let weight = Data.metricDetails.filter((f)=>{
//         return f.id == Object.keys(Data.data[j])[i];
//       })[0];
//       console.log(weight);
//       // Data.data[j][dataKeys[i]][2] = (100 - count + rank) * weight;
//       // console.log(Data.data[j][dataKeys[i]][2]);
//       // console.log(count);
//     }
//   }
// }
// weightedCalc();


// EXECUTE TO PRODUCE THE WEIGHT ADJUSTED SCORE FOR A METRIC ACROSS ALL CITIES
function weightUpdate(e) {
  let el = [e.id.substring(0,e.id.length-1)][0];
  let count = 0;
  Data.data.forEach((item,i)=>{
    if(Data.data[i][el][0] !== null){count++};
  });
  let weight = e.value/100;
  for(let i=0;i<Data.data.length;i++){
  let them = dataKeys.indexOf(el);
  Data.data.forEach((item,i)=>{
    temp.push(Data.data[i][el][0]);
  });
  testSort = temp.slice().sort(function(a,b){
    if(Data.rankOrder[them]===1){
      return (a===null)-(b===null) || -(a>b)||+(a<b);
    } else if (Data.rankOrder[them]===0) {
      return (a===null)-(b===null) || +(a>b)||-(a<b)
    }
  });
  ranks = temp.slice().map(function(v){return testSort.indexOf(v)+1});
    let weightedScore = (100 - count + ranks[i]) * weight;
    Data.data[i][el][2] = weightedScore;
    temp = [];
    testSort = [];
    ranks = [];
  }
}

export {data} from './data.js';
export {weightUpdate};