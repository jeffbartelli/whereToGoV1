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
export {data} from './data.js';
// console.log(Data.data[33]);

// count all the values greater than null. This is necessary for the formula that will produce a weighted score: (100 - below + rank) * weight. The problem with this formula is that it reverses the rank order so as to maximize score before averaging. Will need to decide how to approach that in js.
// let count = 0;
// Data.data.forEach((item,i)=>{
//   if(Data.data[i].citySolarLaws[0] !== null){
//     count++;
//   }
// });
// console.log(count);

// TOP 10 LIST PER METRIC

// for(let j=0; j<Data.metricDetails.length;j++){
//   let rankArray = [];
//   for(let i=0; i<Data.data.length;i++){
//     let newArray2 = [];
//     newArray2.push(Data.data[i][Data.metricDetails[j]['id']][1]);
//     newArray2.push(Data.data[i].city[0]);
//     newArray2.push(Data.data[i].state[0]);
//     rankArray.push(newArray2);

//   };
//   rankArray.sort((a,b)=>{
//     return a[0] - b[0];
//   })
//   rankArray = rankArray.slice(0,10);
//   console.log(rankArray);
//   rankArray = [];
// }